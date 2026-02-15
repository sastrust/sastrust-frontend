// File: src/app/[locale]/products/page.tsx
import type { Metadata } from "next";
import ProductGridSection from "../../../components/sections/ProductGridSection";
import { getProducts } from "../../../lib/products";
import { buildPageMetadata, normalizeLocale } from "../../../SEO/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const normalized = normalizeLocale(locale);

  return buildPageMetadata({
    locale: normalized,
    page: "products",
    routePath: "/products",
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await getProducts(locale);

  return (
    <>
      {/* Component: ProductGridSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ProductGridSection.tsx */}
      <ProductGridSection locale={locale} {...products} />
    </>
  );
}
