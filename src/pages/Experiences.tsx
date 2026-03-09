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
        title="Experiences"
        description="Discover unique immersive experiences crafted by NASO. From interactive installations to sensory journeys, explore our curated collection of memorable moments."
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
