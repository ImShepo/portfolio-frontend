"use client";

import { ScrollStorySection } from "@/components/sections/scroll-story-section";
import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import type { HomeContent } from "@/lib/cms/schemas";

type FeaturedProjectProps = {
  cms?: HomeContent["featuredCaseStudy"];
  cmsEn?: HomeContent["featuredCaseStudy"];
};

export function FeaturedProject({ cms, cmsEn }: FeaturedProjectProps) {
  const t = useTranslations();
  const cmsText = useCmsText();

  const story =
    cms?.steps ??
    [
      {
        title: t("featuredCaseStudy.steps.problem.title"),
        body: t("featuredCaseStudy.steps.problem.body"),
      },
      {
        title: t("featuredCaseStudy.steps.solution.title"),
        body: t("featuredCaseStudy.steps.solution.body"),
      },
      {
        title: t("featuredCaseStudy.steps.result.title"),
        body: t("featuredCaseStudy.steps.result.body"),
      },
    ];

  return (
    <ScrollStorySection
      id="featured-project"
      eyebrow={cmsText(cms?.eyebrow, t("featuredCaseStudy.eyebrow"), cmsEn?.eyebrow)}
      title={cmsText(cms?.title, t("featuredCaseStudy.title"), cmsEn?.title)}
      subtitle={cmsText(cms?.subtitle, t("featuredCaseStudy.subtitle"), cmsEn?.subtitle)}
      steps={story}
    />
  );
}
