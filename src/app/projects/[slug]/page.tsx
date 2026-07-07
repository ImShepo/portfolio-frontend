import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectForRequest, getProjectSlugs } from "@/lib/content";
import { getServerTranslations } from "@/lib/i18n-server";
import { projectField } from "@/lib/cms/resolve-project";
import { ProjectDetailClient } from "./project-detail-client";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { locale, project, projectEn } = await getProjectForRequest(slug);
  if (!project) return { title: "Project not found" };

  const title = projectField(project, "title", locale, projectEn, project.title);
  const description = projectField(
    project,
    "description",
    locale,
    projectEn,
    project.description,
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const { project, projectEn } = await getProjectForRequest(slug);
  if (!project) notFound();

  return <ProjectDetailClient project={project} projectEn={projectEn} />;
}
