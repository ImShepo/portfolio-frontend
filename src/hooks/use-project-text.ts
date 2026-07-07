"use client";

import { useCallback } from "react";
import { projectField, projectBySlug } from "@/lib/cms/resolve-project";
import { useLocale, useTranslations } from "@/i18n/provider";
import type { Project } from "@/types";

type ProjectTextField =
  | "title"
  | "description"
  | "longDescription"
  | "architecture"
  | "challenges"
  | "results"
  | "problem"
  | "solution";

export function useProjectText(projectsEn?: Project[] | null) {
  const { locale } = useLocale();
  const t = useTranslations();

  return useCallback(
    (project: Project, field: ProjectTextField) => {
      const projectEn = projectBySlug(projectsEn, project.slug);
      const fallbackKey = `projectItems.${project.slug}.${field}`;
      const translated = t(fallbackKey);
      const fallback =
        translated !== fallbackKey
          ? translated
          : typeof projectEn?.[field] === "string"
            ? projectEn[field]
            : typeof project[field] === "string"
              ? project[field]
              : "";

      return projectField(project, field, locale, projectEn, fallback);
    },
    [locale, projectsEn, t],
  );
}

export function useSingleProjectText(projectEn?: Project | null) {
  const { locale } = useLocale();
  const t = useTranslations();

  return useCallback(
    (project: Project, field: ProjectTextField) => {
      const fallbackKey = `projectItems.${project.slug}.${field}`;
      const translated = t(fallbackKey);
      const fallback =
        translated !== fallbackKey
          ? translated
          : typeof projectEn?.[field] === "string"
            ? projectEn[field]
            : typeof project[field] === "string"
              ? project[field]
              : "";

      return projectField(project, field, locale, projectEn, fallback);
    },
    [locale, projectEn, t],
  );
}
