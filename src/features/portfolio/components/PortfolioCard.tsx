import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { posterEnter, cardHover } from "@/lib/motion";
import { StickerBadge } from "@/components/shared";
import { PORTFOLIO_CATEGORY_META, type PortfolioItem } from "../types";
import { routeHelpers } from "@/config/routes";

interface PortfolioCardProps {
  item: PortfolioItem;
  index?: number;
}

export function PortfolioCard({ item, index = 0 }: PortfolioCardProps) {
  const meta = PORTFOLIO_CATEGORY_META[item.category];
  const detailPath = routeHelpers.portfolioDetail(item.slug);

  return (
    <motion.div
      variants={posterEnter(index * 0.08)}
      layout
      className="h-full"
    >
      <motion.div
        whileHover={cardHover.scale}
        className="h-full"
      >
        <Link
          to={detailPath}
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-2xl",
            "border-[2.5px] border-foreground shadow-retro",
            "transition-shadow duration-300 hover:shadow-retro-lg"
          )}
        >
          {/* Full-bleed cover image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
            <img
              src={item.coverImage.src}
              alt={item.coverImage.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Category sticker — top-left */}
            <div className="absolute left-3 top-3 z-10">
              <StickerBadge
                variant="filled"
                rotate={-4}
                className={cn(meta.color, meta.textColor)}
              >
                {meta.emoji} {meta.label}
              </StickerBadge>
            </div>

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

            {/* Overlaid content at bottom */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-5">
              {/* Vibe tag */}
              <span className="font-body text-[11px] italic text-background/70">
                ✦ {item.vibe}
              </span>

              <h3 className="font-groovy text-base font-bold leading-tight text-background sm:text-lg">
                {item.title}
              </h3>

              <p className="line-clamp-2 text-sm leading-relaxed text-background/80">
                {item.summary}
              </p>

              {/* CTA hint */}
              <span className="mt-1 font-display text-xs font-semibold uppercase tracking-wider text-background/60 transition-colors group-hover:text-background">
                See the story →
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
