import { useState } from "react";
import { Section } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import { SectionErrorBoundary } from "@/components/shared/SectionErrorBoundary";
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
        title="DIY Art Kits & Creative Products Egypt | NASO Shop"
        description="Take the vibe home with NASO's premium DIY art kits. Shop creative boxes, pottery kits, and curated materials delivered anywhere in Egypt. | تسوق أدوات فنية وورش عمل منزلية"
        canonical="/shop"
        ogImage="/assets/shop_bg_1776810267092.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "NASO Shop - DIY Kits & Creative Products",
            "description": "Shop DIY art kits, pottery kits, and curated creative boxes delivered across Egypt."
          }
        ]}
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
          <SectionErrorBoundary fallbackMessage="Failed to load products.">
            <ProductGrid key={active} products={filtered} />
          </SectionErrorBoundary>
        )}
      </Section>
    </>
  );
}
