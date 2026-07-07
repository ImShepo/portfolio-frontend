"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";
import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import type { ContactContent } from "@/lib/cms/schemas";

const iconByType = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
  custom: Globe,
} as const;

const defaultLinks = [
  { href: "mailto:hello@example.com", label: "hello@example.com", icon: Mail },
  { href: "https://github.com", label: "GitHub", icon: Github },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
];

type ContactFormProps = {
  cms?: ContactContent;
  cmsEn?: ContactContent;
};

export function ContactForm({ cms, cmsEn }: ContactFormProps) {
  const t = useTranslations();
  const cmsText = useCmsText();
  const links =
    cms?.links.map((link) => ({
      href: link.href,
      label: link.label,
      icon: iconByType[link.type] ?? Globe,
    })) ?? defaultLinks;

  return (
    <motion.div
      className="rounded-2xl glass-card p-8 sm:p-10"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <p className="text-body-lg text-muted-foreground mb-8 leading-relaxed">
        {cmsText(cms?.formIntro, t("contact.formIntro"), cmsEn?.formIntro)}
      </p>
      <div className="flex flex-col gap-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Button
            key={label}
            asChild
            variant="outline"
            size="lg"
            className="w-full justify-start gap-3"
          >
            <a
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            >
              <Icon size={20} />
              {label}
            </a>
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
