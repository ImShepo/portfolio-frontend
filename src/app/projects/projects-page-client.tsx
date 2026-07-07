"use client";

import { useTranslations } from "@/i18n/provider";
import { ProjectsGrid } from "./projects-grid";
import type { Project } from "@/types";

type ProjectsPageClientProps = {
  projects: Project[];
  projectsEn?: Project[];
};

export function ProjectsPageClient({ projects, projectsEn }: ProjectsPageClientProps) {
  const t = useTranslations();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <header className="mb-14 md:mb-20">
        <h1 className="text-heading text-foreground">{t("projects.pageTitle")}</h1>
        <p className="mt-5 text-body-lg text-muted-foreground max-w-2xl">
          {t("projects.pageSubtitle")}
        </p>
      </header>
      <ProjectsGrid projects={projects} projectsEn={projectsEn} />
    </div>
  );
}
