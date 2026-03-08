import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerFast } from "@/lib/motion";
import { BLOG_CATEGORIES, BLOG_CATEGORY_META, type BlogCategory } from "../types";

interface BlogCategoryFilterProps {
  active: BlogCategory | "all";
  onChange: (category: BlogCategory | "all") => void;
}

const allPills: Array<{ key: BlogCategory | "all"; label: string; emoji?: string }> = [
  { key: "all", label: "All" },
  ...BLOG_CATEGORIES.map((cat) => ({
    key: cat,
    label: BLOG_CATEGORY_META[cat].label,
    emoji: BLOG_CATEGORY_META[cat].emoji,
  })),
];

export function BlogCategoryFilter({ active, onChange }: BlogCategoryFilterProps) {
  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible"
      style={{ scrollbarWidth: "none" }}
    >
      {allPills.map((pill) => {
        const isActive = active === pill.key;
        const meta = pill.key !== "all" ? BLOG_CATEGORY_META[pill.key] : null;

        return (
          <motion.button
            key={pill.key}
            variants={fadeUp}
            onClick={() => onChange(pill.key)}
            className={cn(
              "shrink-0 rounded-full border border-foreground/20 px-4 py-2",
              "font-display text-[11px] font-semibold uppercase tracking-wider",
              "transition-colors duration-200 whitespace-nowrap",
              isActive && meta
                ? cn(meta.color, meta.textColor, "border-foreground")
                : isActive
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground hover:border-foreground/40"
            )}
          >
            {pill.emoji ? `${pill.emoji} ${pill.label}` : pill.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
