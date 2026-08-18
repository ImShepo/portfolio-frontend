import Image from "next/image";
import { cn } from "@/lib/utils";

type ProjectCoverImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  variant?: "card" | "hero";
  className?: string;
  imageClassName?: string;
  children?: React.ReactNode;
};

export function ProjectCoverImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  variant = "card",
  className,
  imageClassName,
  children,
}: ProjectCoverImageProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "project-cover relative overflow-hidden bg-muted",
        isHero
          ? "absolute inset-0"
          : "aspect-video w-full light:bg-gradient-to-br light:from-[#e8edf9] light:via-[#f7f8fd] light:to-[#eef2fb] light:p-4",
        className
      )}
    >
      <div
        className={cn(
          "project-cover__media relative h-full w-full",
          isHero && "min-h-full",
          !isHero &&
            "light:overflow-hidden light:rounded-xl light:bg-white light:shadow-[0_16px_40px_-28px_rgba(47,94,220,0.65)] light:ring-1 light:ring-[rgba(47,94,220,0.16)]"
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={isHero ? "100vw" : sizes}
          className={cn(
            "project-cover__image object-cover transition-transform duration-500 ease-out group-hover:scale-105",
            !isHero &&
              "light:brightness-[1.34] light:contrast-[0.9] light:saturate-[0.88]",
            isHero &&
              "light:brightness-[1.18] light:contrast-[0.94] light:saturate-[0.92] light:opacity-80",
            imageClassName
          )}
        />
        <div className="project-cover__glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="project-cover__wash pointer-events-none absolute inset-0" aria-hidden />
        <div className="project-cover__vignette pointer-events-none absolute inset-0" aria-hidden />
        {children}
      </div>
    </div>
  );
}
