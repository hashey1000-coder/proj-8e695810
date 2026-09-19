import Link from "next/link";
import type { HospitalWithWait } from "@/lib/data/hospitals";
import {
  formatWaitTime,
  waitSeverity,
  severityLabel,
  severityPill,
} from "@/lib/utils";

/**
 * Quickest-first ordering shared by the interactive table and its
 * server-rendered Suspense fallback.
 */
export function sortByWait(hospitals: HospitalWithWait[]): HospitalWithWait[] {
  return [...hospitals].sort((a, b) => {
    if (a.wait_minutes === null && b.wait_minutes === null) return 0;
    if (a.wait_minutes === null) return 1;
    if (b.wait_minutes === null) return -1;
    return a.wait_minutes - b.wait_minutes;
  });
}

/**
 * Pure presentational table. No hooks or state, so it renders identically
 * from a server component (the prerendered fallback that crawlers see)
 * and from the interactive client wrapper.
 */
export function HospitalsTableView({
  hospitals,
  nationalAvg,
}: {
  hospitals: HospitalWithWait[];
  nationalAvg: number;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-stone-200 bg-stone-50">
              <th className="px-5 py-3 text-left text-[11px] font-extrabold text-stone-500 uppercase tracking-widest">
                Department
              </th>
              <th className="hidden sm:table-cell px-5 py-3 text-left text-[11px] font-extrabold text-stone-500 uppercase tracking-widest">
                Region
              </th>
              <th className="px-5 py-3 text-right text-[11px] font-extrabold text-stone-500 uppercase tracking-widest">
                Wait
              </th>
              <th className="hidden md:table-cell px-5 py-3 text-right text-[11px] font-extrabold text-stone-500 uppercase tracking-widest">
                In queue
              </th>
              <th className="px-5 py-3 text-right text-[11px] font-extrabold text-stone-500 uppercase tracking-widest">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {hospitals.map((hospital) => {
              const severity = waitSeverity(hospital.wait_minutes);
              return (
                <tr key={hospital.id} className="hover:bg-teal-50/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/hospitals/${hospital.slug}`}
                      className="text-sm font-bold text-stone-900 hover:text-teal-700"
                    >
                      {hospital.name}
                    </Link>
                    <p className="text-xs text-stone-500">
                      {hospital.city}
                      {hospital.type !== "AE" ? ` · ${hospital.type}` : ""}
                    </p>
                  </td>
                  <td className="hidden sm:table-cell px-5 py-3.5 text-sm text-stone-600">
                    {hospital.region}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {hospital.wait_minutes !== null ? (
                      <span className="text-sm font-extrabold text-stone-900 whitespace-nowrap">
                        {formatWaitTime(hospital.wait_minutes)}
                      </span>
                    ) : (
                      <span className="text-xs text-stone-400 whitespace-nowrap">
                        {hospital.avg_wait !== null
                          ? `usual ~${hospital.avg_wait} min`
                          : nationalAvg > 0
                            ? `nat. ~${nationalAvg} min`
                            : "—"}
                      </span>
                    )}
                  </td>
                  <td className="hidden md:table-cell px-5 py-3.5 text-right text-sm text-stone-600">
                    {hospital.patients_waiting ?? hospital.total_patients ?? "—"}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide ${severityPill(severity)}`}
                    >
                      {severityLabel(severity)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
