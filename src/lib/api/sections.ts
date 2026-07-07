import { apiFetch } from "./client";
import { ApiError } from "./errors";
import type { Locale } from "@/lib/locales";
import type { SectionPayload } from "./types";

export type SectionKey =
  | "home"
  | "about"
  | "contact"
  | "footer"
  | "skills"
  | "experience";

export async function fetchSection(
  key: SectionKey,
  locale?: Locale,
): Promise<SectionPayload | null> {
  const params = locale ? `?locale=${encodeURIComponent(locale)}` : "";
  try {
    return await apiFetch<SectionPayload>(
      `/public/sections/${encodeURIComponent(key)}${params}`,
      {
        cache: "no-store",
        next: { tags: [`section:${key}`, locale ? `section:${key}:${locale}` : `section:${key}`] },
      },
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
