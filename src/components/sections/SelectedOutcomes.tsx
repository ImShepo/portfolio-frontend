"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import type { HomeContent } from "@/lib/cms/schemas";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(elementRef, { once: true, margin: "-80px" });
  const hasStartedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || hasStartedRef.current) return;
    hasStartedRef.current = true;
    if (reduceMotion) return;

    const duration = 900;
    const start = performance.now();

    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(target * progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [inView, reduceMotion, target]);

  const display = useMemo(() => {
    const output = reduceMotion && inView ? target : value;
    if (Number.isInteger(target)) return `${Math.round(output)}${suffix}`;
    return `${output.toFixed(1)}${suffix}`;
  }, [inView, reduceMotion, suffix, target, value]);

  return <span ref={elementRef}>{display}</span>;
}

type SelectedOutcomesProps = {
  cms?: HomeContent["outcomes"];
  cmsEn?: HomeContent["outcomes"];
};

export function SelectedOutcomes({ cms, cmsEn }: SelectedOutcomesProps) {
  const t = useTranslations();
  const cmsText = useCmsText();

  const outcomes = cms?.items ?? [
    { value: 40, suffix: "%", label: t("outcomes.items.lcp") },
    { value: 23, suffix: "%", label: t("outcomes.items.checkout") },
    { value: 15, suffix: "+", label: t("outcomes.items.teams") },
    { value: 99.9, suffix: "%", label: t("outcomes.items.uptime") },
  ];

  return (
    <section
      className="px-5 py-16 sm:px-8 md:py-20 mx-auto max-w-6xl w-full"
      aria-labelledby="selected-outcomes-title"
    >
      <motion.header
        id="selected-outcomes-title"
        className="mb-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
      >
        <h2 className="text-heading text-foreground">
          {cmsText(cms?.title, t("outcomes.title"), cmsEn?.title)}
        </h2>
        <p className="mt-4 text-body text-muted-foreground">
          {cmsText(cms?.subtitle, t("outcomes.subtitle"), cmsEn?.subtitle)}
        </p>
      </motion.header>

      <motion.ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {outcomes.map((item) => (
          <motion.li key={item.label} variants={fadeInUp} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-3xl font-bold tracking-tight text-foreground">
              <CountUp target={item.value} suffix={item.suffix} />
            </p>
            <p className="mt-2 text-caption">{item.label}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
