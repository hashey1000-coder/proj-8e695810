import { getDb } from "../db";
import { getTypicalWaitForTrust } from "../nhs-england-stats";

export interface TypicalWait {
  avgWaitMinutes: number;
  pctWithin4h: number;
  period: string;
}

/**
 * Canonical form of a trust name for matching: official statistics and our
 * own records disagree on the leading "The" (e.g. "The Newcastle upon Tyne
 * Hospitals…" vs "Newcastle upon Tyne Hospitals…") and on casing/spacing, so
 * normalise before comparing instead of demanding a byte-exact match.
 */
function normalizeTrustName(name: string): string {
  return name
    .toLowerCase()
    .replace(/^the\s+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Best available "typical wait" estimate for a hospital without a live
 * feed: a hospital-level figure (Scotland, PHS weekly data) beats a
 * trust-level one (England, NHS England monthly SitRep); the hardcoded
 * snapshot in nhs-england-stats.ts remains as a fallback for a fresh
 * database that hasn't run the official-stats refresh yet.
 */
export function getTypicalWait(
  hospitalSlug: string,
  trustName: string | undefined
): TypicalWait | null {
  const db = getDb();
  const read = (keyType: string, key: string) =>
    db
      .prepare(
        "SELECT avg_wait_minutes, pct_within_4h, period FROM typical_waits WHERE key_type = ? AND key = ?"
      )
      .get(keyType, key) as
      | { avg_wait_minutes: number; pct_within_4h: number; period: string }
      | undefined;

  const byHospital = read("hospital", hospitalSlug);
  if (byHospital) {
    return {
      avgWaitMinutes: byHospital.avg_wait_minutes,
      pctWithin4h: byHospital.pct_within_4h,
      period: byHospital.period,
    };
  }
  if (trustName) {
    const byTrust = read("trust", trustName);
    if (byTrust) {
      return {
        avgWaitMinutes: byTrust.avg_wait_minutes,
        pctWithin4h: byTrust.pct_within_4h,
        period: byTrust.period,
      };
    }
    // Fall back to a normalised match so a leading "The" or odd spacing in
    // either source doesn't cost a department its estimate.
    const target = normalizeTrustName(trustName);
    const all = db
      .prepare(
        "SELECT key, avg_wait_minutes, pct_within_4h, period FROM typical_waits WHERE key_type = 'trust'"
      )
      .all() as { key: string; avg_wait_minutes: number; pct_within_4h: number; period: string }[];
    const match = all.find((row) => normalizeTrustName(row.key) === target);
    if (match) {
      return {
        avgWaitMinutes: match.avg_wait_minutes,
        pctWithin4h: match.pct_within_4h,
        period: match.period,
      };
    }
    return getTypicalWaitForTrust(trustName);
  }
  return null;
}
