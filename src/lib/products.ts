// File: src/lib/products.ts
import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "./i18n";

type JsonObject = Record<string, unknown>;

const isObject = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const pick = (source: unknown, ...keys: string[]): unknown =>
  keys.reduce<unknown>((acc, key) => (isObject(acc) ? acc[key] : undefined), source);

const asString = (value: unknown) => (typeof value === "string" ? value : "");

const asArray = <T>(value: unknown, map: (item: unknown) => T): T[] =>
  Array.isArray(value) ? value.map(map) : [];

const asStringOrStringArray = (value: unknown): string | string[] => {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return "";
};

const asRecord = (value: unknown): Record<string, string | string[]> => {
  if (!isObject(value)) {
    return {};
  }

  return Object.entries(value).reduce<Record<string, string | string[]>>(
    (acc, [key, raw]) => {
      const normalized = asStringOrStringArray(raw);
      if (
        (typeof normalized === "string" && normalized.trim()) ||
        (Array.isArray(normalized) && normalized.length > 0)
      ) {
        acc[key] = normalized;
      }
      return acc;
    },
    {}
  );
};

const normalizeProducts = (raw: unknown) => ({
  eyebrow: asString(pick(raw, "eyebrow")),
  title: asString(pick(raw, "title")),
  filterLabel: asString(pick(raw, "filterLabel")),
  sortLabel: asString(pick(raw, "sortLabel")),
  filters: asArray(pick(raw, "filters"), (filter) => ({
    title: asString(pick(filter, "title")),
    options: asArray(pick(filter, "options"), (option) => asString(option)),
  })),
  products: asArray(pick(raw, "products"), (product) => ({
    productKey: asString(pick(product, "productKey")) || asString(pick(product, "id")),
    slug: asString(pick(product, "slug")),
    title: asString(pick(product, "title")),
    subtitle: asString(pick(product, "subtitle")),
    imageUrl: asString(pick(product, "imageUrl")) || asString(pick(product, "imageLabel")),
    parameters: asRecord(pick(product, "parameters")),
    detail: {
      eyebrow: asString(pick(product, "detail", "eyebrow")),
      title: asString(pick(product, "detail", "title")),
      body: asString(pick(product, "detail", "body")),
      bullets: asArray(pick(product, "detail", "bullets"), (item) => asString(item)),
      buttonText: asString(pick(product, "detail", "buttonText")),
      mainImageUrl:
        asString(pick(product, "detail", "mainImageUrl")) ||
        asString(pick(product, "detail", "mainImageLabel")),
      gallery: asArray(pick(product, "detail", "gallery"), (item) => asString(item)),
    },
  })),
});

export type ProductsContent = ReturnType<typeof normalizeProducts>;
export type ProductItem = ProductsContent["products"][number];
export type ProductLocaleSlugs = Partial<Record<Locale, string>>;

export const getProducts = async (locale: string): Promise<ProductsContent> => {
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
};

const getLocalizedProductSlugMap = async (): Promise<
  Record<string, ProductLocaleSlugs>
> => {
  const localeEntries = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => {
      const products = await getProducts(locale);
      return { locale, products: products.products };
    })
  );

  return localeEntries.reduce<Record<string, ProductLocaleSlugs>>((acc, entry) => {
    entry.products.forEach((product) => {
      if (!product.productKey || !product.slug) {
        return;
      }

      if (!acc[product.productKey]) {
        acc[product.productKey] = {};
      }

      acc[product.productKey][entry.locale] = product.slug;
    });

    return acc;
  }, {});
};

export const getProductLocaleSlugs = async (
  productKey: string
): Promise<ProductLocaleSlugs> => {
  if (!productKey) {
    return {};
  }

  const mapByProductKey = await getLocalizedProductSlugMap();
  return mapByProductKey[productKey] || {};
};
