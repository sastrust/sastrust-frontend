// File: src/components/layout/LanguageSwitcher.tsx
// Language toggle between /tr and /en.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "../../lib/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/tr";
  const parts = pathname.split("/");
  const segment = parts[1] as Locale | undefined;
  const current = SUPPORTED_LOCALES.includes(segment as Locale)
    ? (segment as Locale)
    : DEFAULT_LOCALE;

  const makeHref = (locale: Locale) => {
    const basePath =
      current === DEFAULT_LOCALE
        ? pathname
        : pathname.replace(`/${current}`, "") || "/";

    if (locale === DEFAULT_LOCALE) {
      return basePath === "" ? "/" : basePath;
    }

    return `/${locale}${basePath === "/" ? "" : basePath}`;
  };

  return (
    <div aria-label="Language selector" className="lang">
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
