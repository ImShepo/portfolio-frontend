"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Section } from "@/components/section";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import type { HomeContent } from "@/lib/cms/schemas";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(elementRef, { once: true, amount: 0.35 });
  const hasStartedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || hasStartedRef.current || reduceMotion) return;
    hasStartedRef.current = true;

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
    const output = reduceMotion ? target : value;
    if (Number.isInteger(target)) return `${Math.round(output)}${suffix}`;
    return `${output.toFixed(1)}${suffix}`;
  }, [reduceMotion, suffix, target, value]);

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
    { value: 5, suffix: "+", label: t("outcomes.items.lcp") },
    { value: 8, suffix: "+", label: t("outcomes.items.checkout") },
    { value: 3, suffix: "+", label: t("outcomes.items.teams") },
    { value: 5, suffix: "", label: t("outcomes.items.uptime") },
  ];

  return (
    <Section
      id="outcomes"
      title={cmsText(cms?.title, t("outcomes.title"), cmsEn?.title)}
      subtitle={cmsText(cms?.subtitle, t("outcomes.subtitle"), cmsEn?.subtitle)}
      className="max-w-7xl"
    >
      <motion.ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {outcomes.map((item) => (
          <motion.li key={item.label} variants={fadeInUp} className="h-full">
            <div className="glass-card flex h-full min-h-[8.5rem] flex-col justify-center rounded-xl px-6 py-7 sm:px-7">
              <p className="text-3xl font-bold tracking-tight text-foreground sm:text-[2rem]">
                <CountUp target={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {item.label}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
