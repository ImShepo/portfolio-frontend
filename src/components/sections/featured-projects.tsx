"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <div className="h-full">
                  <Card variant="glass" className="h-full overflow-hidden">
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-muted">
                      <Image
                        src={getProjectImageSrc(project.image)}
                        alt={projectText(project, "title")}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-surface/95 text-foreground shadow-md">
                        <ArrowUpRight size={18} aria-hidden />
                      </span>
                    </div>
                    <CardHeader>
                      <h3 className="text-heading-sm text-foreground">
                        {projectText(project, "title")}
                      </h3>
                      <p className="text-caption line-clamp-2 mt-1">
                        {projectText(project, "description")}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg bg-surface/80 px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
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
        <Button asChild variant="outline" size="lg">
          <Link href="/projects" className="gap-2">
            {cmsText(cms?.viewAll, t("projects.viewAll"), cmsEn?.viewAll)}
            <ArrowUpRight size={18} aria-hidden />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
