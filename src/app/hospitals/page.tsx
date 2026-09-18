import { Suspense } from "react";
import { getAllHospitalsWithWaits, getNationalStats } from "@/lib/data/hospitals";
import { HospitalsTable } from "@/components/HospitalsTable";
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
      {/* Suspense is required around useSearchParams() (reads ?q= from
          the homepage search) on a statically exported page. */}
      <Suspense fallback={null}>
        <HospitalsTable hospitals={hospitals} nationalAvg={nationalAvg} />
      </Suspense>
    </div>
  );
}
