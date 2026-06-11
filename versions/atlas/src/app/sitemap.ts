import type { MetadataRoute } from "next";
import { allIdeas } from "@/data/ideas";
import { categories } from "@/data/categories";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/ideas/`, priority: 0.9 },
    { url: `${SITE_URL}/collections/`, priority: 0.7 },
    { url: `${SITE_URL}/about/`, priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/categories/${c.slug}/`,
    priority: 0.7,
  }));

  const ideaPages: MetadataRoute.Sitemap = allIdeas.map((idea) => ({
    url: `${SITE_URL}/ideas/${idea.slug}/`,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...ideaPages];
}
