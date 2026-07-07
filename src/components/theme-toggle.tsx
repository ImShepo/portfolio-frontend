"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { useSafeTheme } from "@/hooks/use-safe-theme";

export function ThemeToggle({ className }: { className?: string }) {
  const { mounted, effectiveTheme, setTheme } = useSafeTheme();
  const t = useTranslations();

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        disabled
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground",
          className
        )}
      >
        <Monitor size={20} aria-hidden />
      </button>
    );
  }

  const cycle = () => {
    if (effectiveTheme === "dark") setTheme("light");
    else if (effectiveTheme === "light") setTheme("system");
    else setTheme("dark");
  };

  const label =
    effectiveTheme === "dark"
      ? t("theme.dark")
      : effectiveTheme === "light"
        ? t("theme.light")
        : t("theme.system");

  return (
    <motion.button
      type="button"
      onClick={cycle}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
      aria-label={label}
      whileTap={{ scale: 0.95 }}
    >
      {effectiveTheme === "dark" ? (
        <Moon size={20} aria-hidden />
      ) : effectiveTheme === "light" ? (
        <Sun size={20} aria-hidden />
      ) : (
        <Monitor size={20} aria-hidden />
      )}
    </motion.button>
  );
}
