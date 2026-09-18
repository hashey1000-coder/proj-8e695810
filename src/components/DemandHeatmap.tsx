"use client";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

// Relative demand (0–100) by day and hour, derived from national
// attendance patterns: overnight lull, 6–9am trough (the site's copy and
// the timing guide both point readers at that window), morning climb
// peaking hardest on Mondays, evening plateau from 6pm, Fri/Sat-night spike.
const DEMAND_DATA: Record<string, number[]> = {
  Mon: [45, 45, 45, 45, 30, 30, 15, 15, 15, 70, 88, 88, 60, 55, 55, 55, 55, 60, 75, 75, 75, 75, 70, 60],
  Tue: [45, 45, 45, 45, 30, 30, 15, 15, 15, 55, 68, 68, 55, 55, 55, 55, 55, 60, 75, 75, 75, 75, 70, 60],
  Wed: [45, 45, 45, 45, 30, 30, 15, 15, 15, 55, 68, 68, 55, 55, 55, 55, 55, 60, 75, 75, 75, 75, 70, 60],
  Thu: [45, 45, 45, 45, 30, 30, 15, 15, 15, 55, 68, 68, 55, 55, 55, 55, 55, 60, 75, 75, 75, 75, 70, 60],
  Fri: [45, 45, 45, 45, 30, 30, 15, 15, 15, 55, 68, 68, 55, 55, 55, 55, 55, 60, 75, 95, 95, 95, 95, 95],
  Sat: [60, 60, 50, 45, 30, 30, 15, 15, 15, 55, 68, 68, 55, 55, 55, 55, 55, 60, 75, 95, 95, 95, 95, 95],
  Sun: [60, 60, 50, 45, 30, 30, 15, 15, 15, 55, 68, 68, 55, 55, 55, 55, 55, 60, 75, 75, 75, 75, 70, 60],
};

// Teal-to-rose scale: cool = calm, warm = crowded.
function demandColor(value: number): string {
  if (value <= 20) return "bg-teal-500/90";
  if (value <= 40) return "bg-teal-300";
  if (value <= 55) return "bg-stone-200";
  if (value <= 70) return "bg-orange-200";
  if (value <= 85) return "bg-orange-400";
  return "bg-rose-500";
}

export function DemandHeatmap() {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      {/* Screen-reader alternative to the visual grid */}
      <p className="sr-only">
        Typical weekly A&amp;E demand pattern: departments are calmest between
        6am and 9am every day, busiest on Monday mornings, on weekday evenings
        from 6pm, and especially on Friday and Saturday nights.
      </p>
      <div className="min-w-[640px]">
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: "44px repeat(24, 1fr)" }}>
          {[
            <div key="corner" />,
            ...HOURS.map((h) => (
              <div key={`h-${h}`} className="text-[10px] font-semibold text-stone-400 text-center pb-1">
                {h % 6 === 0 ? h : ""}
              </div>
            )),
            ...DAYS.flatMap((day) => [
              <div key={`label-${day}`} className="text-xs font-bold text-stone-600 flex items-center">
                {day}
              </div>,
              ...HOURS.map((hour) => {
                const value = DEMAND_DATA[day][hour];
                return (
                  <div
                    key={`${day}-${hour}`}
                    className={`aspect-square rounded-sm ${demandColor(value)} hover:ring-2 hover:ring-slate-900/60 cursor-default`}
                    title={`${day} ${hour}:00 — roughly ${value}% of peak demand`}
                  />
                );
              }),
            ]),
          ]}
        </div>

        <div className="flex items-center gap-3 mt-4 text-[11px] font-semibold text-stone-500">
          <span>Calm</span>
          <div className="flex gap-[3px]">
            <span className="w-5 h-3.5 rounded-sm bg-teal-500/90" />
            <span className="w-5 h-3.5 rounded-sm bg-teal-300" />
            <span className="w-5 h-3.5 rounded-sm bg-stone-200" />
            <span className="w-5 h-3.5 rounded-sm bg-orange-200" />
            <span className="w-5 h-3.5 rounded-sm bg-orange-400" />
            <span className="w-5 h-3.5 rounded-sm bg-rose-500" />
          </div>
          <span>Crowded</span>
          <span className="ml-auto font-normal text-stone-400">hour of day →</span>
        </div>
      </div>
    </div>
  );
}
