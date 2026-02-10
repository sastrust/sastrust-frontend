// File: src/app/[locale]/contact/page.tsx
import ContactFormSection from "../../../components/sections/ContactFormSection";
import MapSection from "../../../components/sections/MapSection";
import { getContent } from "../../../lib/content";

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
      <ContactFormSection {...components.contactForm} />
      {/* Component: MapSection - /Users/omerozen/Documents/New project/atalay/src/components/sections/MapSection.tsx */}
      <MapSection {...components.map} />
    </>
  );
}
