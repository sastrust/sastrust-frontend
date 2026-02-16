// File: src/app/[locale]/products/[slug]/page.tsx
import type { Metadata } from "next";
import ProductDetailSection from "../../../../components/sections/ProductDetailSection";
import ImageGallerySection from "../../../../components/sections/ImageGallerySection";
import CtaGridSection from "../../../../components/sections/CtaGridSection";
import { getContent } from "../../../../lib/content";
import { getProductLocaleSlugs, getProducts } from "../../../../lib/products";
import { notFound } from "next/navigation";
import {
  buildPageMetadata,
  buildProductMetadata,
  normalizeLocale,
} from "../../../../SEO/metadata";
import { buildBreadcrumbJsonLd, buildProductJsonLd } from "../../../../SEO/jsonLd";

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

  const localizedSlugs = await getProductLocaleSlugs(product.productKey);

  return buildProductMetadata({
    locale: normalized,
    slug: product.slug,
    title: product.title,
    subtitle: product.subtitle,
    imageUrl: product.imageUrl,
    localizedSlugs,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const normalized = normalizeLocale(locale);
  const content = await getContent(normalized);
  const components = content.components;
  const products = await getProducts(normalized);
  const product = products.products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const localizedSlugs = await getProductLocaleSlugs(product.productKey);
  const productJsonLd = buildProductJsonLd({
    locale: normalized,
    product,
    localizedSlugs,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd({
    locale: normalized,
    productTitle: product.title,
    productSlug: product.slug,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Component: ProductDetailSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ProductDetailSection.tsx */}
      <ProductDetailSection locale={normalized} {...product.detail} />
      {/* Component: ImageGallerySection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ImageGallerySection.tsx */}
      <ImageGallerySection {...components.gallery} />
      {/* Component: CtaGridSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/CtaGridSection.tsx */}
      <CtaGridSection locale={normalized} {...components.ctaGrid} />
    </>
  );
}
