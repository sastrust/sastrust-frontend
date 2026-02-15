// File: src/components/layout/Header.tsx
import Image from "next/image";
import Link from "next/link";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import { DEFAULT_LOCALE } from "../../lib/i18n";
import { getProducts } from "../../lib/products";
import type { SearchItem } from "../../lib/search";

export default async function Header({
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
  const [products, trProducts, enProducts] = await Promise.all([
    getProducts(locale),
    getProducts("tr"),
    getProducts("en"),
  ]);

  const trById = new Map(
    trProducts.products
      .filter(
        (product: { productKey: string; slug: string }) =>
          product.productKey && product.slug
      )
      .map((product: { productKey: string; slug: string }) => [product.productKey, product.slug])
  );

  const enById = new Map(
    enProducts.products
      .filter(
        (product: { productKey: string; slug: string }) =>
          product.productKey && product.slug
      )
      .map((product: { productKey: string; slug: string }) => [product.productKey, product.slug])
  );

  const trToEn = Object.fromEntries(
    [...trById.entries()]
      .map(([id, trSlug]) => [trSlug, enById.get(id)])
      .filter((entry): entry is [string, string] => Boolean(entry[1]))
  );

  const enToTr = Object.fromEntries(
    [...enById.entries()]
      .map(([id, enSlug]) => [enSlug, trById.get(id)])
      .filter((entry): entry is [string, string] => Boolean(entry[1]))
  );

  const productSlugMap = { trToEn, enToTr };

  const pageItems: SearchItem[] = [
    {
      id: "page-home",
      label: nav.home,
      href: base || "/",
      keywords: locale === "tr" ? "anasayfa" : "home",
    },
    {
      id: "page-about",
      label: nav.about,
      href: base ? `${base}/about` : "/about",
      keywords: locale === "tr" ? "hakkımızda marka hikaye" : "about brand story",
    },
    {
      id: "page-products",
      label: nav.products,
      href: base ? `${base}/products` : "/products",
      keywords: locale === "tr" ? "ürünler tela katalog" : "products interlining catalog",
    },
    {
      id: "page-contact",
      label: nav.contact,
      href: base ? `${base}/contact` : "/contact",
      keywords: locale === "tr" ? "iletişim form eposta" : "contact form email",
    },
  ];

  const productItems: SearchItem[] = products.products.map(
    (product: {
      productKey: string;
      slug: string;
      title: string;
      subtitle: string;
    }) => ({
      id: product.productKey
        ? `product-${product.productKey}`
        : `product-${product.slug}`,
      label: product.title,
      description: product.subtitle,
      href: base ? `${base}/products/${product.slug}` : `/products/${product.slug}`,
      keywords: locale === "tr" ? "gömlek yaka manşet tela" : "shirt collar cuff interlining",
    })
  );

  const searchItems = [...pageItems, ...productItems];
  const searchNoResultsText =
    locale === "tr" ? "Sonuç bulunamadı" : "No results found";

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
                  width={874}
                  height={179}
                  className="brand-logo-image"
                />
              </span>
              <span className="brand-logo brand-logo-light">
                <Image
                  src="/sastrust-white-header.png"
                  alt="Sastrust"
                  width={914}
                  height={188}
                  className="brand-logo-image"
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
            searchItems={searchItems}
            searchNoResultsText={searchNoResultsText}
            languageSelectorAriaLabel={nav.languageSelectorAriaLabel}
            productSlugMap={productSlugMap}
            labels={nav}
          />
          <div className="header-actions header-actions-desktop">
            <SearchBar
              locale={locale}
              placeholder={nav.searchPlaceholder}
              buttonText={nav.searchButton}
              items={searchItems}
              noResultsText={searchNoResultsText}
            />
            <LanguageSwitcher
              ariaLabel={nav.languageSelectorAriaLabel}
              productSlugMap={productSlugMap}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
