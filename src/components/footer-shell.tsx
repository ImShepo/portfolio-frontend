import { getFooterContentForRequest } from "@/lib/cms/content";
import { Footer } from "@/components/footer";

export async function FooterShell() {
  const { content: cms, contentEn: cmsEn } = await getFooterContentForRequest();
  return <Footer cms={cms ?? undefined} cmsEn={cmsEn ?? undefined} />;
}
