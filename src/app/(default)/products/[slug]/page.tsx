// File: src/app/(default)/products/[slug]/page.tsx
import type { Metadata } from "next";
import ProductDetailSection from "../../../../components/sections/ProductDetailSection";
import ImageGallerySection from "../../../../components/sections/ImageGallerySection";
import CtaGridSection from "../../../../components/sections/CtaGridSection";
import { getContent } from "../../../../lib/content";
import { getProducts } from "../../../../lib/products";
import { notFound } from "next/navigation";
import { buildPageMetadata, buildProductMetadata } from "../../../../SEO/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts("tr");
  const product = products.products.find((item) => item.slug === slug);

  if (!product) {
    return buildPageMetadata({
      locale: "tr",
      page: "products",
      routePath: "/products",
    });
  }

  return buildProductMetadata({
    locale: "tr",
    slug,
    title: product.title,
    subtitle: product.subtitle,
    imageUrl: product.imageUrl,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContent("tr");
  const components = content.components;
  const products = await getProducts("tr");
  const product = products.products.find((item) => item.slug === slug);

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
