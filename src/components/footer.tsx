"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import type { FooterContent } from "@/lib/cms/schemas";

const iconByType = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  website: Mail,
  custom: Mail,
} as const;

const defaultSocialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "mailto:hello@example.com", icon: Mail, label: "Email" },
];

const footerLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;

type FooterProps = {
  cms?: FooterContent;
  cmsEn?: FooterContent;
};

export function Footer({ cms, cmsEn }: FooterProps) {
  const t = useTranslations();
  const cmsText = useCmsText();
  const [year, setYear] = useState<string>("2026");

  const socialLinks =
    cms?.socialLinks.map((link) => ({
      href: link.href,
      icon: iconByType[link.type] ?? Mail,
      label: link.label,
    })) ?? defaultSocialLinks;

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setYear(String(new Date().getFullYear()));
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <footer
      className="relative border-t border-border bg-section dark:bg-background/95 backdrop-blur-sm"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-heading-sm tracking-tight text-foreground transition-opacity hover:opacity-80"
            >
              {t("nav.logo")}
            </Link>
            <p className="mt-4 max-w-sm text-caption">
              {cmsText(cms?.tagline, t("footer.tagline"), cmsEn?.tagline)}
            </p>
            <nav aria-label="Social links" className="mt-6">
              <ul className="flex items-center gap-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {cmsText(cms?.navigationLabel, t("footer.navigation"), cmsEn?.navigationLabel)}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-caption text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {cmsText(cms?.getInTouchLabel, t("footer.getInTouch"), cmsEn?.getInTouchLabel)}
            </h3>
            <p className="mt-4 text-caption text-muted-foreground">
              {cmsText(cms?.getInTouchDesc, t("footer.getInTouchDesc"), cmsEn?.getInTouchDesc)}
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {cmsText(cms?.sayHello, t("footer.sayHello"), cmsEn?.sayHello)} →
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-caption">
            © {year} {cmsText(cms?.copyrightName, "Portfolio", cmsEn?.copyrightName)}.
          </p>
        </div>
      </div>
    </footer>
  );
}
