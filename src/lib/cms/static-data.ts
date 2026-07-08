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
import it from "../../../locales/it.json";
import projectsBase from "../../../content/projects.json";

type Messages = typeof en;

const LOCALE_MESSAGES: Record<Locale, Messages> = { en, es, pt, fr, it };

// ─── Contact links ───────────────────────────────────────────────────────────

const CONTACT_LINKS: ContactContent["links"] = [
  { type: "email", label: "piperincon.dev@gmail.com", href: "mailto:piperincon.dev@gmail.com" },
  { type: "github", label: "GitHub", href: "https://github.com/ImShepo" },
  { type: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/pipe-rincon" },
];

const FOOTER_SOCIAL_LINKS: FooterContent["socialLinks"] = [
  { type: "github", label: "GitHub", href: "https://github.com/ImShepo" },
  { type: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/pipe-rincon" },
  { type: "email", label: "Email", href: "mailto:piperincon.dev@gmail.com" },
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
        { value: 5, suffix: "+", label: m.outcomes.items.lcp },
        { value: 8, suffix: "+", label: m.outcomes.items.checkout },
        { value: 3, suffix: "+", label: m.outcomes.items.teams },
        { value: 5, suffix: "", label: m.outcomes.items.uptime },
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
  { name: "Java", category: "Language", icon: "code", level: "Expert" },
  { name: "JavaScript", category: "Language", icon: "code", level: "Expert" },
  { name: "Dart", category: "Language", icon: "code", level: "Advanced" },
  { name: "NestJS", category: "Backend", icon: "server", level: "Expert" },
  { name: "Spring Boot", category: "Backend", icon: "server", level: "Expert" },
  { name: "Node.js", category: "Backend", icon: "server", level: "Expert" },
  { name: "Next.js", category: "Frontend", icon: "nextjs", level: "Advanced" },
  { name: "React", category: "Frontend", icon: "react", level: "Advanced" },
  { name: "Flutter", category: "Mobile", icon: "smartphone", level: "Advanced" },
  { name: "PostgreSQL", category: "Database", icon: "database", level: "Expert" },
  { name: "MongoDB", category: "Database", icon: "database", level: "Advanced" },
  { name: "Docker", category: "DevOps", icon: "cloud", level: "Advanced" },
  { name: "AWS", category: "Cloud", icon: "cloud", level: "Advanced" },
  { name: "Microservices", category: "Architecture", icon: "layout", level: "Advanced" },
  { name: "RabbitMQ", category: "Messaging", icon: "zap", level: "Advanced" },
];

const STATIC_EXPERIENCE: ExperienceContent = [
  {
    company: "Alteza Enterprise",
    role: "Mid Senior Software Developer",
    period: "2023 – Present",
    description:
      "Lead the backend team for enterprise-scale electronic billing systems. Drive architectural improvements through microservices adoption, async messaging with RabbitMQ, and SOLID design principles. Integrate payment gateways and implement risk analysis strategies for financial security.",
    highlights: [
      "Designed microservices architecture improving modularity and maintainability",
      "Integrated payment gateways with risk analysis for financial security",
      "Leveraged AI-assisted tools to accelerate development and optimize workflows",
    ],
  },
  {
    company: "Vortex Soluciones SAS",
    role: "Mid Senior Software Developer",
    period: "Apr 2025 – Nov 2025",
    description:
      "Designed and delivered a mobility metrics monitoring platform (Flutter mobile app + NestJS web admin) and an LMS system for ATEC. Built real-time dashboards, scalable REST APIs, and managed cloud deployments on Railway and Google Play Store.",
    highlights: [
      "Built real-time mobility analytics dashboards for operations teams",
      "Published mobile app to Google Play Store",
      "Applied clean architecture with JWT and role-based access control",
    ],
  },
  {
    company: "Sougile SAS",
    role: "Backend Software Developer",
    period: "Jun 2022 – Nov 2023",
    description:
      "Developed and optimized backend services with Node.js and NestJS, applying OOP principles and code refactoring for improved architecture. Managed database structures with Firestore on Google Cloud, facilitating collaborative development integration.",
    highlights: [
      "Improved backend architecture with OOP and SOLID principles",
      "Managed cloud databases with Firestore on Google Cloud",
      "Built and containerized microservices with NestJS and Docker",
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
