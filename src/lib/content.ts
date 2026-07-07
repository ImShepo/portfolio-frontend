import "server-only";

import {
  fetchFeaturedProjects,
  fetchProjectBySlug,
  fetchProjectSlugs,
  fetchProjects,
} from "@/lib/api/projects";
import { fetchSection, type SectionKey } from "@/lib/api/sections";
import type { Project, SectionPayload } from "@/lib/api/types";
import { ApiError } from "@/lib/api/errors";
import { env } from "@/lib/env";
import { loadWithEnglishBaseline } from "@/lib/cms/locale-baseline";
import { DEFAULT_LOCALE, type Locale } from "@/lib/locales";
import { getRequestLocale } from "@/lib/locale.server";
import { getStaticProjects } from "@/lib/cms/static-data";
import projectsFallback from "../../content/projects.json";

function logContentError(scope: string, error: unknown) {
  if (error instanceof ApiError) {
    const path = error.body?.path ?? "unknown";
    console.error(
      `[content] ${scope} failed: API ${error.status} — ${error.message} (backend path: ${path}, base: ${env.apiUrl})`
    );
    return;
  }
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[content] ${scope} failed:`, message);
}

function fallbackProjects(): Project[] {
  return projectsFallback as Project[];
}

async function loadProjects(loader: () => Promise<Project[]>): Promise<Project[]> {
  try {
    return await loader();
  } catch (error) {
    logContentError("projects", error);
    if (env.contentFallback) return fallbackProjects();
    return [];
  }
}

export async function getProjectsForRequest() {
  if (env.staticMode) {
    const locale = await getRequestLocale();
    const projects = getStaticProjects(locale);
    const projectsEn = locale === DEFAULT_LOCALE ? null : getStaticProjects(DEFAULT_LOCALE);
    return { locale, content: projects, contentEn: projectsEn };
  }
  return loadWithEnglishBaseline((locale) => fetchProjects({ take: 100, locale }));
}

export async function getFeaturedProjectsForRequest() {
  if (env.staticMode) {
    const locale = await getRequestLocale();
    const projects = getStaticProjects(locale).filter((p) => p.featured);
    const projectsEn = locale === DEFAULT_LOCALE ? null : getStaticProjects(DEFAULT_LOCALE).filter((p) => p.featured);
    return { locale, content: projects, contentEn: projectsEn };
  }
  return loadWithEnglishBaseline((locale) => fetchFeaturedProjects(locale));
}

export async function getProjectForRequest(slug: string) {
  const locale = await getRequestLocale();
  if (env.staticMode) {
    const project = getStaticProjects(locale).find((p) => p.slug === slug) ?? null;
    const projectEn = locale === DEFAULT_LOCALE ? null : getStaticProjects(DEFAULT_LOCALE).find((p) => p.slug === slug) ?? null;
    return { locale, project, projectEn };
  }
  const [project, projectEn] = await Promise.all([
    fetchProjectBySlugSafe(slug, locale),
    locale === DEFAULT_LOCALE
      ? Promise.resolve(null)
      : fetchProjectBySlugSafe(slug, DEFAULT_LOCALE),
  ]);
  return { locale, project, projectEn };
}

async function fetchProjectBySlugSafe(
  slug: string,
  locale?: Locale,
): Promise<Project | null> {
  try {
    return await fetchProjectBySlug(slug, locale);
  } catch (error) {
    logContentError(`project:${slug}`, error);
    if (env.contentFallback) {
      return fallbackProjects().find((project) => project.slug === slug) ?? null;
    }
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (env.staticMode) return getStaticProjects(DEFAULT_LOCALE);
  return loadProjects(fetchProjects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (env.staticMode) return getStaticProjects(DEFAULT_LOCALE).filter((p) => p.featured);
  try {
    return await fetchFeaturedProjects();
  } catch (error) {
    logContentError("featured projects", error);
    if (env.contentFallback) {
      return fallbackProjects().filter((project) => project.featured);
    }
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (env.staticMode) return getStaticProjects(DEFAULT_LOCALE).find((p) => p.slug === slug) ?? null;
  return fetchProjectBySlugSafe(slug);
}

export async function getProjectSlugs(): Promise<string[]> {
  if (env.staticMode) return getStaticProjects(DEFAULT_LOCALE).map((p) => p.slug);
  try {
    return await fetchProjectSlugs();
  } catch (error) {
    logContentError("project slugs", error);
    if (env.contentFallback) {
      return fallbackProjects().map((project) => project.slug);
    }
    return [];
  }
}

export async function getSection(key: SectionKey): Promise<SectionPayload | null> {
  try {
    return await fetchSection(key);
  } catch (error) {
    logContentError(`section:${key}`, error);
    return null;
  }
}

