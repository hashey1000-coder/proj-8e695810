"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "aewt-consent-v1";
const OPEN_EVENT = "aewt-open-consent";

type Choice = "granted" | "denied";

function applyConsent(choice: Choice) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    ad_storage: choice,
    analytics_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
}

/**
 * Cookie-consent banner wired to Google Consent Mode v2. Consent defaults to
 * denied (set in Analytics before GA loads); this banner lets the visitor
 * accept or reject non-essential cookies and stores the choice. The choice can
 * be reopened anywhere via <CookieSettingsButton /> (or dispatching the
 * `aewt-open-consent` event).
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (stored === "granted" || stored === "denied") {
      applyConsent(stored);
    } else {
      setOpen(true);
    }
    const openHandler = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_EVENT, openHandler);
  }, []);

  function choose(choice: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage unavailable */
    }
    applyConsent(choice);
    setOpen(false);
  }

  if (!mounted || !open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie choices"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/40 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm leading-relaxed text-slate-300">
            <p className="font-bold text-white">We use cookies</p>
            <p className="mt-1">
              Essential cookies keep the site working. With your consent we also use
              analytics and advertising cookies that fund the site. See our{" "}
              <Link href="/cookies" className="font-semibold text-teal-400 hover:underline">
                cookie policy
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-shrink-0 gap-2.5">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-bold text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-teal-400 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Reopens the consent banner so a visitor can change their choice. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-bold !text-white !no-underline hover:bg-teal-700"
    >
      Change cookie settings
    </button>
  );
}
