/**
 * Sanity bounds for scraped readings. A trust redesigning its page, or a
 * parser matching the wrong element, tends to produce values that are
 * impossible rather than merely wrong — a clock time read as minutes, a
 * percentage, a negative, a stray large integer. Rejecting those at the
 * insert boundary keeps a garbage number from ever reaching the site; a
 * genuinely long wait (up to a day) still gets through.
 */
export const MAX_WAIT_MINUTES = 24 * 60; // 24 hours
export const MAX_PATIENTS = 2000;

export interface ReadingLike {
  waitMinutes: number | null;
  patientsWaiting?: number | null;
  totalPatients?: number | null;
}

/** Returns { ok: true } for a plausible reading, or a reason it was rejected. */
export function validateReading(r: ReadingLike): { ok: boolean; reason?: string } {
  const w = r.waitMinutes;
  if (w !== null && w !== undefined) {
    if (!Number.isFinite(w) || !Number.isInteger(w) || w < 0 || w > MAX_WAIT_MINUTES) {
      return { ok: false, reason: `implausible wait: ${w}` };
    }
  }
  const p = r.patientsWaiting;
  if (p !== null && p !== undefined) {
    if (!Number.isFinite(p) || p < 0 || p > MAX_PATIENTS) {
      return { ok: false, reason: `implausible patients waiting: ${p}` };
    }
  }
  const t = r.totalPatients;
  if (t !== null && t !== undefined) {
    if (!Number.isFinite(t) || t < 0 || t > MAX_PATIENTS) {
      return { ok: false, reason: `implausible total patients: ${t}` };
    }
  }
  return { ok: true };
}
