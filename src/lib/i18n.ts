// File: src/lib/i18n.ts
export const DEFAULT_LOCALE = "tr" as const;
export const SUPPORTED_LOCALES = ["tr", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
