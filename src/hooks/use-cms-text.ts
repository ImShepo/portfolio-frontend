"use client";

import { useCallback } from "react";
import { pickText, type PickTextOptions } from "@/lib/cms/pick";
import { useLocale } from "@/i18n/provider";

export function useCmsText() {
  const { locale } = useLocale();

  return useCallback(
    (cmsValue: string | undefined, fallback: string, cmsEnValue?: string) =>
      pickText(cmsValue, fallback, { locale, cmsEnValue } satisfies PickTextOptions),
    [locale],
  );
}
