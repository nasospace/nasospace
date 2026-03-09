import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  ShopHero,
  ProductCategoryFilter,
  ProductGrid,
} from "@/features/shop/components";
import { useProducts } from "@/features/shop/hooks/useProducts";
import type { ProductCategory } from "@/features/shop/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopPage() {
  const [active, setActive] = useState<ProductCategory | "all">("all");
  const { data: products = [], isLoading } = useProducts();

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <>
      <SEOHead
        title="Shop"
        description="Browse NASO's curated collection of creative products, merchandise, and unique items crafted with intention and bold design."
      />
      <ShopHero />
      <Section>
        <div className="mb-8">
          <ProductCategoryFilter active={active} onChange={setActive} />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid key={active} products={filtered} />
        )}
      </Section>
    </>
  );
}
