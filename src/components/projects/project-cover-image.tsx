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
        isHero ? "absolute inset-0" : "aspect-video w-full",
        className
      )}
    >
      <div className={cn("project-cover__media relative h-full w-full", isHero && "min-h-full")}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={isHero ? "100vw" : sizes}
          className={cn(
            "project-cover__image object-cover transition-transform duration-500 ease-out group-hover:scale-105",
            imageClassName
          )}
        />
        <div className="project-cover__glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="project-cover__vignette pointer-events-none absolute inset-0" aria-hidden />
        {children}
      </div>
    </div>
  );
}
