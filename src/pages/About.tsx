import { SEOHead } from "@/components/shared/SEOHead";
import { AboutHero, WhatNasoIsSection, OfferingsSection, ValuesSection, AboutCTA } from "@/features/about";
import { usePageContent, getSection } from "@/hooks/usePageContent";

interface HeroContent { headline: string; subline: string }
interface WhatNasoContent { title: string; body: string }
interface OfferingsContent { items: Array<{ emoji: string; title: string; description: string }> }
interface ValuesContent { items: Array<{ title: string; body: string }> }

export default function AboutPage() {
  const { data: sections } = usePageContent("about");

  const hero = getSection<HeroContent>(sections, "hero");
  const whatNaso = getSection<WhatNasoContent>(sections, "what-naso-is");
  const offerings = getSection<OfferingsContent>(sections, "offerings");
  const values = getSection<ValuesContent>(sections, "values");

  return (
    <>
      <SEOHead
        title="About"
        description="NASO is a Cairo-born creative brand designing experiences, workshops, events, and products for people who want their free time to actually mean something."
        canonical="https://naso.co/about"
      />
      <AboutHero headline={hero?.headline} subline={hero?.subline} />
      <WhatNasoIsSection title={whatNaso?.title} body={whatNaso?.body} />
      <OfferingsSection items={offerings?.items} />
      <ValuesSection items={values?.items} />
      <AboutCTA />
    </>
  );
}
