import Link from "next/link";
import {
  getNationalStats,
  getLongestWaits,
  getShortestWaits,
} from "@/lib/data/hospitals";
import { formatWaitTime } from "@/lib/utils";
import { WaitRow } from "@/components/WaitRow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "National A&E Dashboard — Averages, Extremes and Distribution",
  description:
    "A live national picture of NHS A&E queues: average and median waits, how departments are distributed across wait bands, and the ten best and worst right now.",
  alternates: { canonical: "/statistics/" },
};

export default function StatisticsPage() {
  const stats = getNationalStats();
  const longest = getLongestWaits(10);
  const shortest = getShortestWaits(10);

  const pctUnder30 =
    stats.reporting > 0 ? Math.round((stats.under30 / stats.reporting) * 100) : 0;
  const pct3060 =
    stats.reporting > 0
      ? Math.round((stats.between30and60 / stats.reporting) * 100)
      : 0;
  const pctOver60 =
    stats.reporting > 0 ? Math.round((stats.over60 / stats.reporting) * 100) : 0;

  return (
    <div>
      {/* Dark stat band */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <nav className="text-xs font-semibold text-slate-500 mb-5 uppercase tracking-wide">
            <Link href="/" className="hover:text-teal-400">Home</Link>
            <span className="mx-1.5">/</span>
            Statistics
          </nav>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            The National Dashboard
          </h1>
          <p className="mt-2 text-slate-400 max-w-2xl">
            {stats.reporting} of {stats.totalTracked} tracked departments are
            publishing live figures at the moment. Everything below is computed
            from those readings.
          </p>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl bg-slate-800/70 border border-slate-700 p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Mean wait
              </p>
              <p className="text-3xl font-extrabold text-white mt-1">
                {formatWaitTime(stats.avgWait)}
              </p>
            </div>
            <div className="rounded-xl bg-slate-800/70 border border-slate-700 p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Median wait
              </p>
              <p className="text-3xl font-extrabold text-white mt-1">
                {formatWaitTime(stats.medianWait)}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">
                half of departments sit below this
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                Fastest
              </p>
              {stats.shortestWait.slug ? (
                <>
                  <p className="text-3xl font-extrabold text-emerald-400 mt-1">
                    {formatWaitTime(stats.shortestWait.minutes)}
                  </p>
                  <Link
                    href={`/hospitals/${stats.shortestWait.slug}`}
                    className="text-[11px] text-slate-300 hover:text-white underline underline-offset-2 mt-1 block truncate"
                  >
                    {stats.shortestWait.name}
                  </Link>
                </>
              ) : (
                <p className="text-sm text-slate-400 mt-2">
                  awaiting the next data run
                </p>
              )}
            </div>
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400">
                Slowest
              </p>
              {stats.longestWait.slug ? (
                <>
                  <p className="text-3xl font-extrabold text-rose-400 mt-1">
                    {formatWaitTime(stats.longestWait.minutes)}
                  </p>
                  <Link
                    href={`/hospitals/${stats.longestWait.slug}`}
                    className="text-[11px] text-slate-300 hover:text-white underline underline-offset-2 mt-1 block truncate"
                  >
                    {stats.longestWait.name}
                  </Link>
                </>
              ) : (
                <p className="text-sm text-slate-400 mt-2">
                  awaiting the next data run
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Distribution */}
        <div className="rounded-xl border border-stone-200 bg-white p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-stone-900 tracking-tight mb-1">
            How the country splits by wait band
          </h2>
          <p className="text-sm text-stone-500 mb-6">
            Share of live-reporting departments in each band at this moment.
          </p>

          <div className="flex rounded-lg overflow-hidden h-12 mb-5">
            {stats.under30 > 0 && (
              <div
                className="bg-emerald-500 flex items-center justify-center text-white text-xs font-extrabold"
                style={{ width: `${pctUnder30}%` }}
              >
                {pctUnder30}%
              </div>
            )}
            {stats.between30and60 > 0 && (
              <div
                className="bg-amber-400 flex items-center justify-center text-white text-xs font-extrabold"
                style={{ width: `${pct3060}%` }}
              >
                {pct3060}%
              </div>
            )}
            {stats.over60 > 0 && (
              <div
                className="bg-rose-500 flex items-center justify-center text-white text-xs font-extrabold"
                style={{ width: `${pctOver60}%` }}
              >
                {pctOver60}%
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3">
              <span className="font-extrabold text-emerald-800">
                {stats.under30} departments
              </span>
              <span className="text-emerald-700"> under 30 minutes</span>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
              <span className="font-extrabold text-amber-800">
                {stats.between30and60} departments
              </span>
              <span className="text-amber-700"> between 30 and 60 minutes</span>
            </div>
            <div className="rounded-lg bg-rose-50 border border-rose-100 px-4 py-3">
              <span className="font-extrabold text-rose-800">
                {stats.over60} departments
              </span>
              <span className="text-rose-700"> over an hour</span>
            </div>
          </div>
        </div>

        {/* Patients waiting */}
        {stats.totalPatientsWaiting > 0 && (
          <div className="rounded-xl border border-stone-200 bg-white p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5 border-l-4 border-l-teal-600">
            <p className="text-5xl font-extrabold text-stone-900">
              {stats.totalPatientsWaiting.toLocaleString()}
            </p>
            <div>
              <h2 className="text-base font-extrabold text-stone-900">
                people queueing across the UK right now
              </h2>
              <p className="text-sm text-stone-500 mt-0.5">
                Counted across the {stats.hospitalsReportingPatients} departments
                whose feeds include patient numbers, not just wait estimates.
              </p>
            </div>
          </div>
        )}

        {/* Top/bottom ten */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100">
              <h2 className="text-sm font-extrabold text-emerald-900">
                Ten calmest departments
              </h2>
            </div>
            {shortest.map((h, i) => (
              <WaitRow key={h.id} hospital={h} rank={i + 1} />
            ))}
          </div>

          <div className="rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-4 py-3 bg-rose-50 border-b border-rose-100">
              <h2 className="text-sm font-extrabold text-rose-900">
                Ten most stretched departments
              </h2>
            </div>
            {longest.map((h, i) => (
              <WaitRow key={h.id} hospital={h} rank={i + 1} />
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 max-w-xl mx-auto">
          Every figure is recomputed from trust-published data each time the
          site&apos;s data refreshes. aewaittimes.co.uk is an independent
          project with no NHS affiliation
          {stats.reporting > 0 && (
            <>
              {" "}
              — the spread between best and worst right now is{" "}
              {formatWaitTime(stats.longestWait.minutes - stats.shortestWait.minutes)}
            </>
          )}
          .
        </p>
      </div>
    </div>
  );
}
