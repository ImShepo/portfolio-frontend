"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import type {
  AboutContent,
  ExperienceContent,
  SkillsContent,
} from "@/lib/cms/schemas";

type AboutContentProps = {
  about?: AboutContent;
  aboutEn?: AboutContent;
  skills?: SkillsContent;
  skillsEn?: SkillsContent;
  experience?: ExperienceContent;
  experienceEn?: ExperienceContent;
};

export function AboutContent({
  about,
  aboutEn,
  skills,
  skillsEn,
  experience,
  experienceEn,
}: AboutContentProps) {
  const t = useTranslations();
  const cmsText = useCmsText();

  return (
    <article>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="mb-14"
      >
        <h1 className="text-heading text-foreground">
          {cmsText(about?.title, t("about.title"), aboutEn?.title)}
        </h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          {cmsText(about?.subtitle, t("about.subtitle"), aboutEn?.subtitle)}
        </p>
      </motion.header>

      <motion.div
        className="space-y-8 text-body text-muted-foreground leading-relaxed"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <p>{cmsText(about?.paragraph1, t("about.paragraph1"), aboutEn?.paragraph1)}</p>
        <p>{cmsText(about?.paragraph2, t("about.paragraph2"), aboutEn?.paragraph2)}</p>
        <p>{cmsText(about?.paragraph3, t("about.paragraph3"), aboutEn?.paragraph3)}</p>
      </motion.div>

      {skills && skills.length > 0 ? (
        <motion.section className="mt-16" initial="hidden" animate="visible" variants={fadeInUp}>
          <h2 className="text-heading-sm text-foreground mb-6">{t("about.skillsTitle")}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {skills.map((skill, index) => {
              const skillEn = skillsEn?.[index];
              return (
                <li
                  key={`${skill.name}-${skill.category}`}
                  className="rounded-xl border border-border bg-card px-4 py-3"
                >
                  <p className="font-medium text-foreground">
                    {cmsText(skill.name, skill.name, skillEn?.name)}
                  </p>
                  <p className="text-caption">
                    {cmsText(skill.category, skill.category, skillEn?.category)} ·{" "}
                    {cmsText(skill.level, skill.level, skillEn?.level)}
                  </p>
                </li>
              );
            })}
          </ul>
        </motion.section>
      ) : null}

      {experience && experience.length > 0 ? (
        <motion.section className="mt-16 space-y-8" initial="hidden" animate="visible" variants={fadeInUp}>
          <h2 className="text-heading-sm text-foreground">{t("about.experienceTitle")}</h2>
          {experience.map((item, index) => {
            const itemEn = experienceEn?.[index];
            return (
              <div
                key={`${item.company}-${item.period}`}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-foreground">
                    {cmsText(item.role, item.role, itemEn?.role)}
                  </h3>
                  <p className="text-caption">
                    {cmsText(item.period, item.period, itemEn?.period)}
                  </p>
                </div>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {cmsText(item.company, item.company, itemEn?.company)}
                </p>
                <p className="mt-3 text-body text-muted-foreground">
                  {cmsText(item.description, item.description, itemEn?.description)}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-caption">
                  {item.highlights.map((highlight, highlightIndex) => (
                    <li key={highlight}>
                      {cmsText(
                        highlight,
                        highlight,
                        itemEn?.highlights?.[highlightIndex],
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </motion.section>
      ) : null}
    </article>
  );
}
