import { getDb } from "../db";

/**
 * Historical aggregation over wait_readings — the shared foundation for the
 * weekly "best time to go" heatmap, trend charts, and records. Every reading
 * is stamped in UTC (scraped_at), so anything bucketed by hour-of-day or
 * day-of-week must be converted to UK wall-clock time first (GMT in winter,
 * BST in summer) or the pattern smears by an hour half the year.
 *
 * All functions run at build time against the local SQLite file. They degrade
 * gracefully: with little history banked they simply return sparse grids /
 * short series and an `sufficient` flag the UI uses to pick a fallback.
 */

// Monday-first, to match the DemandHeatmap day order the site already uses.
export const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Cached formatter: weekday + 24h hour in Europe/London.
const londonParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  weekday: "short",
  hour: "2-digit",
  hour12: false,
});

const DAY_INDEX: Record<string, number> = {
  Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
};

/** Parse a SQLite "YYYY-MM-DD HH:MM:SS" UTC timestamp into a Date. */
function parseUtc(ts: string): Date {
  // Space-separated SQLite form; treat as UTC.
  return new Date(ts.replace(" ", "T") + "Z");
}

/** Returns [dayIndex 0–6 (Mon–Sun), hour 0–23] in London local time. */
function londonDayHour(ts: string): [number, number] {
  const parts = londonParts.formatToParts(parseUtc(ts));
  let day = 0;
  let hour = 0;
  for (const p of parts) {
    if (p.type === "weekday") day = DAY_INDEX[p.value] ?? 0;
    else if (p.type === "hour") hour = parseInt(p.value, 10) % 24;
  }
  return [day, hour];
}

export interface WeeklyPattern {
  /** [day 0–6][hour 0–23] average wait in minutes, or null where no samples. */
  grid: (number | null)[][];
  /** [day 0–6][hour 0–23] number of readings behind each cell. */
  samples: number[][];
  /** [day 0–6][hour 0–23] relative crowding 0–100 (this hospital's own range). */
  relative: (number | null)[][];
  coverageDays: number;
  totalSamples: number;
  /** True once there is enough history for the grid to be meaningful. */
  sufficient: boolean;
  min: number | null;
  max: number | null;
  quietest: { day: number; hour: number; avgWait: number } | null;
  busiest: { day: number; hour: number; avgWait: number } | null;
}

// Two full weeks before we show a department's own pattern, so every weekday
// is represented (five consecutive days can't even cover all seven) and the
// grid isn't dominated by a handful of readings.
const MIN_DAYS = 14;
const MIN_SAMPLES = 200;
// A cell needs this many readings before it can be named the calmest/busiest
// window or stretch the colour scale — one lucky low reading shouldn't crown a
// "quietest time".
const MIN_CELL_SAMPLES = 4;

function emptyGrid<T>(fill: T): T[][] {
  return Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => fill));
}

/**
 * Average wait by day-of-week × hour-of-day over the last `days` days.
 * Pass a hospitalId for a single department, or omit for the national pattern.
 */
export function getWeeklyPattern(
  hospitalId?: string,
  days = 56
): WeeklyPattern {
  const db = getDb();
  const rows = (
    hospitalId
      ? db
          .prepare(
            `SELECT scraped_at, wait_minutes
             FROM wait_readings
             WHERE hospital_id = ?
               AND wait_minutes IS NOT NULL AND wait_minutes > 0
               AND scraped_at >= datetime('now', ?)
               AND scraped_at <= datetime('now')`
          )
          .all(hospitalId, `-${days} days`)
      : db
          .prepare(
            `SELECT scraped_at, wait_minutes
             FROM wait_readings
             WHERE wait_minutes IS NOT NULL AND wait_minutes > 0
               AND scraped_at >= datetime('now', ?)
               AND scraped_at <= datetime('now')`
          )
          .all(`-${days} days`)
  ) as { scraped_at: string; wait_minutes: number }[];

  const sums = emptyGrid(0);
  const counts = emptyGrid(0);
  const daySet = new Set<string>();

  for (const r of rows) {
    const [day, hour] = londonDayHour(r.scraped_at);
    sums[day][hour] += r.wait_minutes;
    counts[day][hour] += 1;
    daySet.add(r.scraped_at.slice(0, 10));
  }

  // Fill the average grid; only cells with enough readings count toward the
  // colour scale and the calmest/busiest headlines, so thin cells can't skew
  // the picture.
  const grid: (number | null)[][] = emptyGrid<number | null>(null);
  let gMin = Infinity;
  let gMax = -Infinity;
  let quietest: WeeklyPattern["quietest"] = null;
  let busiest: WeeklyPattern["busiest"] = null;

  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      if (counts[d][h] > 0) {
        const avg = Math.round(sums[d][h] / counts[d][h]);
        grid[d][h] = avg;
        if (counts[d][h] >= MIN_CELL_SAMPLES) {
          if (avg < gMin) {
            gMin = avg;
            quietest = { day: d, hour: h, avgWait: avg };
          }
          if (avg > gMax) {
            gMax = avg;
            busiest = { day: d, hour: h, avgWait: avg };
          }
        }
      }
    }
  }

  // Normalise against the well-sampled range, clamped so a sparse outlier cell
  // still renders within the legend instead of overflowing it.
  const span = gMax - gMin;
  const relative: (number | null)[][] = emptyGrid<number | null>(null);
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      const v = grid[d][h];
      if (v !== null && span > 0) {
        const pct = Math.round(((v - gMin) / span) * 100);
        relative[d][h] = Math.max(0, Math.min(100, pct));
      } else if (v !== null) {
        relative[d][h] = 50;
      }
    }
  }

  const totalSamples = rows.length;
  return {
    grid,
    samples: counts,
    relative,
    coverageDays: daySet.size,
    totalSamples,
    // Needs the time span, the volume, and at least one trustworthy cell.
    sufficient:
      daySet.size >= MIN_DAYS && totalSamples >= MIN_SAMPLES && quietest !== null,
    min: gMin === Infinity ? null : gMin,
    max: gMax === -Infinity ? null : gMax,
    quietest,
    busiest,
  };
}

export interface TrendPoint {
  /** London calendar date, YYYY-MM-DD. */
  date: string;
  avgWait: number;
  samples: number;
}

/**
 * Daily average wait over the last `days` days, in London calendar days.
 * Pass a hospitalId for one department, or omit for the national average.
 */
export function getDailyTrend(hospitalId?: string, days = 30): TrendPoint[] {
  const db = getDb();
  const rows = (
    hospitalId
      ? db
          .prepare(
            `SELECT scraped_at, wait_minutes
             FROM wait_readings
             WHERE hospital_id = ?
               AND wait_minutes IS NOT NULL AND wait_minutes > 0
               AND scraped_at >= datetime('now', ?)
               AND scraped_at <= datetime('now')`
          )
          .all(hospitalId, `-${days} days`)
      : db
          .prepare(
            `SELECT scraped_at, wait_minutes
             FROM wait_readings
             WHERE wait_minutes IS NOT NULL AND wait_minutes > 0
               AND scraped_at >= datetime('now', ?)
               AND scraped_at <= datetime('now')`
          )
          .all(`-${days} days`)
  ) as { scraped_at: string; wait_minutes: number }[];

  // Bucket by London calendar date.
  const londonDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const sums = new Map<string, number>();
  const counts = new Map<string, number>();
  for (const r of rows) {
    const key = londonDate.format(parseUtc(r.scraped_at)); // YYYY-MM-DD
    sums.set(key, (sums.get(key) ?? 0) + r.wait_minutes);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.keys()]
    .sort()
    .map((date) => ({
      date,
      avgWait: Math.round(sums.get(date)! / counts.get(date)!),
      samples: counts.get(date)!,
    }));
}

export interface TrendSummary {
  current: number | null;
  previous: number | null;
  deltaPct: number | null;
  points: TrendPoint[];
}

/**
 * National trend plus a "this week vs last week" comparison for the
 * statistics page. Compares the mean of the last 7 days to the 7 before.
 */
export function getNationalTrendSummary(days = 30): TrendSummary {
  const points = getDailyTrend(undefined, days);
  const mean = (arr: TrendPoint[]) =>
    arr.length
      ? Math.round(arr.reduce((a, p) => a + p.avgWait, 0) / arr.length)
      : null;
  const last7 = points.slice(-7);
  const prev7 = points.slice(-14, -7);
  const current = mean(last7);
  const previous = mean(prev7);
  const deltaPct =
    current !== null && previous !== null && previous > 0
      ? Math.round(((current - previous) / previous) * 100)
      : null;
  return { current, previous, deltaPct, points };
}

export interface Records {
  longestEver: { minutes: number; name: string; slug: string; when: string } | null;
  busiestEver: { patients: number; name: string; slug: string; when: string } | null;
  firstReading: string | null;
  totalReadings: number;
  coverageDays: number;
}

/** All-time extremes across the collected history, for the statistics page. */
export function getRecords(): Records {
  const db = getDb();

  const longest = db
    .prepare(
      `SELECT wr.wait_minutes AS minutes, wr.scraped_at AS when_ts, h.name, h.slug
       FROM wait_readings wr JOIN hospitals h ON h.id = wr.hospital_id
       WHERE wr.wait_minutes IS NOT NULL
       ORDER BY wr.wait_minutes DESC LIMIT 1`
    )
    .get() as { minutes: number; when_ts: string; name: string; slug: string } | undefined;

  const busiest = db
    .prepare(
      `SELECT wr.patients_waiting AS patients, wr.scraped_at AS when_ts, h.name, h.slug
       FROM wait_readings wr JOIN hospitals h ON h.id = wr.hospital_id
       WHERE wr.patients_waiting IS NOT NULL
       ORDER BY wr.patients_waiting DESC LIMIT 1`
    )
    .get() as { patients: number; when_ts: string; name: string; slug: string } | undefined;

  const meta = db
    .prepare(
      `SELECT MIN(scraped_at) AS first_ts, COUNT(*) AS total,
              COUNT(DISTINCT date(scraped_at)) AS days
       FROM wait_readings`
    )
    .get() as { first_ts: string | null; total: number; days: number };

  return {
    longestEver: longest
      ? { minutes: longest.minutes, name: longest.name, slug: longest.slug, when: longest.when_ts }
      : null,
    busiestEver: busiest
      ? { patients: busiest.patients, name: busiest.name, slug: busiest.slug, when: busiest.when_ts }
      : null,
    firstReading: meta.first_ts,
    totalReadings: meta.total,
    coverageDays: meta.days,
  };
}
