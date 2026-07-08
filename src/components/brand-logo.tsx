import Image from "next/image";
import Link from "next/link";
import { HomeLink } from "@/components/home-link";
import { cn } from "@/lib/utils";
import { isHomeHref } from "@/lib/scroll-to-hero";

export const BRAND_ASSETS = {
  mark: "/branding/logo-mark.png",
  withText: "/branding/logo-with-text.png",
  text: "/branding/logo-text.png",
} as const;

type BrandLogoProps = {
  variant?: "full" | "lockup" | "mark" | "text";
  featured?: boolean;
  className?: string;
  imageClassName?: string;
  href?: string | null;
};

const VARIANT_CONFIG = {
  full: { src: BRAND_ASSETS.withText, width: 320, height: 388, alt: "Portfolio Oscar Felipe" },
  mark: { src: BRAND_ASSETS.mark, width: 80, height: 82, alt: "Portfolio Oscar Felipe" },
  text: { src: BRAND_ASSETS.text, width: 200, height: 46, alt: "Portfolio Oscar Felipe" },
} as const;

export function BrandLogo({
  variant = "full",
  featured = false,
  className,
  imageClassName,
  href = "/",
}: BrandLogoProps) {
  const alt = "Portfolio Oscar Felipe";

  const image =
    variant === "lockup" ? (
      <span className={cn("inline-flex items-center gap-2 sm:gap-2.5", className)}>
        <Image
          src={BRAND_ASSETS.mark}
          alt=""
          aria-hidden
          width={VARIANT_CONFIG.mark.width}
          height={VARIANT_CONFIG.mark.height}
          className={cn("h-8 w-auto object-contain sm:h-9", imageClassName)}
          priority
        />
        <Image
          src={BRAND_ASSETS.text}
          alt={alt}
          width={VARIANT_CONFIG.text.width}
          height={VARIANT_CONFIG.text.height}
          className={cn("h-3.5 w-auto object-contain sm:h-4", imageClassName)}
          priority
        />
      </span>
    ) : (
      <span className={cn("inline-flex items-center", className)}>
        <Image
          src={VARIANT_CONFIG[variant].src}
          alt={alt}
          width={VARIANT_CONFIG[variant].width}
          height={VARIANT_CONFIG[variant].height}
          className={cn(
            "w-auto object-contain",
            variant === "mark" && "h-8 sm:h-9",
            variant === "text" && "h-7",
            variant === "full" && !featured && "h-10 sm:h-11",
            variant === "full" && featured && "h-auto w-full max-w-[16rem] lg:max-w-[20rem]",
            imageClassName,
          )}
          priority={variant === "mark" || variant === "full"}
        />
      </span>
    );

  if (href) {
    const linkClassName =
      "inline-flex transition-opacity hover:opacity-80 focus-visible:opacity-80";

    if (isHomeHref(href)) {
      return (
        <HomeLink className={linkClassName} aria-label={alt}>
          {image}
        </HomeLink>
      );
    }

    return (
      <Link href={href} className={linkClassName} aria-label={alt}>
        {image}
      </Link>
    );
  }

  return image;
}
