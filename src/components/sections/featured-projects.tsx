"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { getProjectImageSrc } from "@/lib/project-image";
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
              <Link href={`/projects/${project.slug}`} className="block h-full group">
                <div className="glass-card h-full overflow-hidden rounded-sm transition-all duration-300">
                  <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-surface-2)]">
                    <Image
                      src={getProjectImageSrc(project.image)}
                      alt={projectText(project, "title")}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/80 via-transparent to-transparent" />
                    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-sm bg-[var(--color-accent)] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                      <ArrowUpRight size={15} aria-hidden />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-[var(--color-accent)] transition-colors">
                      {projectText(project, "title")}
                    </h3>
                    <p className="text-caption line-clamp-2 mt-2 text-[var(--color-text-muted)]">
                      {projectText(project, "description")}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-sm bg-[var(--color-surface-2)] px-2 py-0.5 text-[0.7rem] font-medium tracking-wide text-[var(--color-text-muted)] border border-[var(--color-border)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
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
