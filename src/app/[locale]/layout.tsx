// File: src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CookieConsent from "../../components/layout/CookieConsent";
import BackToTop from "../../components/layout/BackToTop";
import { getContent } from "../../lib/content";
import { normalizeLocale } from "../../SEO/metadata";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "../../SEO/jsonLd";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalized = normalizeLocale(locale);
  const content = await getContent(normalized);
  const organizationJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebSiteJsonLd(normalized);

  return (
    <div lang={normalized}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* Layout shell: header + main + footer */}
      <Header locale={normalized} nav={content.navigation} />
      <main>{children}</main>
      <Footer
        locale={normalized}
        nav={content.navigation}
        footer={content.components.footer}
      />
      <CookieConsent {...content.components.cookieConsent} />
      <BackToTop {...content.components.backToTop} />
    </div>
  );
}
