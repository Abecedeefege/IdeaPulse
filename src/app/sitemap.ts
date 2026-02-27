import type { MetadataRoute } from "next";
import { trendingRequests } from "@/data/trending-requests";
import { curatedIdeas } from "@/data/curated-ideas";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/top-ideas`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/signup`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/onboarding`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const trendingPages = trendingRequests.map((req) => ({
    url: `${BASE_URL}/trending/${req.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const curatedPages = curatedIdeas.map((c) => ({
    url: `${BASE_URL}/idea/curated/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...trendingPages, ...curatedPages];
}
