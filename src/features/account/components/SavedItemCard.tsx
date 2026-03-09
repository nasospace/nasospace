import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { routeHelpers } from "@/config/routes";
import type { SavedItem } from "../types";
import { SAVED_ITEM_TYPE_META } from "../types";

interface SavedItemCardProps {
  item: SavedItem;
  className?: string;
}

function getDetailHref(item: SavedItem): string {
  switch (item.type) {
    case "experience": return routeHelpers.experienceDetail(item.slug);
    case "workshop": return routeHelpers.workshopDetail(item.slug);
    case "product": return routeHelpers.shopDetail(item.slug);
  }
}

export function SavedItemCard({ item, className }: SavedItemCardProps) {
  const typeMeta = SAVED_ITEM_TYPE_META[item.type];

  return (
    <Link
      to={getDetailHref(item)}
      className={cn(
        "group flex gap-4 rounded-xl border border-border bg-card p-3 transition-all duration-200 hover:shadow-card hover:-translate-y-0.5",
        className
      )}
    >
      {/* Cover image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg md:h-28 md:w-28">
        <img
          src={item.coverImage.src}
          alt={item.coverImage.alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Saved heart indicator */}
        <div className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
          <Heart className="h-3.5 w-3.5 fill-naso-coral text-naso-coral" />
        </div>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          {/* Type badge */}
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", typeMeta.color, typeMeta.textColor)}>
            {typeMeta.emoji} {typeMeta.label}
          </span>
          <h3 className="mt-1 truncate font-display text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {item.summary}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          {item.meta && (
            <span className="truncate text-[11px] text-muted-foreground">{item.meta}</span>
          )}
          {item.price != null && (
            <span className="shrink-0 font-display text-xs font-semibold">
              {item.price} {item.currency}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
