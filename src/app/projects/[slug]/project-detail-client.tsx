"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/i18n/provider";
import { useSingleProjectText } from "@/hooks/use-project-text";
import { getProjectImageSrc } from "@/lib/project-image";
import { StickySection } from "@/components/scroll/StickySection";
import type { Project } from "@/types";

type ProjectDetailClientProps = {
  project: Project;
  projectEn?: Project | null;
};

export function ProjectDetailClient({ project, projectEn }: ProjectDetailClientProps) {
  const t = useTranslations();
  const projectText = useSingleProjectText(projectEn);

  const title = projectText(project, "title");
  const description = projectText(project, "description");
  const longDescription = projectText(project, "longDescription");
  const problem = projectText(
    project,
    "problem",
  ) || "The product needed better clarity around business and user constraints before scaling delivery.";
  const challenges = projectText(
    project,
    "challenges",
  ) || "Core friction came from performance pressure, interaction complexity, and inconsistent user flows.";
  const solution = projectText(
    project,
    "solution",
  ) || "A modular implementation that aligned UX decisions with engineering constraints and measurable outcomes.";
  const architecture = projectText(
    project,
    "architecture",
  ) || "A scalable architecture balancing component reuse, data flow clarity, and runtime performance.";
  const results = projectText(
    project,
    "results",
  ) || "The final implementation improved delivery quality while reducing user friction in core journeys.";

  const problemSteps = [
    {
      title: t("projects.problem"),
      description: problem,
    },
    {
      title: t("projectDetail.steps.insight"),
      description: challenges,
    },
    {
      title: t("projectDetail.steps.target"),
      description:
        "Design a system that improves speed, usability, and delivery confidence without adding maintenance overhead.",
    },
  ];

  const solutionSteps = [
    {
      title: t("projectDetail.steps.process"),
      description:
        longDescription ||
        "The project was executed through iterative discovery, architecture planning, and product-driven implementation.",
    },
    {
      title: t("projects.solution"),
      description: solution,
    },
    {
      title: t("projects.architecture"),
      description: architecture,
    },
  ];

  const resultSteps = [
    {
      title: t("projects.results"),
      description: results,
    },
    {
      title: t("projectDetail.steps.impact"),
      description:
        "Business and product teams gained better reliability, clearer UX behavior, and a stronger foundation for iteration.",
    },
    {
      title: t("projectDetail.steps.next"),
      description:
        "The system now supports future features with less rework and more predictable frontend execution.",
    },
  ];

  return (
    <article className="min-h-screen">
      <section className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-zinc-900">
          <Image
            src={getProjectImageSrc(project.image)}
            alt={title}
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
          <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8">
            <div className="mx-auto w-full max-w-4xl text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-caption text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={16} aria-hidden />
                {t("projects.backToProjects")}
              </Link>
              <h1 className="text-display text-white drop-shadow">{title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-body-lg text-white/90">{description}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {project.github && (
                  <Button asChild variant="secondary" size="sm" className="gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} aria-hidden />
                      {t("projects.code")}
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button asChild variant="secondary" size="sm" className="gap-2">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} aria-hidden />
                      {t("projects.demo")}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StickySection
        id="project-problem"
        eyebrow={t("projects.problem")}
        title={t("projectDetail.defineChallenge")}
        steps={problemSteps}
        heightClassName="h-[300vh]"
      />

      <section className="px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <header className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {t("projectDetail.processEyebrow")}
            </p>
            <h2 className="mt-4 text-heading text-foreground">{t("projectDetail.processTitle")}</h2>
          </header>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-heading-sm text-foreground">{t("projectDetail.discover")}</h3>
              <p className="mt-3 text-body text-muted-foreground">{longDescription}</p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-heading-sm text-foreground">{t("projectDetail.build")}</h3>
              <p className="mt-3 text-body text-muted-foreground">{solution || architecture}</p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-heading-sm text-foreground">{t("projectDetail.validate")}</h3>
              <p className="mt-3 text-body text-muted-foreground">{challenges}</p>
            </article>
          </div>
        </div>
      </section>

      <StickySection
        id="project-solution"
        eyebrow={t("projects.solution")}
        title={t("projectDetail.translateSolution")}
        steps={solutionSteps}
        heightClassName="h-[300vh]"
      />

      <StickySection
        id="project-results"
        eyebrow={t("projects.results")}
        title={t("projectDetail.shipOutcomes")}
        steps={resultSteps}
        heightClassName="h-[200vh]"
      />

      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 md:py-20">
        <section>
          <h2 className="text-heading-sm text-foreground mb-4">{t("projects.techStack")}</h2>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-border pt-12">
          <Button asChild>
            <Link href="/projects">{t("projects.viewAllProjects")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">{t("hero.getInTouch")}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
