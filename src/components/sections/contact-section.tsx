"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import type { HomeContent } from "@/lib/cms/schemas";

type ContactSectionProps = {
  cms?: HomeContent["contactCta"];
  cmsEn?: HomeContent["contactCta"];
};

export function ContactSection({ cms, cmsEn }: ContactSectionProps) {
  const t = useTranslations();
  const cmsText = useCmsText();

  return (
    <Section
      id="contact"
      title={cmsText(cms?.title, t("contact.title"), cmsEn?.title)}
      subtitle={cmsText(cms?.subtitle, t("contact.subtitle"), cmsEn?.subtitle)}
      alt
    >
      <motion.div
        className="mx-auto max-w-xl rounded-2xl glass-card p-10 sm:p-14 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
      >
        <p className="text-body-lg text-muted-foreground leading-relaxed mb-8">
          {cmsText(cms?.cta, t("contact.cta"), cmsEn?.cta)}
        </p>
        <Button asChild size="lg" variant="primary" className="gap-2 rounded-sm font-semibold">
          <Link href="/contact">
            <Mail size={20} aria-hidden />
            {cmsText(cms?.sayHello, t("contact.sayHello"), cmsEn?.sayHello)}
            <ArrowRight size={18} aria-hidden />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
