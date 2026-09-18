import Link from "next/link";

const FOOTER_COLS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Check waits",
    links: [
      { label: "All departments", href: "/hospitals" },
      { label: "Nearest to me", href: "/near-me" },
      { label: "Browse by region", href: "/regions" },
      { label: "National statistics", href: "/statistics" },
    ],
  },
  {
    heading: "Nations",
    links: [
      { label: "England", href: "/regions" },
      { label: "Scotland", href: "/regions/scotland" },
      { label: "Wales", href: "/regions/wales" },
      { label: "Northern Ireland", href: "/regions/northern-ireland" },
      { label: "London", href: "/regions/london" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "All patient guides", href: "/guides" },
      { label: "A&E or urgent care?", href: "/guides/ae-vs-urgent-care" },
      { label: "Quietest times to visit", href: "/guides/quietest-times-to-visit" },
      { label: "How triage works", href: "/guides/how-triage-works" },
      { label: "Questions & answers", href: "/faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-16">
      {/* Emergency strip */}
      <div className="bg-rose-600">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
          <p className="text-sm font-bold text-white">
            Life-threatening emergency? Call 999 now.
          </p>
          <p className="text-sm text-rose-100">
            Urgent but not critical — call 111 (free, UK-wide) or use{" "}
            <a
              href="https://111.nhs.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-white"
            >
              111 online
            </a>{" "}
            in England
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600">
                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                  <path
                    d="M4 18 L10 18 L13 10 L17 24 L20 15 L22 18 L28 18"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-base font-extrabold tracking-tight text-white">
                AE<span className="text-teal-400">Wait</span>Times
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              An independent tracker that gathers publicly published NHS
              queue figures into one place, so you can weigh up your options
              before leaving home.
            </p>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Not an NHS service. Not medical advice. Figures reflect the
              most recent data we&apos;ve collected from each trust, and real
              queues can change by the minute — treat them as a guide, not
              a promise.
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-200 mb-4">
                {col.heading}
              </h2>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="hover:text-teal-400 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            aewaittimes.co.uk — independently run, no NHS affiliation or
            endorsement. Data belongs to the trusts and agencies that publish it.
          </p>
          <p className="whitespace-nowrap">
            Sources: NHS trust dashboards &middot; official statistics
          </p>
        </div>
      </div>
    </footer>
  );
}
