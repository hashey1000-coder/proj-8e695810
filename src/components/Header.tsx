"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Live Waits", href: "/hospitals" },
  { label: "Near Me", href: "/near-me" },
  { label: "Regions", href: "/regions" },
  { label: "Statistics", href: "/statistics" },
  { label: "Guides", href: "/guides" },
  { label: "FAQ", href: "/faq" },
];

const NATIONS = [
  { label: "England", href: "/regions" },
  { label: "Scotland", href: "/regions/scotland" },
  { label: "Wales", href: "/regions/wales" },
  { label: "N. Ireland", href: "/regions/northern-ireland" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600 shadow-[0_0_14px_rgba(20,184,166,0.4)]">
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
      <span className="leading-none">
        <span className="block text-base font-extrabold tracking-tight text-white">
          AE<span className="text-teal-400">Wait</span>Times
        </span>
        <span className="block text-[10px] font-medium text-slate-400 tracking-wide mt-0.5">
          live NHS queue tracker
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
              <span className="text-rose-400 font-extrabold">999</span>
              <span className="text-slate-500">emergency</span>
              <span className="w-px h-3 bg-slate-700" />
              <span className="text-teal-400 font-extrabold">111</span>
              <span className="text-slate-500">advice</span>
            </span>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-300 hover:bg-slate-800"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900">
          <div className="px-4 py-4 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-md text-sm font-semibold text-slate-200 hover:bg-slate-800"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-slate-800">
              <p className="px-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">
                Jump to a nation
              </p>
              <div className="flex flex-wrap gap-2 px-3 pb-2">
                {NATIONS.map((n) => (
                  <Link
                    key={n.label}
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
