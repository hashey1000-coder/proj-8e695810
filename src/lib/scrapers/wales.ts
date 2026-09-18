import * as cheerio from "cheerio";
import { getDb } from "../db";
import { generateId, slugify } from "../utils";

const SOURCE_URL = "https://aeinfo.nhs.wales/";
const TRUST_NAME = "NHS Wales (via aeinfo.nhs.wales)";

interface ScrapedHospital {
  name: string;
  waitMinutes: number | null;
  patientsWaiting: number | null;
  type: string;
  department: string | null;
}

export async function scrapeWales(): Promise<{
  success: boolean;
  hospitalsUpdated: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let hospitalsUpdated = 0;

  try {
    const response = await fetch(SOURCE_URL, {
      headers: {
        "User-Agent":
          "AEWaitTimes/1.0 (+https://aewaittimes.co.uk; independent NHS wait time aggregator)",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        hospitalsUpdated: 0,
        errors: [`Failed to fetch: ${response.status} ${response.statusText}`],
      };
    }

    const html = await response.text();
    const hospitals = parseWalesPage(html);

    if (hospitals.length === 0) {
      const isDecommissioned = html.includes("NHS Wales 111") || html.includes("111.wales");
      return {
        success: false,
        hospitalsUpdated: 0,
        errors: [
          isDecommissioned
            ? "aeinfo.nhs.wales has been decommissioned — NHS Wales no longer publishes live A&E wait times at this URL"
            : "No hospitals found on the page — the page structure may have changed",
        ],
      };
    }

    const db = getDb();

    const trustId = ensureTrust(db);

    for (const h of hospitals) {
      try {
        const hospitalId = ensureHospital(db, h, trustId);
        insertReading(db, hospitalId, h);
        hospitalsUpdated++;
      } catch (err) {
        errors.push(
          `Failed to process ${h.name}: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
  } catch (err) {
    errors.push(
      `Scrape failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  return {
    success: errors.length === 0,
    hospitalsUpdated,
    errors,
  };
}

function parseWalesPage(html: string): ScrapedHospital[] {
  const $ = cheerio.load(html);
  const hospitals: ScrapedHospital[] = [];

  $("tr.hosp-row, .hospital-row, [class*='hosp']").each((_i, el) => {
    const row = $(el);
    const name = row.find("td:first-child a, .hospital-name, td:first-child").first().text().trim();
    if (!name) return;

    const waitText = row.find("td:nth-child(2), .wait-time").text().trim();
    const waitMinutes = parseWaitMinutes(waitText);

    const patientsText = row.find("td:nth-child(3), .patients").text().trim();
    const patientsWaiting = parseInt(patientsText) || null;

    const type = name.toLowerCase().includes("miu")
      ? "MIU"
      : name.toLowerCase().includes("utc")
        ? "UTC"
        : "AE";

    hospitals.push({
      name: cleanHospitalName(name),
      waitMinutes,
      patientsWaiting,
      type,
      department: null,
    });
  });

  if (hospitals.length === 0) {
    $("table tr").each((_i, el) => {
      if (_i === 0) return;
      const cells = $(el).find("td");
      if (cells.length < 2) return;

      const name = $(cells[0]).text().trim();
      if (!name || name.toLowerCase().includes("hospital") === false && name.toLowerCase().includes("ysbyty") === false && name.length < 3) return;

      const waitText = $(cells[1]).text().trim();
      const waitMinutes = parseWaitMinutes(waitText);

      const type = name.toLowerCase().includes("miu")
        ? "MIU"
        : name.toLowerCase().includes("utc")
          ? "UTC"
          : "AE";

      hospitals.push({
        name: cleanHospitalName(name),
        waitMinutes,
        patientsWaiting: cells.length > 2 ? parseInt($(cells[2]).text().trim()) || null : null,
        type,
        department: null,
      });
    });
  }

  if (hospitals.length === 0) {
    const text = $.text();
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      const match = line.match(
        /^(.+?(?:Hospital|Ysbyty|MIU|UTC).+?)\s+(\d+)\s*(?:min|minutes)/i
      );
      if (match) {
        hospitals.push({
          name: cleanHospitalName(match[1]),
          waitMinutes: parseInt(match[2]),
          patientsWaiting: null,
          type: match[1].toLowerCase().includes("miu") ? "MIU" : "AE",
          department: null,
        });
      }
    }
  }

  return hospitals;
}

function parseWaitMinutes(text: string): number | null {
  if (!text) return null;
  const cleaned = text.replace(/[^\d\s:hm]/gi, "").trim();

  const hourMin = cleaned.match(/(\d+)\s*(?:h|hr|hour).*?(\d+)\s*(?:m|min)/i);
  if (hourMin) return parseInt(hourMin[1]) * 60 + parseInt(hourMin[2]);

  const hoursOnly = cleaned.match(/(\d+)\s*(?:h|hr|hour)/i);
  if (hoursOnly) return parseInt(hoursOnly[1]) * 60;

  const minsOnly = cleaned.match(/(\d+)\s*(?:m|min)/i);
  if (minsOnly) return parseInt(minsOnly[1]);

  const num = parseInt(cleaned);
  if (!isNaN(num) && num > 0 && num < 1440) return num;

  return null;
}

function cleanHospitalName(name: string): string {
  return name
    .replace(/\s+/g, " ")
    .replace(/\s*[-–]\s*$/, "")
    .trim();
}

function ensureTrust(db: ReturnType<typeof getDb>): string {
  const existing = db
    .prepare("SELECT id FROM trusts WHERE slug = ?")
    .get(slugify(TRUST_NAME)) as { id: string } | undefined;

  if (existing) return existing.id;

  const id = generateId();
  db.prepare(
    "INSERT INTO trusts (id, name, slug, source_url, country) VALUES (?, ?, ?, ?, ?)"
  ).run(id, TRUST_NAME, slugify(TRUST_NAME), SOURCE_URL, "Wales");

  return id;
}

function ensureHospital(
  db: ReturnType<typeof getDb>,
  h: ScrapedHospital,
  trustId: string
): string {
  const slug = slugify(h.name);
  const existing = db
    .prepare("SELECT id FROM hospitals WHERE slug = ?")
    .get(slug) as { id: string } | undefined;

  if (existing) return existing.id;

  const id = generateId();
  const coords = WALES_COORDS[slug] || WALES_COORDS[h.name.toLowerCase()] || {};
  db.prepare(
    `INSERT INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    h.name,
    slug,
    h.type,
    "Wales",
    "Wales",
    trustId,
    coords.lat || null,
    coords.lng || null,
    coords.city || null,
    "Open: 24 hours, 7 days a week"
  );

  return id;
}

function insertReading(
  db: ReturnType<typeof getDb>,
  hospitalId: string,
  h: ScrapedHospital
) {
  db.prepare(
    `INSERT INTO wait_readings (id, hospital_id, wait_minutes, patients_waiting, source_timestamp, freshness)
     VALUES (?, ?, ?, ?, datetime('now'), 'live')`
  ).run(generateId(), hospitalId, h.waitMinutes, h.patientsWaiting);
}

const WALES_COORDS: Record<string, { lat?: number; lng?: number; city?: string }> = {
  "wrexham-maelor-hospital": { lat: 53.046, lng: -2.992, city: "Wrexham" },
  "ysbyty-gwynedd": { lat: 53.228, lng: -4.137, city: "Bangor" },
  "glan-clwyd-hospital": { lat: 53.272, lng: -3.494, city: "Bodelwyddan" },
  "bronglais-general-hospital": { lat: 52.419, lng: -4.076, city: "Aberystwyth" },
  "morriston-hospital": { lat: 51.674, lng: -3.934, city: "Swansea" },
  "university-hospital-of-wales": { lat: 51.506, lng: -3.189, city: "Cardiff" },
  "royal-glamorgan-hospital": { lat: 51.561, lng: -3.374, city: "Llantrisant" },
  "prince-charles-hospital": { lat: 51.747, lng: -3.382, city: "Merthyr Tydfil" },
  "princess-of-wales-hospital": { lat: 51.516, lng: -3.589, city: "Bridgend" },
  "royal-gwent-hospital-miu": { lat: 51.587, lng: -2.990, city: "Newport" },
  "nevill-hall-hospital-miu": { lat: 51.822, lng: -3.017, city: "Abergavenny" },
  "the-grange-university-hospital": { lat: 51.636, lng: -3.026, city: "Llanfrechfa" },
  "glangwili-general-hospital": { lat: 51.864, lng: -4.306, city: "Carmarthen" },
  "withybush-general-hospital": { lat: 51.811, lng: -4.963, city: "Haverfordwest" },
  "prince-philip-hospital-miu": { lat: 51.679, lng: -4.174, city: "Llanelli" },
};
