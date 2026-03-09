import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  ExperienceHero,
  ExperienceCategoryFilter,
  ExperienceGrid,
} from "@/features/experiences/components";
import { MOCK_EXPERIENCES } from "@/features/experiences/data";
import type { ExperienceCategory } from "@/features/experiences/types";

export default function ExperiencesPage() {
  const [active, setActive] = useState<ExperienceCategory | "all">("all");

  const filtered =
    active === "all"
      ? MOCK_EXPERIENCES
      : MOCK_EXPERIENCES.filter((e) => e.category === active);

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
        <ExperienceGrid key={active} experiences={filtered} />
      </Section>
    </>
  );
}
