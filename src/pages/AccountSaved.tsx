import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useSavedItems } from "@/features/account/hooks/useAccountData";
import { AccountSectionHeader } from "@/features/account/components/AccountSectionHeader";
import { SavedItemCard } from "@/features/account/components/SavedItemCard";
import { EmptyState } from "@/features/account/components/EmptyState";
import { SEOHead } from "@/components/shared/SEOHead";
import type { SavedItemType } from "@/features/account/types";

const FILTERS: { value: SavedItemType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "experience", label: "Experiences" },
  { value: "workshop", label: "Workshops" },
  { value: "product", label: "Products" },
];

export default function AccountSavedPage() {
  const { items, filter, setFilter, counts, isLoading } = useSavedItems();

  return (
    <>
      <SEOHead title="Saved Items — NASO" description="Your saved NASO experiences, workshops, and products." />

      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <AccountSectionHeader
          title="Saved Items"
          emoji="♥"
          description="Things you've saved for later."
        />
      </motion.div>

      {/* Filter tabs */}
      <div className="naso-scrollbar-hide mt-6 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => {
          const count = counts[f.value as keyof typeof counts] ?? 0;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                filter === f.value
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-foreground/10"
              )}
            >
              {f.label}
              <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                filter === f.value ? "bg-background/20" : "bg-foreground/5"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-6 grid gap-3 md:grid-cols-2"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <SavedItemCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="mt-8">
          <EmptyState
            emoji="💫"
            title="Nothing saved yet"
            description="Explore NASO experiences, workshops, and products — and save what catches your eye."
            ctaLabel="Start exploring"
            ctaHref={ROUTES.EXPERIENCES}
          />
        </div>
      )}
    </>
  );
}
