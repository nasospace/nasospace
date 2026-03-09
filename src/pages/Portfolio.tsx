import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  PortfolioHero,
  PortfolioCategoryFilter,
  PortfolioGrid,
} from "@/features/portfolio/components";
import { MOCK_PORTFOLIO } from "@/features/portfolio/data";
import type { PortfolioCategory } from "@/features/portfolio/types";

export default function PortfolioPage() {
  const [active, setActive] = useState<PortfolioCategory | "all">("all");

  const filtered =
    active === "all"
      ? MOCK_PORTFOLIO
      : MOCK_PORTFOLIO.filter((p) => p.category === active);

  return (
    <>
      <SEOHead
        title="Portfolio"
        description="Explore NASO's portfolio of past projects — immersive experiences, creative events, brand collaborations, and bold design work."
      />
      <PortfolioHero />
      <Section>
        <div className="mb-8">
          <PortfolioCategoryFilter active={active} onChange={setActive} />
        </div>
        <PortfolioGrid key={active} items={filtered} />
      </Section>
    </>
  );
}
