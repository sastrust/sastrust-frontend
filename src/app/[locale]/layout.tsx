// File: src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CookieConsent from "../../components/layout/CookieConsent";
import { getContent } from "../../lib/content";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getContent(locale);

  return (
    <>
      {/* Layout shell: header + main + footer */}
      <Header locale={locale} nav={content.navigation} />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
