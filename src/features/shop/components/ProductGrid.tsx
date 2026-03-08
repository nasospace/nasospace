import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import { FlowerShape } from "@/components/shared";
import { ProductCard } from "./ProductCard";
import type { ProductDetail } from "../types";

interface ProductGridProps {
  products: ProductDetail[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FlowerShape className="mb-4 text-muted-foreground/40" size={48} />
        <p className="font-display text-sm text-muted-foreground">
          No products found — try another category.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <AnimatePresence>
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
