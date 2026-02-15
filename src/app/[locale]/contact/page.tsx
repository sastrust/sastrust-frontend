// File: src/app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import ContactFormSection from "../../../components/sections/ContactFormSection";
import MapSection from "../../../components/sections/MapSection";
import { getContent } from "../../../lib/content";
import { buildPageMetadata, normalizeLocale } from "../../../SEO/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const normalized = normalizeLocale(locale);

  return buildPageMetadata({
    locale: normalized,
    page: "contact",
    routePath: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getContent(locale);
  const components = content.components;

  return (
    <>
      {/* Component: ContactFormSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ContactFormSection.tsx */}
      <ContactFormSection locale={locale} {...components.contactForm} />
      {/* Component: MapSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/MapSection.tsx */}
      <MapSection {...components.map} />
    </>
  );
}
