// File: src/app/(default)/page.tsx
import type { Metadata } from "next";
import HeroSection from "../../components/sections/HeroSection";
import OriginSection from "../../components/sections/OriginSection";
import ValuesThreeSection from "../../components/sections/ValuesThreeSection";
import StatementSection from "../../components/sections/StatementSection";
import ProductTeaserSection from "../../components/sections/ProductTeaserSection";
import TransparencyBreakdownSection from "../../components/sections/TransparencyBreakdownSection";
import SupplyChainSection from "../../components/sections/SupplyChainSection";
import SustainabilityPillarsSection from "../../components/sections/SustainabilityPillarsSection";
import PackagingSection from "../../components/sections/PackagingSection";
import ImageGallerySection from "../../components/sections/ImageGallerySection";
import CtaGridSection from "../../components/sections/CtaGridSection";
import { getContent } from "../../lib/content";
import { buildPageMetadata } from "../../SEO/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "tr",
  page: "home",
  routePath: "/",
});

export default async function HomePage() {
  const content = await getContent("tr");
  const components = content.components;

  return (
    <>
      {/* Component: HeroSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/HeroSection.tsx */}
      <HeroSection title={components.hero.title} imageUrl={components.hero.imageUrl} />
      {/* Component: OriginSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/OriginSection.tsx */}
      <OriginSection {...components.origin} />
      {/* Component: ValuesThreeSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ValuesThreeSection.tsx */}
      <ValuesThreeSection {...components.valuesThree} />
      {/* Component: StatementSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/StatementSection.tsx */}
      <StatementSection {...components.statement} />
      {/* Component: ProductTeaserSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ProductTeaserSection.tsx */}
      <ProductTeaserSection locale="tr" {...components.productTeaser} />
      {/* Component: TransparencyBreakdownSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/TransparencyBreakdownSection.tsx */}
      <TransparencyBreakdownSection {...components.transparency} />
      {/* Component: SupplyChainSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/SupplyChainSection.tsx */}
      <SupplyChainSection {...components.supplyChain} />
      {/* Component: SustainabilityPillarsSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/SustainabilityPillarsSection.tsx */}
      <SustainabilityPillarsSection {...components.pillars} />
      {/* Component: PackagingSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/PackagingSection.tsx */}
      <PackagingSection {...components.packaging} />
      {/* Component: ImageGallerySection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ImageGallerySection.tsx */}
      <ImageGallerySection {...components.gallery} />
      {/* Component: CtaGridSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/CtaGridSection.tsx */}
      <CtaGridSection locale="tr" {...components.ctaGrid} />
    </>
  );
}
