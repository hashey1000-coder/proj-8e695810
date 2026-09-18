import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllHospitalsWithWaits } from "@/lib/data/hospitals";
import { getTypicalWaitForTrust } from "@/lib/nhs-england-stats";
import { NearMeClient } from "@/components/NearMeClient";

export const metadata: Metadata = {
  title: "Which A&E Is Quickest Near Me? Distance vs Queue, Ranked",
  description:
    "Drop in a postcode or share your location once, and see the closest NHS emergency departments ranked by distance with each one's latest queue figure beside it.",
  alternates: { canonical: "/near-me/" },
};

export default function NearMePage() {
  const allHospitals = getAllHospitalsWithWaits();

  const hospitals = allHospitals
    .filter((h) => h.lat !== null && h.lng !== null)
    .map((h) => {
      const typical =
        h.wait_minutes === null && h.trust_name
          ? getTypicalWaitForTrust(h.trust_name)
          : null;
      return {
        id: h.id,
        name: h.name,
        slug: h.slug,
        city: h.city,
        region: h.region,
        type: h.type,
        wait_minutes: h.wait_minutes,
        patients_waiting: h.patients_waiting,
        typical_wait: typical?.avgWaitMinutes ?? null,
        pct_within_4h: typical?.pctWithin4h ?? null,
        lat: h.lat!,
        lng: h.lng!,
      };
    });

  // Suspense is required around useSearchParams() on a statically
  // exported page; the fallback shows only during prerender.
  return (
    <Suspense fallback={null}>
      <NearMeClient hospitals={hospitals} />
    </Suspense>
  );
}
