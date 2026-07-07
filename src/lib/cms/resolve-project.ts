import type { Project } from "@/types";
import { pickProjectField } from "@/lib/cms/pick";
import type { Locale } from "@/lib/locales";

type ProjectTextField =
  | "title"
  | "description"
  | "longDescription"
  | "architecture"
  | "challenges"
  | "results"
  | "problem"
  | "solution";

export function projectField(
  project: Project,
  field: ProjectTextField,
  locale: Locale,
  projectEn?: Project | null,
  fallback = "",
): string {
  const value = project[field];
  if (typeof value !== "string") return fallback;
  const enValue = projectEn?.[field];
  const enString = typeof enValue === "string" ? enValue : undefined;
  return pickProjectField(value, enString, fallback, locale);
}

export function projectBySlug(
  projects: Project[] | null | undefined,
  slug: string,
): Project | undefined {
  return projects?.find((project) => project.slug === slug);
}
