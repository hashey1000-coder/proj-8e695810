import type { TrendPoint } from "@/lib/data/history";
import { formatWaitTime } from "@/lib/utils";

/**
 * Compact inline-SVG line chart of daily average wait. Pure presentational,
 * static-export safe, no client JS. Scales to its container via viewBox.
 */
export function TrendChart({
  points,
  height = 160,
}: {
  points: TrendPoint[];
  height?: number;
}) {
  if (points.length < 2) {
    return (
      <p className="text-sm text-stone-400 py-8 text-center">
        Not enough history yet to chart a trend — check back in a few days.
      </p>
    );
  }

  const W = 720;
  const H = height;
  const padL = 44;
  const padR = 12;
  const padT = 12;
  const padB = 26;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const waits = points.map((p) => p.avgWait);
  const rawMax = Math.max(...waits);
  const rawMin = Math.min(...waits);
  // Pad the range a little and anchor sensibly.
  const yMax = Math.ceil((rawMax * 1.1) / 30) * 30 || 30;
  const yMin = Math.max(0, Math.floor((rawMin * 0.9) / 30) * 30);
  const ySpan = yMax - yMin || 1;

  const x = (i: number) => padL + (i / (points.length - 1)) * innerW;
  const y = (v: number) => padT + (1 - (v - yMin) / ySpan) * innerH;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.avgWait).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${x(points.length - 1).toFixed(1)},${padT + innerH} L${x(0).toFixed(1)},${padT + innerH} Z`;

  const gridVals = [yMin, yMin + ySpan / 2, yMax];
  const last = points[points.length - 1];

  const fmtDate = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label={`Daily average A&E wait from ${fmtDate(points[0].date)} to ${fmtDate(last.date)}, latest ${formatWaitTime(last.avgWait)}`}
    >
      {gridVals.map((v, i) => (
        <g key={i}>
          <line
            x1={padL}
            x2={W - padR}
            y1={y(v)}
            y2={y(v)}
            stroke="currentColor"
            className="text-stone-200"
            strokeWidth={1}
          />
          <text
            x={padL - 8}
            y={y(v) + 3}
            textAnchor="end"
            className="fill-stone-400"
            fontSize={11}
            fontWeight={600}
          >
            {Math.round(v)}
          </text>
        </g>
      ))}

      <path d={areaPath} className="fill-teal-500/10" />
      <path
        d={linePath}
        fill="none"
        className="text-teal-600"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={x(points.length - 1)} cy={y(last.avgWait)} r={4} className="fill-teal-600" />

      <text x={padL} y={H - 8} textAnchor="start" className="fill-stone-400" fontSize={11} fontWeight={600}>
        {fmtDate(points[0].date)}
      </text>
      <text x={W - padR} y={H - 8} textAnchor="end" className="fill-stone-400" fontSize={11} fontWeight={600}>
        {fmtDate(last.date)}
      </text>
    </svg>
  );
}
