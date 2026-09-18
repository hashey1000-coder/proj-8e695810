import * as cheerio from "cheerio";
import { SOURCES } from "../src/lib/scrapers/sources";
import {
  parseJson,
  parsePlainText,
  parseHtmlTable,
  parseHtmlEmbedded,
  parseGeneric,
} from "../src/lib/scrapers/generic";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function fmt(mins: number | null): string {
  if (mins === null) return "null";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${mins}min (${h}h${m ? " " + m + "m" : ""})`;
}

async function main() {
  for (const config of SOURCES) {
    console.log("\n" + "=".repeat(80));
    console.log(`SOURCE: ${config.name}`);
    console.log(`URL: ${config.sourceUrl}`);
    console.log(`TYPE: ${config.sourceType}`);
    console.log("-".repeat(80));

    let body: string;
    try {
      const res = await fetch(config.sourceUrl, { headers: { "User-Agent": UA } });
      if (!res.ok) {
        console.log(`  ✗ HTTP ${res.status} ${res.statusText}`);
        continue;
      }
      body = await res.text();
    } catch (err) {
      console.log(`  ✗ FETCH FAILED: ${err instanceof Error ? err.message : String(err)}`);
      continue;
    }

    let parsed;
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
      default:
        parsed = parseGeneric(body, config);
        break;
    }

    // Print raw text extract for context (body stripped of tags, wait-related lines)
    const $ = cheerio.load(body);
    const rawText = $("body").text().replace(/\s+/g, " ").trim();

    console.log(`  PARSED ${parsed.length}/${config.hospitals.length} hospitals:`);
    for (const p of parsed) {
      console.log(`    • ${p.hospitalName}: wait=${fmt(p.waitMinutes)}  patients=${p.patientsWaiting ?? "-"}  total=${p.totalPatients ?? "-"}`);
    }

    const notParsed = config.hospitals.filter((h) => !parsed.find((p) => p.hospitalSlug === h.slug));
    if (notParsed.length > 0) {
      console.log(`  NOT PARSED: ${notParsed.map((h) => h.siteKey).join(", ")}`);
    }

    // For JSON sources, dump raw JSON
    if (config.sourceType === "json") {
      console.log(`  RAW JSON: ${body.slice(0, 600)}`);
    } else {
      // Show context around each hospital's siteKey in raw text
      for (const h of config.hospitals) {
        const idx = rawText.toLowerCase().indexOf(h.siteKey.toLowerCase());
        if (idx >= 0) {
          const ctx = rawText.slice(idx, idx + 180).replace(/\s+/g, " ");
          console.log(`  RAW[${h.siteKey}]: …${ctx}…`);
        }
      }
    }
  }

  // Wales
  console.log("\n" + "=".repeat(80));
  console.log("SOURCE: NHS Wales (aeinfo.nhs.wales)");
  try {
    const res = await fetch("https://aeinfo.nhs.wales/", {
      headers: { "User-Agent": "AEWaitTimes/1.0 (+https://aewaittimes.co.uk)" },
    });
    console.log(`  HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const txt = $("body").text().replace(/\s+/g, " ").trim();
    console.log(`  BODY EXTRACT: ${txt.slice(0, 400)}`);
  } catch (err) {
    console.log(`  ✗ ${err instanceof Error ? err.message : String(err)}`);
  }

  // Northern Ireland
  console.log("\n" + "=".repeat(80));
  console.log("SOURCE: HSC Northern Ireland (nidirect)");
  try {
    const res = await fetch(
      "https://www.nidirect.gov.uk/articles/emergency-department-waiting-times",
      { headers: { "User-Agent": "AEWaitTimes/1.0 (+https://aewaittimes.co.uk)" } }
    );
    console.log(`  HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    $("table").each((ti, table) => {
      console.log(`  --- TABLE ${ti} ---`);
      $(table).find("tr").each((ri, row) => {
        if (ri > 20) return;
        const cells = $(row).find("td, th").map((_j, c) => $(c).text().trim().replace(/\s+/g, " ")).get();
        if (cells.length) console.log(`    ${cells.join(" | ")}`);
      });
    });
  } catch (err) {
    console.log(`  ✗ ${err instanceof Error ? err.message : String(err)}`);
  }
}

main();
