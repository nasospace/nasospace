import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerFast, fadeUp } from "@/lib/motion";
import { CATEGORY_META, EXPERIENCE_CATEGORIES, type ExperienceCategory } from "../types";

interface ExperienceCategoryFilterProps {
  active: ExperienceCategory | "all";
  onChange: (category: ExperienceCategory | "all") => void;
}

const allOption = { label: "All", emoji: "✦", color: "bg-foreground", textColor: "text-background" };

export function ExperienceCategoryFilter({ active, onChange }: ExperienceCategoryFilterProps) {
  const options: { key: ExperienceCategory | "all"; label: string; emoji: string; color: string; textColor: string }[] = [
    { key: "all", ...allOption },
    ...EXPERIENCE_CATEGORIES.map((cat) => ({
      key: cat as ExperienceCategory,
      ...CATEGORY_META[cat],
    })),
  ];

  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="naso-scrollbar-hide flex gap-2.5 overflow-x-auto pb-2 sm:gap-3 sm:flex-wrap sm:overflow-visible"
    >
      {options.map((opt) => {
        const isActive = active === opt.key;
        return (
          <motion.button
            key={opt.key}
            variants={fadeUp}
            onClick={() => onChange(opt.key)}
            style={isActive ? { rotate: -2 } : undefined}
            className={cn(
              "shrink-0 rounded-full border-2 border-foreground px-4 py-2",
              "font-groovy text-[10px] font-bold uppercase tracking-[0.12em]",
              "transition-colors duration-200 whitespace-nowrap",
              isActive
                ? cn(opt.color, opt.textColor, "shadow-retro")
                : "bg-card text-foreground hover:bg-muted"
            )}
          >
            {opt.emoji} {opt.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
