import { Metadata } from "next";
import { AboutContent } from "./about-content";
import {
  getAboutContentForRequest,
  getExperienceContentForRequest,
  getSkillsContentForRequest,
} from "@/lib/cms/content";
import { getServerTranslations } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations();
  return {
    title: t("about.title"),
    description: t("about.subtitle"),
  };
}

export default async function AboutPage() {
  const [aboutPair, skillsPair, experiencePair] = await Promise.all([
    getAboutContentForRequest(),
    getSkillsContentForRequest(),
    getExperienceContentForRequest(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
      <AboutContent
        about={aboutPair.content ?? undefined}
        aboutEn={aboutPair.contentEn ?? undefined}
        skills={skillsPair.content ?? undefined}
        skillsEn={skillsPair.contentEn ?? undefined}
        experience={experiencePair.content ?? undefined}
        experienceEn={experiencePair.contentEn ?? undefined}
      />
    </div>
  );
}
