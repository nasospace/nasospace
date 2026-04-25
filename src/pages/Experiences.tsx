import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  ExperienceHero,
  ExperienceCategoryFilter,
  ExperienceGrid,
  JourneyMap,
} from "@/features/experiences/components";
import { useExperiences } from "@/features/experiences/hooks/useExperiences";
import type { ExperienceCategory } from "@/features/experiences/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExperiencesPage() {
  const [active, setActive] = useState<ExperienceCategory | "all">("all");
  const { data: experiences = [], isLoading } = useExperiences();

  // Live (unlocked) experiences for the browse grid below the journey map.
  const liveExperiences = experiences.filter((e) => !e.isLocked);

  const filtered =
    active === "all"
      ? liveExperiences
      : liveExperiences.filter((e) => e.category === active);

  return (
    <>
      <SEOHead
        title="100 Experiences | Cairo's Most Unforgettable Creative Journey | NASO"
        description="100 once-in-a-lifetime experiences across Cairo — workshops, outings, adventures, nights out. Each one new, each one unforgettable. Join the NASO movement."
        canonical="/experiences"
        ogImage="/assets/workshops_bg_1776810244802.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "NASO 100 Experiences",
            "description": "100 curated creative experiences across Cairo by NASO Space."
          }
        ]}
      />
      <ExperienceHero />

      {/* The 100 Experiences journey map */}
      <Section spacing="lg">
        {isLoading ? (
          <Skeleton className="h-[600px] rounded-2xl" />
        ) : (
          <JourneyMap experiences={experiences} />
        )}
      </Section>

      {/* Browse the live drops */}
      <Section spacing="lg" className="border-t border-border/50">
        <div className="mb-8">
          <h2 className="font-groovy text-3xl font-black sm:text-4xl">
            Live now — book your spot
          </h2>
          <p className="mt-2 text-muted-foreground">
            The unlocked experiences are open for booking. Filter by vibe.
          </p>
        </div>
        <div className="mb-8">
          <ExperienceCategoryFilter active={active} onChange={setActive} />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <p className="font-groovy text-xl font-bold">No live drops in this vibe yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another category — or check back soon, the next one's coming.
            </p>
          </div>
        ) : (
          <ExperienceGrid key={active} experiences={filtered} />
        )}
      </Section>
    </>
  );
}
