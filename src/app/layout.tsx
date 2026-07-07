import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { I18nProvider } from "@/i18n/provider";
import { SkipLink } from "@/components/skip-link";
import { Navigation } from "@/components/navigation";
import { FooterShell } from "@/components/footer-shell";
import { PageTransition } from "@/components/page-transition";
import { DomSanitizer } from "@/components/providers/dom-sanitizer";
import { getRequestLocale } from "@/lib/locale.server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Senior Frontend Architect",
    template: "%s | Portfolio",
  },
  description:
    "Senior Frontend Architect & UX Engineer. Building fast, accessible, and scalable web experiences. Design systems, performance, clean architecture.",
  keywords: ["frontend", "React", "Next.js", "TypeScript", "architecture", "UX"],
  authors: [{ name: "Portfolio" }],
  openGraph: {
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    // suppressHydrationWarning: next-themes may adjust <html class>; extensions may inject <body> attrs (e.g. cz-shortcut-listen) before hydrate
    <html lang={locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased flex flex-col bg-mesh transition-colors duration-300`}
      >
        <DomSanitizer />
        <ThemeProvider>
          <I18nProvider initialLocale={locale}>
            <SkipLink />
            <Navigation />
            <main className="flex-1 flex flex-col" id="main-content" tabIndex={-1}>
              <PageTransition>{children}</PageTransition>
            </main>
            <FooterShell />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
