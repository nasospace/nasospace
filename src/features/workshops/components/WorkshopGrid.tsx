import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import { FlowerShape } from "@/components/shared";
import { WorkshopCard } from "./WorkshopCard";
import type { WorkshopDetail } from "../types";

interface WorkshopGridProps {
  workshops: WorkshopDetail[];
}

export function WorkshopGrid({ workshops }: WorkshopGridProps) {
  if (workshops.length === 0) {
    return (
      <div className="flex min-h-[30vh] flex-col items-center justify-center gap-4 text-center">
        <FlowerShape className="text-naso-lilac opacity-40" size={56} />
        <p className="font-display text-sm text-muted-foreground">
          No workshops match this filter — try another category.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {workshops.map((workshop, i) => (
          <WorkshopCard key={workshop.id} workshop={workshop} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
