import { Metadata } from "next";
import { ProjectsPageClient } from "./projects-page-client";
import { getProjectsForRequest } from "@/lib/content";
import { getServerTranslations } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations();
  return {
    title: t("projects.pageTitle"),
    description: t("projects.pageSubtitle"),
  };
}

export default async function ProjectsPage() {
  const { content: projects, contentEn: projectsEn } = await getProjectsForRequest();

  return (
    <ProjectsPageClient projects={projects ?? []} projectsEn={projectsEn ?? undefined} />
  );
}
