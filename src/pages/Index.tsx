import { SEOHead } from "@/components/shared/SEOHead";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo";
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
        title="NASO — Creative Experiences, Workshops & Products from Cairo"
        description="NASO is a Cairo-born creative brand crafting bold experiences, workshops, events, and products for people who want their free time to mean something."
        canonical="/"
        jsonLd={[buildOrganizationSchema(), buildWebSiteSchema()]}
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
