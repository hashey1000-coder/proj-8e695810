import type { MetadataRoute } from "next";
import { getAllHospitalsWithWaits, getRegions } from "@/lib/data/hospitals";
import { GUIDES } from "@/lib/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aewaittimes.co.uk";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "hourly", priority: 1.0 },
    { url: `${baseUrl}/hospitals/`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/regions/`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/near-me/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/statistics/`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/guides/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const hospitals = getAllHospitalsWithWaits();
  const hospitalPages: MetadataRoute.Sitemap = hospitals.map((h) => ({
    url: `${baseUrl}/hospitals/${h.slug}/`,
    lastModified: now,
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  const regions = getRegions();
  const regionPages: MetadataRoute.Sitemap = regions.map((r) => ({
    url: `${baseUrl}/regions/${r.region.toLowerCase().replace(/\s+&\s+/g, "-and-").replace(/\s+/g, "-")}/`,
    lastModified: now,
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...hospitalPages, ...regionPages, ...guidePages];
}
