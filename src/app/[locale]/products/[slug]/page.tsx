// File: src/app/[locale]/products/[slug]/page.tsx
import type { Metadata } from "next";
import ProductDetailSection from "../../../../components/sections/ProductDetailSection";
import ImageGallerySection from "../../../../components/sections/ImageGallerySection";
import CtaGridSection from "../../../../components/sections/CtaGridSection";
import { getContent } from "../../../../lib/content";
import { getProducts } from "../../../../lib/products";
import { notFound } from "next/navigation";
import {
  buildPageMetadata,
  buildProductMetadata,
  normalizeLocale,
} from "../../../../SEO/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const normalized = normalizeLocale(locale);
  const products = await getProducts(normalized);
  const product = products.products.find((item) => item.slug === slug);

  if (!product) {
    return buildPageMetadata({
      locale: normalized,
      page: "products",
      routePath: "/products",
    });
  }

  return buildProductMetadata({
    locale: normalized,
    slug,
    title: product.title,
    subtitle: product.subtitle,
    imageUrl: product.imageUrl,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await getContent(locale);
  const components = content.components;
  const products = await getProducts(locale);
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
