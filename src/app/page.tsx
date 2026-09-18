import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllHospitalsWithWaits,
  getLongestWaits,
  getShortestWaits,
  getRegions,
  getNationalStats,
} from "@/lib/data/hospitals";
import { formatWaitTime } from "@/lib/utils";
import { WaitRow } from "@/components/WaitRow";
import { SearchBar } from "@/components/SearchBar";
import { DemandHeatmap } from "@/components/DemandHeatmap";
import { FAQ } from "@/components/FAQ";
import { TimeAgo } from "@/components/TimeAgo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const regionSlug = (r: string) =>
  encodeURIComponent(
    r.toLowerCase().replace(/\s+&\s+/g, "-and-").replace(/\s+/g, "-")
  );

export default function HomePage() {
  const allHospitals = getAllHospitalsWithWaits();
  const busiest = getLongestWaits(5);
  const quickest = getShortestWaits(5);
  const regions = getRegions();
  const stats = getNationalStats();

  const withData = allHospitals.filter((h) => h.wait_minutes !== null);
  // Most recent reading across all reporting hospitals (the list is
  // alphabetical, so the first entry would be an arbitrary one). The DB
  // strings are "YYYY-MM-DD HH:MM:SS" so lexicographic max is correct.
  const latestTimestamp = withData.reduce<string | null>(
    (max, h) =>
      h.source_timestamp && (!max || h.source_timestamp > max)
        ? h.source_timestamp
        : max,
    null
  );

  return (
    <div className="pb-20">
      {/* ===== Hero ===== */}
      <section className="relative bg-slate-900 overflow-hidden">
        {/* subtle glow + grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 70% 20%, rgba(20,184,166,0.25), transparent), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(20,184,166,0.12), transparent)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-3">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-bold text-teal-300 mb-5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-400" />
                </span>
                {stats.reporting} departments reporting live
                {latestTimestamp && (
                  <>
                    {" · updated "}
                    <TimeAgo timestamp={latestTimestamp} />
                  </>
                )}
              </p>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                Know the A&amp;E queue{" "}
                <span className="text-teal-400">before you leave the house</span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
                We track {stats.totalTracked} NHS emergency departments across
                all four UK nations, collecting live queue figures wherever a
                trust publishes them — so a ten-second check here can save you
                hours in a waiting room.
              </p>

              <div className="mt-8 max-w-xl">
                <SearchBar hospitals={allHospitals} />
              </div>
            </div>

            {/* National snapshot panel */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-slate-800/70 backdrop-blur border border-slate-700 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    UK snapshot
                  </h2>
                  <Link
                    href="/statistics"
                    className="text-xs font-bold text-teal-400 hover:text-teal-300"
                  >
                    full dashboard →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-900/60 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Average wait
                    </p>
                    <p className="text-2xl font-extrabold text-white mt-1">
                      {formatWaitTime(stats.avgWait)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-900/60 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      People in queues
                    </p>
                    <p className="text-2xl font-extrabold text-white mt-1">
                      {stats.totalPatientsWaiting > 0
                        ? stats.totalPatientsWaiting.toLocaleString()
                        : "—"}
                    </p>
                  </div>
                </div>

                {stats.shortestWait.slug && (
                  <Link
                    href={`/hospitals/${stats.shortestWait.slug}`}
                    className="mt-4 flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 hover:bg-emerald-500/20 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                        Quickest right now
                      </p>
                      <p className="text-sm font-bold text-white truncate">
                        {stats.shortestWait.name}
                      </p>
                    </div>
                    <span className="ml-3 text-lg font-extrabold text-emerald-400 whitespace-nowrap">
                      {formatWaitTime(stats.shortestWait.minutes)}
                    </span>
                  </Link>
                )}
                {stats.longestWait.slug && (
                  <Link
                    href={`/hospitals/${stats.longestWait.slug}`}
                    className="mt-2.5 flex items-center justify-between rounded-xl bg-rose-500/10 border border-rose-500/30 px-4 py-3 hover:bg-rose-500/20 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400">
                        Under most pressure
                      </p>
                      <p className="text-sm font-bold text-white truncate">
                        {stats.longestWait.name}
                      </p>
                    </div>
                    <span className="ml-3 text-lg font-extrabold text-rose-400 whitespace-nowrap">
                      {formatWaitTime(stats.longestWait.minutes)}
                    </span>
                  </Link>
                )}

                <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
                  Figures republished from each trust&apos;s own public feed,
                  as of our most recent collection run.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Leaderboards ===== */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-0 pt-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              The queue league, right now
            </h2>
            <p className="mt-1 text-stone-500 text-sm">
              Both ends of the table — refreshed with every scrape of the trust feeds.
            </p>
          </div>
          <Link
            href="/hospitals"
            className="hidden sm:inline-flex text-sm font-bold text-teal-700 hover:text-teal-900 whitespace-nowrap"
          >
            every department →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" transform="rotate(180 12 12)" />
              </svg>
              <h3 className="text-sm font-extrabold text-emerald-900">
                Shortest queues
              </h3>
            </div>
            {quickest.map((h, i) => (
              <WaitRow key={h.id} hospital={h} rank={i + 1} />
            ))}
          </div>

          <div className="rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-4 py-3 bg-rose-50 border-b border-rose-100 flex items-center gap-2">
              <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              <h3 className="text-sm font-extrabold text-rose-900">
                Longest queues
              </h3>
            </div>
            {busiest.map((h, i) => (
              <WaitRow key={h.id} hospital={h} rank={i + 1} />
            ))}
          </div>
        </div>
        <Link
          href="/hospitals"
          className="sm:hidden mt-4 inline-flex text-sm font-bold text-teal-700"
        >
          every department →
        </Link>
      </section>

      {/* ===== Regions ===== */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Pick your patch
          </h2>
          <p className="mt-1 text-stone-500 text-sm">
            Every region we cover, with the latest figures for each department inside it.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {regions.map((r) => (
            <Link
              key={r.region}
              href={`/regions/${regionSlug(r.region)}`}
              className="group rounded-xl border border-stone-200 bg-white p-4 hover:border-teal-500 hover:shadow-[0_2px_12px_rgba(15,118,110,0.12)] transition-all border-l-4 border-l-teal-600"
            >
              <h3 className="font-bold text-stone-900 text-sm group-hover:text-teal-700 transition-colors">
                {r.region}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {r.count} {r.count === 1 ? "department" : "departments"} ·{" "}
                {r.country}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="rounded-2xl bg-slate-900 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                n: "01",
                title: "Tell us where you are",
                desc: "A postcode or one tap on the location button — nothing is saved, nothing follows you around.",
              },
              {
                n: "02",
                title: "Scan the queues nearby",
                desc: "Every department within reach, ordered by distance, each with its current wait alongside.",
              },
              {
                n: "03",
                title: "Trade minutes for miles",
                desc: "Sometimes the hospital fifteen minutes further out clears its queue three hours sooner. Now you'll know.",
              },
            ].map((s) => (
              <div key={s.n}>
                <span className="text-3xl font-extrabold text-teal-500/40">{s.n}</span>
                <h3 className="text-white font-bold mt-2">{s.title}</h3>
                <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/near-me"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-teal-400 transition-colors"
          >
            Compare departments near me
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ===== Timing heatmap ===== */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="rounded-xl border border-stone-200 bg-white p-6 md:p-8">
          <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                When the waiting room fills up
              </h2>
              <p className="mt-1 text-stone-500 text-sm max-w-2xl">
                A week of typical national demand, hour by hour. The teal patches —
                early mornings especially — are when departments breathe easiest.
              </p>
            </div>
            <Link
              href="/guides/quietest-times-to-visit"
              className="text-sm font-bold text-teal-700 hover:text-teal-900 whitespace-nowrap"
            >
              read the timing guide →
            </Link>
          </div>
          <DemandHeatmap />
        </div>
      </section>

      {/* ===== Sourcing ===== */}
      <section id="sources" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Where every number comes from
            </h2>
            <p className="mt-2 text-stone-500 text-sm leading-relaxed">
              Every figure is either taken straight from an NHS-published
              page or clearly labelled as an estimate — nothing is dressed
              up as something it isn&apos;t.
            </p>
          </div>
          <div className="lg:col-span-2 space-y-3">
            {[
              {
                title: "Trust dashboards, unaltered",
                body: "Many trusts publish a live waiting-time page for their own patients. We collect those figures on a rolling cycle and show them exactly as published, with a timestamp on every reading.",
              },
              {
                title: "Official statistics fill the gaps",
                body: "Where no live feed exists, we show estimated typical waits derived from NHS England's monthly performance statistics — always labelled as estimates, never dressed up as live data. Trusts without a feed or a statistical basis simply show no figure.",
              },
              {
                title: "Independent by design",
                body: "This site has no connection to the NHS — no funding, no endorsement, no data-sharing agreement. That independence is what lets us present every hospital on the same terms.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-stone-200 bg-white p-5 border-l-4 border-l-teal-600"
              >
                <h3 className="font-bold text-stone-900 text-sm">{item.title}</h3>
                <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Asked all the time
            </h2>
            <p className="mt-1 text-stone-500 text-sm">
              The short version of what visitors want to know. Longer answers live in the{" "}
              <Link href="/guides" className="font-bold text-teal-700 hover:underline">
                guides
              </Link>
              .
            </p>
          </div>
          <Link
            href="/faq"
            className="hidden sm:inline-flex text-sm font-bold text-teal-700 hover:text-teal-900 whitespace-nowrap"
          >
            all questions →
          </Link>
        </div>
        <FAQ />
      </section>
    </div>
  );
}
