"use client";

import { useState } from "react";
import { formatWaitTime } from "@/lib/utils";
import { TimeAgo, parseDbTimestamp } from "@/components/TimeAgo";
import type { WaitReading } from "@/lib/data/hospitals";

// Fixed to UK wall-clock time so the prerendered HTML and every visitor's
// browser agree, wherever the build ran or the reader lives.
function ukClockTime(dateStr: string): string {
  return parseDbTimestamp(dateStr).toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });
}

export function HospitalHistory({
  readings,
  hospitalName,
}: {
  readings: WaitReading[];
  hospitalName: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleReadings = showAll ? readings : readings.slice(0, 12);

  const maxWait = Math.max(
    1,
    ...readings.map((r) => r.wait_minutes ?? 0)
  );

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6">
      <h2 className="text-lg font-extrabold text-stone-900 mb-1">
        The last 24 hours at {hospitalName}
      </h2>
      <p className="text-xs text-stone-400 mb-5">
        Every reading we&apos;ve collected, newest first. The bar shows each
        reading relative to the day&apos;s peak.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-stone-200">
              <th className="pb-2 text-left text-[11px] font-extrabold text-stone-500 uppercase tracking-widest">
                Collected
              </th>
              <th className="pb-2 text-left text-[11px] font-extrabold text-stone-500 uppercase tracking-widest w-[30%]">
                Trend
              </th>
              <th className="pb-2 text-right text-[11px] font-extrabold text-stone-500 uppercase tracking-widest">
                Wait
              </th>
              <th className="pb-2 text-right text-[11px] font-extrabold text-stone-500 uppercase tracking-widest">
                Shift
              </th>
              <th className="pb-2 text-right text-[11px] font-extrabold text-stone-500 uppercase tracking-widest">
                Queue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {visibleReadings.map((r, i) => {
              const prev = i + 1 < readings.length ? readings[i + 1] : null;
              const change =
                r.wait_minutes !== null &&
                prev?.wait_minutes !== null &&
                prev?.wait_minutes !== undefined
                  ? r.wait_minutes - prev.wait_minutes
                  : null;

              return (
                <tr key={r.id}>
                  <td className="py-2.5 text-stone-600 whitespace-nowrap">
                    <span className="font-semibold">
                      <TimeAgo timestamp={r.scraped_at} />
                    </span>
                    <span className="text-stone-400 text-xs ml-1.5">
                      {ukClockTime(r.scraped_at)}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3">
                    {r.wait_minutes !== null && (
                      <div className="h-2 rounded-full bg-stone-100 overflow-hidden min-w-[60px]">
                        <div
                          className={`h-full rounded-full ${
                            r.wait_minutes < 120
                              ? "bg-emerald-400"
                              : r.wait_minutes < 240
                                ? "bg-amber-400"
                                : "bg-rose-400"
                          }`}
                          style={{
                            width: `${Math.max(4, Math.round((r.wait_minutes / maxWait) * 100))}%`,
                          }}
                        />
                      </div>
                    )}
                  </td>
                  <td className="py-2.5 text-right font-bold text-stone-900 whitespace-nowrap">
                    {r.wait_minutes !== null ? formatWaitTime(r.wait_minutes) : "—"}
                  </td>
                  <td className="py-2.5 text-right whitespace-nowrap">
                    {change !== null && change !== 0 ? (
                      <span
                        className={`text-xs font-bold ${
                          change < 0 ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {change > 0 ? "▲" : "▼"} {Math.abs(change)}m
                      </span>
                    ) : (
                      <span className="text-xs text-stone-300">—</span>
                    )}
                  </td>
                  <td className="py-2.5 text-right text-stone-600">
                    {r.patients_waiting ?? r.total_patients ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {readings.length > 12 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-sm font-bold text-teal-700 hover:underline"
        >
          {showAll
            ? "Collapse the list"
            : `Show all ${readings.length} readings`}
        </button>
      )}
    </div>
  );
}
