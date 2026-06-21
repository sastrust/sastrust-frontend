// File: src/app/(default)/page.tsx
import type { Metadata } from "next";
import HeroSection from "../../components/sections/HeroSection";
import OriginSection from "../../components/sections/OriginSection";
import ValuesThreeSection from "../../components/sections/ValuesThreeSection";
import StatementSection from "../../components/sections/StatementSection";
import ProductTeaserSection from "../../components/sections/ProductTeaserSection";
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
      <HeroSection slides={components.hero.slides} />
      {/* Component: OriginSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/OriginSection.tsx */}
      <OriginSection {...components.origin} />
      {/* Component: ValuesThreeSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ValuesThreeSection.tsx */}
      <ValuesThreeSection {...components.valuesThree} />
      {/* Component: StatementSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/StatementSection.tsx */}
      <StatementSection {...components.statement} />
      {/* Component: ProductTeaserSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ProductTeaserSection.tsx */}
      <ProductTeaserSection locale="tr" {...components.productTeaser} />
    </>
  );
}
