// File: src/SEO/metadata.ts
import type { Metadata } from "next";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "../lib/i18n";

type PageKey = "home" | "about" | "products" | "contact";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const BRAND_NAME = "Sastrust";

const seoCopy: Record<
  Locale,
  {
    siteDescription: string;
    pages: Record<PageKey, { title: string; description: string }>;
  }
> = {
  tr: {
    siteDescription:
      "Sastrust, gömleklerde yakayı ve manşeti belirleyen görünmeyen interlining çözümleri geliştirir.",
    pages: {
      home: {
        title: "Sastrust | Behind The Seen",
        description:
          "Gömleğin görünmeyen katmanında kaliteyi belirleyen tela çözümleriyle markalara net duruş kazandırıyoruz.",
      },
      about: {
        title: "Hakkımızda | Sastrust",
        description:
          "Sastrust’un yaklaşımı, değerleri ve görünmeyen kaliteyi ulaşılabilir kılan üretim anlayışı.",
      },
      products: {
        title: "Ürünler | Sastrust",
        description:
          "Yaka, manşet ve pat için geliştirilmiş gömlek telalarını teknik parametrelerle inceleyin.",
      },
      contact: {
        title: "İletişim | Sastrust",
        description:
          "Numune talebi ve teknik danışmanlık için Sastrust ekibiyle iletişime geçin.",
      },
    },
  },
  en: {
    siteDescription:
      "Sastrust develops interlining solutions that define collar and cuff quality in finished shirts.",
    pages: {
      home: {
        title: "Sastrust | Behind The Seen",
        description:
          "We shape shirt quality through high-performance interlining systems built for modern brands.",
      },
      about: {
        title: "About | Sastrust",
        description:
          "Learn about Sastrust values, craft mindset, and how we make premium structure more accessible.",
      },
      products: {
        title: "Products | Sastrust",
        description:
          "Explore shirt interlinings for collar, cuff, and placket with technical characteristics.",
      },
      contact: {
        title: "Contact | Sastrust",
        description:
          "Get in touch with Sastrust for sampling and technical guidance.",
      },
    },
  },
};

const toLocalePath = (locale: Locale, routePath: string) => {
  if (locale === DEFAULT_LOCALE) {
    return routePath;
  }

  return routePath === "/" ? `/${locale}` : `/${locale}${routePath}`;
};

const absoluteUrl = (routePath: string) => new URL(routePath, SITE_URL).toString();

const buildLanguageAlternates = (routePath: string) =>
  SUPPORTED_LOCALES.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = absoluteUrl(toLocalePath(locale, routePath));
    return acc;
  }, {});

export const normalizeLocale = (locale: string): Locale =>
  SUPPORTED_LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE;

export const getSiteUrl = () => SITE_URL;

export const buildPageMetadata = ({
  locale,
  page,
  routePath,
}: {
  locale: Locale;
  page: PageKey;
  routePath: string;
}): Metadata => {
  const copy = seoCopy[locale].pages[page];

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(toLocalePath(locale, routePath)),
      languages: buildLanguageAlternates(routePath),
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(toLocalePath(locale, routePath)),
      title: copy.title,
      description: copy.description,
      siteName: BRAND_NAME,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: [{ url: "/sastrust-beige-footer.png", width: 1200, height: 392 }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ["/sastrust-beige-footer.png"],
    },
  };
};

export const buildProductMetadata = ({
  locale,
  slug,
  title,
  subtitle,
  imageUrl,
}: {
  locale: Locale;
  slug: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}): Metadata => {
  const routePath = `/products/${slug}`;
  const fullTitle =
    locale === "tr" ? `${title} | Ürün Detayı | Sastrust` : `${title} | Product Details | Sastrust`;
  const description = subtitle || seoCopy[locale].pages.products.description;
  const image = imageUrl || "/sastrust-beige-footer.png";

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: {
      canonical: absoluteUrl(toLocalePath(locale, routePath)),
      languages: buildLanguageAlternates(routePath),
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(toLocalePath(locale, routePath)),
      title: fullTitle,
      description,
      siteName: BRAND_NAME,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
};

export const getSiteDescription = (locale: Locale) => seoCopy[locale].siteDescription;
