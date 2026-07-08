import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { I18nProvider } from "@/i18n/provider";
import { SkipLink } from "@/components/skip-link";
import { Navigation } from "@/components/navigation";
import { FooterShell } from "@/components/footer-shell";
import { PageTransition } from "@/components/page-transition";
import { HashScrollHandler } from "@/components/hash-scroll-handler";
import { DomSanitizer } from "@/components/providers/dom-sanitizer";
import { getRequestLocale } from "@/lib/locale.server";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio Oscar Felipe | Full Stack Software Engineer",
    template: "%s | Portfolio Oscar Felipe",
  },
  icons: {
    icon: [{ url: "/branding/logo-mark.png", type: "image/png" }],
    shortcut: "/branding/logo-mark.png",
    apple: "/branding/logo-mark.png",
  },
  description:
    "Full Stack Software Engineer building scalable backend systems, web platforms, and mobile apps. NestJS, Spring Boot, Flutter, and cloud-native architecture.",
  keywords: [
    "full stack",
    "backend",
    "NestJS",
    "Spring Boot",
    "React",
    "Next.js",
    "TypeScript",
    "Flutter",
  ],
  authors: [{ name: "Oscar Felipe Mariño Rincón" }],
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
        className={`${spaceGrotesk.variable} ${geistMono.variable} min-h-screen antialiased flex flex-col bg-mesh transition-colors duration-300`}
      >
        <DomSanitizer />
        <ThemeProvider>
          <I18nProvider initialLocale={locale}>
            <SkipLink />
            <HashScrollHandler />
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
