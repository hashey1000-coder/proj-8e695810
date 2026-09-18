import * as cheerio from "cheerio";
import { getDb } from "../db";
import { generateId, slugify } from "../utils";

const SOURCE_URL =
  "https://www.nidirect.gov.uk/articles/emergency-department-waiting-times";
const TRUST_NAME = "HSC Northern Ireland";

export async function scrapeNorthernIreland(): Promise<{
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
        errors: [`HTTP ${response.status} from ${SOURCE_URL}`],
      };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const db = getDb();
    const trustSlug = slugify(TRUST_NAME);
    let trustId: string;

    const existingTrust = db
      .prepare("SELECT id FROM trusts WHERE slug = ?")
      .get(trustSlug) as { id: string } | undefined;

    if (existingTrust) {
      trustId = existingTrust.id;
    } else {
      trustId = generateId();
      db.prepare(
        "INSERT INTO trusts (id, name, slug, source_url, country) VALUES (?, ?, ?, ?, ?)"
      ).run(trustId, TRUST_NAME, trustSlug, SOURCE_URL, "Northern Ireland");
    }

    $("table").each((_tableIdx, table) => {
      $(table)
        .find("tr")
        .each((_rowIdx, row) => {
          if (_rowIdx === 0) return;
          const cells = $(row).find("td");
          if (cells.length < 2) return;

          const rawName = $(cells[0]).text().trim();
          if (!rawName || rawName.length < 3) return;
          const name = rawName
            .replace(/PHONE\s+FIRST.*$/i, "")
            .replace(/;\s*Minor\s+Injur.*/i, "")
            .replace(/Urgent\s+Care\s+(?:and\s+Treatment\s+)?Centre.*/i, "")
            .replace(/Minor\s+Injury\s+Unit.*/i, "")
            .replace(/Emergency\s+Department\s*$/i, "")
            .replace(/\d{3,}[\s\d]*/g, "")
            .replace(/\s+/g, " ")
            .trim();

          const waitCol = cells.length > 2 ? 2 : 1;
          const waitText = $(cells[waitCol]).text().trim();
          const waitMinutes = parseWait(waitText);

          // Column 2 publishes the real opening hours (e.g. "Open Mon-Fri
          // 9.00 am-5.00 pm") — capture them instead of assuming 24/7.
          const hoursText =
            cells.length > 2
              ? $(cells[1]).text().trim().replace(/\s+/g, " ").slice(0, 120)
              : "";

          const patientsText =
            cells.length > 3 ? $(cells[3]).text().trim() : "";
          const patientsWaiting = parseInt(patientsText) || null;

          if (rawName.toLowerCase().includes("hospital") || rawName.toLowerCase().includes("ucc")) {
            const slug = slugify(name);
            const coords = NI_COORDS[slug] || {};

            const existingHospital = db
              .prepare("SELECT id FROM hospitals WHERE slug = ?")
              .get(slug) as { id: string } | undefined;

            let hospitalId: string;
            if (existingHospital) {
              hospitalId = existingHospital.id;
            } else {
              hospitalId = generateId();
              const rawLower = rawName.toLowerCase();
              const type = rawLower.includes("ucc") || rawLower.includes("urgent care centre")
                ? "UTC"
                : rawLower.includes("miu") || rawLower.includes("minor injury")
                  ? "MIU"
                  : "AE";
              db.prepare(
                `INSERT INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
              ).run(
                hospitalId, name, slug, type, "Northern Ireland",
                "Northern Ireland", trustId,
                coords.lat || null, coords.lng || null,
                coords.city || null, hoursText || null
              );
            }

            // Keep opening hours in sync with the source on every run
            if (hoursText) {
              db.prepare(
                "UPDATE hospitals SET opening_hours = ?, updated_at = datetime('now') WHERE id = ? AND (opening_hours IS NULL OR opening_hours != ?)"
              ).run(hoursText, hospitalId, hoursText);
            }

            db.prepare(
              `INSERT INTO wait_readings (id, hospital_id, wait_minutes, patients_waiting, source_timestamp, freshness)
               VALUES (?, ?, ?, ?, datetime('now'), 'live')`
            ).run(generateId(), hospitalId, waitMinutes, patientsWaiting);

            hospitalsUpdated++;
          }
        });
    });
  } catch (err) {
    errors.push(err instanceof Error ? err.message : String(err));
  }

  return { success: errors.length === 0, hospitalsUpdated, errors };
}

function parseWait(text: string): number | null {
  if (!text) return null;
  const hourMin = text.match(/(\d+)\s*(?:h|hr|hour).*?(\d+)\s*(?:m|min)/i);
  if (hourMin) return parseInt(hourMin[1]) * 60 + parseInt(hourMin[2]);

  const hoursOnly = text.match(/(\d+)\s*(?:h|hr|hour)/i);
  if (hoursOnly) return parseInt(hoursOnly[1]) * 60;

  const minsOnly = text.match(/(\d+)\s*(?:m|min)/i);
  if (minsOnly) return parseInt(minsOnly[1]);

  const num = parseInt(text.replace(/[^\d]/g, ""));
  if (!isNaN(num) && num > 0 && num < 1440) return num;

  return null;
}

const NI_COORDS: Record<string, { lat?: number; lng?: number; city?: string }> = {
  "royal-victoria-hospital": { lat: 54.594, lng: -5.956, city: "Belfast" },
  "ulster-hospital": { lat: 54.577, lng: -5.836, city: "Dundonald" },
  "mater-hospital": { lat: 54.607, lng: -5.940, city: "Belfast" },
  "royal-children-s-hospital": { lat: 54.594, lng: -5.957, city: "Belfast" },
  "antrim-area-hospital": { lat: 54.728, lng: -6.229, city: "Antrim" },
  "craigavon-area-hospital": { lat: 54.444, lng: -6.393, city: "Craigavon" },
  "altnagelvin-area-hospital": { lat: 55.005, lng: -7.299, city: "Londonderry" },
  "daisy-hill-hospital": { lat: 54.181, lng: -6.344, city: "Newry" },
  "causeway-area-hospital": { lat: 55.136, lng: -6.681, city: "Coleraine" },
  "south-west-acute-hospital": { lat: 54.345, lng: -7.647, city: "Enniskillen" },
  "downe-hospital": { lat: 54.328, lng: -5.717, city: "Downpatrick" },
  "lagan-valley-hospital": { lat: 54.507, lng: -6.038, city: "Lisburn" },
  "mid-ulster-hospital": { lat: 54.755, lng: -6.609, city: "Magherafelt" },
  "south-tyrone-hospital": { lat: 54.506, lng: -6.770, city: "Dungannon" },
  "omagh-hospital-and-primary-care-complex": { lat: 54.598, lng: -7.305, city: "Omagh" },
};
