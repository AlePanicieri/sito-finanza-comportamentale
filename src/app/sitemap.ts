import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { ASSETS } from "@/lib/assets";
import { SCENARIOS } from "@/lib/scenarios";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seavessiinvestito.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/simula`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/crolli`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/guide`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/chi-siamo`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE_URL}/guide/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const assetRoutes: MetadataRoute.Sitemap = ASSETS.map((a) => ({
    url: `${SITE_URL}/simula/${a.ticker}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const scenarioRoutes: MetadataRoute.Sitemap = SCENARIOS.map((s) => ({
    url: `${SITE_URL}/crolli/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...assetRoutes, ...scenarioRoutes, ...articleRoutes];
}
