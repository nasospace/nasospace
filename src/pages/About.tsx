import { SEOHead } from "@/components/shared/SEOHead";
import { AboutHero, WhatNasoIsSection, OfferingsSection, ValuesSection, AboutCTA } from "@/features/about";

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About"
        description="NASO is a Cairo-born creative brand designing experiences, workshops, events, and products for people who want their free time to actually mean something."
        canonical="https://naso.co/about"
      />
      <AboutHero />
      <WhatNasoIsSection />
      <OfferingsSection />
      <ValuesSection />
      <AboutCTA />
    </>
  );
}
