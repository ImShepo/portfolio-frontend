import "server-only";

import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  parseLocale,
  type Locale,
} from "@/lib/locales";

export async function getRequestLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    return parseLocale(cookieStore.get(LOCALE_COOKIE)?.value ?? DEFAULT_LOCALE);
  } catch {
    return DEFAULT_LOCALE;
  }
}
