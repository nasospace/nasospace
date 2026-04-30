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
      <ExploreWorldsSection />
      <DIYKitsSection />
      <CommunityProofSection />
      <HowItWorksSection />
      <MoreToExploreSection />
      <BigCTASection />
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
