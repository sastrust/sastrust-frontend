// File: src/SEO/jsonLd.ts
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "../lib/i18n";
import type { ProductItem, ProductLocaleSlugs } from "../lib/products";
import { getSiteUrl } from "./metadata";

const BRAND_NAME = "Sastrust";
const SITE_URL = getSiteUrl();

const toLocalePath = (locale: Locale, routePath: string) => {
  if (locale === DEFAULT_LOCALE) {
    return routePath;
  }

  return routePath === "/" ? `/${locale}` : `/${locale}${routePath}`;
};

const absoluteUrl = (routePath: string) => new URL(routePath, SITE_URL).toString();

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const uniqueImages = (images: string[]) => Array.from(new Set(images.filter(Boolean)));

export const buildOrganizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/sastrust-beige-footer.png"),
});

export const buildWebSiteJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND_NAME,
  url: absoluteUrl(toLocalePath(locale, "/")),
  inLanguage: locale,
});

export const buildBreadcrumbJsonLd = ({
  locale,
  productTitle,
  productSlug,
}: {
  locale: Locale;
  productTitle: string;
  productSlug: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: locale === "tr" ? "Ana Sayfa" : "Home",
      item: absoluteUrl(toLocalePath(locale, "/")),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: locale === "tr" ? "Ürünler" : "Products",
      item: absoluteUrl(toLocalePath(locale, "/products")),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: productTitle,
      item: absoluteUrl(toLocalePath(locale, `/products/${productSlug}`)),
    },
  ],
});

export const buildProductJsonLd = ({
  locale,
  product,
  localizedSlugs,
}: {
  locale: Locale;
  product: ProductItem;
  localizedSlugs?: ProductLocaleSlugs;
}) => {
  const images = uniqueImages([
    product.imageUrl,
    product.detail.mainImageUrl,
    ...product.detail.gallery,
  ]).map((image) => absoluteUrl(image));

  const alternateUrls = SUPPORTED_LOCALES.reduce<Record<string, string>>((acc, localeKey) => {
    const localizedSlug = localizedSlugs?.[localeKey];
    const targetSlug = localizedSlug || product.slug;
    acc[localeKey] = absoluteUrl(toLocalePath(localeKey, `/products/${targetSlug}`));
    return acc;
  }, {});

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: stripHtml(product.title),
    description: stripHtml(product.subtitle || product.detail.body),
    image: images,
    sku: product.productKey || product.slug,
    category: locale === "tr" ? "Gömlek Telası" : "Shirt Interlining",
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    url: alternateUrls[locale],
    inLanguage: locale,
    isRelatedTo: Object.values(alternateUrls),
    additionalProperty: Object.entries(product.parameters).map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value: Array.isArray(value) ? value.join(", ") : value,
    })),
  };
};
