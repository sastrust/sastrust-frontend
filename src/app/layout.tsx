// File: src/app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { getSiteDescription, getSiteUrl } from "../SEO/metadata";

const adobeKitId = process.env.NEXT_PUBLIC_ADOBE_KIT_ID;
const adobeKitHref = adobeKitId ? `https://use.typekit.net/${adobeKitId}.css` : "";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Sastrust | Behind The Seen",
  description: getSiteDescription("tr"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <head>
        {adobeKitHref ? (
          <link rel="stylesheet" href={adobeKitHref} />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
