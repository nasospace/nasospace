import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import { FlowerShape } from "@/components/shared";
import { ExperienceCard } from "./ExperienceCard";
import type { ExperienceDetail } from "../types";

interface ExperienceGridProps {
  experiences: ExperienceDetail[];
}

export function ExperienceGrid({ experiences }: ExperienceGridProps) {
  if (experiences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FlowerShape className="mb-4 text-muted-foreground/40" size={48} />
        <p className="font-groovy text-sm text-muted-foreground">
          No experiences found — try another category.
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
      className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} experience={exp} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
