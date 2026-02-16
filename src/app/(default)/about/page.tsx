// File: src/app/(default)/about/page.tsx
import type { Metadata } from "next";
import EditorialSection from "../../../components/sections/EditorialSection";
import StatementSection from "../../../components/sections/StatementSection";
import ImageGallerySection from "../../../components/sections/ImageGallerySection";
import CtaGridSection from "../../../components/sections/CtaGridSection";
import { getContent } from "../../../lib/content";
import { buildPageMetadata } from "../../../SEO/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "tr",
  page: "about",
  routePath: "/about",
});

export default async function AboutPage() {
  const content = await getContent("tr");
  const components = content.components;

  return (
    <>
      {/* Component: EditorialSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/EditorialSection.tsx */}
      <EditorialSection {...components.editorial} />
      {/* Component: StatementSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/StatementSection.tsx */}
      <StatementSection {...components.statement} />
      {/* Component: ImageGallerySection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ImageGallerySection.tsx */}
      <ImageGallerySection {...components.gallery} />
      {/* Component: CtaGridSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/CtaGridSection.tsx */}
      <CtaGridSection locale="tr" {...components.ctaGrid} />
    </>
  );
}
