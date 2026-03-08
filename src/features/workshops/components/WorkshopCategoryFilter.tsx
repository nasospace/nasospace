import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerFast } from "@/lib/motion";
import { WORKSHOP_CATEGORIES, WORKSHOP_CATEGORY_META, type WorkshopCategory } from "../types";

interface WorkshopCategoryFilterProps {
  active: WorkshopCategory | "all";
  onChange: (category: WorkshopCategory | "all") => void;
}

const allPills: Array<{ key: WorkshopCategory | "all"; label: string; emoji?: string }> = [
  { key: "all", label: "All" },
  ...WORKSHOP_CATEGORIES.map((cat) => ({
    key: cat,
    label: WORKSHOP_CATEGORY_META[cat].label,
    emoji: WORKSHOP_CATEGORY_META[cat].emoji,
  })),
];

export function WorkshopCategoryFilter({ active, onChange }: WorkshopCategoryFilterProps) {
  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="naso-scrollbar-hide flex gap-2.5 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible"
    >
      {allPills.map((pill) => {
        const isActive = active === pill.key;
        const meta = pill.key !== "all" ? WORKSHOP_CATEGORY_META[pill.key] : null;

        return (
          <motion.button
            key={pill.key}
            variants={fadeUp}
            onClick={() => onChange(pill.key)}
            style={isActive ? { rotate: -2 } : undefined}
            className={cn(
              "shrink-0 rounded-full border-2 border-foreground px-4 py-2",
              "font-groovy text-[10px] font-bold uppercase tracking-[0.12em]",
              "transition-colors",
              isActive && meta
                ? cn(meta.color, meta.textColor, "shadow-retro")
                : isActive
                  ? "bg-foreground text-background shadow-retro"
                  : "bg-card text-foreground hover:bg-muted"
            )}
          >
            {pill.emoji ? `${pill.emoji} ${pill.label}` : pill.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
