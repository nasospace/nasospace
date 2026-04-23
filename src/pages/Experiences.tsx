import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  ExperienceHero,
  ExperienceCategoryFilter,
  ExperienceGrid,
} from "@/features/experiences/components";
import { useExperiences } from "@/features/experiences/hooks/useExperiences";
import type { ExperienceCategory } from "@/features/experiences/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExperiencesPage() {
  const [active, setActive] = useState<ExperienceCategory | "all">("all");
  const { data: experiences = [], isLoading } = useExperiences();

  const filtered =
    active === "all"
      ? experiences
      : experiences.filter((e) => e.category === active);

  return (
    <>
      <SEOHead
        title="Cairo Events & Creative Workshops | NASO Experiences"
        description="Join Cairo's best creative workshops, art classes, and immersive events. Book your spot at a NASO Experience and meet new people in Egypt. | احجز ورش عمل وتجارب فنية في القاهرة"
        canonical="/experiences"
        ogImage="/assets/workshops_bg_1776810244802.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "NASO Experiences - Creative Workshops in Cairo",
            "description": "Browse and book upcoming creative workshops and events by NASO Space in Cairo, Egypt."
          }
        ]}
      />
      <ExperienceHero />
      <Section>
        <div className="mb-8">
          <ExperienceCategoryFilter active={active} onChange={setActive} />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : (
          <ExperienceGrid key={active} experiences={filtered} />
        )}
      </Section>
    </>
  );
}
