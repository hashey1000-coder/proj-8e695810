import { Suspense } from "react";
import Link from "next/link";
import { getAllHospitalsWithWaits, getNationalStats } from "@/lib/data/hospitals";
import { HospitalsTable } from "@/components/HospitalsTable";
import { HospitalsTableView, sortByWait } from "@/components/HospitalsTableView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Tracked A&E Department, Ranked by Current Wait",
  description:
    "Every NHS department on our watchlist in one searchable list, ranked quickest first — live queue figures where trusts publish them, usual waits where they don't.",
  alternates: { canonical: "/hospitals/" },
};

export default function HospitalsPage() {
  const hospitals = getAllHospitalsWithWaits();
  const nationalAvg = getNationalStats().avgWait;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Heading and intro render server-side so crawlers and JS-off
          visitors always get the full page, not a Suspense fallback. */}
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

      {/* The fallback is the full server-rendered table, so the prerendered
          HTML carries every hospital link; the client swaps in the
          interactive filter (which reads ?q=) on hydration. */}
      <Suspense
        fallback={
          <div className="mt-5 mb-8">
            <HospitalsTableView
              hospitals={sortByWait(hospitals)}
              nationalAvg={nationalAvg}
            />
          </div>
        }
      >
        <HospitalsTable hospitals={hospitals} nationalAvg={nationalAvg} />
      </Suspense>
    </div>
  );
}
