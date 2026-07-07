import "server-only";

import { messages, type Locale } from "@/i18n/messages";
import { getRequestLocale } from "@/lib/locale.server";

function getNested(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

export function translate(locale: Locale, key: string): string {
  const value = getNested(messages[locale] as Record<string, unknown>, key);
  return typeof value === "string" ? value : key;
}

export async function getServerTranslations() {
  const locale = await getRequestLocale();
  return {
    locale,
    t: (key: string) => translate(locale, key),
  };
}
