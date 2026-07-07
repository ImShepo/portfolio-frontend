"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  startTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { messages, defaultLocale, type Locale, type Messages } from "./messages";
import { LOCALE_COOKIE } from "@/lib/locales";

const STORAGE_KEY = "portfolio-locale";

function writeLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;sameSite=lax`;
}

const localeListeners = new Set<() => void>();

function emitLocaleChange() {
  localeListeners.forEach((listener) => listener());
}

function subscribeLocale(callback: () => void) {
  localeListeners.add(callback);
  return () => {
    localeListeners.delete(callback);
  };
}

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === "en" || stored === "es" || stored === "pt" || stored === "fr"))
      return stored;
  } catch {
    // ignore
  }
  return defaultLocale;
}

function getLocaleSnapshot(): Locale {
  return getStoredLocale();
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  messages: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getNested(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

export function I18nProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    () => initialLocale,
  );

  const setLocale = useCallback(
    (newLocale: Locale) => {
      try {
        localStorage.setItem(STORAGE_KEY, newLocale);
      } catch {
        // ignore
      }
      writeLocaleCookie(newLocale);
      emitLocaleChange();

      startTransition(() => {
        router.refresh();
      });
    },
    [router],
  );

  useEffect(() => {
    const stored = getStoredLocale();
    writeLocaleCookie(stored);
    document.documentElement.lang = stored;

    if (stored !== initialLocale) {
      startTransition(() => {
        router.refresh();
      });
    }
  }, [initialLocale, router]);

  useEffect(() => {
    writeLocaleCookie(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const value = getNested(messages[locale] as Record<string, unknown>, key);
      let str = typeof value === "string" ? value : key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        });
      }
      return str;
    },
    [locale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t,
      messages: messages[locale],
    }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useTranslations() {
  const { t } = useI18n();
  return t;
}

export function useLocale() {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}
