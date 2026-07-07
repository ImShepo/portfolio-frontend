import { z } from "zod";

const shortText = z.string().trim().min(1).max(200);
const mediumText = z.string().trim().min(1).max(500);
const longText = z.string().trim().min(1).max(5000);

const storyStepSchema = z.object({
  title: shortText,
  body: longText,
});

const outcomeItemSchema = z.object({
  value: z.coerce.number(),
  suffix: z.string().trim().max(10),
  label: mediumText,
});

export const homeContentSchema = z.object({
  hero: z.object({
    eyebrow: shortText,
    title: mediumText,
    description: longText,
    seeCaseStudies: shortText,
    bookIntro: shortText,
    getInTouch: shortText,
  }),
  outcomes: z.object({
    title: shortText,
    subtitle: mediumText,
    items: z.array(outcomeItemSchema).min(1).max(12),
  }),
  whatIDo: z.object({
    eyebrow: shortText,
    title: mediumText,
    subtitle: mediumText,
    steps: z.array(storyStepSchema).min(1).max(6),
  }),
  featuredCaseStudy: z.object({
    eyebrow: shortText,
    title: mediumText,
    subtitle: mediumText,
    steps: z.array(storyStepSchema).length(3),
  }),
  projectsSection: z.object({
    title: shortText,
    subtitle: mediumText,
    viewAll: shortText,
  }),
  contactCta: z.object({
    title: shortText,
    subtitle: mediumText,
    cta: longText,
    sayHello: shortText,
  }),
});

export const aboutContentSchema = z.object({
  title: shortText,
  subtitle: mediumText,
  paragraph1: longText,
  paragraph2: longText,
  paragraph3: longText,
});

export const socialLinkSchema = z.object({
  type: z.enum(["email", "github", "linkedin", "twitter", "website", "custom"]),
  label: shortText,
  href: z.string().trim().min(1).max(500),
});

export const contactContentSchema = z.object({
  title: shortText,
  subtitle: mediumText,
  cta: longText,
  sayHello: shortText,
  pageTitle: shortText,
  pageSubtitle: mediumText,
  formIntro: longText,
  links: z.array(socialLinkSchema).min(1).max(10),
});

export const footerContentSchema = z.object({
  tagline: longText,
  navigationLabel: shortText,
  getInTouchLabel: shortText,
  getInTouchDesc: mediumText,
  sayHello: shortText,
  copyrightName: shortText,
  socialLinks: z.array(socialLinkSchema).min(1).max(10),
});

export const skillItemSchema = z.object({
  name: shortText,
  category: shortText,
  icon: shortText,
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
});

export const skillsContentSchema = z.array(skillItemSchema).min(1).max(50);

export const experienceItemSchema = z.object({
  company: shortText,
  role: shortText,
  period: shortText,
  description: longText,
  highlights: z.array(mediumText).min(1).max(10),
});

export const experienceContentSchema = z
  .array(experienceItemSchema)
  .min(1)
  .max(20);

export type HomeContent = z.infer<typeof homeContentSchema>;
export type AboutContent = z.infer<typeof aboutContentSchema>;
export type ContactContent = z.infer<typeof contactContentSchema>;
export type FooterContent = z.infer<typeof footerContentSchema>;
export type SkillsContent = z.infer<typeof skillsContentSchema>;
export type ExperienceContent = z.infer<typeof experienceContentSchema>;

export type CmsSectionKey =
  | "home"
  | "about"
  | "contact"
  | "footer"
  | "skills"
  | "experience";

const parsers: Record<CmsSectionKey, z.ZodType<unknown>> = {
  home: homeContentSchema,
  about: aboutContentSchema,
  contact: contactContentSchema,
  footer: footerContentSchema,
  skills: skillsContentSchema,
  experience: experienceContentSchema,
};

export function parseCmsSection<K extends CmsSectionKey>(
  key: K,
  content: unknown,
): K extends "home"
  ? HomeContent
  : K extends "about"
    ? AboutContent
    : K extends "contact"
      ? ContactContent
      : K extends "footer"
        ? FooterContent
        : K extends "skills"
          ? SkillsContent
          : ExperienceContent {
  return parsers[key].parse(content) as never;
}
