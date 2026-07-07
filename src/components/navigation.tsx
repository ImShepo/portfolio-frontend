"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/i18n/provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
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
        scrolled ? "glass shadow-sm shadow-black/3 dark:shadow-black/20" : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex h-17 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-heading-sm tracking-tight text-foreground transition-opacity hover:opacity-80 focus:opacity-80"
        >
          {t("nav.logo")}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map(({ href, labelKey }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  data-active={pathname === href ? "true" : undefined}
                  className={cn(
                    "nav-link rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                    pathname === href && "bg-muted text-foreground"
                  )}
                >
                  {t(labelKey)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-2 flex items-center gap-1 border-l border-border pl-4">
            <LanguageSwitcher testId="language-switcher-desktop" />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher testId="language-switcher-mobile" />
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-0.5 px-5 py-4 sm:px-8">
              {navLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200",
                      pathname === href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
