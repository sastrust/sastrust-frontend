// File: src/components/layout/NavMenu.tsx
// Navigation: Home, About, Products, Contact
"use client";

import Link from "next/link";
import { useState } from "react";
import { DEFAULT_LOCALE } from "../../lib/i18n";
import type { SearchItem } from "../../lib/search";
import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";

type ProductSlugMap = {
  trToEn: Record<string, string>;
  enToTr: Record<string, string>;
};

export default function NavMenu({
  locale,
  ariaLabel,
  openLabel,
  closeLabel,
  searchPlaceholder,
  searchButton,
  searchItems,
  searchNoResultsText,
  languageSelectorAriaLabel,
  productSlugMap,
  labels,
}: {
  locale: string;
  ariaLabel: string;
  openLabel: string;
  closeLabel: string;
  searchPlaceholder: string;
  searchButton: string;
  searchItems: SearchItem[];
  searchNoResultsText: string;
  languageSelectorAriaLabel: string;
  productSlugMap: ProductSlugMap;
  labels: { home: string; about: string; products: string; contact: string };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return (
    <div className="nav-shell">
      <nav aria-label={ariaLabel} className="nav nav-desktop">
        <ul className="nav-list">
          <li>
            <Link href={base || "/"}>{labels.home}</Link>
          </li>
          <li>
            <Link href={base ? `${base}/about` : "/about"}>{labels.about}</Link>
          </li>
          <li>
            <Link href={base ? `${base}/products` : "/products"}>{labels.products}</Link>
          </li>
          <li>
            <Link href={base ? `${base}/contact` : "/contact"}>{labels.contact}</Link>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        className="menu-toggle"
        aria-label={isOpen ? closeLabel : openLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="menu-toggle-icon" aria-hidden="true">
          {isOpen ? "×" : "☰"}
        </span>
      </button>

      {isOpen ? (
        <nav aria-label={ariaLabel} className="nav-mobile">
          <div className="nav-mobile-tools">
            <SearchBar
              locale={locale}
              placeholder={searchPlaceholder}
              buttonText={searchButton}
              items={searchItems}
              noResultsText={searchNoResultsText}
              onNavigate={() => setIsOpen(false)}
            />
            <LanguageSwitcher
              ariaLabel={languageSelectorAriaLabel}
              productSlugMap={productSlugMap}
            />
          </div>
          <ul className="nav-mobile-list">
            <li>
              <Link href={base || "/"} onClick={() => setIsOpen(false)}>
                {labels.home}
              </Link>
            </li>
            <li>
              <Link href={base ? `${base}/about` : "/about"} onClick={() => setIsOpen(false)}>
                {labels.about}
              </Link>
            </li>
            <li>
              <Link
                href={base ? `${base}/products` : "/products"}
                onClick={() => setIsOpen(false)}
              >
                {labels.products}
              </Link>
            </li>
            <li>
              <Link
                href={base ? `${base}/contact` : "/contact"}
                onClick={() => setIsOpen(false)}
              >
                {labels.contact}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
