import "server-only";

import { DEFAULT_LOCALE, type Locale } from "@/lib/locales";
import { getRequestLocale } from "@/lib/locale.server";

export type LocaleContentPair<T> = {
  locale: Locale;
  content: T;
  contentEn: T | null;
};

export async function loadWithEnglishBaseline<T>(
  loader: (locale: Locale) => Promise<T>,
): Promise<LocaleContentPair<T>> {
  const locale = await getRequestLocale();
  const [content, contentEn] = await Promise.all([
    loader(locale),
    loader(DEFAULT_LOCALE),
  ]);

  return {
    locale,
    content,
    contentEn: locale === DEFAULT_LOCALE ? null : contentEn,
  };
}
