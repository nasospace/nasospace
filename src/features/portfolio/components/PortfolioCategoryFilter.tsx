import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerFast, fadeUp } from "@/lib/motion";
import {
  PORTFOLIO_CATEGORY_META,
  PORTFOLIO_CATEGORIES,
  type PortfolioCategory,
} from "../types";

interface PortfolioCategoryFilterProps {
  active: PortfolioCategory | "all";
  onChange: (category: PortfolioCategory | "all") => void;
}

const allOption = { label: "All Stories", emoji: "✦", color: "bg-foreground", textColor: "text-background" };

export function PortfolioCategoryFilter({ active, onChange }: PortfolioCategoryFilterProps) {
  const options: { key: PortfolioCategory | "all"; label: string; emoji: string; color: string; textColor: string }[] = [
    { key: "all", ...allOption },
    ...PORTFOLIO_CATEGORIES.map((cat) => ({
      key: cat as PortfolioCategory,
      ...PORTFOLIO_CATEGORY_META[cat],
    })),
  ];

  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex gap-2.5 overflow-x-auto pb-2 sm:gap-3 sm:flex-wrap sm:overflow-visible"
      style={{ scrollbarWidth: "none" }}
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
