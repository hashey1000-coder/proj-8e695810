"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { HospitalWithWait } from "@/lib/data/hospitals";
import { severityDotColor, waitSeverity } from "@/lib/utils";

interface PostcodeResult {
  postcode: string;
  latitude: number;
  longitude: number;
}

export function SearchBar({ hospitals }: { hospitals: HospitalWithWait[] }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPostcode = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(query.trim());

  const normalize = (s: string) => s.toLowerCase().replace(/['']/g, "");
  const matches =
    query.length >= 2 && !isPostcode
      ? hospitals
          .filter(
            (h) =>
              normalize(h.name).includes(normalize(query)) ||
              h.city?.toLowerCase().includes(query.toLowerCase()) ||
              h.postcode
                ?.toLowerCase()
                .replace(/\s/g, "")
                .includes(query.toLowerCase().replace(/\s/g, ""))
          )
          .slice(0, 8)
      : [];

  async function handlePostcodeSearch() {
    if (!isPostcode) return;
    setLoading(true);
    setNotice(null);
    try {
      const res = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(query.trim())}`
      );
      const data = await res.json();
      if (data.status === 200 && data.result) {
        const { latitude, longitude } = data.result as PostcodeResult;
        router.push(
          `/near-me?lat=${latitude}&lng=${longitude}&postcode=${encodeURIComponent(query.trim())}`
        );
      } else {
        setNotice("That postcode didn't match — double-check it and try again.");
      }
    } catch {
      setNotice("Postcode lookup failed. Give it another go in a moment.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit() {
    if (isPostcode) {
      handlePostcodeSearch();
    } else if (matches.length === 1) {
      router.push(`/hospitals/${matches[0].slug}`);
      setShowResults(false);
    } else if (query.trim()) {
      router.push(`/hospitals?q=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
    } else {
      router.push("/hospitals");
    }
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setNotice("Your browser doesn't support location — try a postcode instead.");
      return;
    }
    setLoading(true);
    setNotice(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        router.push(
          `/near-me?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
        );
        setLoading(false);
      },
      () => {
        setNotice("Location was blocked — enter a postcode instead.");
        setLoading(false);
      }
    );
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex rounded-xl bg-white p-1.5 shadow-lg shadow-black/20">
        {/* suppressHydrationWarning: autofill extensions inject data-*
            attributes pre-hydration; without this React fails hydration */}
        <input
          type="text"
          suppressHydrationWarning
          aria-label="Search by hospital, town or postcode"
          placeholder="Hospital, town or postcode…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
            setNotice(null);
          }}
          onFocus={() => setShowResults(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="flex-1 min-w-0 bg-transparent px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
        />
        <button
          onClick={handleUseLocation}
          disabled={loading}
          title="Use my location"
          aria-label="Use my location"
          className="px-3 rounded-lg text-teal-700 hover:bg-teal-50 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M12 21s-6.5-6.4-6.5-11a6.5 6.5 0 1 1 13 0c0 4.6-6.5 11-6.5 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          {loading ? "…" : "Check"}
        </button>
      </div>

      {notice && <p className="mt-2 text-xs text-amber-300">{notice}</p>}
      <p className="mt-2 text-xs text-slate-400">
        Location is looked up once in your browser — we never store it.
      </p>

      {showResults && matches.length > 0 && (
        <div className="absolute top-[58px] left-0 right-0 rounded-xl border border-stone-200 bg-white shadow-xl z-50 overflow-hidden max-h-[360px] overflow-y-auto">
          {matches.map((h) => (
            <button
              key={h.id}
              onClick={() => {
                router.push(`/hospitals/${h.slug}`);
                setShowResults(false);
                setQuery("");
              }}
              className="w-full px-4 py-3 text-left hover:bg-teal-50/60 flex items-center justify-between border-b border-stone-100 last:border-0 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-stone-900">{h.name}</p>
                <p className="text-xs text-stone-500">
                  {h.city}
                  {h.region ? ` · ${h.region}` : ""}
                </p>
              </div>
              {h.wait_minutes !== null && (
                <span className="flex items-center gap-1.5 ml-4">
                  <span
                    className={`w-2 h-2 rounded-full ${severityDotColor(waitSeverity(h.wait_minutes))}`}
                  />
                  <span className="text-sm font-bold text-stone-700 whitespace-nowrap">
                    {h.wait_minutes}m
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {showResults && isPostcode && (
        <div className="absolute top-[58px] left-0 right-0 rounded-xl border border-stone-200 bg-white shadow-xl z-50 p-4">
          <button
            onClick={handlePostcodeSearch}
            disabled={loading}
            className="w-full text-left text-sm text-teal-700 font-semibold hover:underline"
          >
            {loading
              ? "Looking up postcode…"
              : `Show departments closest to ${query.trim().toUpperCase()} →`}
          </button>
        </div>
      )}

      {showResults && query.length >= 2 && !isPostcode && matches.length === 0 && (
        <div className="absolute top-[58px] left-0 right-0 rounded-xl border border-stone-200 bg-white shadow-xl z-50 p-4 text-sm text-stone-500">
          Nothing matched &ldquo;{query}&rdquo; — a full postcode works too.
        </div>
      )}
    </div>
  );
}
