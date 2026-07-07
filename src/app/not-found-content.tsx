"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/i18n/provider";

export function NotFoundContent() {
  const t = useTranslations();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <h1 className="text-display text-foreground">{t("notFound.title")}</h1>
      <p className="mt-4 text-body-lg text-muted-foreground">
        {t("notFound.description")}
      </p>
      <Button asChild size="lg" className="mt-10">
        <Link href="/">{t("notFound.backHome")}</Link>
      </Button>
    </div>
  );
}
