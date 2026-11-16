import type { WeeklyPattern } from "@/lib/data/history";
import { DAY_LABELS } from "@/lib/data/history";
import { formatWaitTime, waitSeverity, severityLabel } from "@/lib/utils";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

// Teal-to-rose scale: cool = calm, warm = crowded. Matches the site's
// existing demand grid so the two read as one system.
function cellColor(relative: number | null): string {
  if (relative === null) return "bg-stone-100";
  if (relative <= 16) return "bg-teal-500/90";
  if (relative <= 33) return "bg-teal-300";
  if (relative <= 50) return "bg-stone-200";
  if (relative <= 67) return "bg-orange-200";
  if (relative <= 84) return "bg-orange-400";
  return "bg-rose-500";
}

function slot(day: number, hour: number): string {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const ap = hour < 12 ? "am" : "pm";
  return `${DAY_LABELS[day]} ${h}${ap}`;
}

/**
 * Data-driven weekly "best time to go" grid for a single department (or the
 * nation). Cells are coloured by this department's own calm→busy range, so
 * even a consistently busy A&E still shows *when* it eases off. Absolute
 * waits live in the tooltip and the callouts.
 */
export function WeeklyHeatmap({ pattern }: { pattern: WeeklyPattern }) {
  return (
    <div>
      {(pattern.quietest || pattern.busiest) && (
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {pattern.quietest && (
            <div className="flex-1 rounded-lg border-l-4 border-l-teal-600 bg-teal-50/60 px-4 py-3">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-teal-700">
                Calmest window
              </p>
              <p className="text-sm font-bold text-stone-900 mt-0.5">
                {slot(pattern.quietest.day, pattern.quietest.hour)}
              </p>
              <p className="text-xs text-stone-500">
                typically ~{formatWaitTime(pattern.quietest.avgWait)}
              </p>
            </div>
          )}
          {pattern.busiest && (
            <div className="flex-1 rounded-lg border-l-4 border-l-rose-500 bg-rose-50/60 px-4 py-3">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-rose-700">
                Busiest window
              </p>
              <p className="text-sm font-bold text-stone-900 mt-0.5">
                {slot(pattern.busiest.day, pattern.busiest.hour)}
              </p>
              <p className="text-xs text-stone-500">
                typically ~{formatWaitTime(pattern.busiest.avgWait)}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto -mx-4 px-4">
        <p className="sr-only">
          Average A&amp;E wait by day of the week and hour of the day, based on
          readings collected over the past weeks. Calmest around{" "}
          {pattern.quietest ? slot(pattern.quietest.day, pattern.quietest.hour) : "—"}, busiest around{" "}
          {pattern.busiest ? slot(pattern.busiest.day, pattern.busiest.hour) : "—"}.
        </p>
        <div className="min-w-[640px]">
          <div className="grid gap-[3px]" style={{ gridTemplateColumns: "44px repeat(24, 1fr)" }}>
            <div />
            {HOURS.map((h) => (
              <div key={`h-${h}`} className="text-[10px] font-semibold text-stone-400 text-center pb-1">
                {h % 6 === 0 ? h : ""}
              </div>
            ))}
            {DAY_LABELS.map((label, d) => [
              <div key={`l-${d}`} className="text-xs font-bold text-stone-600 flex items-center">
                {label}
              </div>,
              ...HOURS.map((h) => {
                const avg = pattern.grid[d][h];
                const rel = pattern.relative[d][h];
                const title =
                  avg === null
                    ? `${slot(d, h)} — no readings yet`
                    : `${slot(d, h)} — ~${formatWaitTime(avg)} (${severityLabel(waitSeverity(avg))})`;
                return (
                  <div
                    key={`${d}-${h}`}
                    className={`aspect-square rounded-sm ${cellColor(rel)} hover:ring-2 hover:ring-slate-900/60 cursor-default`}
                    title={title}
                  />
                );
              }),
            ])}
          </div>

          <div className="flex items-center gap-3 mt-4 text-[11px] font-semibold text-stone-500">
            <span>Calmer</span>
            <div className="flex gap-[3px]">
              <span className="w-5 h-3.5 rounded-sm bg-teal-500/90" />
              <span className="w-5 h-3.5 rounded-sm bg-teal-300" />
              <span className="w-5 h-3.5 rounded-sm bg-stone-200" />
              <span className="w-5 h-3.5 rounded-sm bg-orange-200" />
              <span className="w-5 h-3.5 rounded-sm bg-orange-400" />
              <span className="w-5 h-3.5 rounded-sm bg-rose-500" />
            </div>
            <span>Busier</span>
            <span className="ml-auto font-normal text-stone-400">hour of day →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
