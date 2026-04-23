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
    <div className="mb-16">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="font-groovy text-3xl font-black mb-6 text-foreground tracking-tight"
      >
        What's your vibe today?
      </motion.h3>
      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap gap-4 sm:gap-6"
      >
        {options.map((opt, i) => {
          const isActive = active === opt.key;
          return (
            <motion.button
              key={opt.key}
              variants={fadeUp}
              onClick={() => onChange(opt.key)}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
              whileTap={{ scale: 0.95 }}
              animate={isActive ? { scale: 1.05, rotate: -3 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={cn(
                "relative flex items-center gap-3 overflow-hidden rounded-full border-4 border-foreground px-6 py-4 shadow-retro",
                "font-groovy text-sm sm:text-lg font-black uppercase tracking-widest",
                "transition-colors duration-300",
                isActive
                  ? cn(opt.color, opt.textColor, "shadow-retro-lg border-opacity-100")
                  : "bg-white text-foreground border-opacity-30 shadow-none hover:border-opacity-100 hover:shadow-retro"
              )}
            >
              <span className="text-3xl">{opt.emoji}</span>
              <span>{opt.label}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
