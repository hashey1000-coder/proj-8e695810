/**
 * Refresh the committed Wales monthly snapshot (data/wales-monthly.json).
 *
 * The StatsWales source is a ~16 MB long-format CSV — too heavy to pull on
 * every 30-minute scrape — so the regular scrape reads this committed
 * snapshot. Run this when a new month is published (StatsWales updates around
 * the 3rd week of the month), then commit the JSON:
 *
 *   npm run refresh-wales && git commit -am "Refresh Wales monthly stats"
 *
 * Data: Digital Health and Care Wales, published via StatsWales under the
 * Open Government Licence.
 */
import fs from "fs";
import path from "path";
import { fetchWalesMonthly, WALES_SNAPSHOT_PATH } from "../src/lib/scrapers/official-stats";

async function main() {
  const snapshot = await fetchWalesMonthly();
  if (!snapshot) {
    console.error("Could not fetch StatsWales data — nothing written.");
    process.exit(1);
  }

  const file = path.join(process.cwd(), WALES_SNAPSHOT_PATH);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(
    `Wrote ${WALES_SNAPSHOT_PATH}: ${snapshot.period}, ${Object.keys(snapshot.hospitals).length} hospitals`
  );
}

main();
