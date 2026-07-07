import { Metadata } from "next";
import { ContactPageClient } from "./contact-page-client";
import { getContactContentForRequest } from "@/lib/cms/content";
import { getServerTranslations } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations();
  return {
    title: t("contact.pageTitle"),
    description: t("contact.pageSubtitle"),
  };
}

export default async function ContactPage() {
  const { content: contact, contentEn: contactEn } = await getContactContentForRequest();
  return (
    <ContactPageClient cms={contact ?? undefined} cmsEn={contactEn ?? undefined} />
  );
}
