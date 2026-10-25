import type Database from "better-sqlite3";
import { TRUST_ORG_CODES } from "../nhs-england-stats";
import { fetchWithRetry } from "./generic";

/**
 * Refresh "typical wait" estimates from official statistical publications.
 *
 * - England: NHS England's monthly A&E SitRep CSV (trust level). Replaces
 *   the frozen snapshot in nhs-england-stats.ts with the latest month,
 *   discovered automatically from the publication page.
 * - Scotland: Public Health Scotland's weekly A&E open data (hospital
 *   level), aggregated over the latest four published weeks.
 *
 * Both write into the typical_waits table and skip the network work when
 * the stored period is already current. Failures never throw — stale
 * estimates are better than a broken scrape cycle.
 */

const UA =
  "AEWaitTimes/1.0 (+https://aewaittimes.co.uk; independent NHS wait time aggregator)";

// NHS England's edge serves an empty 200 to our honest bot UA from
// datacenter IPs (works from a desktop, returns 0 bytes from CI). Identify
// honestly first, and only fall back to a standard browser UA when the
// response comes back blocked or empty.
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function fetchPublication(
  url: string
): Promise<{ ok: boolean; status: number; body: string }> {
  for (const ua of [UA, BROWSER_UA]) {
    const res = await fetchWithRetry(url, {
      headers: {
        "User-Agent": ua,
        Accept: "text/html,application/xhtml+xml,text/csv,*/*",
        "Accept-Language": "en-GB,en;q=0.9",
      },
    });
    const body = res.ok ? await res.text() : "";
    if (res.ok && body.length > 0) return { ok: true, status: res.status, body };
    if (ua === BROWSER_UA) return { ok: false, status: res.status, body };
  }
  return { ok: false, status: 0, body: "" };
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function storedPeriod(db: Database.Database, keyType: string): string | null {
  const row = db
    .prepare("SELECT period FROM typical_waits WHERE key_type = ? LIMIT 1")
    .get(keyType) as { period: string } | undefined;
  return row?.period ?? null;
}

function upsert(
  db: Database.Database,
  keyType: string,
  key: string,
  avg: number,
  pct: number,
  period: string
) {
  db.prepare(
    `INSERT INTO typical_waits (key_type, key, avg_wait_minutes, pct_within_4h, period, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(key_type, key) DO UPDATE SET
       avg_wait_minutes = excluded.avg_wait_minutes,
       pct_within_4h = excluded.pct_within_4h,
       period = excluded.period,
       updated_at = excluded.updated_at`
  ).run(keyType, key, avg, pct, period);
}

// ---------- England: monthly SitRep CSV ----------

function fiscalYearLabels(now: Date): string[] {
  // April 2026 – March 2027 is published under "2026-27"
  const y = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  return [
    `${y}-${String((y + 1) % 100).padStart(2, "0")}`,
    `${y - 1}-${String(y % 100).padStart(2, "0")}`,
  ];
}

export async function refreshEnglandMonthly(db: Database.Database): Promise<string> {
  const notes: string[] = [];
  for (const fy of fiscalYearLabels(new Date())) {
    const pageUrl = `https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/ae-attendances-and-emergency-admissions-${fy}/`;
    let html: string;
    try {
      const res = await fetchPublication(pageUrl);
      if (!res.ok) {
        notes.push(`${fy}: page HTTP ${res.status}, ${res.body.length} bytes`);
        continue;
      }
      html = res.body;
    } catch (err) {
      notes.push(`${fy}: page fetch ${err instanceof Error ? err.message : err}`);
      continue;
    }

    // e.g. .../2026/10/September-2026-CSV-Re72Eh.csv — pick the latest month
    const links = [...html.matchAll(/https:\/\/[^"']+\/(\w+)-(\d{4})-CSV-\w+\.csv/g)]
      .map((m) => ({ url: m[0], month: MONTHS.indexOf(m[1]), year: parseInt(m[2]) }))
      .filter((l) => l.month >= 0)
      .sort((a, b) => b.year - a.year || b.month - a.month);
    if (links.length === 0) {
      notes.push(`${fy}: no CSV links on page (${html.length} bytes)`);
      continue;
    }

    const latest = links[0];
    const period = `${MONTHS[latest.month]} ${latest.year}`;
    if (storedPeriod(db, "trust") === period) return `England: ${period} (current)`;

    const csvRes = await fetchPublication(latest.url);
    if (!csvRes.ok) {
      notes.push(`${fy}: CSV HTTP ${csvRes.status}`);
      continue;
    }
    const lines = csvRes.body.split("\n");
    const header = lines[0].split(",").map((h) => h.trim());
    const iCode = header.indexOf("Org Code");
    const iAtt = header.findIndex((h) => /^A&E attendances Type 1$/i.test(h));
    const iOver = header.findIndex((h) => /^Attendances over 4hrs Type 1$/i.test(h));
    if (iCode < 0 || iAtt < 0 || iOver < 0) {
      notes.push(`${fy}: unexpected CSV columns`);
      continue;
    }

    let updated = 0;
    for (const line of lines.slice(1)) {
      const cells = line.split(",");
      const trustName = TRUST_ORG_CODES[cells[iCode]?.trim()];
      if (!trustName) continue;
      const total = parseInt(cells[iAtt]);
      const over4h = parseInt(cells[iOver]);
      if (!Number.isFinite(total) || !Number.isFinite(over4h) || total < 500) continue;
      // Same estimate the site has always used: <4h patients average ~90
      // minutes in department, >4h patients ~360.
      const avg = Math.round(((total - over4h) * 90 + over4h * 360) / total);
      const pct = Math.round(((total - over4h) / total) * 1000) / 10;
      upsert(db, "trust", trustName, avg, pct, period);
      updated++;
    }
    if (updated > 0) return `England: ${period}, ${updated} trusts`;
    notes.push(`${fy}: no matching trusts in CSV`);
  }
  return `England: no update (${notes.join("; ") || "no reason recorded"})`;
}

// ---------- Scotland: PHS weekly open data ----------

const PHS_API = "https://www.opendata.nhs.scot/api/3/action/datastore_search";
const WEEKLY_RESOURCE = "a5f7ca94-c810-41b5-a7c9-25c18d43e5a4";
const HOSPITALS_RESOURCE = "c698f450-eeed-41a0-88f7-c1e40a568acc";

interface PhsWeeklyRecord {
  WeekEndingDate: number;
  TreatmentLocation: string;
  NumberOfAttendancesEpisode: number;
  NumberWithin4HoursEpisode: number;
  NumberOver4HoursEpisode: number;
  NumberOver8HoursEpisode: number;
  NumberOver12HoursEpisode: number;
}

async function phsQuery(params: Record<string, string>): Promise<Record<string, unknown>[]> {
  const url = `${PHS_API}?${new URLSearchParams(params)}`;
  const res = await fetchWithRetry(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`PHS API HTTP ${res.status}`);
  const data = (await res.json()) as {
    success: boolean;
    result: { records: Record<string, unknown>[] };
  };
  if (!data.success) throw new Error("PHS API returned success=false");
  return data.result.records;
}

function ymdToDate(ymd: number): Date {
  const s = String(ymd);
  return new Date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T00:00:00Z`);
}

function dateToYmd(d: Date): number {
  return parseInt(d.toISOString().slice(0, 10).replace(/-/g, ""));
}

const normName = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’.]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * PHS site codes whose published names don't match ours closely enough
 * for the name match above (different word order, "at Little France",
 * or a plain name like "Victoria Hospital" that is ambiguous UK-wide).
 */
const PHS_CODE_TO_SLUG: Record<string, string> = {
  S314H: "royal-infirmary-of-edinburgh", // "Royal Infirmary of Edinburgh at Little France"
  S116H: "western-general-hospital-edinburgh", // "Western General Hospital"
  L302H: "hairmyres-hospital", // "University Hospital Hairmyres"
  F704H: "victoria-hospital-kirkcaldy", // "Victoria Hospital" (Kirkcaldy)
  Y146H: "dumfries-and-galloway-royal-infirmary", // "Dumfries & Galloway Royal Infirmary"
};

export async function refreshScotlandWeekly(db: Database.Database): Promise<string> {
  const latestRows = (await phsQuery({
    resource_id: WEEKLY_RESOURCE,
    limit: "1",
    sort: "WeekEndingDate desc",
  })) as unknown as PhsWeeklyRecord[];
  if (latestRows.length === 0) return "Scotland: no data";

  const latestWeek = latestRows[0].WeekEndingDate;
  const latestDate = ymdToDate(latestWeek);
  const period = `4 weeks to ${latestDate.toISOString().slice(0, 10)}`;
  if (storedPeriod(db, "hospital") === period) return `Scotland: ${period} (current)`;

  // Aggregate the latest four published weeks per site. "Unplanned" only —
  // the "All" rows double-count against the category rows.
  const totals = new Map<
    string,
    { att: number; w4: number; o4: number; o8: number; o12: number }
  >();
  for (let i = 0; i < 4; i++) {
    const week = dateToYmd(new Date(latestDate.getTime() - i * 7 * 86400_000));
    const rows = (await phsQuery({
      resource_id: WEEKLY_RESOURCE,
      limit: "500",
      filters: JSON.stringify({ WeekEndingDate: week, AttendanceCategory: "Unplanned" }),
    })) as unknown as PhsWeeklyRecord[];
    for (const r of rows) {
      const t = totals.get(r.TreatmentLocation) ?? { att: 0, w4: 0, o4: 0, o8: 0, o12: 0 };
      t.att += r.NumberOfAttendancesEpisode || 0;
      t.w4 += r.NumberWithin4HoursEpisode || 0;
      t.o4 += r.NumberOver4HoursEpisode || 0;
      t.o8 += r.NumberOver8HoursEpisode || 0;
      t.o12 += r.NumberOver12HoursEpisode || 0;
      totals.set(r.TreatmentLocation, t);
    }
  }

  // Site code → published name, then match onto our Scottish hospitals.
  const lookupRows = await phsQuery({ resource_id: HOSPITALS_RESOURCE, limit: "500" });
  const codeToName = new Map<string, string>();
  for (const r of lookupRows) {
    codeToName.set(String(r.HospitalCode), String(r.HospitalName));
  }

  const ours = db
    .prepare("SELECT slug, name, aliases FROM hospitals WHERE country = 'Scotland'")
    .all() as { slug: string; name: string; aliases: string | null }[];
  const bySiteName = new Map<string, string>();
  for (const h of ours) {
    bySiteName.set(normName(h.name), h.slug);
    for (const alias of (h.aliases ?? "").split(",")) {
      if (alias.trim()) bySiteName.set(normName(alias), h.slug);
    }
  }

  let updated = 0;
  const unmatched: string[] = [];
  for (const [code, t] of totals) {
    if (t.att < 50) continue; // too small for a meaningful average
    const phsName = codeToName.get(code);
    if (!phsName) continue;
    const slug = PHS_CODE_TO_SLUG[code] ?? bySiteName.get(normName(phsName));
    if (!slug) {
      unmatched.push(phsName);
      continue;
    }
    // Banded estimate of time in department: the cumulative over-4/8/12h
    // columns become bands (<4h ~90min, 4-8h ~330, 8-12h ~600, >12h ~810).
    const b2 = t.o4 - t.o8;
    const b3 = t.o8 - t.o12;
    const avg = Math.round((t.w4 * 90 + b2 * 330 + b3 * 600 + t.o12 * 810) / t.att);
    const pct = Math.round((t.w4 / t.att) * 1000) / 10;
    upsert(db, "hospital", slug, avg, pct, period);
    updated++;
  }

  return `Scotland: ${period}, ${updated} hospitals${
    unmatched.length ? ` (${unmatched.length} PHS sites unmatched)` : ""
  }`;
}

export async function refreshOfficialStats(db: Database.Database): Promise<void> {
  for (const job of [refreshEnglandMonthly, refreshScotlandWeekly]) {
    try {
      console.log(`  Official stats — ${await job(db)}`);
    } catch (err) {
      console.error(
        `  Official stats refresh failed (${job.name}): ${err instanceof Error ? err.message : err}`
      );
    }
  }
}
