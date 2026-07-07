"use client";

import { ScrollStorySection } from "@/components/sections/scroll-story-section";
import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import type { HomeContent } from "@/lib/cms/schemas";

type WhatIDoStickyProps = {
  cms?: HomeContent["whatIDo"];
  cmsEn?: HomeContent["whatIDo"];
};

export function WhatIDoSticky({ cms, cmsEn }: WhatIDoStickyProps) {
  const t = useTranslations();
  const cmsText = useCmsText();

  const pillars =
    cms?.steps ??
    [
      {
        title: t("whatIDo.steps.performance.title"),
        body: t("whatIDo.steps.performance.body"),
      },
      {
        title: t("whatIDo.steps.ux.title"),
        body: t("whatIDo.steps.ux.body"),
      },
      {
        title: t("whatIDo.steps.architecture.title"),
        body: t("whatIDo.steps.architecture.body"),
      },
    ];

  return (
    <ScrollStorySection
      id="what-i-do"
      eyebrow={cmsText(cms?.eyebrow, t("whatIDo.eyebrow"), cmsEn?.eyebrow)}
      title={cmsText(cms?.title, t("whatIDo.title"), cmsEn?.title)}
      subtitle={cmsText(cms?.subtitle, t("whatIDo.subtitle"), cmsEn?.subtitle)}
      steps={pillars}
    />
  );
}
