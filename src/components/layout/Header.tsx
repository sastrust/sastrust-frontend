// File: src/components/layout/Header.tsx
import Image from "next/image";
import Link from "next/link";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import { DEFAULT_LOCALE } from "../../lib/i18n";

export default function Header({
  locale,
  nav,
}: {
  locale: string;
  nav: {
    home: string;
    about: string;
    products: string;
    contact: string;
    searchPlaceholder: string;
    searchButton: string;
    primaryNavAriaLabel: string;
    languageSelectorAriaLabel: string;
    mobileMenuOpenLabel: string;
    mobileMenuCloseLabel: string;
  };
}) {
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return (
    <header>
      {/* Header shell: brand/logo area + nav + search + language switcher. */}
      <div className="container">
        <div className="header-row">
          <div className="brand">
            {/* Brand/Logo placeholder */}
            <Link href={base || "/"} className="brand-mark">
              <span className="brand-logo brand-logo-dark">
                <Image
                  src="/sastrust-beige-header.png"
                  alt="Sastrust"
                  width={182}
                  height={62}
                />
              </span>
              <span className="brand-logo brand-logo-light">
                <Image
                  src="/sastrust-white-header.png"
                  alt="Sastrust"
                  width={182}
                  height={43}
                />
              </span>
            </Link>
          </div>
          <NavMenu
            locale={locale}
            ariaLabel={nav.primaryNavAriaLabel}
            openLabel={nav.mobileMenuOpenLabel}
            closeLabel={nav.mobileMenuCloseLabel}
            searchPlaceholder={nav.searchPlaceholder}
            searchButton={nav.searchButton}
            languageSelectorAriaLabel={nav.languageSelectorAriaLabel}
            labels={nav}
          />
          <div className="header-actions header-actions-desktop">
            <SearchBar
              placeholder={nav.searchPlaceholder}
              buttonText={nav.searchButton}
            />
            <LanguageSwitcher ariaLabel={nav.languageSelectorAriaLabel} />
          </div>
        </div>
      </div>
    </header>
  );
}
