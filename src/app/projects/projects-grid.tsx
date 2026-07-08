"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getProjectImageSrc } from "@/lib/project-image";
import { useTranslations } from "@/i18n/provider";
import { useProjectText } from "@/hooks/use-project-text";
import type { Project } from "@/types";

const categoryToTerms: Record<string, string[]> = {
  All: [],
  Frontend: ["react", "next", "typescript", "tailwind", "d3"],
  Backend: ["node", "graphql", "postgresql", "redis", "go"],
  "Full-stack": ["next", "node", "graphql"],
  Infrastructure: ["kubernetes", "docker", "prometheus"],
};

const categoryKeys: Record<string, string> = {
  All: "projects.categories.all",
  Frontend: "projects.categories.frontend",
  Backend: "projects.categories.backend",
  "Full-stack": "projects.categories.fullstack",
  Infrastructure: "projects.categories.infrastructure",
};

const categories = Object.keys(categoryToTerms);

type ProjectsGridProps = {
  projects: Project[];
  projectsEn?: Project[];
};

export function ProjectsGrid({ projects, projectsEn }: ProjectsGridProps) {
  const t = useTranslations();
  const projectText = useProjectText(projectsEn);
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    const terms = categoryToTerms[filter];
    if (!terms?.length) return projects;
    return projects.filter((p) =>
      p.stack.some((s) => terms.some((term) => s.toLowerCase().includes(term)))
    );
  }, [projects, filter]);

  return (
    <>
      <nav
        className="mb-10 flex flex-wrap gap-2 sm:gap-3"
        aria-label="Filter projects by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
              filter === cat
                ? "bg-accent text-white font-semibold shadow-[0_0_18px_var(--color-accent-glow)]"
                : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/35 hover:text-foreground"
            }`}
          >
            {t(categoryKeys[cat])}
          </button>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-caption">{t("projects.noMatch")}</p>
      ) : (
        <motion.ul className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
              >
                <Link href={`/projects/${project.slug}`} className="block h-full group">
                  <motion.div
                    className="h-full"
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    variants={{
                      rest: { y: 0 },
                      hover: {
                        y: -4,
                        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                      },
                      tap: { y: -2 },
                    }}
                  >
                    <Card
                      variant="glass"
                      className="h-full overflow-hidden transition-shadow duration-300 group-hover:shadow-lg dark:group-hover:shadow-xl dark:group-hover:shadow-black/25"
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-muted">
                        <Image
                          src={getProjectImageSrc(project.image)}
                          alt={projectText(project, "title")}
                          fill
                          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-surface/95 text-foreground shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <ArrowUpRight size={18} aria-hidden />
                        </span>
                      </div>
                      <CardHeader>
                        <h2 className="text-heading-sm text-foreground transition-colors group-hover:text-foreground/90">
                          {projectText(project, "title")}
                        </h2>
                        <p className="text-caption line-clamp-2 mt-1">
                          {projectText(project, "description")}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2">
                          {project.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </>
  );
}
