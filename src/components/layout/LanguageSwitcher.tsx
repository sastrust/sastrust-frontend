// File: src/components/layout/LanguageSwitcher.tsx
// Language toggle between /tr and /en.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "../../lib/i18n";

type ProductSlugMap = {
  trToEn: Record<string, string>;
  enToTr: Record<string, string>;
};

export default function LanguageSwitcher({
  ariaLabel,
  productSlugMap,
}: {
  ariaLabel: string;
  productSlugMap?: ProductSlugMap;
}) {
  const pathname = usePathname() || "/tr";
  const parts = pathname.split("/");
  const segment = parts[1] as Locale | undefined;
  const current = SUPPORTED_LOCALES.includes(segment as Locale)
    ? (segment as Locale)
    : DEFAULT_LOCALE;

  const makeHref = (locale: Locale) => {
    const basePathRaw =
      current === DEFAULT_LOCALE
        ? pathname
        : pathname.replace(`/${current}`, "") || "/";

    const routeParts = basePathRaw.split("/").filter(Boolean);
    const isProductDetailRoute =
      routeParts.length >= 2 &&
      routeParts[0] === "products" &&
      typeof routeParts[1] === "string";

    if (isProductDetailRoute && productSlugMap) {
      const currentSlug = routeParts[1];
      let targetSlug: string | undefined = currentSlug;

      if (current === "tr" && locale === "en") {
        targetSlug = productSlugMap.trToEn[currentSlug];
      } else if (current === "en" && locale === "tr") {
        targetSlug = productSlugMap.enToTr[currentSlug];
      }

      if (targetSlug) {
        routeParts[1] = targetSlug;
      } else if (locale !== current) {
        // If translation is missing, go to target locale products list instead of 404.
        routeParts.splice(1);
      }
    }

    const basePath = routeParts.length > 0 ? `/${routeParts.join("/")}` : "/";

    if (locale === DEFAULT_LOCALE) {
      return basePath === "" ? "/" : basePath;
    }

    return `/${locale}${basePath === "/" ? "" : basePath}`;
  };

  return (
    <div aria-label={ariaLabel} className="lang">
      <Link href={makeHref("tr")} aria-current={current === "tr" ? "page" : undefined}>
        TR
      </Link>
      <span aria-hidden="true">/</span>
      <Link href={makeHref("en")} aria-current={current === "en" ? "page" : undefined}>
        EN
      </Link>
    </div>
  );
}
