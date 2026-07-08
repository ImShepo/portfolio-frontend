export const LOCALES = ["en", "es", "pt", "fr", "it"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function parseLocale(value: string | undefined | null): Locale {
  if (value && isLocale(value)) return value;
  return DEFAULT_LOCALE;
}

export const LOCALE_COOKIE = "portfolio-locale";
