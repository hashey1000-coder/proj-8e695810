"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { HospitalWithWait } from "@/lib/data/hospitals";
import {
  formatWaitTime,
  waitSeverity,
  severityLabel,
  severityPill,
} from "@/lib/utils";

export function HospitalsTable({
  hospitals,
  nationalAvg,
}: {
  hospitals: HospitalWithWait[];
  nationalAvg: number;
}) {
  // Seeded from ?q= so the homepage search hands its query through
  // (requires the page to wrap this component in <Suspense>).
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  const normalize = (s: string) => s.toLowerCase().replace(/['']/g, "");

  const { filtered, sorted } = useMemo(() => {
    const f = query
      ? hospitals.filter(
          (h) =>
            normalize(h.name).includes(normalize(query)) ||
            (h.city && normalize(h.city).includes(normalize(query))) ||
            (h.region && normalize(h.region).includes(normalize(query)))
        )
      : hospitals;

    const s = [...f].sort((a, b) => {
      if (a.wait_minutes === null && b.wait_minutes === null) return 0;
      if (a.wait_minutes === null) return 1;
      if (b.wait_minutes === null) return -1;
      return a.wait_minutes - b.wait_minutes;
    });

    return { filtered: f, sorted: s };
  }, [hospitals, query]);

  return (
    <>
      <div className="mb-8">
        <nav className="text-xs font-semibold text-stone-400 mb-4 uppercase tracking-wide">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          Live waits
        </nav>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Every Tracked A&amp;E, Ranked by Wait
        </h1>
        <p className="mt-2 text-stone-500">
          All {hospitals.length} departments on our watchlist, quickest first.
          Type below to narrow the list.
        </p>

        <div className="mt-5 max-w-md relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          {/* suppressHydrationWarning: autofill browser extensions inject
              data-* attributes into inputs before React hydrates, which
              otherwise fails hydration and kills interactivity site-wide */}
          <input
            type="text"
            suppressHydrationWarning
            aria-label="Filter departments by hospital, town or region"
            placeholder="Narrow by hospital, town or region…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
          {query && (
            <p className="mt-2 text-sm text-stone-500">
              {filtered.length} match{filtered.length !== 1 ? "es" : ""} for
              &ldquo;{query}&rdquo;
              <button
                onClick={() => setQuery("")}
                className="ml-2 font-bold text-teal-700 hover:underline"
              >
                reset
              </button>
            </p>
          )}
        </div>
      </div>

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
              {sorted.map((hospital) => {
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
    </>
  );
}
