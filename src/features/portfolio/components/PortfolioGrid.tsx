import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import { FlowerShape } from "@/components/shared";
import { PortfolioCard } from "./PortfolioCard";
import type { PortfolioItem } from "../types";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
        <FlowerShape size={48} className="text-muted-foreground/40 naso-flower-spin" />
        <p className="font-display text-sm text-muted-foreground">
          No stories in this category yet — stay tuned.
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
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <PortfolioCard key={item.id} item={item} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
