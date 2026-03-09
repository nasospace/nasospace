import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { posterEnter, cardHover } from "@/lib/motion";
import { StickerBadge } from "@/components/shared";
import { WORKSHOP_CATEGORY_META, type WorkshopDetail } from "../types";
import { routeHelpers } from "@/config/routes";

interface WorkshopCardProps {
  workshop: WorkshopDetail;
  index?: number;
}

export function WorkshopCard({ workshop, index = 0 }: WorkshopCardProps) {
  const meta = WORKSHOP_CATEGORY_META[workshop.category];
  const detailPath = routeHelpers.workshopDetail(workshop.slug);

  return (
    <motion.div
      variants={posterEnter(index * 0.08, -4)}
      layout
      className="h-full"
    >
      <motion.div
        whileHover={cardHover.liftScale}
        className="h-full"
      >
        <Link
          to={detailPath}
          className={cn(
            "group flex h-full flex-col overflow-hidden rounded-3xl",
            "border-[3px] border-foreground bg-card shadow-retro",
            "transition-shadow duration-300 hover:shadow-retro-lg"
          )}
        >
          {/* Top strip — taller, more expressive with grid texture */}
          <div className={cn("relative h-32 sm:h-36", meta.color)}>
            <div className="naso-grid-bg absolute inset-0 opacity-40" />

            {/* Duration pill — top right */}
            <div className="absolute right-3 top-3">
              <span className={cn(
                "rounded-full border-2 border-foreground bg-card px-3 py-1",
                "font-groovy text-[10px] font-bold uppercase tracking-wider"
              )}>
                {workshop.duration}
              </span>
            </div>

            {/* Category badge — overlapping bottom edge */}
            <div className="absolute -bottom-3.5 left-4">
              <StickerBadge
                variant="filled"
                rotate={-3}
                className={cn(meta.color, meta.textColor)}
              >
                {meta.emoji} {meta.label}
              </StickerBadge>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col px-5 pb-5 pt-7">
            <h3 className="font-groovy text-base font-bold leading-tight sm:text-lg">
              {workshop.title}
            </h3>

            <p className="mt-1.5 font-display text-xs text-muted-foreground">
              {workshop.date} · {workshop.location}
            </p>

            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {workshop.summary}
            </p>

            {/* Footer — maker-style info strip */}
            <div className="mt-auto flex items-end justify-between gap-3 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                {workshop.materialsIncluded && (
                  <span className="rounded-full border border-foreground/20 px-2.5 py-0.5 font-display text-[10px] uppercase tracking-wider text-muted-foreground">
                    Materials incl.
                  </span>
                )}
                <span className="rounded-full border border-foreground/20 px-2.5 py-0.5 font-display text-[10px] uppercase tracking-wider text-muted-foreground capitalize">
                  {workshop.skillLevel.replace("-", " ")}
                </span>
              </div>
              <span className="font-groovy text-xs font-bold whitespace-nowrap">
                {workshop.price} {workshop.currency}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
