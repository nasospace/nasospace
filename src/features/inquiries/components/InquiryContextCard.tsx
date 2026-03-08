import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { routeHelpers } from "@/config/routes";
import type { InquiryPageContext } from "../types";

interface InquiryContextCardProps {
  context: InquiryPageContext;
}

export function InquiryContextCard({ context }: InquiryContextCardProps) {
  if (!context.ref || !context.title || !context.slug) return null;

  const detailPath =
    context.ref === "workshop"
      ? routeHelpers.workshopDetail(context.slug)
      : context.ref === "portfolio"
        ? routeHelpers.portfolioDetail(context.slug)
        : context.ref === "product"
          ? routeHelpers.shopDetail(context.slug)
          : routeHelpers.experienceDetail(context.slug);

  const emojiMap = { workshop: "🎨", experience: "🌿", portfolio: "✦", product: "🛍️" } as const;
  const labelMap = { workshop: "Workshop", experience: "Experience", portfolio: "Portfolio", product: "Product" } as const;
  const emoji = emojiMap[context.ref] ?? "🌿";
  const typeLabel = labelMap[context.ref] ?? "Experience";

  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-foreground bg-card p-4 shadow-retro",
        "flex items-start gap-3"
      )}
    >
      <span className="text-2xl" role="img" aria-label={typeLabel}>
        {emoji}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-[10px] uppercase tracking-wider text-muted-foreground">
          {typeLabel} Booking
        </p>
        <p className="mt-0.5 font-groovy text-sm font-bold leading-tight truncate">
          {context.title}
        </p>
        <Link
          to={detailPath}
          className="mt-1 inline-block font-display text-xs text-primary underline underline-offset-2 hover:text-primary/80"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}
