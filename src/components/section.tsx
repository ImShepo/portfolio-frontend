"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  /** Full-bleed layout wrapper (same background as page) */
  alt?: boolean;
}

export function Section({ id, title, subtitle, children, className = "", alt }: SectionProps) {
  const content = (
    <>
      {(title || subtitle) && (
        <motion.header
          className="mb-14 md:mb-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          {title && (
            <h2
              id={title ? `${id ?? "section"}-title` : undefined}
              className="text-heading text-foreground"
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-5 text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.header>
      )}
      {children}
    </>
  );

  if (alt) {
    return (
      <motion.section
        id={id}
        className={`section-padding section-alt w-full ${className}`}
        aria-labelledby={title ? `${id ?? "section"}-title` : undefined}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="px-5 sm:px-8 mx-auto max-w-6xl w-full">{content}</div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      className={`section-padding px-5 sm:px-8 mx-auto max-w-6xl w-full ${className}`}
      aria-labelledby={title ? `${id ?? "section"}-title` : undefined}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {content}
    </motion.section>
  );
}
