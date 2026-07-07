"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

export type EffectiveTheme = "light" | "dark" | "system";

function toEffectiveTheme(value: string | undefined): EffectiveTheme {
  if (value === "light" || value === "dark" || value === "system") return value;
  return "system";
}

export function useSafeTheme() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const effectiveTheme: EffectiveTheme = !mounted
    ? "system"
    : theme === "system"
      ? toEffectiveTheme(resolvedTheme)
      : toEffectiveTheme(theme);

  return { mounted, effectiveTheme, setTheme };
}
