import { Hero } from "@/components/sections/hero";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { ContactSection } from "@/components/sections/contact-section";
import { SelectedOutcomes } from "@/components/sections/SelectedOutcomes";
import { WhatIDoSticky } from "@/components/sections/WhatIDoSticky";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { getFeaturedProjectsForRequest } from "@/lib/content";
import { getHomeContentForRequest } from "@/lib/cms/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ content: home, contentEn: homeEn }, { content: projects, contentEn: projectsEn }] =
    await Promise.all([getHomeContentForRequest(), getFeaturedProjectsForRequest()]);

  return (
    <>
      <Hero cms={home?.hero} cmsEn={homeEn?.hero} />
      <SelectedOutcomes cms={home?.outcomes} cmsEn={homeEn?.outcomes} />
      <WhatIDoSticky cms={home?.whatIDo} cmsEn={homeEn?.whatIDo} />
      <FeaturedProjectsSection
        projects={projects ?? []}
        projectsEn={projectsEn ?? undefined}
        cms={home?.projectsSection}
        cmsEn={homeEn?.projectsSection}
      />
      <FeaturedProject cms={home?.featuredCaseStudy} cmsEn={homeEn?.featuredCaseStudy} />
      <ContactSection cms={home?.contactCta} cmsEn={homeEn?.contactCta} />
    </>
  );
}
