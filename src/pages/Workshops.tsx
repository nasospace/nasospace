import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  WorkshopHero,
  WorkshopCategoryFilter,
  WorkshopGrid,
} from "@/features/workshops/components";
import { useWorkshops } from "@/features/workshops/hooks/useWorkshops";
import type { WorkshopCategory } from "@/features/workshops/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkshopsPage() {
  const [active, setActive] = useState<WorkshopCategory | "all">("all");
  const { data: workshops = [], isLoading } = useWorkshops();

  const filtered =
    active === "all"
      ? workshops
      : workshops.filter((w) => w.category === active);

  return (
    <>
      <SEOHead
        title="Workshops — Hands-On Creative Classes by NASO"
        description="Join NASO's creative workshops in Cairo. Hands-on sessions covering design, art, technology, and more for all skill levels."
        canonical="/workshops"
      />
      <WorkshopHero />
      <Section>
        <div className="mb-8">
          <WorkshopCategoryFilter active={active} onChange={setActive} />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : (
          <WorkshopGrid key={active} workshops={filtered} />
        )}
      </Section>
    </>
  );
}
