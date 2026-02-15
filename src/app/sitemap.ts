// File: src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getProducts } from "../lib/products";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "../lib/i18n";
import { getSiteUrl } from "../SEO/metadata";

const baseUrl = getSiteUrl();

const toLocalePath = (locale: Locale, routePath: string) => {
  if (locale === DEFAULT_LOCALE) {
    return routePath;
  }

  return routePath === "/" ? `/${locale}` : `/${locale}${routePath}`;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ["/", "/about", "/products", "/contact"];

  const staticEntries: MetadataRoute.Sitemap = SUPPORTED_LOCALES.flatMap((locale) =>
    staticRoutes.map((routePath) => ({
      url: `${baseUrl}${toLocalePath(locale, routePath)}`,
      lastModified: now,
      changeFrequency:
        routePath === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: routePath === "/" ? 1 : 0.8,
    }))
  );

  const productEntries: MetadataRoute.Sitemap = (
    await Promise.all(
      SUPPORTED_LOCALES.map(async (locale) => {
        const products = await getProducts(locale);
        return products.products.map((product) => ({
          url: `${baseUrl}${toLocalePath(locale, `/products/${product.slug}`)}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }));
      })
    )
  ).flat();

  return [...staticEntries, ...productEntries];
}
