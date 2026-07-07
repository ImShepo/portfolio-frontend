"use client";

import { useTranslations } from "@/i18n/provider";

export function SkipLink() {
  const t = useTranslations();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      {t("a11y.skipToContent")}
    </a>
  );
}
