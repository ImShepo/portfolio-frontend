"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { HERO_SECTION_ID, scrollToHero } from "@/lib/scroll-to-hero";

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" || window.location.hash !== `#${HERO_SECTION_ID}`) return;

    const frame = window.requestAnimationFrame(() => {
      scrollToHero();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
