"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import type { HomeContent } from "@/lib/cms/schemas";

type HeroProps = {
  cms?: HomeContent["hero"];
  cmsEn?: HomeContent["hero"];
};

export function Hero({ cms, cmsEn }: HeroProps) {
  const t = useTranslations();
  const cmsText = useCmsText();

  return (
    <section
      className="min-h-[84vh] flex items-center px-5 sm:px-8"
      aria-label="Introduction"
    >
      <motion.div
        className="mx-auto max-w-6xl w-full pt-24 pb-16 md:pt-28 md:pb-20"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-3xl">
          <motion.p
            className="text-sm mb-6 uppercase tracking-widest text-muted-foreground"
            variants={fadeInUp}
          >
            {cmsText(cms?.eyebrow, t("hero.eyebrow"), cmsEn?.eyebrow)}
          </motion.p>
          <motion.h1 className="text-display-lg font-extrabold text-foreground" variants={fadeInUp}>
            {cmsText(cms?.title, t("hero.title"), cmsEn?.title)}
          </motion.h1>
          <motion.p className="mt-8 text-lead max-w-2xl" variants={fadeInUp}>
            {cmsText(cms?.description, t("hero.description"), cmsEn?.description)}
          </motion.p>
          <motion.div className="mt-11 flex flex-wrap items-center gap-4" variants={fadeInUp}>
            <Button asChild size="lg" className="gap-2 px-8">
              <Link href="/projects">
                {cmsText(cms?.seeCaseStudies, t("hero.seeCaseStudies"), cmsEn?.seeCaseStudies)}
                <ArrowRight size={18} aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/contact">
                {cmsText(cms?.bookIntro, t("hero.bookIntro"), cmsEn?.bookIntro)}
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
