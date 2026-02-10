// File: src/lib/content.ts
import { cache } from "react";
import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "./i18n";

const asString = (value: unknown) => (typeof value === "string" ? value : "");
const asArray = <T>(value: unknown, map: (item: unknown) => T): T[] =>
  Array.isArray(value) ? value.map(map) : [];

const normalizeContent = (raw: any) => {
  const components = raw?.components ?? {};

  return {
    navigation: {
      home: asString(raw?.navigation?.home),
      about: asString(raw?.navigation?.about),
      products: asString(raw?.navigation?.products),
      contact: asString(raw?.navigation?.contact),
      searchPlaceholder: asString(raw?.navigation?.searchPlaceholder),
      searchButton: asString(raw?.navigation?.searchButton),
    },
    components: {
      hero: {
        title: asString(components.hero?.title),
        imageUrl: asString(components.hero?.imageUrl),
      },
      origin: {
        body: asString(components.origin?.body),
      },
      valuesThree: {
        title: asString(components.valuesThree?.title),
        items: asArray(components.valuesThree?.items, (item) => ({
          title: asString((item as any)?.title),
          body: asString((item as any)?.body),
        })),
      },
      editorial: {
        eyebrow: asString(components.editorial?.eyebrow),
        title: asString(components.editorial?.title),
        body: asString(components.editorial?.body),
        imageUrl: asString(components.editorial?.imageUrl ?? components.editorial?.imageLabel),
      },
      statement: {
        eyebrow: asString(components.statement?.eyebrow),
        title: asString(components.statement?.title),
        body: asString(components.statement?.body),
        highlight: asString(components.statement?.highlight),
      },
      valuesGrid: {
        eyebrow: asString(components.valuesGrid?.eyebrow),
        title: asString(components.valuesGrid?.title),
        items: asArray(components.valuesGrid?.items, (item) => ({
          title: asString((item as any)?.title),
          body: asString((item as any)?.body),
          imageUrl: asString((item as any)?.imageUrl ?? (item as any)?.imageLabel),
        })),
      },
      productTeaser: {
        eyebrow: asString(components.productTeaser?.eyebrow),
        title: asString(components.productTeaser?.title),
        body: asString(components.productTeaser?.body),
        ctaText: asString(components.productTeaser?.ctaText),
        imageUrl: asString(components.productTeaser?.imageUrl ?? components.productTeaser?.imageLabel),
      },
      transparency: {
        eyebrow: asString(components.transparency?.eyebrow),
        title: asString(components.transparency?.title),
        body: asString(components.transparency?.body),
        totalLabel: asString(components.transparency?.totalLabel),
        cards: asArray(components.transparency?.cards, (card) => ({
          label: asString((card as any)?.label),
          rows: asArray((card as any)?.rows, (row) => ({
            label: asString((row as any)?.label),
            value: asString((row as any)?.value),
          })),
          total: asString((card as any)?.total),
        })),
      },
      supplyChain: {
        eyebrow: asString(components.supplyChain?.eyebrow),
        title: asString(components.supplyChain?.title),
        body: asString(components.supplyChain?.body),
        steps: asArray(components.supplyChain?.steps, (step) => ({
          title: asString((step as any)?.title),
          body: asString((step as any)?.body),
        })),
        note: asString(components.supplyChain?.note),
      },
      pillars: {
        eyebrow: asString(components.pillars?.eyebrow),
        title: asString(components.pillars?.title),
        items: asArray(components.pillars?.items, (item) => ({
          title: asString((item as any)?.title),
          body: asString((item as any)?.body),
          imageUrl: asString((item as any)?.imageUrl ?? (item as any)?.imageLabel),
        })),
      },
      packaging: {
        eyebrow: asString(components.packaging?.eyebrow),
        title: asString(components.packaging?.title),
        body: asString(components.packaging?.body),
        imageUrl: asString(components.packaging?.imageUrl ?? components.packaging?.imageLabel),
      },
      gallery: {
        eyebrow: asString(components.gallery?.eyebrow),
        title: asString(components.gallery?.title),
        items: asArray(components.gallery?.items, (item) => ({
          imageUrl: asString((item as any)?.imageUrl ?? (item as any)?.label),
        })),
      },
      ctaGrid: {
        eyebrow: asString(components.ctaGrid?.eyebrow),
        title: asString(components.ctaGrid?.title),
        items: asArray(components.ctaGrid?.items, (item) => ({
          title: asString((item as any)?.title),
          ctaText: asString((item as any)?.ctaText),
          imageUrl: asString((item as any)?.imageUrl ?? (item as any)?.imageLabel),
        })),
      },
      contactForm: {
        eyebrow: asString(components.contactForm?.eyebrow),
        title: asString(components.contactForm?.title),
        body: asString(components.contactForm?.body),
        fields: {
          name: asString(components.contactForm?.fields?.name),
          email: asString(components.contactForm?.fields?.email),
          message: asString(components.contactForm?.fields?.message),
        },
        recaptchaLabel: asString(components.contactForm?.recaptchaLabel),
        submitText: asString(components.contactForm?.submitText),
      },
      map: {
        eyebrow: asString(components.map?.eyebrow),
        title: asString(components.map?.title),
        body: asString(components.map?.body),
        mapLabel: asString(components.map?.mapLabel),
      },
      faq: {
        eyebrow: asString(components.faq?.eyebrow),
        title: asString(components.faq?.title),
        items: asArray(components.faq?.items, (item) => ({
          question: asString((item as any)?.question),
          answer: asString((item as any)?.answer),
        })),
      },
    },
  };
};

export const getContent = cache(async (locale: string) => {
  const normalized = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;
  const filePath = path.join(process.cwd(), "content", `${normalized}.json`);

  try {
    const raw = await readFile(filePath, "utf8");
    return normalizeContent(JSON.parse(raw));
  } catch {
    notFound();
  }
});
