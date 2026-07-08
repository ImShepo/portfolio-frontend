"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/i18n/provider";
import { BrandLogo } from "@/components/brand-logo";
import { HomeLink } from "@/components/home-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { isHomeHref } from "@/lib/scroll-to-hero";

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/about", labelKey: "nav.about" },
] as const;

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrolledRef = useRef(false);
  const t = useTranslations();

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next === lastScrolledRef.current) return;
      lastScrolledRef.current = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[var(--color-bg)]/90 backdrop-blur-xl border-b border-[var(--color-border)]"
          : "bg-transparent",
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <BrandLogo variant="lockup" />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-0.5">
            {navLinks.map(({ href, labelKey }) => (
              <li key={href}>
                {isHomeHref(href) ? (
                  <HomeLink
                    aria-current={pathname === "/" ? "page" : undefined}
                    data-active={pathname === "/" ? "true" : undefined}
                    className={cn(
                      "nav-link relative px-4 py-2 text-sm font-medium tracking-wide rounded-sm transition-colors duration-200",
                      pathname === "/"
                        ? "text-foreground"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]",
                    )}
                  >
                    {t(labelKey)}
                  </HomeLink>
                ) : (
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    data-active={pathname === href ? "true" : undefined}
                    className={cn(
                      "nav-link relative px-4 py-2 text-sm font-medium tracking-wide rounded-sm transition-colors duration-200",
                      pathname === href
                        ? "text-foreground"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]",
                    )}
                  >
                    {t(labelKey)}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="ml-4 flex items-center gap-2 border-l border-[var(--color-border)] pl-4">
            <LanguageSwitcher testId="language-switcher-desktop" />
            <ThemeToggle />
            <Link
              href="/contact"
              className="ml-1 rounded-sm bg-[var(--color-action-primary-bg)] px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-[var(--color-accent-bright)] hover:shadow-[0_0_20px_var(--color-accent-glow)]"
            >
              {t("nav.contact")}
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher testId="language-switcher-mobile" />
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-foreground"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {mobileOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
          >
            <ul className="flex flex-col px-5 py-3 sm:px-8">
              {navLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  {isHomeHref(href) ? (
                    <HomeLink
                      aria-current={pathname === "/" ? "page" : undefined}
                      className={cn(
                        "block rounded-sm px-4 py-3 text-sm font-medium tracking-wide transition-colors",
                        pathname === "/"
                          ? "text-foreground"
                          : "text-[var(--color-text-muted)] hover:text-foreground",
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(labelKey)}
                    </HomeLink>
                  ) : (
                    <Link
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                      className={cn(
                        "block rounded-sm px-4 py-3 text-sm font-medium tracking-wide transition-colors",
                        pathname === href
                          ? "text-foreground"
                          : "text-[var(--color-text-muted)] hover:text-foreground",
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(labelKey)}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pt-3 pb-2">
                <Link
                  href="/contact"
                  className="block w-full rounded-sm bg-[var(--color-action-primary-bg)] px-4 py-2.5 text-center text-sm font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
