export const HERO_SECTION_ID = "hero";

export function scrollToHero(behavior: ScrollBehavior = "smooth") {
  const hero = document.getElementById(HERO_SECTION_ID);
  if (hero) {
    hero.scrollIntoView({ behavior, block: "start" });
    return;
  }
  window.scrollTo({ top: 0, behavior });
}

export function isHomeHref(href: string) {
  return href === "/" || href === "/#hero" || href === "#hero";
}
