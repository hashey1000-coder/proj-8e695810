import Link from "next/link";
import { getRegions } from "@/lib/data/hospitals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A&E Waiting Times by UK Region",
  description:
    "Jump into any UK region — from London to the Highlands — and compare the latest A&E queue figures at every NHS department we track there.",
  alternates: { canonical: "/regions/" },
};

export default function RegionsPage() {
  const regions = getRegions();

  const byCountry = regions.reduce<Record<string, typeof regions>>((acc, r) => {
    (acc[r.country] ||= []).push(r);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs font-semibold text-stone-400 mb-4 uppercase tracking-wide">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <span className="mx-1.5">/</span>
        Regions
      </nav>
      <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
        Choose a Region
      </h1>
      <p className="text-stone-500 mb-10 max-w-2xl">
        Waits vary enormously from one part of the country to another — and even
        between neighbouring towns. Pick an area to see every department we
        follow there, side by side.
      </p>

      <div className="space-y-10">
        {Object.entries(byCountry).map(([country, list]) => (
          <div key={country}>
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-teal-700 mb-4">
              {country}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {list.map((r) => (
                <Link
                  key={r.region}
                  href={`/regions/${encodeURIComponent(r.region.toLowerCase().replace(/\s+&\s+/g, "-and-").replace(/\s+/g, "-"))}`}
                  className="group rounded-xl border border-stone-200 bg-white p-5 border-l-4 border-l-teal-600 hover:border-teal-500 hover:shadow-[0_2px_12px_rgba(15,118,110,0.12)] transition-all"
                >
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-teal-700 transition-colors">
                    {r.region}
                  </h3>
                  <p className="text-sm text-stone-500 mt-1">
                    {r.count} tracked department{r.count !== 1 ? "s" : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
