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
  HowItWorksSection,
  CommunityProofSection,
  DIYKitsSection,
} from "@/features/home/components";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { ArrowRight } from "lucide-react";
import { NarrativeMarqueeDivider, WavyDivider } from "@/components/shared/RetroElements";
import { SectionErrorBoundary } from "@/components/shared/SectionErrorBoundary";

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="NASO Space | Cairo's Creative Movement & Workshops"
        description="Looking for things to do in Cairo? NASO Space is a creative movement offering premium workshops, DIY kits, and unforgettable experiences in Egypt. Stop having boring weekends. | مساحة ناسّو - ورش عمل إبداعية وتجارب فنية في القاهرة"
        canonical="/"
        ogImage="/assets/hero_image_1776810151671.png"
        jsonLd={[
          buildOrganizationSchema(), 
          buildWebSiteSchema()
        ]}
      />

      <HeroSection />

      {/* Tape: dark → bright primary */}
      <NarrativeMarqueeDivider
        words={["ENTER THE MOVEMENT", "NOT JUST A WEEKEND", "THE CULTURE SHIFT"]}
        className="bg-primary text-primary-foreground"
        speed={25}
      />

      {/* WhatNasoIs: bg-background (white) */}
      <WhatNasoIsSection />

      {/* Wave: bg-background → bg-foreground (dark) */}
      <WavyDivider className="bg-background text-foreground -mt-px" />

      {/* FeaturedExperiences: bg-foreground (dark) */}
      <SectionErrorBoundary fallbackMessage="Failed to load experiences.">
        <FeaturedExperiencesSection />
      </SectionErrorBoundary>

      {/* Tape: dark → lilac — ExploreWorlds has its own internal top wave */}
      <NarrativeMarqueeDivider
        words={["CREATIVE EXPERIENCES", "PHYSICAL ARTIFACTS", "THE STUDIO"]}
        className="bg-naso-lilac text-foreground"
        direction={-1}
        speed={30}
      />

      {/* ExploreWorlds: bg-naso-cream (has built-in WavyDivider at top already) */}
      <ExploreWorldsSection />

      {/* Single wave divider between two cream sections */}
      <WavyDivider className="bg-naso-cream text-foreground -mb-px" />

      {/* DIYKits: bg-naso-cream */}
      <DIYKitsSection />

      {/* Tape: cream → dark */}
      <NarrativeMarqueeDivider
        words={["THE COMMUNITY", "THE CULT", "THE VIBE"]}
        className="bg-foreground text-background"
        speed={20}
      />

      {/* CommunityProof: bg-foreground (dark) */}
      <CommunityProofSection />

      {/* Wave: bg-foreground → bg-naso-cream */}
      <WavyDivider className="bg-foreground text-naso-cream -mt-px" />

      {/* HowItWorks: bg-naso-cream */}
      <HowItWorksSection />

      {/* Tape: cream → secondary green */}
      <NarrativeMarqueeDivider
        words={["KEEP EXPLORING", "NEVER STOP", "ALWAYS CREATING"]}
        className="bg-secondary text-foreground"
        direction={-1}
      />

      {/* MoreToExplore: bg-foreground (dark) */}
      <MoreToExploreSection />

      {/* Wave: bg-foreground → bg-naso-cream */}
      <WavyDivider className="bg-foreground text-naso-cream -mt-px" />

      {/* BigCTA: bg-naso-cream */}
      <BigCTASection />

      {/* Wave: bg-naso-cream → bg-foreground (into the dark BottomTicker) */}
      <WavyDivider className="bg-naso-cream text-foreground -mb-px" />

      {/* BottomTicker: bg-foreground (dark) */}
      <BottomTickerSection />
    </>
  );
}
