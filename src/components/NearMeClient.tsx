"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface HospitalData {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  region: string | null;
  type: string;
  wait_minutes: number | null;
  patients_waiting: number | null;
  typical_wait: number | null;
  pct_within_4h: number | null;
  lat: number;
  lng: number;
}

interface NearbyHospital extends HospitalData {
  distance: number;
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function severityPill(mins: number): string {
  if (mins < 120) return "bg-emerald-100 text-emerald-800";
  if (mins <= 240) return "bg-amber-100 text-amber-800";
  return "bg-rose-100 text-rose-800";
}

function severityWord(mins: number): string {
  if (mins < 120) return "Quiet";
  if (mins <= 240) return "Steady";
  return "Busy";
}

function formatWait(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

interface UserLocation {
  lat: number;
  lng: number;
  label: string;
}

export function NearMeClient({ hospitals }: { hospitals: HospitalData[] }) {
  const searchParams = useSearchParams();
  const [manualLocation, setManualLocation] = useState<UserLocation | null>(null);
  const [urlDismissed, setUrlDismissed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postcode, setPostcode] = useState("");

  // Location arriving via ?lat=&lng=&postcode= (from the homepage search).
  // Derived from the URL rather than copied into state, so no effect is needed.
  const urlLocation = useMemo<UserLocation | null>(() => {
    const lat = parseFloat(searchParams.get("lat") ?? "");
    const lng = parseFloat(searchParams.get("lng") ?? "");
    const pc = searchParams.get("postcode");
    // Guard against hand-edited or truncated URLs — NaN coordinates
    // would render "NaN km away" on every row.
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return {
      lat,
      lng,
      label: pc ? pc.toUpperCase() : "your position",
    };
  }, [searchParams]);

  const location = manualLocation ?? (urlDismissed ? null : urlLocation);
  const locationLabel = location?.label ?? null;

  const nearby: NearbyHospital[] = useMemo(() => {
    if (!location) return [];
    return hospitals
      .map((h) => ({
        ...h,
        distance: haversine(location.lat, location.lng, h.lat, h.lng),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 15);
  }, [hospitals, location]);

  function findNearby() {
    if (!navigator.geolocation) {
      setError("This browser can't share location — use the postcode box instead.");
      return;
    }
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setManualLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: "your position",
        });
        setLoading(false);
      },
      () => {
        setError("Location permission was refused — a postcode works just as well.");
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: false, maximumAge: 300000 }
    );
  }

  async function searchByPostcode(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = postcode.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(trimmed)}`
      );
      if (!res.ok) {
        setError("That postcode didn't come back from the lookup — check it and retry.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.status !== 200 || !data.result) {
        setError("That postcode didn't come back from the lookup — check it and retry.");
        setLoading(false);
        return;
      }
      setManualLocation({
        lat: data.result.latitude,
        lng: data.result.longitude,
        label: trimmed.toUpperCase(),
      });
      setLoading(false);
    } catch {
      setError("The postcode service didn't respond. Try again in a moment.");
      setLoading(false);
    }
  }

  return (
    <div>
      {nearby.length === 0 && !loading && (
        <div className="rounded-2xl bg-slate-900 p-8 md:p-10">
          <div className="max-w-md mx-auto text-center">
            <button
              onClick={findNearby}
              disabled={loading}
              className="w-full rounded-xl bg-teal-500 px-8 py-4 text-base font-bold text-slate-950 hover:bg-teal-400 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 21s-6.5-6.4-6.5-11a6.5 6.5 0 1 1 13 0c0 4.6-6.5 11-6.5 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Locate me once
            </button>
            <p className="text-xs text-slate-500 mt-3">
              One-off lookup in your browser — we keep nothing.
            </p>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-xs text-slate-500 font-bold uppercase">or</span>
              <div className="flex-1 h-px bg-slate-700" />
            </div>

            <form onSubmit={searchByPostcode}>
              <label
                htmlFor="postcode"
                className="block text-sm font-bold text-slate-300 mb-2 text-left"
              >
                Start from a postcode
              </label>
              <div className="flex rounded-xl bg-white p-1.5">
                {/* suppressHydrationWarning: autofill extensions inject data-*
                    attributes pre-hydration; without this React fails hydration */}
                <input
                  id="postcode"
                  type="text"
                  suppressHydrationWarning
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="e.g. M1 2WD"
                  className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!postcode.trim()}
                  className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-slate-700 transition-colors disabled:opacity-40"
                >
                  Rank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 mt-6">
          {error}
        </div>
      )}

      {loading && nearby.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-stone-500 mt-3">Measuring distances…</p>
        </div>
      )}

      {nearby.length > 0 && (
        <>
          {locationLabel && (
            <div className="flex items-center gap-2 mb-5">
              <span className="px-3 py-1.5 rounded-full bg-teal-600 text-white text-xs font-bold">
                {nearby.length} departments around {locationLabel}
              </span>
              <button
                onClick={() => {
                  setManualLocation(null);
                  setUrlDismissed(true);
                }}
                className="text-xs font-bold text-stone-400 hover:text-teal-700"
              >
                start over
              </button>
            </div>
          )}
          <div className="rounded-xl border border-stone-200 overflow-hidden">
            {nearby.map((h, i) => {
              const hasLive = h.wait_minutes !== null;
              const displayWait = h.wait_minutes ?? h.typical_wait;

              return (
                <Link
                  key={h.id}
                  href={`/hospitals/${h.slug}`}
                  className="flex items-center gap-4 px-4 sm:px-5 py-4 bg-white hover:bg-teal-50/40 border-b border-stone-100 last:border-0 transition-colors"
                >
                  <span className="w-6 text-sm font-extrabold text-stone-300">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-teal-700">
                      {h.distance.toFixed(1)} km away
                    </p>
                    <h3 className="text-sm font-bold text-stone-900 truncate">
                      {h.name}
                    </h3>
                    <p className="text-xs text-stone-500 truncate">
                      {h.city}
                      {h.region ? ` · ${h.region}` : ""}
                      {h.type !== "AE" ? ` · ${h.type}` : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    {hasLive ? (
                      <>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          LIVE
                        </span>
                        <p className="text-lg font-extrabold text-stone-900 leading-none">
                          {formatWait(h.wait_minutes!)}
                        </p>
                        <span
                          className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${severityPill(h.wait_minutes!)}`}
                        >
                          {severityWord(h.wait_minutes!)}
                        </span>
                      </>
                    ) : displayWait !== null ? (
                      <>
                        <span className="text-[10px] font-bold text-stone-400 uppercase">
                          estimated wait
                        </span>
                        <p className="text-lg font-extrabold text-stone-500 leading-none mt-0.5">
                          ~{formatWait(displayWait)}
                        </p>
                        {h.pct_within_4h !== null && (
                          <p className="text-[10px] text-stone-400 mt-1">
                            {h.pct_within_4h}% done within 4 hrs
                          </p>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-stone-400">no data yet</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="text-xs text-stone-400 mt-4 max-w-2xl">
            <strong>LIVE</strong> rows come straight from a trust&apos;s
            real-time feed, as of our latest collection.{" "}
            <strong>Estimated wait</strong> rows are our estimates derived
            from NHS England&apos;s monthly performance statistics — a fair
            guide, but not today&apos;s queue.
          </p>
        </>
      )}
    </div>
  );
}
