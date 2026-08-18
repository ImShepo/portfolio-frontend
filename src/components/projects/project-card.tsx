"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { ProjectLinks } from "@/components/projects/project-links";
import { getProjectImageSrc } from "@/lib/project-image";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  title: string;
  description: string;
  priority?: boolean;
  variant?: "grid" | "featured";
  className?: string;
};

export function ProjectCard({
  project,
  title,
  description,
  priority = false,
  variant = "grid",
  className,
}: ProjectCardProps) {
  const hasActions = Boolean(project.demo || project.github);
  const stackLimit = variant === "featured" ? 3 : 4;

  const stackTags = (
    <div className={cn("flex flex-wrap gap-2", variant === "featured" && "gap-1.5")}>
      {project.stack.slice(0, stackLimit).map((tech) => (
        <span
          key={tech}
          className={cn(
            "rounded-lg border border-border/50 bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground",
            variant === "featured" &&
              "rounded-sm border-[var(--color-border)] bg-[var(--color-surface-2)] px-2 py-0.5 text-[0.7rem] tracking-wide text-[var(--color-text-muted)]"
          )}
        >
          {tech}
        </span>
      ))}
    </div>
  );

  const imageBlock = (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden bg-muted",
        variant === "grid" ? "rounded-t-2xl" : "bg-[var(--color-surface-2)]"
      )}
    >
      <Image
        src={getProjectImageSrc(project.image)}
        alt={title}
        fill
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-300 ease-out group-hover:scale-105",
          variant === "featured" &&
            "opacity-80 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          variant === "grid"
            ? "bg-gradient-to-t from-black/40 via-transparent to-transparent"
            : "bg-gradient-to-t from-[var(--color-bg)]/80 via-transparent to-transparent"
        )}
      />
      <span
        className={cn(
          "absolute flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          variant === "grid"
            ? "right-4 top-4 h-10 w-10 rounded-xl bg-surface/95 text-foreground shadow-md"
            : "right-3 top-3 h-8 w-8 rounded-sm bg-[var(--color-accent)] text-white shadow-lg"
        )}
      >
        <ArrowUpRight size={variant === "grid" ? 18 : 15} aria-hidden />
      </span>
    </div>
  );

  const body = (
    <>
      <h2
        className={cn(
          "text-heading-sm text-foreground transition-colors group-hover:text-foreground/90",
          variant === "featured" &&
            "text-sm font-semibold tracking-tight group-hover:text-[var(--color-accent)]"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "text-caption mt-1 line-clamp-2",
          variant === "featured" && "mt-2 text-[var(--color-text-muted)]"
        )}
      >
        {description}
      </p>
      <div className={cn("mt-4", variant === "featured" && "mt-4")}>{stackTags}</div>
    </>
  );

  const actions = hasActions ? (
    <div
      className={cn(
        "mt-auto border-t border-border/50",
        variant === "grid" ? "px-6 pb-6 pt-4 sm:px-7" : "px-5 pb-5 pt-4"
      )}
    >
      <ProjectLinks demo={project.demo} github={project.github} layout="actions" />
    </div>
  ) : null;

  if (variant === "featured") {
    return (
      <article className={cn("glass-card flex h-full flex-col overflow-hidden rounded-sm", className)}>
        <Link href={`/projects/${project.slug}`} className="group block flex flex-1 flex-col">
          {imageBlock}
          <div className="flex flex-1 flex-col p-5">{body}</div>
        </Link>
        {actions}
      </article>
    );
  }

  return (
    <Card
      variant="glass"
      className={cn(
        "flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-black/25",
        className
      )}
    >
      <Link href={`/projects/${project.slug}`} className="group flex flex-1 flex-col">
        {imageBlock}
        <CardHeader className="flex-1">
          {body}
        </CardHeader>
      </Link>
      {actions}
    </Card>
  );
}
