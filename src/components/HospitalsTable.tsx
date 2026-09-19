"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { HospitalWithWait } from "@/lib/data/hospitals";
import { HospitalsTableView, sortByWait } from "@/components/HospitalsTableView";

/**
 * Interactive filter + table. The page-level heading and intro live in the
 * server component (hospitals/page.tsx) so crawlers always see them; this
 * client part handles the ?q= seed and live filtering only.
 */
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

    return { filtered: f, sorted: sortByWait(f) };
  }, [hospitals, query]);

  return (
    <>
      <div className="mb-8 mt-5 max-w-md relative">
        <svg
          className="absolute left-3.5 top-[21px] -translate-y-1/2 w-4 h-4 text-stone-400"
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

      <HospitalsTableView hospitals={sorted} nationalAvg={nationalAvg} />
    </>
  );
}
