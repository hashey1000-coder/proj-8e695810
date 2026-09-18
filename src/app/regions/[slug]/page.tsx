import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getHospitalsByRegion,
  getRegions,
  getNationalStats,
} from "@/lib/data/hospitals";
import { formatWaitTime } from "@/lib/utils";
import { WaitRow } from "@/components/WaitRow";
import type { Metadata } from "next";

export function generateStaticParams() {
  const regions = getRegions();
  return regions.map((r) => ({
    slug: r.region.toLowerCase().replace(/\s+&\s+/g, "-and-").replace(/\s+/g, "-"),
  }));
}

function slugToRegion(slug: string): string | null {
  const regions = getRegions();
  const decoded = decodeURIComponent(slug);
  return (
    regions.find(
      (r) =>
        r.region.toLowerCase().replace(/\s+&\s+/g, "-and-").replace(/\s+/g, "-") ===
        decoded
    )?.region ?? null
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = slugToRegion(slug);
  if (!region) return { title: "Region Not Found" };
  return {
    title: `${region} A&E Waits Today — All Departments Compared`,
    description: `The latest queue picture at every NHS emergency department we track in ${region}, ranked so the calmest option is always at the top.`,
    alternates: { canonical: `/regions/${slug}/` },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = slugToRegion(slug);
  if (!region) notFound();

  const hospitals = getHospitalsByRegion(region);
  const nationalAvg = getNationalStats().avgWait;

  const withData = hospitals.filter((h) => h.wait_minutes !== null);
  const avgWait =
    withData.length > 0
      ? Math.round(
          withData.reduce((sum, h) => sum + h.wait_minutes!, 0) / withData.length
        )
      : null;

  const sorted = [...hospitals].sort((a, b) => {
    if (a.wait_minutes !== null && b.wait_minutes === null) return -1;
    if (a.wait_minutes === null && b.wait_minutes !== null) return 1;
    if (a.wait_minutes !== null && b.wait_minutes !== null)
      return a.wait_minutes - b.wait_minutes;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs font-semibold text-stone-400 mb-4 uppercase tracking-wide">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/regions" className="hover:text-teal-700">Regions</Link>
        <span className="mx-1.5">/</span>
        {region}
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            {region}: Today&apos;s A&amp;E Picture
          </h1>
          <p className="text-stone-500 mt-2">
            {hospitals.length} department{hospitals.length !== 1 ? "s" : ""} on
            our watchlist here, calmest first.
          </p>
        </div>
        {avgWait !== null && (
          <div className="rounded-xl bg-slate-900 px-5 py-3.5 shrink-0">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Region average
            </p>
            <p className="text-xl font-extrabold text-white mt-0.5">
              {formatWaitTime(avgWait)}
            </p>
            <p className="text-[10px] text-slate-500">
              national ~{formatWaitTime(nationalAvg)}
            </p>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-stone-200 overflow-hidden">
        {sorted.map((hospital, i) => (
          <WaitRow
            key={hospital.id}
            hospital={hospital}
            rank={i + 1}
            showRegion={false}
          />
        ))}
      </div>

      <p className="mt-6 text-xs text-stone-400 max-w-2xl">
        Departments without a live feed sit at the bottom of the list — their
        trusts publish averages rather than real-time figures, so we show the
        usual wait where we have one instead of pretending it&apos;s live.
      </p>
    </div>
  );
}
