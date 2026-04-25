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
  ExperienceCounter,
  DIYKitsSection,
} from "@/features/home/components";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { ArrowRight } from "lucide-react";

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
      <WhatNasoIsSection />
      <FeaturedExperiencesSection />
      <ExperienceCounter />
      <ExploreWorldsSection />
      <DIYKitsSection />
      <CommunityProofSection />
      <HowItWorksSection />
      <MoreToExploreSection />
      <BigCTASection />
      <BottomTickerSection />

      {/* Sticky Mobile Action Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-in slide-in-from-bottom-10 fade-in duration-700 delay-1000">
        <div className="flex items-center justify-between rounded-full border-[3px] border-foreground bg-white/95 backdrop-blur-md p-2 shadow-retro-lg">
          <div className="ml-4 flex flex-col">
            <span className="font-groovy text-xs font-bold text-foreground leading-tight">The Current Shift</span>
            <span className="font-body text-[10px] font-semibold text-primary">Cairo's newest memories are live</span>
          </div>
          <Link
            to={ROUTES.EXPERIENCES}
            className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary px-5 font-groovy text-[11px] font-black uppercase tracking-wider text-primary-foreground shadow-retro-sm transition-all duration-200 active:translate-y-0.5 active:shadow-none"
          >
            Access the drop
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </>
  );
}
