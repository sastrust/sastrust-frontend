// File: src/app/[locale]/page.tsx
import type { Metadata } from "next";
import HeroSection from "../../components/sections/HeroSection";
import OriginSection from "../../components/sections/OriginSection";
import ValuesThreeSection from "../../components/sections/ValuesThreeSection";
import StatementSection from "../../components/sections/StatementSection";
import ProductTeaserSection from "../../components/sections/ProductTeaserSection";
import { getContent } from "../../lib/content";
import { buildPageMetadata, normalizeLocale } from "../../SEO/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const normalized = normalizeLocale(locale);

  return buildPageMetadata({
    locale: normalized,
    page: "home",
    routePath: "/",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getContent(locale);
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
      <ProductTeaserSection locale={locale} {...components.productTeaser} />
    </>
  );
}
