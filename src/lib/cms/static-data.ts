import "server-only";

import type { Locale } from "@/lib/locales";
import type {
  AboutContent,
  CmsSectionKey,
  ContactContent,
  ExperienceContent,
  FooterContent,
  HomeContent,
  SkillsContent,
} from "@/lib/cms/schemas";
import type { Project } from "@/lib/api/types";

import en from "../../../locales/en.json";
import es from "../../../locales/es.json";
import pt from "../../../locales/pt.json";
import fr from "../../../locales/fr.json";
import projectsBase from "../../../content/projects.json";

type Messages = typeof en;

const LOCALE_MESSAGES: Record<Locale, Messages> = { en, es, pt, fr };

// ─── Contact links ───────────────────────────────────────────────────────────

const CONTACT_LINKS: ContactContent["links"] = [
  { type: "email", label: "hello@example.com", href: "mailto:hello@example.com" },
  { type: "github", label: "GitHub", href: "https://github.com" },
  { type: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  { type: "twitter", label: "Twitter", href: "https://twitter.com" },
];

const FOOTER_SOCIAL_LINKS: FooterContent["socialLinks"] = [
  { type: "github", label: "GitHub", href: "https://github.com" },
  { type: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  { type: "twitter", label: "Twitter", href: "https://twitter.com" },
  { type: "email", label: "Email", href: "mailto:hello@example.com" },
];

// ─── Section builders ────────────────────────────────────────────────────────

function buildHome(m: Messages): HomeContent {
  return {
    hero: {
      eyebrow: m.hero.eyebrow,
      title: m.hero.title,
      description: m.hero.description,
      seeCaseStudies: m.hero.seeCaseStudies,
      bookIntro: m.hero.bookIntro,
      getInTouch: m.hero.getInTouch,
    },
    outcomes: {
      title: m.outcomes.title,
      subtitle: m.outcomes.subtitle,
      items: [
        { value: 40, suffix: "%", label: m.outcomes.items.lcp },
        { value: 23, suffix: "%", label: m.outcomes.items.checkout },
        { value: 15, suffix: "+", label: m.outcomes.items.teams },
        { value: 99.9, suffix: "%", label: m.outcomes.items.uptime },
      ],
    },
    whatIDo: {
      eyebrow: m.whatIDo.eyebrow,
      title: m.whatIDo.title,
      subtitle: m.whatIDo.subtitle,
      steps: [
        { title: m.whatIDo.steps.performance.title, body: m.whatIDo.steps.performance.body },
        { title: m.whatIDo.steps.ux.title, body: m.whatIDo.steps.ux.body },
        { title: m.whatIDo.steps.architecture.title, body: m.whatIDo.steps.architecture.body },
      ],
    },
    featuredCaseStudy: {
      eyebrow: m.featuredCaseStudy.eyebrow,
      title: m.featuredCaseStudy.title,
      subtitle: m.featuredCaseStudy.subtitle,
      steps: [
        { title: m.featuredCaseStudy.steps.problem.title, body: m.featuredCaseStudy.steps.problem.body },
        { title: m.featuredCaseStudy.steps.solution.title, body: m.featuredCaseStudy.steps.solution.body },
        { title: m.featuredCaseStudy.steps.result.title, body: m.featuredCaseStudy.steps.result.body },
      ],
    },
    projectsSection: {
      title: m.projects.title,
      subtitle: m.projects.subtitle,
      viewAll: m.projects.viewAll,
    },
    contactCta: {
      title: m.contact.title,
      subtitle: m.contact.subtitle,
      cta: m.contact.cta,
      sayHello: m.contact.sayHello,
    },
  };
}

function buildAbout(m: Messages): AboutContent {
  return {
    title: m.about.title,
    subtitle: m.about.subtitle,
    paragraph1: m.about.paragraph1,
    paragraph2: m.about.paragraph2,
    paragraph3: m.about.paragraph3,
  };
}

function buildContact(m: Messages): ContactContent {
  return {
    title: m.contact.title,
    subtitle: m.contact.subtitle,
    cta: m.contact.cta,
    sayHello: m.contact.sayHello,
    pageTitle: m.contact.pageTitle,
    pageSubtitle: m.contact.pageSubtitle,
    formIntro: m.contact.formIntro,
    links: CONTACT_LINKS,
  };
}

function buildFooter(m: Messages): FooterContent {
  return {
    tagline: m.footer.tagline,
    navigationLabel: m.footer.navigation,
    getInTouchLabel: m.footer.getInTouch,
    getInTouchDesc: m.footer.getInTouchDesc,
    sayHello: m.footer.sayHello,
    copyrightName: m.nav.logo,
    socialLinks: FOOTER_SOCIAL_LINKS,
  };
}

const STATIC_SKILLS: SkillsContent = [
  { name: "TypeScript", category: "Language", icon: "code", level: "Expert" },
  { name: "React", category: "Frontend", icon: "react", level: "Expert" },
  { name: "Next.js", category: "Framework", icon: "nextjs", level: "Expert" },
  { name: "Node.js", category: "Backend", icon: "server", level: "Advanced" },
  { name: "NestJS", category: "Backend", icon: "server", level: "Advanced" },
  { name: "GraphQL", category: "API", icon: "database", level: "Advanced" },
  { name: "PostgreSQL", category: "Database", icon: "database", level: "Advanced" },
  { name: "Prisma", category: "ORM", icon: "database", level: "Advanced" },
  { name: "Docker", category: "DevOps", icon: "cloud", level: "Advanced" },
  { name: "Kubernetes", category: "DevOps", icon: "cloud", level: "Intermediate" },
  { name: "Tailwind CSS", category: "Styling", icon: "palette", level: "Expert" },
  { name: "Web Performance", category: "Quality", icon: "zap", level: "Expert" },
  { name: "Accessibility", category: "Quality", icon: "accessibility", level: "Expert" },
  { name: "Design Systems", category: "UX", icon: "layout", level: "Expert" },
];

const STATIC_EXPERIENCE: ExperienceContent = [
  {
    company: "Tech Corp",
    role: "Senior Frontend Architect",
    period: "2022 – Present",
    description:
      "Lead frontend architecture for core product surfaces. Define patterns for state, data fetching, and design systems. Mentor engineers and drive accessibility and performance standards.",
    highlights: [
      "Shipped design system used by 15+ teams",
      "Reduced LCP by 40% across key flows",
      "Established a11y review process",
    ],
  },
  {
    company: "Startup Inc",
    role: "Staff Engineer",
    period: "2019 – 2022",
    description:
      "Owned the web application end-to-end. Built real-time features, payment integration, and the first version of the design system.",
    highlights: [
      "Scaled frontend from 2 to 12 engineers",
      "Launched mobile-first payment flow",
      "Introduced TypeScript and testing culture",
    ],
  },
  {
    company: "Agency Co",
    role: "Lead Frontend Developer",
    period: "2016 – 2019",
    description:
      "Delivered high-profile client projects: e-commerce, dashboards, and marketing sites. Focus on performance and cross-browser compatibility.",
    highlights: [
      "Led 5+ greenfield projects",
      "Achieved 95+ Lighthouse scores consistently",
      "Built reusable component library",
    ],
  },
];

// ─── Public API ───────────────────────────────────────────────────────────────

export function getStaticSection(key: CmsSectionKey, locale: Locale): HomeContent | AboutContent | ContactContent | FooterContent | SkillsContent | ExperienceContent {
  const m = LOCALE_MESSAGES[locale];
  switch (key) {
    case "home":       return buildHome(m);
    case "about":      return buildAbout(m);
    case "contact":    return buildContact(m);
    case "footer":     return buildFooter(m);
    case "skills":     return STATIC_SKILLS;
    case "experience": return STATIC_EXPERIENCE;
  }
}

export function getStaticProjects(locale: Locale): Project[] {
  const items = (LOCALE_MESSAGES[locale].projectItems ?? {}) as Record<
    string,
    { title: string; description: string }
  >;

  return (projectsBase as Project[]).map((project) => {
    const t = items[project.slug];
    if (!t) return project;
    return { ...project, title: t.title, description: t.description };
  });
}
