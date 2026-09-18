import { runAllScrapers } from "../src/lib/scrapers";
import { getDb } from "../src/lib/db";
import fs from "fs";
import path from "path";

async function main() {
  console.log(`[${new Date().toISOString()}] Starting scrape…`);

  const db = getDb();
  const hospitalCount = (db.prepare("SELECT COUNT(*) as c FROM hospitals").get() as { c: number }).c;
  if (hospitalCount === 0) {
    const seedPath = path.join(process.cwd(), "data", "seed.sql");
    if (fs.existsSync(seedPath)) {
      console.log("  Seeding database with hospital data…");
      const seed = fs.readFileSync(seedPath, "utf-8");
      db.exec(seed);
      const seeded = (db.prepare("SELECT COUNT(*) as c FROM hospitals").get() as { c: number }).c;
      console.log(`  Seeded ${seeded} hospitals`);
    }
  }

  // Remove hospitals that are no longer valid A&E/UTC/MIU departments. The live DB
  // persists across runs (via cache), so retiring an entry from the seed is not enough —
  // we must delete any already-seeded row and its readings here.
  const RETIRED_SLUGS = [
    "sandwell-general-hospital", // A&E closed 2024; replaced by Midland Metropolitan University Hospital
    "princess-alexandra-hospital-sdec", // SDEC has no published live wait; produced bogus readings
  ];
  for (const slug of RETIRED_SLUGS) {
    const row = db.prepare("SELECT id FROM hospitals WHERE slug = ?").get(slug) as { id: string } | undefined;
    if (row) {
      db.prepare("DELETE FROM wait_readings WHERE hospital_id = ?").run(row.id);
      db.prepare("DELETE FROM hospitals WHERE id = ?").run(row.id);
      console.log(`  Retired obsolete hospital: ${slug}`);
    }
  }

  // One-off data corrections for rows already persisted in the live DB.
  const CORRECTIONS: { slug: string; column: "city" | "region" | "lat" | "lng"; value: string | number }[] = [
    { slug: "herne-bay-utc", column: "city", value: "Herne Bay" }, // city was missing
    { slug: "tunbridge-wells-hospital", column: "region", value: "Kent" }, // was "South East", inconsistent with other Kent units
    // Queen Victoria Memorial Hospital, King Edward Avenue, Herne Bay CT6 6EB —
    // without coordinates the unit is invisible to near-me and nearby lists.
    { slug: "herne-bay-utc", column: "lat", value: 51.3688 },
    { slug: "herne-bay-utc", column: "lng", value: 1.1315 },
  ];
  for (const c of CORRECTIONS) {
    const res = db
      .prepare(`UPDATE hospitals SET ${c.column} = ?, updated_at = datetime('now') WHERE slug = ? AND (${c.column} IS NULL OR ${c.column} != ?)`)
      .run(c.value, c.slug, c.value);
    if (res.changes > 0) console.log(`  Corrected ${c.slug}.${c.column} → ${c.value}`);
  }

  const results = await runAllScrapers();

  let totalUpdated = 0;
  let totalErrors = 0;

  for (const r of results) {
    const status = r.success ? "✓" : "✗";
    console.log(`  ${status} ${r.source}: ${r.hospitalsUpdated} updated`);
    if (r.errors.length > 0) {
      for (const e of r.errors) console.error(`    Error: ${e}`);
    }
    totalUpdated += r.hospitalsUpdated;
    totalErrors += r.errors.length;
  }

  // Prune readings older than 7 days to keep DB size manageable
  const pruned = db
    .prepare("DELETE FROM wait_readings WHERE scraped_at < datetime('now', '-7 days')")
    .run();
  console.log(`  Pruned ${pruned.changes} old readings`);

  console.log(
    `[${new Date().toISOString()}] Done — ${totalUpdated} hospitals updated, ${totalErrors} errors`
  );

  // Checkpoint the WAL into the main DB file and close cleanly. Without this,
  // this run's inserts live only in aewaittime.db-wal — and CI caches just
  // aewaittime.db, silently losing every reading and breaking 24h history.
  db.pragma("wal_checkpoint(TRUNCATE)");
  db.close();

  const allFailed = results.every((r) => !r.success);
  process.exit(allFailed ? 1 : 0);
}

main();
