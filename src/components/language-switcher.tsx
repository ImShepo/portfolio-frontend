"use client";

import { ChevronDown, Check } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/messages";
import { localeNames } from "@/i18n/messages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const locales: Locale[] = ["en", "es", "pt", "fr"];

export function LanguageSwitcher({
  className,
  testId = "language-switcher",
}: {
  className?: string;
  testId?: string;
}) {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex h-10 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground outline-none",
          className
        )}
        aria-label={t("locale." + locale)}
        data-testid={testId}
      >
        <span className="uppercase tracking-wide">{locale}</span>
        <ChevronDown size={16} className="opacity-70" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc)}
            className="flex items-center justify-between gap-2"
          >
            {localeNames[loc]}
            {locale === loc && <Check size={16} className="size-4" aria-hidden />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
