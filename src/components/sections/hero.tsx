"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCubesVisual } from "@/components/hero-cubes-visual";
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[88vh] flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Blue glow top-right */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 z-[1] h-[600px] w-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 pt-20 pb-20 md:pt-24"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10 xl:gap-14">
          {/* Text — left column */}
          <div className="relative z-10 max-w-3xl">
            {/* Eyebrow */}
            <motion.div className="flex items-center gap-3 mb-7" variants={fadeInUp}>
              <span className="accent-line" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {cmsText(cms?.eyebrow, t("hero.eyebrow"), cmsEn?.eyebrow)}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-display-lg text-foreground"
              variants={fadeInUp}
            >
              {cmsText(cms?.title, t("hero.title"), cmsEn?.title)}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-7 text-lead max-w-2xl"
              variants={fadeInUp}
            >
              {cmsText(cms?.description, t("hero.description"), cmsEn?.description)}
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              variants={fadeInUp}
            >
              <Button
                asChild
                size="lg"
                className="btn-gradient-cta gap-2 rounded-sm px-7 font-semibold tracking-wide"
              >
                <Link href="/projects">
                  {cmsText(cms?.seeCaseStudies, t("hero.seeCaseStudies"), cmsEn?.seeCaseStudies)}
                  <ArrowRight size={17} aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-sm border-[var(--color-border-strong)] px-7 font-semibold tracking-wide text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-foreground"
              >
                <Link href="/contact">
                  {cmsText(cms?.bookIntro, t("hero.bookIntro"), cmsEn?.bookIntro)}
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Cubes — right column, from text edge to screen right */}
          <motion.div
            className="hero-cubes-panel hidden lg:flex"
            variants={fadeInUp}
            aria-hidden
          >
            <HeroCubesVisual scrollProgress={scrollYProgress} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
