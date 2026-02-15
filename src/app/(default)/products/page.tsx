// File: src/app/(default)/products/page.tsx
import type { Metadata } from "next";
import ProductGridSection from "../../../components/sections/ProductGridSection";
import { getProducts } from "../../../lib/products";
import { buildPageMetadata } from "../../../SEO/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "tr",
  page: "products",
  routePath: "/products",
});

export default async function ProductsPage() {
  const products = await getProducts("tr");

  return (
    <>
      {/* Component: ProductGridSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ProductGridSection.tsx */}
      <ProductGridSection locale="tr" {...products} />
    </>
  );
}
