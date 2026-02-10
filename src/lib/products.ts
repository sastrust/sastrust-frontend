// File: src/lib/products.ts
import { cache } from "react";
import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "./i18n";

const asString = (value: unknown) => (typeof value === "string" ? value : "");
const asArray = <T>(value: unknown, map: (item: unknown) => T): T[] =>
  Array.isArray(value) ? value.map(map) : [];

const normalizeProducts = (raw: any) => {
  return {
    eyebrow: asString(raw?.eyebrow),
    title: asString(raw?.title),
    filterLabel: asString(raw?.filterLabel),
    sortLabel: asString(raw?.sortLabel),
    filters: asArray(raw?.filters, (filter) => ({
      title: asString((filter as any)?.title),
      options: asArray((filter as any)?.options, (opt) => asString(opt)),
    })),
    products: asArray(raw?.products, (product) => ({
      slug: asString((product as any)?.slug),
      title: asString((product as any)?.title),
      subtitle: asString((product as any)?.subtitle),
      imageUrl: asString((product as any)?.imageUrl ?? (product as any)?.imageLabel),
      detail: {
        eyebrow: asString((product as any)?.detail?.eyebrow),
        title: asString((product as any)?.detail?.title),
        body: asString((product as any)?.detail?.body),
        bullets: asArray((product as any)?.detail?.bullets, (item) => asString(item)),
        buttonText: asString((product as any)?.detail?.buttonText),
        mainImageUrl: asString(
          (product as any)?.detail?.mainImageUrl ??
            (product as any)?.detail?.mainImageLabel
        ),
        gallery: asArray((product as any)?.detail?.gallery, (item) => asString(item)),
      },
    })),
  };
};

export const getProducts = cache(async (locale: string) => {
  const normalized = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;
  const filePath = path.join(process.cwd(), "content", `products-${normalized}.json`);

  try {
    const raw = await readFile(filePath, "utf8");
    return normalizeProducts(JSON.parse(raw));
  } catch {
    notFound();
  }
});
