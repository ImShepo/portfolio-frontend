"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { HERO_SECTION_ID, scrollToHero } from "@/lib/scroll-to-hero";

type HomeLinkProps = Omit<ComponentProps<typeof Link>, "href">;

export function HomeLink({ onClick, ...props }: HomeLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={`/#${HERO_SECTION_ID}`}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        if (pathname === "/") {
          event.preventDefault();
          scrollToHero();
        }
      }}
      {...props}
    />
  );
}
