"use client";

import { useTranslations } from "@/i18n/provider";
import { useCmsText } from "@/hooks/use-cms-text";
import type { ContactContent } from "@/lib/cms/schemas";
import { ContactForm } from "./contact-form";

type ContactPageClientProps = {
  cms?: ContactContent;
  cmsEn?: ContactContent;
};

export function ContactPageClient({ cms, cmsEn }: ContactPageClientProps) {
  const t = useTranslations();
  const cmsText = useCmsText();

  return (
    <div className="mx-auto max-w-xl px-5 py-16 sm:px-8 md:py-24">
      <header className="mb-14 text-center">
        <h1 className="text-heading text-foreground">
          {cmsText(cms?.pageTitle, t("contact.pageTitle"), cmsEn?.pageTitle)}
        </h1>
        <p className="mt-5 text-body-lg text-muted-foreground">
          {cmsText(cms?.pageSubtitle, t("contact.pageSubtitle"), cmsEn?.pageSubtitle)}
        </p>
      </header>
      <ContactForm cms={cms} cmsEn={cmsEn} />
    </div>
  );
}
