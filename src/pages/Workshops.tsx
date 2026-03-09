import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  WorkshopHero,
  WorkshopCategoryFilter,
  WorkshopGrid,
} from "@/features/workshops/components";
import { MOCK_WORKSHOPS } from "@/features/workshops/data";
import type { WorkshopCategory } from "@/features/workshops/types";

export default function WorkshopsPage() {
  const [active, setActive] = useState<WorkshopCategory | "all">("all");

  const filtered =
    active === "all"
      ? MOCK_WORKSHOPS
      : MOCK_WORKSHOPS.filter((w) => w.category === active);

  return (
    <>
      <WorkshopHero />
      <Section>
        <div className="mb-8">
          <WorkshopCategoryFilter active={active} onChange={setActive} />
        </div>
        <WorkshopGrid key={active} workshops={filtered} />
      </Section>
    </>
  );
}
