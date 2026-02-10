// File: src/app/(default)/layout.tsx
import type { ReactNode } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CookieConsent from "../../components/layout/CookieConsent";
import { getContent } from "../../lib/content";

export default async function DefaultLocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  const content = await getContent("tr");

  return (
    <>
      <Header locale="tr" nav={content.navigation} />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
