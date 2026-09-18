import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { FAQ_ITEMS } from "@/lib/faq-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Questions on A&E Queues, Answered",
  description:
    "Honest answers about how A&E waiting figures work, how trustworthy they are, when departments are quietest, and where you might be treated faster.",
  alternates: { canonical: "/faq/" },
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs font-semibold text-stone-400 mb-4 uppercase tracking-wide">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <span className="mx-1.5">/</span>
        FAQ
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Straight Answers
        </h1>
        <p className="mt-2 text-stone-500 max-w-2xl">
          The questions that land in our inbox most, answered without waffle.
          When a topic deserves more depth, we link the full{" "}
          <Link href="/guides" className="font-bold text-teal-700 hover:underline">
            guide
          </Link>{" "}
          instead of cramming it in here.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FAQ />
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide mb-3">
              Deeper reading
            </h2>
            <div className="space-y-2">
              {[
                {
                  href: "/guides/ae-vs-urgent-care",
                  label: "A&E or urgent care — choosing well",
                },
                {
                  href: "/guides/how-triage-works",
                  label: "Why the queue order isn't arrival order",
                },
                {
                  href: "/guides/quietest-times-to-visit",
                  label: "The hours when queues shrink",
                },
                {
                  href: "/guides/how-waits-are-measured",
                  label: "What the wait numbers really measure",
                },
              ].map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="block p-3 rounded-lg bg-stone-50 hover:bg-teal-50 text-sm font-semibold text-stone-800 hover:text-teal-800 transition-colors"
                >
                  {g.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-rose-50 border border-rose-200 p-5">
            <h2 className="text-sm font-extrabold text-rose-900 mb-1.5">
              This page can wait — emergencies can&apos;t
            </h2>
            <p className="text-xs text-rose-800 leading-relaxed">
              Call <strong>999</strong> for anything life-threatening, or{" "}
              <strong>111</strong> when you need urgent advice on where to go.
            </p>
          </div>
        </aside>
      </div>

      {/* FAQ structured data lives here (not on the homepage) so the
          schema sits on the canonical Q&A page only. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
