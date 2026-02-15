// File: src/app/(default)/contact/page.tsx
import type { Metadata } from "next";
import ContactFormSection from "../../../components/sections/ContactFormSection";
import MapSection from "../../../components/sections/MapSection";
import { getContent } from "../../../lib/content";
import { buildPageMetadata } from "../../../SEO/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "tr",
  page: "contact",
  routePath: "/contact",
});

export default async function ContactPage() {
  const content = await getContent("tr");
  const components = content.components;

  return (
    <>
      {/* Component: ContactFormSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/ContactFormSection.tsx */}
      <ContactFormSection locale="tr" {...components.contactForm} />
      {/* Component: MapSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/MapSection.tsx */}
      <MapSection {...components.map} />
    </>
  );
}
