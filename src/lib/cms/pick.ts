import { DEFAULT_LOCALE, type Locale } from "@/lib/locales";

export type PickTextOptions = {
  locale?: Locale;
  cmsEnValue?: string;
};

/**
 * Prefer CMS copy when it is explicitly translated for the active locale.
 * If the locale slice matches English (or no English baseline), use i18n fallback.
 */
export function pickText(
  cmsValue: string | undefined,
  fallback: string,
  options?: PickTextOptions,
): string {
  const trimmed = cmsValue?.trim();
  if (!trimmed) return fallback;

  const locale = options?.locale;
  const cmsEn = options?.cmsEnValue?.trim();

  if (locale && locale !== DEFAULT_LOCALE) {
    if (!cmsEn || trimmed === cmsEn) {
      return fallback;
    }
  }

  return trimmed;
}

export function pickProjectField(
  value: string,
  enValue: string | undefined,
  fallback: string,
  locale: Locale,
): string {
  const trimmed = value.trim();
  if (!trimmed) return fallback;

  const cmsEn = enValue?.trim();
  if (locale !== DEFAULT_LOCALE) {
    if (!cmsEn || trimmed === cmsEn) {
      return fallback;
    }
  }

  return trimmed;
}
