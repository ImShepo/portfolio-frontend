import { paginatedProjectsSchema } from "@/lib/validation/project";
import { apiFetch } from "./client";
import { ApiError } from "./errors";
import { getRequestLocale } from "@/lib/locale.server";
import type { Locale } from "@/lib/locales";
import { normalizeProject, normalizeProjects } from "./normalize";
import type { Project } from "./types";

type ProjectsQuery = {
  skip?: number;
  take?: number;
  featured?: boolean;
  locale?: Locale;
};

function buildProjectsQuery(query: ProjectsQuery = {}): string {
  const params = new URLSearchParams();
  params.set("take", String(query.take ?? 100));
  params.set("skip", String(query.skip ?? 0));
  if (query.featured === true) {
    params.set("featured", "true");
  }
  if (query.locale) {
    params.set("locale", query.locale);
  }
  return `/public/projects?${params.toString()}`;
}

export async function fetchProjects(query: ProjectsQuery = {}): Promise<Project[]> {
  const locale = query.locale ?? (await getRequestLocale());
  const raw = await apiFetch<unknown>(buildProjectsQuery({ ...query, locale }), {
    cache: "no-store",
    next: { tags: ["projects", `projects:${locale}`] },
  });
  const envelope = paginatedProjectsSchema.safeParse(raw);
  if (!envelope.success) {
    throw new Error("Invalid projects API response shape");
  }
  return normalizeProjects(envelope.data.data);
}

export async function fetchFeaturedProjects(locale?: Locale): Promise<Project[]> {
  return fetchProjects({ featured: true, locale });
}

export async function fetchProjectBySlug(
  slug: string,
  locale?: Locale,
): Promise<Project | null> {
  const resolvedLocale = locale ?? (await getRequestLocale());
  try {
    const response = await apiFetch<unknown>(
      `/public/projects/${encodeURIComponent(slug)}?locale=${encodeURIComponent(resolvedLocale)}`,
      {
        cache: "no-store",
        next: { tags: ["projects", `project:${slug}`, `project:${slug}:${resolvedLocale}`] },
      },
    );
    return normalizeProject(response);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function fetchProjectSlugs(): Promise<string[]> {
  const projects = await fetchProjects();
  return projects.map((project) => project.slug);
}
