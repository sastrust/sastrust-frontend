// File: src/app/(default)/products/[slug]/page.tsx
import ProductDetailSection from "../../../../components/sections/ProductDetailSection";
import ImageGallerySection from "../../../../components/sections/ImageGallerySection";
import CtaGridSection from "../../../../components/sections/CtaGridSection";
import { getContent } from "../../../../lib/content";
import { getProducts } from "../../../../lib/products";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContent("tr");
  const components = content.components;
  const products = await getProducts("tr");
  const product = products.products?.find(
    (item: { slug: string }) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* Component: ProductDetailSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ProductDetailSection.tsx */}
      <ProductDetailSection {...product.detail} />
      {/* Component: ImageGallerySection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ImageGallerySection.tsx */}
      <ImageGallerySection {...components.gallery} />
      {/* Component: CtaGridSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/CtaGridSection.tsx */}
      <CtaGridSection {...components.ctaGrid} />
    </>
  );
}
