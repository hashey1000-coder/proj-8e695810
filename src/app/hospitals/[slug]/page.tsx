import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getHospitalBySlug,
  getHospitalReadings,
  getAllHospitalsWithWaits,
  getNationalStats,
} from "@/lib/data/hospitals";
import {
  formatWaitTime,
  waitSeverity,
  severityLabel,
  severityPill,
  severityDotColor,
  haversineDistance,
} from "@/lib/utils";
import { getHospitalImage } from "@/lib/hospital-images";
import { HospitalHistory } from "@/components/HospitalHistory";
import { TimeAgo } from "@/components/TimeAgo";
import type { Metadata } from "next";

export function generateStaticParams() {
  const hospitals = getAllHospitalsWithWaits();
  return hospitals.map((h) => ({ slug: h.slug }));
}

function deptLabel(type: string): string {
  return type === "UTC" ? "urgent treatment centre" : type === "MIU" ? "minor injuries unit" : "A&E";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hospital = getHospitalBySlug(slug);
  if (!hospital) return { title: "Hospital Not Found" };
  const imageUrl = getHospitalImage(slug) || hospital.image_url;
  // Only promise "live" data in metadata when this hospital actually has
  // a reporting feed — Welsh trusts and others without one get honest copy.
  const hasLive = hospital.wait_minutes !== null;
  return {
    title: hasLive
      ? `${hospital.name} A&E Wait Time Today — Live Queue Check`
      : `${hospital.name} A&E Waiting Times & Department Info`,
    description: hasLive
      ? `How long is the wait at ${hospital.name} right now? Live queue data for this ${hospital.city ?? "UK"} ${deptLabel(hospital.type)}, plus 24-hour trends and quicker alternatives nearby.`
      : `Waiting-time information for ${hospital.name} in ${hospital.city ?? "the UK"}: typical waits, opening hours, contact details and nearby ${deptLabel(hospital.type)} alternatives with live queues.`,
    alternates: { canonical: `/hospitals/${slug}/` },
    openGraph: imageUrl ? { images: [{ url: imageUrl }] } : undefined,
  };
}

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hospital = getHospitalBySlug(slug);
  if (!hospital) notFound();

  const readings = getHospitalReadings(hospital.id, 24);
  const severity = waitSeverity(hospital.wait_minutes);

  const allHospitals = getAllHospitalsWithWaits();
  const nationalAvg = getNationalStats().avgWait;
  // Nearest departments by distance, capped at 100 km so a hospital in a
  // sparse area never recommends "alternatives" hundreds of kilometres away.
  // Hospitals without live data still appear — a real A&E 40 km away is a
  // better suggestion than one across the country that happens to have a feed.
  const nearby =
    hospital.lat && hospital.lng
      ? allHospitals
          .filter((h) => h.id !== hospital.id && h.lat !== null && h.lng !== null)
          .map((h) => ({
            ...h,
            distance: haversineDistance(hospital.lat!, hospital.lng!, h.lat!, h.lng!),
          }))
          .filter((h) => h.distance <= 100)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5)
      : [];

  const prevReading = readings.length > 1 ? readings[1] : null;
  const change =
    hospital.wait_minutes !== null &&
    prevReading?.wait_minutes !== null &&
    prevReading?.wait_minutes !== undefined
      ? hospital.wait_minutes - prevReading.wait_minutes
      : null;

  const departments: string[] = hospital.departments
    ? JSON.parse(hospital.departments)
    : [];

  const hospitalFaqs = buildLocalFaqs(hospital);
  const imageUrl = getHospitalImage(slug) || hospital.image_url;
  const is24h = hospital.opening_hours?.includes("24");

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Hospital",
      name: hospital.name,
      url: `https://aewaittimes.co.uk/hospitals/${slug}/`,
      ...(imageUrl ? { image: imageUrl } : {}),
      ...(hospital.phone ? { telephone: hospital.phone } : {}),
      ...(is24h ? { openingHours: "Mo-Su 00:00-24:00" } : {}),
      address: {
        "@type": "PostalAddress",
        ...(hospital.address ? { streetAddress: hospital.address } : {}),
        ...(hospital.city ? { addressLocality: hospital.city } : {}),
        ...(hospital.postcode ? { postalCode: hospital.postcode } : {}),
        addressCountry: "GB",
      },
      ...(hospital.lat !== null && hospital.lng !== null
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: hospital.lat,
              longitude: hospital.lng,
            },
          }
        : {}),
      ...(hospital.trust_name
        ? {
            parentOrganization: {
              "@type": "MedicalOrganization",
              name: hospital.trust_name,
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://aewaittimes.co.uk/" },
        { "@type": "ListItem", position: 2, name: "Live Waits", item: "https://aewaittimes.co.uk/hospitals/" },
        { "@type": "ListItem", position: 3, name: hospital.name },
      ],
    },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Dark header band carrying the live figure */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <nav className="text-xs font-semibold text-slate-500 mb-5 uppercase tracking-wide">
            <Link href="/" className="hover:text-teal-400">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/hospitals" className="hover:text-teal-400">Live waits</Link>
            {hospital.region && (
              <>
                <span className="mx-1.5">/</span>
                <Link
                  href={`/regions/${hospital.region.toLowerCase().replace(/\s+&\s+/g, "-and-").replace(/\s+/g, "-")}`}
                  className="hover:text-teal-400"
                >
                  {hospital.region}
                </Link>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide ${
                    is24h
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-300 border border-slate-700"
                  }`}
                >
                  {is24h ? "Open around the clock" : hospital.opening_hours || "Hours vary"}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  {hospital.type === "UTC"
                    ? "Urgent Treatment Centre"
                    : hospital.type === "MIU"
                      ? "Minor Injuries Unit"
                      : "Emergency Dept (Type 1)"}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                {hospital.name}
              </h1>
              <p className="text-slate-400 mt-2 text-sm">
                {hospital.city}
                {hospital.postcode ? ` · ${hospital.postcode}` : ""} · data via{" "}
                {hospital.trust_name}
                {hospital.source_timestamp && (
                  <>
                    {" · read "}
                    <TimeAgo timestamp={hospital.source_timestamp} />
                  </>
                )}
              </p>
              {hospital.aliases && (
                <p className="text-xs text-slate-500 mt-1.5">
                  Locals may know it as: {hospital.aliases}
                </p>
              )}
            </div>

            {/* Live figure */}
            <div className="shrink-0 rounded-2xl bg-slate-800/80 border border-slate-700 px-6 py-5 md:text-right">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                {hospital.type === "AE" ? "Time in department now" : "Current wait"}
              </p>
              {hospital.wait_minutes !== null ? (
                <>
                  <div className="flex md:justify-end items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold text-white">
                      {formatWaitTime(hospital.wait_minutes)}
                    </span>
                  </div>
                  <div className="flex md:justify-end items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide ${severityPill(severity)}`}
                    >
                      {severityLabel(severity)}
                    </span>
                    {change !== null && change !== 0 && (
                      <span
                        className={`text-xs font-bold ${change < 0 ? "text-emerald-400" : "text-rose-400"}`}
                      >
                        {change > 0 ? "▲" : "▼"} {Math.abs(change)} min since last reading
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-slate-300">No live feed</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {hospital.avg_wait !== null
                      ? `Usual figure here: ~${formatWaitTime(hospital.avg_wait)}`
                      : nationalAvg > 0
                        ? `National average: ~${formatWaitTime(nationalAvg)}`
                        : "Check back after the next data run"}
                  </p>
                </>
              )}
              {(hospital.patients_waiting !== null || hospital.total_patients !== null) && (
                <div className="flex md:justify-end gap-5 mt-3 pt-3 border-t border-slate-700">
                  {hospital.patients_waiting !== null && (
                    <span className="text-xs text-slate-400">
                      <strong className="text-white text-sm">{hospital.patients_waiting}</strong>{" "}
                      queueing
                    </span>
                  )}
                  {hospital.total_patients !== null && (
                    <span className="text-xs text-slate-400">
                      <strong className="text-white text-sm">{hospital.total_patients}</strong>{" "}
                      in dept
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {hospital.trust_source_url && (
            <p className="mt-5 text-xs text-slate-500">
              Primary source:{" "}
              <a
                href={hospital.trust_source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 underline underline-offset-2"
              >
                {hospital.trust_name} — published waiting times
              </a>
              {hospital.country === "Wales" && (
                <span className="text-slate-600">
                  {" "}
                  (NHS Wales has withdrawn its live feed, so no current figure
                  is available)
                </span>
              )}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {imageUrl && (
              <div className="relative h-52 md:h-72 w-full rounded-xl overflow-hidden border border-stone-200">
                <Image
                  src={imageUrl}
                  alt={`${hospital.name} exterior`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                  unoptimized
                />
              </div>
            )}

            {hospital.about_text && (
              <div className="rounded-xl border border-stone-200 bg-white p-6 border-l-4 border-l-teal-600">
                <h2 className="text-lg font-extrabold text-stone-900 mb-3">
                  About this department
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {hospital.about_text}
                </p>
              </div>
            )}

            {/* Practical details */}
            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-extrabold text-stone-900 mb-4">
                Getting there &amp; getting in touch
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                {hospital.address && (
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400">
                      Address
                    </dt>
                    <dd className="text-stone-800 mt-1 font-medium">{hospital.address}</dd>
                  </div>
                )}
                {hospital.city && (
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400">
                      Town / postcode
                    </dt>
                    <dd className="text-stone-800 mt-1 font-medium">
                      {hospital.city}
                      {hospital.postcode ? `, ${hospital.postcode}` : ""}
                    </dd>
                  </div>
                )}
                {hospital.phone && (
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400">
                      Switchboard
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${hospital.phone}`}
                        className="font-bold text-teal-700 hover:underline"
                      >
                        {hospital.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {hospital.opening_hours && (
                  <div>
                    <dt className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400">
                      Hours
                    </dt>
                    <dd className="text-stone-800 mt-1 font-medium">{hospital.opening_hours}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400">
                    Run by
                  </dt>
                  <dd className="text-stone-800 mt-1 font-medium">{hospital.trust_name}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400">
                    Service level
                  </dt>
                  <dd className="text-stone-800 mt-1 font-medium">
                    {hospital.type === "UTC"
                      ? "Urgent Treatment Centre"
                      : hospital.type === "MIU"
                        ? "Minor Injuries Unit"
                        : "Full A&E (Type 1 emergency department)"}
                  </dd>
                </div>
              </dl>
            </div>

            {departments.length > 0 && (
              <div className="rounded-xl border border-stone-200 bg-white p-6">
                <h2 className="text-lg font-extrabold text-stone-900 mb-4">
                  On-site services
                </h2>
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <span
                      key={dept}
                      className="px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {readings.length > 0 && (
              <HospitalHistory readings={readings} hospitalName={hospital.name} />
            )}

            {/* Context paragraph */}
            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-extrabold text-stone-900 mb-3">
                How this compares locally
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {hospital.wait_minutes !== null ? (
                  <>
                    Right now the reading here is{" "}
                    <strong>{formatWaitTime(hospital.wait_minutes)}</strong>.{" "}
                    {(() => {
                      const regionHospitals = allHospitals.filter(
                        (h) => h.region === hospital.region && h.wait_minutes !== null
                      );
                      if (regionHospitals.length < 2) return null;
                      const avgWait = Math.round(
                        regionHospitals.reduce((sum, h) => sum + (h.wait_minutes || 0), 0) /
                          regionHospitals.length
                      );
                      const diff = hospital.wait_minutes! - avgWait;
                      return (
                        <>
                          The {hospital.region} average sits near{" "}
                          <strong>{formatWaitTime(avgWait)}</strong>.{" "}
                          {diff > 30
                            ? "This department is running well above its neighbours — check the alternatives panel before setting off."
                            : diff < -30
                              ? "This department is currently one of the calmer options in its area."
                              : "This department is tracking close to the local norm."}
                        </>
                      );
                    })()}
                  </>
                ) : (
                  `There's no recent reading for ${hospital.name}. Check back shortly, or ring the trust for the current picture.`
                )}
              </p>
              {hospital.type === "AE" && (
                <Link
                  href="/guides/ae-vs-urgent-care"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:underline"
                >
                  Not sure A&amp;E is the right door? Read this first →
                </Link>
              )}
            </div>

            {hospitalFaqs.length > 0 && (
              <div className="rounded-xl border border-stone-200 bg-white p-6">
                <h2 className="text-lg font-extrabold text-stone-900 mb-4">
                  Quick answers for {hospital.name}
                </h2>
                <div className="space-y-4">
                  {hospitalFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className="border-b border-stone-100 last:border-0 pb-4 last:pb-0"
                    >
                      <h3 className="text-sm font-bold text-stone-900 mb-1.5">{faq.q}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {nearby.length > 0 && (
              <div className="rounded-xl border border-stone-200 bg-white p-5">
                <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide mb-4">
                  Could you be seen sooner?
                </h2>
                <div className="space-y-2.5">
                  {nearby.map((h) => {
                    const s = waitSeverity(h.wait_minutes);
                    return (
                      <Link
                        key={h.id}
                        href={`/hospitals/${h.slug}`}
                        className="flex items-center justify-between gap-3 p-3 rounded-lg border border-stone-100 hover:border-teal-300 hover:bg-teal-50/40 transition-all"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-stone-900 truncate">{h.name}</p>
                          <p className="text-xs text-stone-500">
                            {h.distance.toFixed(1)} km
                            {h.type !== "AE" ? ` · ${h.type}` : ""}
                          </p>
                        </div>
                        {h.wait_minutes !== null ? (
                          <span className="flex items-center gap-1.5 shrink-0">
                            <span className={`w-2 h-2 rounded-full ${severityDotColor(s)}`} />
                            <span className="text-sm font-extrabold text-stone-900 whitespace-nowrap">
                              {h.wait_minutes}m
                            </span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-stone-400 shrink-0 text-right">
                            no feed
                            {h.avg_wait !== null && (
                              <span className="block">~{h.avg_wait}m usual</span>
                            )}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/near-me"
                  className="mt-4 block text-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
                >
                  Rank everything near me
                </Link>
              </div>
            )}

            {/* Status legend */}
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide mb-3">
                What the labels mean
              </h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-1 rounded-md text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                    Quiet
                  </span>
                  <span className="text-stone-600 text-xs">under 2 hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-1 rounded-md text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800">
                    Steady
                  </span>
                  <span className="text-stone-600 text-xs">2 to 4 hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-1 rounded-md text-[10px] font-extrabold uppercase bg-rose-100 text-rose-800">
                    Busy
                  </span>
                  <span className="text-stone-600 text-xs">over 4 hours</span>
                </div>
              </div>
            </div>

            {/* Guide links */}
            <div className="rounded-xl border border-stone-200 bg-white p-5">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide mb-3">
                Worth reading first
              </h2>
              <div className="space-y-2">
                {[
                  { href: "/guides/ae-vs-urgent-care", label: "A&E or urgent care — choosing well" },
                  { href: "/guides/cut-your-ae-wait", label: "Ways to spend less time waiting" },
                  { href: "/guides/quietest-times-to-visit", label: "The hours when queues shrink" },
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

            {/* Emergency reminder */}
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-5">
              <h2 className="text-sm font-extrabold text-rose-900 mb-1.5">
                Don&apos;t wait on a webpage
              </h2>
              <p className="text-xs text-rose-800 leading-relaxed">
                If someone is seriously unwell — chest pain, stroke signs, heavy
                bleeding, struggling to breathe — call <strong>999</strong>{" "}
                immediately instead of comparing queues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildLocalFaqs(hospital: {
  name: string;
  city: string | null;
  wait_minutes: number | null;
  opening_hours: string | null;
  type: string;
  postcode: string | null;
}) {
  const faqs: { q: string; a: string }[] = [];
  const dept = deptLabel(hospital.type);

  faqs.push({
    q: `What's the current wait at ${hospital.name}?`,
    a:
      hospital.wait_minutes !== null
        ? `The latest published reading is about ${formatWaitTime(hospital.wait_minutes)}. That comes straight from the trust's own feed and shifts through the day — and remember triage decides the order patients are seen, so a genuinely urgent case never waits for the whole queue.`
        : `No live figure is being published for ${hospital.name} at the moment. It's worth refreshing later, or phoning the hospital before travelling if timing matters to you.`,
  });

  faqs.push({
    q: `Is the ${dept} at ${hospital.name} open right now?`,
    a: hospital.opening_hours?.includes("24")
      ? `Yes — this ${dept} never closes. It runs 24 hours a day every day of the year, with no appointment needed; arrivals are triaged and treated in order of clinical urgency.`
      : `Opening hours here are: ${hospital.opening_hours || "not confirmed — ring ahead"}. Outside those times, calling 111 will point you to the nearest open alternative.`,
  });

  if (hospital.type === "AE") {
    faqs.push({
      q: `Would somewhere other than ${hospital.name} treat me faster?`,
      a: `Quite possibly, if your problem isn't life-threatening. Urgent treatment centres and minor injuries units around ${hospital.city || "the area"} handle sprains, cuts, minor burns and simple fractures with far shorter queues. The nearby-departments panel on this page shows live figures for the closest options, and 111 can book timed slots at some of them.`,
    });
  }

  faqs.push({
    q: `Where exactly is ${hospital.name}?`,
    a: `It's in ${hospital.city || "the local area"}${hospital.postcode ? ` (${hospital.postcode})` : ""}. Pop your own postcode into our distance search to see how far it is from you compared with the other departments nearby.`,
  });

  faqs.push({
    q: `When does this ${dept} tend to be calmest?`,
    a: `Across the UK the pattern is consistent: the lightest traffic is between roughly 6am and 9am, and the heaviest crunch lands on Monday mornings, weekday evenings, and Friday and Saturday nights. If your condition can safely wait for a quieter window, an early start usually pays off.`,
  });

  return faqs;
}
