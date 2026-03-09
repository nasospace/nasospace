import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  PortfolioHero,
  PortfolioCategoryFilter,
  PortfolioGrid,
} from "@/features/portfolio/components";
import { usePortfolioItems } from "@/features/portfolio/hooks/usePortfolio";
import { Skeleton } from "@/components/ui/skeleton";
import type { PortfolioCategory } from "@/features/portfolio/types";

export default function PortfolioPage() {
  const [active, setActive] = useState<PortfolioCategory | "all">("all");
  const { data: items = [], isLoading } = usePortfolioItems();

  const filtered =
    active === "all" ? items : items.filter((p) => p.category === active);

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
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No stories in this category yet.</p>
          </div>
        ) : (
          <PortfolioGrid key={active} items={filtered} />
        )}
      </Section>
    </>
  );
}
