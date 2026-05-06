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
      <FeaturedExperiencesSection />

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

      {/* Sticky Mobile Action Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-in slide-in-from-bottom-10 fade-in duration-700 delay-1000">
        <div className="flex items-center justify-between rounded-full border-4 border-foreground bg-white/95 backdrop-blur-md p-2 shadow-[4px_4px_0_hsl(var(--foreground))]">
          <div className="ml-4 flex flex-col">
            <span className="font-groovy text-xs font-black text-foreground leading-tight tracking-tight">The 100 Chapters</span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-primary">Mysteries await</span>
          </div>
          <Link
            to={ROUTES.EXPERIENCES}
            className="flex h-11 items-center justify-center gap-2 rounded-full border-2 border-foreground bg-primary px-6 font-groovy text-[11px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_hsl(var(--foreground))] transition-all duration-200 active:translate-y-0.5 active:shadow-none"
          >
            Explore
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}
