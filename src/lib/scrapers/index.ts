import { scrapeNorthernIreland } from "./northern-ireland";
import { scrapeSource } from "./generic";
import { SOURCES } from "./sources";

export interface ScrapeResult {
  source: string;
  success: boolean;
  hospitalsUpdated: number;
  errors: string[];
}

export async function runAllScrapers(): Promise<ScrapeResult[]> {
  const results: ScrapeResult[] = [];

  // Wales no longer has a live feed (aeinfo.nhs.wales was decommissioned).
  // Welsh departments now get a monthly "estimated wait" from StatsWales via
  // refreshWalesMonthly in official-stats.ts, so there's no live scraper here.

  const niResult = await scrapeNorthernIreland();
  results.push({ source: "HSC Northern Ireland", ...niResult });

  for (const source of SOURCES) {
    try {
      const result = await scrapeSource(source);
      results.push({ source: source.name, ...result });
    } catch (err) {
      results.push({
        source: source.name,
        success: false,
        hospitalsUpdated: 0,
        errors: [err instanceof Error ? err.message : String(err)],
      });
    }
  }

  return results;
}
