// File: src/app/robots.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "../SEO/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
    host: getSiteUrl(),
  };
}
