import type { MetadataRoute } from "next";

const LOCALHOST_PATTERN = /^https?:\/\/localhost(:\d+)?(\/|$)/i;
function getBaseUrl(): string {
  const u = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (process.env.NODE_ENV === "production") {
    if (!u || LOCALHOST_PATTERN.test(u)) return "";
    return u;
  }
  return u || "http://localhost:3000";
}
const BASE_URL = getBaseUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/debug/", "/loading"],
    },
    ...(BASE_URL ? { sitemap: `${BASE_URL}/sitemap.xml` } : {}),
  };
}
