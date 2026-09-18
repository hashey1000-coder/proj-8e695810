import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides to Surviving the Emergency Department",
  description:
    "Independent, plain-English guides on choosing the right NHS service, understanding triage and wait figures, and making an A&E visit as painless as possible.",
  alternates: { canonical: "/guides/" },
};

export default function GuidesPage() {
  const categories = [...new Set(GUIDES.map((g) => g.category))];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs font-semibold text-stone-400 mb-4 uppercase tracking-wide">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <span className="mx-1.5">/</span>
        Guides
      </nav>

      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          The Guide Shelf
        </h1>
        <p className="mt-2 text-stone-500 max-w-2xl">
          Everything we wish patients knew before, during and after an
          emergency visit — written independently, checked against official
          NHS guidance, and kept on a review cycle.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-teal-700 mb-4">
              {cat}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {GUIDES.filter((g) => g.category === cat).map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group rounded-xl border border-stone-200 bg-white p-5 border-l-4 border-l-teal-600 hover:border-teal-500 hover:shadow-[0_2px_12px_rgba(15,118,110,0.12)] transition-all flex flex-col"
                >
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-teal-700 transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-2 flex-1 leading-relaxed">
                    {guide.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400">
                      {guide.readTime} · checked {guide.lastReviewed}
                    </span>
                    <span className="font-extrabold text-teal-700">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-slate-900 p-8 text-center">
        <h2 className="text-xl font-extrabold text-white mb-2">
          Reading done — need a real queue now?
        </h2>
        <p className="text-slate-400 mb-5 text-sm">
          <strong className="text-rose-400">999</strong> for emergencies.
          Otherwise, see which department near you is calmest before you set off.
        </p>
        <Link
          href="/near-me"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-teal-400 transition-colors"
        >
          Rank departments near me
        </Link>
      </div>
    </div>
  );
}
