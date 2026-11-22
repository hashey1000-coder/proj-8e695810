import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * E-E-A-T trust block shown at the foot of every page that presents actual
 * wait data (hospital, region and statistics pages). States who maintains the
 * page, where the numbers come from, when the content was last reviewed, and
 * the medical-advice caveat — each pointing to a dedicated page so the claims
 * are verifiable rather than decorative.
 *
 * Includes its own max-width container, so drop it in as a direct child of a
 * page's bare root element (not inside an already-constrained container).
 */
export function TrustBlock() {
  return (
    <section
      aria-label="How this page is maintained"
      className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-14"
    >
      <div className="rounded-xl border border-stone-200 border-l-4 border-l-teal-600 bg-stone-50 p-5 sm:p-6 text-sm leading-relaxed text-stone-600 space-y-3">
        <p>
          Maintained by{" "}
          <Link href="/about" className="font-semibold text-teal-700 hover:underline">
            {SITE.editorialTeam}
          </Link>
          . Every figure comes straight from NHS England, the devolved
          statistics bodies and individual NHS trust feeds — and where a
          department publishes no live number, the estimate is labelled as one.
          See exactly how we collect and check it in our{" "}
          <Link href="/methodology" className="font-semibold text-teal-700 hover:underline">
            methodology
          </Link>{" "}
          and{" "}
          <Link href="/data-sources" className="font-semibold text-teal-700 hover:underline">
            data sources
          </Link>
          .
        </p>
        <p className="text-stone-500">
          <span className="font-semibold text-stone-700">
            Last reviewed {SITE.lastReviewed}.
          </span>{" "}
          This page is for information only and is not medical advice. In a
          life-threatening emergency call{" "}
          <strong className="text-stone-700">999</strong>; for urgent but
          non-emergency help call{" "}
          <strong className="text-stone-700">NHS 111</strong>. Read our full{" "}
          <Link href="/medical-disclaimer" className="font-semibold text-teal-700 hover:underline">
            medical disclaimer
          </Link>{" "}
          and{" "}
          <Link href="/editorial-policy" className="font-semibold text-teal-700 hover:underline">
            editorial policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
