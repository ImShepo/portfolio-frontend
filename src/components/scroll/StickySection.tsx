"use client";

import { useRef, type ReactNode } from "react";
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
  /** Shorter exit on the final step — less empty scroll before the next block */
  compactTail?: boolean;
  /** Fades in near the end while the last step exits (e.g. next section headline) */
  tailSlot?: ReactNode;
  handoffStart?: number;
};

function stepKeyframes(
  index: number,
  total: number,
  compactTail = false,
  handoffStart?: number,
) {
  const segment = 1 / total;
  const crossfade = segment * 0.35;
  const isLast = index === total - 1;

  const start = index === 0 ? 0 : index * segment - crossfade;
  const enterEnd = index * segment + segment * 0.1;
  const exitStart = isLast
    ? handoffStart ?? index * segment + segment * (compactTail ? 0.42 : 0.5)
    : (index + 1) * segment - crossfade;
  const end = isLast
    ? handoffStart != null
      ? Math.min(handoffStart + 0.22, 1)
      : 1
    : (index + 1) * segment + crossfade * 0.25;

  return { start, enterEnd, exitStart, end };
}

function StepLayer({
  index,
  total,
  step,
  progress,
  compactTail,
  handoffStart,
}: {
  index: number;
  total: number;
  step: StickyStep;
  progress: MotionValue<number>;
  compactTail: boolean;
  handoffStart?: number;
}) {
  const { start, enterEnd, exitStart, end } = stepKeyframes(index, total, compactTail, handoffStart);

  const opacity = useTransform(progress, [start, enterEnd, exitStart, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, enterEnd, exitStart, end], [64, 0, 0, -140]);
  const scale = useTransform(progress, [start, enterEnd, exitStart, end], [0.98, 1, 1, 0.96]);

  return (
    <motion.article
      className="absolute inset-0 flex items-center justify-center px-5 sm:px-8"
      style={{ opacity, y, scale, zIndex: index + 1 }}
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
  compactTail = false,
  tailSlot,
  handoffStart,
}: StickySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const handoff = handoffStart ?? 0.74;
  const tailEnter = handoff + 0.06;
  const tailOpacity = useTransform(
    scrollYProgress,
    [tailEnter, tailEnter + 0.12],
    [0, 1],
  );
  const tailY = useTransform(scrollYProgress, [tailEnter, tailEnter + 0.12], [120, 0]);

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
        <div className="absolute left-0 right-0 top-0 z-20 pt-14 sm:pt-16">
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
              compactTail={compactTail}
              handoffStart={tailSlot ? handoff : undefined}
            />
          ))}

          {tailSlot ? (
            <motion.div
              className="absolute inset-x-0 bottom-0 z-12 flex justify-center px-5 pb-[22vh] sm:px-8"
              style={{ opacity: tailOpacity, y: tailY }}
            >
              {tailSlot}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
