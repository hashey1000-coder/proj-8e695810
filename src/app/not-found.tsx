import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <svg viewBox="0 0 32 32" className="w-14 h-14 mx-auto mb-6 opacity-40" fill="none">
        <path
          d="M2 18 L9 18 L12 8 L16 26 L20 13 L22 18 L30 18"
          stroke="#0F766E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
        We&apos;ve lost that page&apos;s pulse
      </h1>
      <p className="text-stone-500 mb-8 max-w-md mx-auto">
        Whatever used to live at this address has moved on or never existed.
        The live wait data is still very much alive, though.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-teal-600 px-6 py-3 text-sm font-bold text-white hover:bg-teal-700 transition-colors"
        >
          Back to the tracker
        </Link>
        <Link
          href="/hospitals"
          className="rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-bold text-stone-700 hover:bg-stone-50 transition-colors"
        >
          All departments
        </Link>
      </div>
    </div>
  );
}
