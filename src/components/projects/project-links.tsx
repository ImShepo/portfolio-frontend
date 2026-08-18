import { ExternalLink, Github } from "lucide-react";
import { useTranslations } from "@/i18n/provider";
import { cn } from "@/lib/utils";

type ProjectLinksProps = {
  demo?: string | null;
  github?: string | null;
  layout?: "inline" | "actions";
};

export function ProjectLinks({ demo, github, layout = "inline" }: ProjectLinksProps) {
  const t = useTranslations();

  if (!demo && !github) {
    return null;
  }

  const linkClass = cn(
    "inline-flex items-center justify-center gap-1.5 font-medium transition-colors",
    layout === "actions"
      ? "flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2.5 text-xs hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-dim)] hover:text-[var(--color-accent)]"
      : "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1.5 text-xs text-foreground hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
  );

  return (
    <div className={cn("flex gap-2", layout === "actions" ? "w-full" : "flex-wrap")}>
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <ExternalLink size={13} aria-hidden />
          {t("projects.demo")}
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Github size={13} aria-hidden />
          {t("projects.code")}
        </a>
      )}
    </div>
  );
}
