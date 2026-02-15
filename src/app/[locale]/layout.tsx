// File: src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CookieConsent from "../../components/layout/CookieConsent";
import BackToTop from "../../components/layout/BackToTop";
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
    <div lang={locale}>
      {/* Layout shell: header + main + footer */}
      <Header locale={locale} nav={content.navigation} />
      <main>{children}</main>
      <Footer locale={locale} nav={content.navigation} footer={content.components.footer} />
      <CookieConsent {...content.components.cookieConsent} />
      <BackToTop {...content.components.backToTop} />
    </div>
  );
}
