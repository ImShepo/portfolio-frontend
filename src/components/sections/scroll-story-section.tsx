"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type StoryStep = {
  title: string;
  body: string;
};

type ScrollStorySectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  steps: StoryStep[];
};

function StoryStepLayer({
  progress,
  index,
  total,
  step,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  step: StoryStep;
}) {
  const start = index / total;
  const middle = (index + 0.5) / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, middle, end], [0, 1, 0]);
  const y = useTransform(progress, [start, middle, end], [24, 0, -16]);
  const scale = useTransform(progress, [start, middle, end], [0.985, 1, 0.99]);

  return (
    <motion.article
      className="absolute inset-0 flex items-center justify-center px-5 sm:px-8"
      style={{ opacity, y, scale }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="text-display text-foreground">{step.title}</h3>
        <p className="mt-6 text-body-lg text-muted-foreground">{step.body}</p>
      </div>
    </motion.article>
  );
}

export function ScrollStorySection({
  id,
  eyebrow,
  title,
  subtitle,
  steps,
}: ScrollStorySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.18], [0, -20]);

  return (
    <section id={id} ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.header
          className="absolute left-0 right-0 top-0 z-20 pt-20 sm:pt-24"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-heading text-foreground">{title}</h2>
            {subtitle ? (
              <p className="mx-auto mt-4 max-w-2xl text-body text-muted-foreground">
                {subtitle}
              </p>
            ) : null}
          </div>
        </motion.header>

        <div className="relative h-full">
          {steps.map((step, index) => (
            <StoryStepLayer
              key={step.title}
              progress={scrollYProgress}
              index={index}
              total={steps.length}
              step={step}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
