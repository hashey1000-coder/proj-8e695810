import { Suspense } from "react";
import Link from "next/link";
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

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Heading and intro render server-side so crawlers and JS-off
          visitors get real content, not an empty Suspense fallback. */}
      <nav className="text-xs font-semibold text-stone-400 mb-4 uppercase tracking-wide">
        <Link href="/" className="hover:text-teal-700">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        Near me
      </nav>
      <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
        Which A&amp;E Should I Head For?
      </h1>
      <p className="text-stone-500 mb-8 max-w-2xl">
        Give us a rough position and we&apos;ll rank the fifteen closest
        departments — distance on one side, latest queue figure on the other,
        decision yours.
      </p>

      {/* Suspense is required around useSearchParams() on a statically
          exported page; the locator panel appears on hydration. */}
      <Suspense
        fallback={
          <div className="rounded-2xl bg-slate-900 p-10 text-center text-sm text-slate-400">
            Loading the locator…
          </div>
        }
      >
        <NearMeClient hospitals={hospitals} />
      </Suspense>
    </div>
  );
}
