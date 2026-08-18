"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/animations";
import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import { useProjectText } from "@/hooks/use-project-text";
import type { HomeContent } from "@/lib/cms/schemas";
import type { Project } from "@/types";

type FeaturedProjectsSectionProps = {
  projects: Project[];
  projectsEn?: Project[];
  cms?: HomeContent["projectsSection"];
  cmsEn?: HomeContent["projectsSection"];
};

export function FeaturedProjectsSection({
  projects,
  projectsEn,
  cms,
  cmsEn,
}: FeaturedProjectsSectionProps) {
  const t = useTranslations();
  const cmsText = useCmsText();
  const projectText = useProjectText(projectsEn);

  return (
    <Section
      id="projects"
      title={cmsText(cms?.title, t("projects.title"), cmsEn?.title)}
      subtitle={cmsText(cms?.subtitle, t("projects.subtitle"), cmsEn?.subtitle)}
    >
      {projects.length === 0 ? (
        <p className="text-center text-caption py-8">{t("projects.noMatch")}</p>
      ) : (
        <motion.ul
          className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 content-gap-lg"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {projects.map((project) => (
            <motion.li key={project.slug} variants={fadeInUp} className="h-full">
              <ProjectCard
                project={project}
                title={projectText(project, "title")}
                description={projectText(project, "description")}
                variant="featured"
              />
            </motion.li>
          ))}
        </motion.ul>
      )}
      <motion.div
        className="mt-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
      >
        <Button
          asChild
          size="lg"
          className="btn-gradient-cta rounded-sm gap-2 px-8 font-semibold tracking-wide"
        >
          <Link href="/projects" className="gap-2">
            {cmsText(cms?.viewAll, t("projects.viewAll"), cmsEn?.viewAll)}
            <ArrowUpRight size={17} aria-hidden />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
