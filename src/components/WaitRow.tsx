import Link from "next/link";
import {
  formatWaitTime,
  waitSeverity,
  severityLabel,
  severityPill,
} from "@/lib/utils";
import type { HospitalWithWait } from "@/lib/data/hospitals";

/**
 * Compact ranked row used in leaderboard-style lists (homepage, statistics).
 */
export function WaitRow({
  hospital,
  rank,
  showRegion = true,
}: {
  hospital: HospitalWithWait;
  rank?: number;
  showRegion?: boolean;
}) {
  const severity = waitSeverity(hospital.wait_minutes);

  return (
    <Link
      href={`/hospitals/${hospital.slug}`}
      className="group flex items-center gap-3 px-4 py-3.5 bg-white hover:bg-teal-50/40 border-b border-stone-100 last:border-0 transition-colors"
    >
      {rank !== undefined && (
        <span className="w-6 text-sm font-extrabold text-stone-300 group-hover:text-teal-600 transition-colors">
          {rank}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-stone-900 truncate group-hover:text-teal-700 transition-colors">
          {hospital.name}
        </p>
        <p className="text-xs text-stone-500 truncate">
          {hospital.city}
          {showRegion && hospital.region && hospital.region !== hospital.city
            ? ` · ${hospital.region}`
            : ""}
          {hospital.type !== "AE" ? ` · ${hospital.type}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        {hospital.wait_minutes !== null ? (
          <>
            <span className="text-right">
              <span className="block text-base font-extrabold text-stone-900 leading-none">
                {formatWaitTime(hospital.wait_minutes)}
              </span>
              {hospital.patients_waiting !== null && (
                <span className="block text-[10px] text-stone-400 mt-0.5">
                  {hospital.patients_waiting} waiting
                </span>
              )}
            </span>
            <span
              className={`px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide ${severityPill(severity)}`}
            >
              {severityLabel(severity)}
            </span>
          </>
        ) : (
          <span className="text-right">
            <span className="block text-xs text-stone-400">no live feed</span>
            {hospital.avg_wait !== null && (
              <span className="block text-[10px] text-stone-400 mt-0.5">
                usual ~{hospital.avg_wait} min
              </span>
            )}
          </span>
        )}
      </div>
    </Link>
  );
}
