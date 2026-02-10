// File: src/app/[locale]/products/page.tsx
import ProductGridSection from "../../../components/sections/ProductGridSection";
import { getProducts } from "../../../lib/products";

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
