// File: src/app/(default)/products/[slug]/page.tsx
import type { Metadata } from "next";
import ProductDetailSection from "../../../../components/sections/ProductDetailSection";
import ImageGallerySection from "../../../../components/sections/ImageGallerySection";
import CtaGridSection from "../../../../components/sections/CtaGridSection";
import { getContent } from "../../../../lib/content";
import { getProductLocaleSlugs, getProducts } from "../../../../lib/products";
import { notFound } from "next/navigation";
import { buildPageMetadata, buildProductMetadata } from "../../../../SEO/metadata";
import { buildBreadcrumbJsonLd, buildProductJsonLd } from "../../../../SEO/jsonLd";

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

  const localizedSlugs = await getProductLocaleSlugs(product.productKey);

  return buildProductMetadata({
    locale: "tr",
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

  const localizedSlugs = await getProductLocaleSlugs(product.productKey);
  const productJsonLd = buildProductJsonLd({
    locale: "tr",
    product,
    localizedSlugs,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd({
    locale: "tr",
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
      <ProductDetailSection locale="tr" {...product.detail} />
      {/* Component: ImageGallerySection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ImageGallerySection.tsx */}
      <ImageGallerySection {...components.gallery} />
      {/* Component: CtaGridSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/CtaGridSection.tsx */}
      <CtaGridSection locale="tr" {...components.ctaGrid} />
    </>
  );
}
