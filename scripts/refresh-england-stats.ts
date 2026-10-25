/**
 * Refresh the committed England monthly snapshot (data/england-monthly.json).
 *
 * NHS England's edge refuses datacenter traffic, so the scheduled CI job
 * cannot fetch the monthly SitRep CSV itself. Run this from a normal
 * connection when a new month is published, then commit the JSON:
 *
 *   npm run refresh-stats && git commit -am "Refresh England monthly stats"
 *
 * The data is published under the Open Government Licence.
 */
import fs from "fs";
import path from "path";
import { fetchEnglandMonthly, ENGLAND_SNAPSHOT_PATH } from "../src/lib/scrapers/official-stats";

async function main() {
  const snapshot = await fetchEnglandMonthly();
  if (!snapshot) {
    console.error("Could not fetch NHS England monthly data — nothing written.");
    process.exit(1);
  }

  const file = path.join(process.cwd(), ENGLAND_SNAPSHOT_PATH);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(
    `Wrote ${ENGLAND_SNAPSHOT_PATH}: ${snapshot.period}, ${Object.keys(snapshot.trusts).length} trusts`
  );
}

main();
