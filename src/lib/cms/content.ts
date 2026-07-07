import "server-only";

import { fetchSection } from "@/lib/api/sections";
import { loadWithEnglishBaseline } from "@/lib/cms/locale-baseline";
import {
  parseCmsSection,
  type AboutContent,
  type ContactContent,
  type CmsSectionKey,
  type ExperienceContent,
  type FooterContent,
  type HomeContent,
  type SkillsContent,
} from "@/lib/cms/schemas";
import { getStaticSection } from "@/lib/cms/static-data";
import { env } from "@/lib/env";
import { DEFAULT_LOCALE } from "@/lib/locales";
import { getRequestLocale } from "@/lib/locale.server";

async function loadSectionPair<K extends CmsSectionKey>(key: K) {
  if (env.staticMode) {
    const locale = await getRequestLocale();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = getStaticSection(key, locale) as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contentEn = locale === DEFAULT_LOCALE ? null : (getStaticSection(key, DEFAULT_LOCALE) as any);
    return { locale, content, contentEn };
  }

  return loadWithEnglishBaseline(async (locale) => {
    const section = await fetchSection(key, locale);
    if (!section) return null;
    return parseCmsSection(key, section.content);
  });
}

export async function getHomeContentForRequest() {
  return loadSectionPair("home");
}

export async function getAboutContentForRequest() {
  return loadSectionPair("about");
}

export async function getContactContentForRequest() {
  return loadSectionPair("contact");
}

export async function getFooterContentForRequest() {
  return loadSectionPair("footer");
}

export async function getSkillsContentForRequest() {
  return loadSectionPair("skills");
}

export async function getExperienceContentForRequest() {
  return loadSectionPair("experience");
}

export async function getHomeContent(): Promise<HomeContent | null> {
  const { content } = await loadSectionPair("home");
  return content;
}

export async function getAboutContent(): Promise<AboutContent | null> {
  const { content } = await loadSectionPair("about");
  return content;
}

export async function getContactContent(): Promise<ContactContent | null> {
  const { content } = await loadSectionPair("contact");
  return content;
}

export async function getFooterContent(): Promise<FooterContent | null> {
  const { content } = await loadSectionPair("footer");
  return content;
}

export async function getSkillsContent(): Promise<SkillsContent | null> {
  const { content } = await loadSectionPair("skills");
  return content;
}

export async function getExperienceContent(): Promise<ExperienceContent | null> {
  const { content } = await loadSectionPair("experience");
  return content;
}
