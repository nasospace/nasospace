/**
 * ExperienceArchiveGrid — Premium grid layout for live experiences.
 * Uses ExperienceChapterCard for editorial presentation.
 * Includes animated layout transitions and staggered reveals.
 */
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import { ExperienceChapterCard } from "./ExperienceChapterCard";
import type { ExperienceDetail } from "../types";
import { Sparkle } from "@/components/shared/RetroElements";

interface ExperienceArchiveGridProps {
  experiences: ExperienceDetail[];
}

export function ExperienceArchiveGrid({ experiences }: ExperienceArchiveGridProps) {
  if (experiences.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 border border-foreground/10">
          <Sparkle className="h-6 w-6 text-muted-foreground/40" />
        </div>
        <p className="font-groovy text-xl font-bold">
          No live experiences in this mood yet
        </p>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          New chapters unlock regularly. Try another mood — or follow @nasospace
          to be the first to know.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {experiences.map((exp, i) => (
          <ExperienceChapterCard key={exp.id} experience={exp} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
