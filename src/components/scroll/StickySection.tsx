"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type StickyStep = {
  title: string;
  description: string;
};

type StickySectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  steps: StickyStep[];
  heightClassName?: string;
  className?: string;
};

function StepLayer({
  index,
  total,
  step,
  progress,
}: {
  index: number;
  total: number;
  step: StickyStep;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const enter = start + 0.12;
  const exit = (index + 1) / total;

  const opacity = useTransform(progress, [start, enter, exit], [0.15, 1, 0.15]);
  const y = useTransform(progress, [start, enter, exit], [24, 0, -18]);
  const scale = useTransform(progress, [start, enter, exit], [0.985, 1, 0.99]);

  return (
    <motion.article
      className="absolute inset-0 flex items-center justify-center px-5 sm:px-8"
      style={{ opacity, y, scale }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="text-display text-foreground">{step.title}</h3>
        <p className="mt-5 text-body-lg text-muted-foreground">{step.description}</p>
      </div>
    </motion.article>
  );
}

export function StickySection({
  id,
  eyebrow,
  title,
  steps,
  heightClassName = "h-[300vh]",
  className = "",
}: StickySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  if (reduceMotion) {
    return (
      <section id={id} className={`px-5 py-16 sm:px-8 md:py-24 ${className}`}>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-heading text-foreground">{title}</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-8">
          {steps.map((step) => (
            <article key={step.title} className="rounded-2xl border border-border bg-card p-7 text-center">
              <h3 className="text-heading-sm text-foreground">{step.title}</h3>
              <p className="mt-3 text-body text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id={id} className={`relative ${heightClassName} ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute left-0 right-0 top-0 z-20 pt-20 sm:pt-24">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-heading text-foreground">{title}</h2>
          </div>
        </div>

        <div className="relative h-full">
          {steps.map((step, index) => (
            <StepLayer
              key={step.title}
              index={index}
              total={steps.length}
              step={step}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
