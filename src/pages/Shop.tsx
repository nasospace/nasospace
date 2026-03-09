import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import {
  ShopHero,
  ProductCategoryFilter,
  ProductGrid,
} from "@/features/shop/components";
import { MOCK_PRODUCTS } from "@/features/shop/data";
import type { ProductCategory } from "@/features/shop/types";

export default function ShopPage() {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const filtered =
    active === "all"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === active);

  return (
    <>
      <ShopHero />
      <Section>
        <div className="mb-8">
          <ProductCategoryFilter active={active} onChange={setActive} />
        </div>
        <ProductGrid key={active} products={filtered} />
      </Section>
    </>
  );
}
