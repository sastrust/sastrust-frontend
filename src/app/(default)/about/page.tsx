// File: src/app/(default)/about/page.tsx
import EditorialSection from "../../../components/sections/EditorialSection";
import StatementSection from "../../../components/sections/StatementSection";
import ImageGallerySection from "../../../components/sections/ImageGallerySection";
import CtaGridSection from "../../../components/sections/CtaGridSection";
import { getContent } from "../../../lib/content";

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
      <CtaGridSection {...components.ctaGrid} />
    </>
  );
}
