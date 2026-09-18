import * as cheerio from "cheerio";
import { getDb } from "../db";
import { generateId, slugify } from "../utils";
import type { SourceConfig, ParsedWaitTime } from "./sources";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export async function scrapeSource(config: SourceConfig): Promise<{
  success: boolean;
  hospitalsUpdated: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let hospitalsUpdated = 0;

  try {
    const response = await fetch(config.sourceUrl, {
      headers: { "User-Agent": USER_AGENT },
    });

    if (!response.ok) {
      return {
        success: false,
        hospitalsUpdated: 0,
        errors: [`HTTP ${response.status} from ${config.sourceUrl}`],
      };
    }

    const body = await response.text();
    let parsed: ParsedWaitTime[];

    switch (config.sourceType) {
      case "json":
        parsed = parseJson(body, config);
        break;
      case "plain-text":
        parsed = parsePlainText(body, config);
        break;
      case "html-table":
        parsed = parseHtmlTable(body, config);
        break;
      case "html-embedded":
        parsed = parseHtmlEmbedded(body, config);
        break;
      case "generic":
      default:
        parsed = parseGeneric(body, config);
        break;
    }

    if (parsed.length === 0) {
      errors.push("No wait times found in response");
    }

    const db = getDb();
    const trustId = ensureTrust(db, config);

    for (const p of parsed) {
      try {
        const hospitalId = ensureHospital(db, p, config, trustId);
        db.prepare(
          `INSERT INTO wait_readings (id, hospital_id, wait_minutes, patients_waiting, total_patients, source_timestamp, freshness)
           VALUES (?, ?, ?, ?, ?, datetime('now'), 'live')`
        ).run(generateId(), hospitalId, p.waitMinutes, p.patientsWaiting ?? null, p.totalPatients ?? null);
        // Keep opening hours in sync when the source publishes them
        if (p.openingHours) {
          db.prepare(
            "UPDATE hospitals SET opening_hours = ?, updated_at = datetime('now') WHERE id = ? AND (opening_hours IS NULL OR opening_hours != ?)"
          ).run(p.openingHours, hospitalId, p.openingHours);
        }
        hospitalsUpdated++;
      } catch (err) {
        errors.push(`${p.hospitalName}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  } catch (err) {
    errors.push(err instanceof Error ? err.message : String(err));
  }

  return { success: errors.length === 0 || hospitalsUpdated > 0, hospitalsUpdated, errors };
}

export function parseJson(body: string, config: SourceConfig): ParsedWaitTime[] {
  const results: ParsedWaitTime[] = [];
  try {
    const data = JSON.parse(body);
    const items = Array.isArray(data) ? data : [data];

    for (const item of items) {
      const siteName = item.Site || item.site || item.name || item.hospital || "";
      const mapping = config.hospitals.find(
        (h) => siteName.toLowerCase().includes(h.siteKey.toLowerCase())
      );
      if (!mapping) continue;

      const waitMinutes = item.WTBS ?? item.waitMinutes ?? item.wait_minutes ?? item.waitTime ?? null;

      results.push({
        hospitalSlug: mapping.slug,
        hospitalName: mapping.name,
        waitMinutes: typeof waitMinutes === "number" ? waitMinutes : parseWaitText(String(waitMinutes)),
        type: mapping.type,
      });
    }
  } catch {
    // not valid JSON
  }
  return results;
}

export function parsePlainText(body: string, config: SourceConfig): ParsedWaitTime[] {
  const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const waitMinutes = parseWaitText(text);
  const mapping = config.hospitals[0];
  if (!mapping) return [];

  return [{
    hospitalSlug: mapping.slug,
    hospitalName: mapping.name,
    waitMinutes,
    type: mapping.type,
  }];
}

export function parseHtmlTable(body: string, config: SourceConfig): ParsedWaitTime[] {
  const $ = cheerio.load(body);
  const results: ParsedWaitTime[] = [];

  // Strategy 1: actual HTML tables (NCIC-style)
  $("table tr, tbody tr").each((_i, row) => {
    const cells = $(row).find("td");
    if (cells.length < 2) return;

    const cellTexts = cells.map((_j, c) => $(c).text().trim()).get();
    const firstCell = cellTexts[0];
    if (!firstCell) return;

    const mapping = config.hospitals.find(
      (h) => firstCell.toLowerCase().includes(h.siteKey.toLowerCase())
    );
    if (!mapping) return;

    let waitMinutes: number | null = null;
    let totalPatients: number | null = null;

    for (const text of cellTexts.slice(1)) {
      if (text === "CLOSED" || text === "-" || text === "No data") continue;
      const parsed = parseWaitText(text);
      if (parsed !== null && waitMinutes === null) {
        waitMinutes = parsed;
        continue;
      }
      const num = parseInt(text);
      if (!isNaN(num) && num >= 0 && num < 500 && totalPatients === null) {
        totalPatients = num;
      }
    }

    results.push({
      hospitalSlug: mapping.slug,
      hospitalName: mapping.name,
      waitMinutes,
      totalPatients,
      type: mapping.type,
    });
  });

  if (results.length > 0) return results;

  // Strategy 2: div-based blocks (Kent UTC-style with .waiting-times sections)
  $(".waiting-times, .live-service-data-wrapper, [class*='wait-time']").each((_i, section) => {
    const sectionEl = $(section);
    const heading = sectionEl.find("h2, h3.site-name, .site-data-content h2").first().text().trim();
    if (!heading) return;

    const mapping = config.hospitals.find(
      (h) => heading.toLowerCase().includes(h.siteKey.toLowerCase())
    );
    if (!mapping) return;
    if (results.find((r) => r.hospitalSlug === mapping.slug)) return;

    let dataNumbers = sectionEl.find(".data-number, .data-display").map((_j, el) => $(el).text().trim()).get().filter(Boolean);
    if (dataNumbers.length === 0) {
      dataNumbers = sectionEl.find(".data-item").map((_j, el) => $(el).text().trim()).get().filter(Boolean);
    }
    let waitMinutes: number | null = null;
    let patientsWaiting: number | null = null;

    for (const text of dataNumbers) {
      const parsed = parseWaitText(text);
      if (parsed !== null) {
        if (waitMinutes === null) waitMinutes = parsed;
        continue;
      }
      const num = parseInt(text.replace(/[^\d]/g, ""));
      if (!isNaN(num) && num >= 0 && num < 500 && patientsWaiting === null) {
        patientsWaiting = num;
      }
    }

    if (waitMinutes !== null || patientsWaiting !== null) {
      results.push({
        hospitalSlug: mapping.slug,
        hospitalName: mapping.name,
        waitMinutes,
        patientsWaiting,
        type: mapping.type,
      });
    }
  });

  return results;
}

function parseWaitNearLabel(text: string): number | null {
  const labelPattern = /(?:wait(?:ing)?\s+(?:time\s+)?to\s+be\s+seen|current\s+(?:longest\s+)?wait|wait\s+time\s+to\s+be\s+seen)[^]*?(\d+)\s*(?:hours?|hrs?|h)\s*[,&]?\s*(\d+)\s*(?:minutes?|mins?|m)/i;
  const m = text.match(labelPattern);
  if (m) return parseInt(m[1]) * 60 + parseInt(m[2]);
  const labelMins = text.match(/(?:wait(?:ing)?\s+(?:time\s+)?to\s+be\s+seen|current\s+wait)[^]*?(\d+)\s*(?:minutes?|mins?)/i);
  if (labelMins) return parseInt(labelMins[1]);
  const overLabel = text.match(/(?:wait(?:ing)?\s+(?:time\s+)?to\s+be\s+seen|current\s+wait)[^]*?(?:over|more than)\s+(\d+)\s*(?:hours?|hrs?)/i);
  if (overLabel) return parseInt(overLabel[1]) * 60 + 30;
  return null;
}

export function parseHtmlEmbedded(body: string, config: SourceConfig): ParsedWaitTime[] {
  const $ = cheerio.load(body);
  const results: ParsedWaitTime[] = [];

  if (config.hospitals.length === 1 && config.hospitals[0].siteKey === "default") {
    const mapping = config.hospitals[0];
    const pageText = $("body").text();
    let waitMinutes: number | null = null;

    const triageEl = $("[class*='AverageWaitTime']:not([class*='AverageWaitTime2']), [class*='averageWaitTime']:not([class*='averageWaitTime2'])").first();
    if (triageEl.length) waitMinutes = parseWaitText(triageEl.text());

    if (waitMinutes === null) waitMinutes = parseWaitNearLabel(pageText);
    if (waitMinutes === null) waitMinutes = parseWaitText(pageText);
    let totalPatients: number | null = null;

    const patientMatch = pageText.match(/(\d+)\s*patient/i);
    if (patientMatch) totalPatients = parseInt(patientMatch[1]);

    if (waitMinutes !== null) {
      results.push({
        hospitalSlug: mapping.slug,
        hospitalName: mapping.name,
        waitMinutes,
        totalPatients,
        type: mapping.type,
      });
    }
    return results;
  }

  interface EmbeddedCandidate { slug: string; name: string; wait: number; type?: "AE" | "MIU" | "UTC"; len: number }
  const candidates: EmbeddedCandidate[] = [];

  for (const mapping of config.hospitals) {
    const sections = $("tr, .department, .site, .hospital, [class*='site'], [class*='hospital'], [class*='panel'], [class*='card'], [class*='monitor']");
    sections.each((_i, el) => {
      const text = $(el).text();
      if (!text.toLowerCase().includes(mapping.siteKey.toLowerCase())) return;

      const waitMinutes = parseWaitText(text);
      if (waitMinutes !== null) {
        candidates.push({
          slug: mapping.slug, name: mapping.name,
          wait: waitMinutes, type: mapping.type, len: text.length,
        });
      }
    });
  }

  candidates.sort((a, b) => a.len - b.len);
  const seen = new Set<string>();
  for (const c of candidates) {
    if (seen.has(c.slug)) continue;
    seen.add(c.slug);
    results.push({
      hospitalSlug: c.slug,
      hospitalName: c.name,
      waitMinutes: c.wait,
      type: c.type,
    });
  }

  return results;
}

export function parseGeneric(body: string, config: SourceConfig): ParsedWaitTime[] {
  const $ = cheerio.load(body);
  const results: ParsedWaitTime[] = [];

  const selectors = [
    "[class*='wait'], [class*='Wait']",
    "[class*='department-time']",
    "table tr",
    ".department, .location, .site, .ed-section",
    "[class*='hospital'], [class*='Hospital']",
    "article, .card, .panel",
    "section, .content-item-container",
    ".row",
  ];

  const norm = (s: string) => s.toLowerCase().replace(/[‘’′`]/g, "'");

  interface Candidate { text: string; slug: string; name: string; wait: number; type?: "AE" | "MIU" | "UTC"; len: number; closed: boolean }
  const candidates: Candidate[] = [];

  for (const selector of selectors) {
    $(selector).each((_i, el) => {
      const text = $(el).text();
      const textLen = text.length;
      const normText = norm(text);

      for (const mapping of config.hospitals) {
        if (!normText.includes(norm(mapping.siteKey))) continue;
        const waitMinutes = parseWaitText(text);
        if (waitMinutes === null) continue;
        // Ignore "closed" mentions inside X-ray schedule notes — the Cornwall MIU pages
        // list X-ray hours like "Closed X-Ray:" or "Open X-Ray: Closed on Sunday", which
        // are not the unit's own status. Only skip on a genuine unit closure/reopening.
        const statusText = text.replace(/(?:open|closed)\s*x-?ray:[^.]*\.?/gi, " ");
        const closed = /\bcurrently closed\b|\breopening on\b|\bclosed\b/i.test(statusText);
        candidates.push({
          text, slug: mapping.slug, name: mapping.name,
          wait: waitMinutes, type: mapping.type, len: textLen, closed,
        });
      }
    });
  }

  // Prefer the smallest container for each hospital (most specific match)
  // Among similarly-sized containers, deprioritize children's departments
  const isChildrens = (t: string) => /\bchildren'?s?\b|\bpaediatric\b|\bpediatric\b/i.test(t);
  candidates.sort((a, b) => {
    if (a.len !== b.len) return a.len - b.len;
    const ac = isChildrens(a.text) ? 1 : 0;
    const bc = isChildrens(b.text) ? 1 : 0;
    return ac - bc;
  });
  const seen = new Set<string>();
  for (const c of candidates) {
    if (seen.has(c.slug)) continue;
    // Skip children's dept if an adult candidate exists for the same slug
    if (isChildrens(c.text) && candidates.some(o => o.slug === c.slug && !isChildrens(o.text) && o.wait !== null)) continue;
    seen.add(c.slug);
    if (c.closed) continue;
    // Capture opening hours when the source publishes them alongside the wait
    // (Cornwall's blocks read "Open: Every day, 8am to 8pm. Walk in or…").
    const openMatch = c.text
      .replace(/\s+/g, " ")
      .match(/Open:\s*([^.]{3,100}\.)/);
    results.push({
      hospitalSlug: c.slug,
      hospitalName: c.name,
      waitMinutes: c.wait,
      type: c.type,
      openingHours: openMatch ? `Open: ${openMatch[1].trim()}` : null,
    });
  }

  if (results.length === 0 && config.hospitals.length === 1) {
    const pageText = $("body").text();
    const waitMinutes = parseWaitText(pageText);
    if (waitMinutes !== null) {
      results.push({
        hospitalSlug: config.hospitals[0].slug,
        hospitalName: config.hospitals[0].name,
        waitMinutes,
        type: config.hospitals[0].type,
      });
    }
  }

  return results;
}

export function parseWaitText(text: string): number | null {
  if (!text) return null;

  const rangeMatch = text.match(/(\d+)\s*(?:hours?|hrs?)\s*(?:(\d+)\s*(?:minutes?|mins?))?\s*-\s*(\d+)\s*(?:hours?|hrs?)\s*(?:(\d+)\s*(?:minutes?|mins?))?/i);
  if (rangeMatch) {
    const low = parseInt(rangeMatch[1]) * 60 + (rangeMatch[2] ? parseInt(rangeMatch[2]) : 0);
    const high = parseInt(rangeMatch[3]) * 60 + (rangeMatch[4] ? parseInt(rangeMatch[4]) : 0);
    return Math.round((low + high) / 2);
  }

  const mixedRangeMatch = text.match(/(\d+)\s*(?:minutes?|mins?)\s*-\s*(\d+)\s*(?:hours?|hrs?)\s*(?:(\d+)\s*(?:minutes?|mins?))?/i);
  if (mixedRangeMatch) {
    const low = parseInt(mixedRangeMatch[1]);
    const high = parseInt(mixedRangeMatch[2]) * 60 + (mixedRangeMatch[3] ? parseInt(mixedRangeMatch[3]) : 0);
    return Math.round((low + high) / 2);
  }

  const hourMinMatch = text.match(/(\d+)\s*(?:hours?|hrs?|h)\s*(?:&amp;|&|,|and)?\s*(\d+)\s*(?:minutes?|mins?|m)/i);
  if (hourMinMatch) return parseInt(hourMinMatch[1]) * 60 + parseInt(hourMinMatch[2]);

  const moreMatch = text.match(/(?:over|more than)\s+(\d+)\s*(?:hours?|hrs?)/i);
  if (moreMatch) return parseInt(moreMatch[1]) * 60 + 30;

  const lessMatch = text.match(/(?:less than|under)\s+(\d+)\s*(?:hours?|hrs?)/i);
  if (lessMatch) return Math.max(parseInt(lessMatch[1]) * 60 - 30, 15);

  const hoursOnly = text.match(/(\d+)\s*(?:hours?|hrs?|h)\b/i);
  if (hoursOnly) {
    const hrs = parseInt(hoursOnly[1]);
    if (hrs >= 0 && hrs < 24) return hrs * 60;
  }

  const minsOnly = text.match(/(\d+)\s*(?:minutes?|mins?|m)\b/i);
  if (minsOnly) return parseInt(minsOnly[1]);

  return null;
}

function ensureTrust(db: ReturnType<typeof getDb>, config: SourceConfig): string {
  const slug = slugify(config.name);
  const existing = db.prepare("SELECT id FROM trusts WHERE slug = ?").get(slug) as { id: string } | undefined;
  if (existing) return existing.id;

  const id = generateId();
  db.prepare("INSERT INTO trusts (id, name, slug, source_url, country) VALUES (?, ?, ?, ?, ?)")
    .run(id, config.name, slug, config.sourceUrl, config.country);
  return id;
}

function ensureHospital(
  db: ReturnType<typeof getDb>,
  p: ParsedWaitTime,
  config: SourceConfig,
  trustId: string
): string {
  const existing = db.prepare("SELECT id FROM hospitals WHERE slug = ?").get(p.hospitalSlug) as { id: string } | undefined;
  if (existing) return existing.id;

  const id = generateId();
  db.prepare(
    `INSERT INTO hospitals (id, name, slug, type, country, region, trust_id) VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, p.hospitalName, p.hospitalSlug, p.type || "AE", config.country, config.region, trustId);
  return id;
}
