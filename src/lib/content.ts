// File: src/lib/content.ts
import { cache } from "react";
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

const normalizeContent = (raw: unknown) => ({
  navigation: {
    home: asString(pick(raw, "navigation", "home")),
    about: asString(pick(raw, "navigation", "about")),
    products: asString(pick(raw, "navigation", "products")),
    contact: asString(pick(raw, "navigation", "contact")),
    searchPlaceholder: asString(pick(raw, "navigation", "searchPlaceholder")),
    searchButton: asString(pick(raw, "navigation", "searchButton")),
    primaryNavAriaLabel: asString(pick(raw, "navigation", "primaryNavAriaLabel")),
    languageSelectorAriaLabel: asString(
      pick(raw, "navigation", "languageSelectorAriaLabel")
    ),
    mobileMenuOpenLabel: asString(pick(raw, "navigation", "mobileMenuOpenLabel")),
    mobileMenuCloseLabel: asString(pick(raw, "navigation", "mobileMenuCloseLabel")),
  },
  components: {
    hero: {
      title: asString(pick(raw, "components", "hero", "title")),
      imageUrl: asString(pick(raw, "components", "hero", "imageUrl")),
    },
    origin: {
      body: asString(pick(raw, "components", "origin", "body")),
    },
    valuesThree: {
      title: asString(pick(raw, "components", "valuesThree", "title")),
      items: asArray(pick(raw, "components", "valuesThree", "items"), (item) => ({
        title: asString(pick(item, "title")),
        body: asString(pick(item, "body")),
      })),
    },
    editorial: {
      eyebrow: asString(pick(raw, "components", "editorial", "eyebrow")),
      title: asString(pick(raw, "components", "editorial", "title")),
      body: asString(pick(raw, "components", "editorial", "body")),
      imageUrl:
        asString(pick(raw, "components", "editorial", "imageUrl")) ||
        asString(pick(raw, "components", "editorial", "imageLabel")),
    },
    statement: {
      eyebrow: asString(pick(raw, "components", "statement", "eyebrow")),
      title: asString(pick(raw, "components", "statement", "title")),
      body: asString(pick(raw, "components", "statement", "body")),
      highlight: asString(pick(raw, "components", "statement", "highlight")),
    },
    valuesGrid: {
      eyebrow: asString(pick(raw, "components", "valuesGrid", "eyebrow")),
      title: asString(pick(raw, "components", "valuesGrid", "title")),
      items: asArray(pick(raw, "components", "valuesGrid", "items"), (item) => ({
        title: asString(pick(item, "title")),
        body: asString(pick(item, "body")),
        imageUrl: asString(pick(item, "imageUrl")) || asString(pick(item, "imageLabel")),
      })),
    },
    productTeaser: {
      eyebrow: asString(pick(raw, "components", "productTeaser", "eyebrow")),
      title: asString(pick(raw, "components", "productTeaser", "title")),
      body: asString(pick(raw, "components", "productTeaser", "body")),
      ctaText: asString(pick(raw, "components", "productTeaser", "ctaText")),
      imageUrl:
        asString(pick(raw, "components", "productTeaser", "imageUrl")) ||
        asString(pick(raw, "components", "productTeaser", "imageLabel")),
    },
    transparency: {
      eyebrow: asString(pick(raw, "components", "transparency", "eyebrow")),
      title: asString(pick(raw, "components", "transparency", "title")),
      body: asString(pick(raw, "components", "transparency", "body")),
      totalLabel: asString(pick(raw, "components", "transparency", "totalLabel")),
      cards: asArray(pick(raw, "components", "transparency", "cards"), (card) => ({
        label: asString(pick(card, "label")),
        rows: asArray(pick(card, "rows"), (row) => ({
          label: asString(pick(row, "label")),
          value: asString(pick(row, "value")),
        })),
        total: asString(pick(card, "total")),
      })),
    },
    supplyChain: {
      eyebrow: asString(pick(raw, "components", "supplyChain", "eyebrow")),
      title: asString(pick(raw, "components", "supplyChain", "title")),
      body: asString(pick(raw, "components", "supplyChain", "body")),
      steps: asArray(pick(raw, "components", "supplyChain", "steps"), (step) => ({
        title: asString(pick(step, "title")),
        body: asString(pick(step, "body")),
      })),
      note: asString(pick(raw, "components", "supplyChain", "note")),
    },
    pillars: {
      eyebrow: asString(pick(raw, "components", "pillars", "eyebrow")),
      title: asString(pick(raw, "components", "pillars", "title")),
      items: asArray(pick(raw, "components", "pillars", "items"), (item) => ({
        title: asString(pick(item, "title")),
        body: asString(pick(item, "body")),
        imageUrl: asString(pick(item, "imageUrl")) || asString(pick(item, "imageLabel")),
      })),
    },
    packaging: {
      eyebrow: asString(pick(raw, "components", "packaging", "eyebrow")),
      title: asString(pick(raw, "components", "packaging", "title")),
      body: asString(pick(raw, "components", "packaging", "body")),
      imageUrl:
        asString(pick(raw, "components", "packaging", "imageUrl")) ||
        asString(pick(raw, "components", "packaging", "imageLabel")),
    },
    gallery: {
      eyebrow: asString(pick(raw, "components", "gallery", "eyebrow")),
      title: asString(pick(raw, "components", "gallery", "title")),
      items: asArray(pick(raw, "components", "gallery", "items"), (item) => ({
        imageUrl: asString(pick(item, "imageUrl")) || asString(pick(item, "label")),
      })),
    },
    ctaGrid: {
      eyebrow: asString(pick(raw, "components", "ctaGrid", "eyebrow")),
      title: asString(pick(raw, "components", "ctaGrid", "title")),
      items: asArray(pick(raw, "components", "ctaGrid", "items"), (item) => ({
        title: asString(pick(item, "title")),
        ctaText: asString(pick(item, "ctaText")),
        ctaHref: asString(pick(item, "ctaHref")),
        imageUrl: asString(pick(item, "imageUrl")) || asString(pick(item, "imageLabel")),
      })),
    },
    footer: {
      brandTitle: asString(pick(raw, "components", "footer", "brandTitle")),
      brandBody: asString(pick(raw, "components", "footer", "brandBody")),
      pagesTitle: asString(pick(raw, "components", "footer", "pagesTitle")),
      contactTitle: asString(pick(raw, "components", "footer", "contactTitle")),
      email: asString(pick(raw, "components", "footer", "email")),
      phone: asString(pick(raw, "components", "footer", "phone")),
      instagramUrl: asString(pick(raw, "components", "footer", "instagramUrl")),
      instagramAriaLabel: asString(
        pick(raw, "components", "footer", "instagramAriaLabel")
      ),
      facebookUrl: asString(pick(raw, "components", "footer", "facebookUrl")),
      facebookAriaLabel: asString(
        pick(raw, "components", "footer", "facebookAriaLabel")
      ),
      designedByPrefix: asString(pick(raw, "components", "footer", "designedByPrefix")),
      designedByName: asString(pick(raw, "components", "footer", "designedByName")),
      designedByUrl: asString(pick(raw, "components", "footer", "designedByUrl")),
      designedByAriaLabel: asString(
        pick(raw, "components", "footer", "designedByAriaLabel")
      ),
    },
    cookieConsent: {
      ariaLabel: asString(pick(raw, "components", "cookieConsent", "ariaLabel")),
      body: asString(pick(raw, "components", "cookieConsent", "body")),
      acceptText: asString(pick(raw, "components", "cookieConsent", "acceptText")),
      declineText: asString(pick(raw, "components", "cookieConsent", "declineText")),
    },
    backToTop: {
      ariaLabel: asString(pick(raw, "components", "backToTop", "ariaLabel")),
      text: asString(pick(raw, "components", "backToTop", "text")),
    },
    contactForm: {
      eyebrow: asString(pick(raw, "components", "contactForm", "eyebrow")),
      title: asString(pick(raw, "components", "contactForm", "title")),
      body: asString(pick(raw, "components", "contactForm", "body")),
      fields: {
        name: asString(pick(raw, "components", "contactForm", "fields", "name")),
        email: asString(pick(raw, "components", "contactForm", "fields", "email")),
        message: asString(pick(raw, "components", "contactForm", "fields", "message")),
      },
      recaptchaLabel: asString(pick(raw, "components", "contactForm", "recaptchaLabel")),
      submitText: asString(pick(raw, "components", "contactForm", "submitText")),
      submitSuccessText: asString(
        pick(raw, "components", "contactForm", "submitSuccessText")
      ),
      submitErrorText: asString(pick(raw, "components", "contactForm", "submitErrorText")),
      recaptchaRequiredText: asString(
        pick(raw, "components", "contactForm", "recaptchaRequiredText")
      ),
      recaptchaUnavailableText: asString(
        pick(raw, "components", "contactForm", "recaptchaUnavailableText")
      ),
    },
    map: {
      eyebrow: asString(pick(raw, "components", "map", "eyebrow")),
      title: asString(pick(raw, "components", "map", "title")),
      body: asString(pick(raw, "components", "map", "body")),
      mapLabel: asString(pick(raw, "components", "map", "mapLabel")),
      mapUrl: asString(pick(raw, "components", "map", "mapUrl")),
      mapEmbedUrl: asString(pick(raw, "components", "map", "mapEmbedUrl")),
    },
    faq: {
      eyebrow: asString(pick(raw, "components", "faq", "eyebrow")),
      title: asString(pick(raw, "components", "faq", "title")),
      items: asArray(pick(raw, "components", "faq", "items"), (item) => ({
        question: asString(pick(item, "question")),
        answer: asString(pick(item, "answer")),
      })),
    },
  },
});

export type SiteContent = ReturnType<typeof normalizeContent>;

export const getContent = cache(async (locale: string): Promise<SiteContent> => {
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
