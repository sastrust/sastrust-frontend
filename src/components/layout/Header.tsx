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
                <Image src="/logo.svg" alt="Sastrust" width={220} height={58} />
              </span>
              <span className="brand-logo brand-logo-light">
                <Image src="/logo-white.svg" alt="Sastrust" width={220} height={58} />
              </span>
            </Link>
          </div>
          <NavMenu
            locale={locale}
            ariaLabel={nav.primaryNavAriaLabel}
            labels={nav}
          />
          <div className="header-actions">
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
