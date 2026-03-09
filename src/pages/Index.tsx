import { SEOHead } from "@/components/shared/SEOHead";
import {
  HeroSection,
  WhatNasoIsSection,
  ExploreWorldsSection,
  FeaturedExperiencesSection,
  MoreToExploreSection,
  BigCTASection,
  BottomTickerSection,
} from "@/features/home/components";

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Home"
        description="NASO is a Cairo-born creative brand crafting bold experiences, workshops, events, and products for people who want their free time to mean something."
        canonical="https://naso.co"
      />
      <HeroSection />
      <WhatNasoIsSection />
      <ExploreWorldsSection />
      <FeaturedExperiencesSection />
      <MoreToExploreSection />
      <BigCTASection />
      <BottomTickerSection />
    </>
  );
}
