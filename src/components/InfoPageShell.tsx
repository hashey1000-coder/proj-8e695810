import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

/**
 * Shared chrome for the standalone editorial / trust pages (about, contact,
 * methodology, etc.): breadcrumb, title, intro, a prose area with consistent
 * typography, and a "last reviewed" footer. Pass plain <h2>/<p>/<ul> children;
 * descendant styling is applied here so pages stay readable.
 */
export function InfoPageShell({
  breadcrumb,
  title,
  intro,
  children,
}: {
  breadcrumb: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs font-semibold text-stone-400 mb-4 uppercase tracking-wide">
        <Link href="/" className="hover:text-teal-700">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        {breadcrumb}
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
        {title}
      </h1>
      <p className="mt-3 text-lg text-stone-500 leading-relaxed">{intro}</p>

      <div className="mt-8 space-y-4 text-stone-600 leading-relaxed [&_h2]:mt-10 [&_h2]:mb-1 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-stone-900 [&_a]:font-semibold [&_a]:text-teal-700 [&_a:hover]:underline [&_strong]:font-semibold [&_strong]:text-stone-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:marker:text-teal-600">
        {children}
      </div>

      <div className="mt-12 border-t border-stone-200 pt-5 text-xs text-stone-400">
        Last reviewed {SITE.lastReviewed} by {SITE.editorialTeam}. Spotted
        something out of date?{" "}
        <Link href="/contact" className="font-semibold text-teal-700 hover:underline">
          Let us know
        </Link>
        .
      </div>
    </div>
  );
}
