import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerFast, fadeUp } from "@/lib/motion";
import { PRODUCT_CATEGORY_META, PRODUCT_CATEGORIES, type ProductCategory } from "../types";

interface ProductCategoryFilterProps {
  active: ProductCategory | "all";
  onChange: (category: ProductCategory | "all") => void;
}

const allOption = { label: "All", emoji: "✦", color: "bg-foreground", textColor: "text-background" };

export function ProductCategoryFilter({ active, onChange }: ProductCategoryFilterProps) {
  const options: { key: ProductCategory | "all"; label: string; emoji: string; color: string; textColor: string }[] = [
    { key: "all", ...allOption },
    ...PRODUCT_CATEGORIES.map((cat) => ({
      key: cat as ProductCategory,
      ...PRODUCT_CATEGORY_META[cat],
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
