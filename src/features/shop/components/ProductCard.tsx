import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { fadeUp, cardHover } from "@/lib/motion";
import { PRODUCT_CATEGORY_META, type ProductDetail } from "../types";
import { routeHelpers } from "@/config/routes";

interface ProductCardProps {
  product: ProductDetail;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const meta = PRODUCT_CATEGORY_META[product.category];
  const detailPath = routeHelpers.shopDetail(product.slug);
  const isSoldOut = product.stockStatus === "sold-out";

  return (
    <motion.div
      variants={fadeUp}
      layout
      className="h-full"
    >
      <motion.div
        whileHover={isSoldOut ? undefined : cardHover.lift}
        className="h-full"
      >
        <Link
          to={detailPath}
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-2xl",
            "border-2 border-foreground shadow-retro",
            "bg-card transition-shadow duration-300 hover:shadow-retro-lg",
            isSoldOut && "opacity-75"
          )}
        >
          {/* Product image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
            <img
              src={product.coverImage.src}
              alt={product.coverImage.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Category pill — top-left */}
            <span
              className={cn(
                "absolute left-3 top-3 z-10 rounded-full px-2.5 py-1",
                "font-groovy text-[9px] font-bold uppercase tracking-wider",
                "border border-foreground/20",
                meta.color,
                meta.textColor
              )}
            >
              {meta.emoji} {meta.label}
            </span>

            {/* Limited drop badge — top-right */}
            {product.limitedEdition && (
              <span
                className={cn(
                  "absolute right-3 top-3 z-10 rounded-full px-2.5 py-1",
                  "font-groovy text-[9px] font-bold uppercase tracking-wider",
                  "bg-primary text-primary-foreground border border-foreground/20"
                )}
              >
                ✦ Limited Drop
              </span>
            )}

            {/* Sold out overlay */}
            {isSoldOut && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/40 backdrop-blur-[2px]">
                <span className="rounded-full bg-card px-4 py-1.5 font-groovy text-xs font-bold uppercase tracking-wider text-foreground shadow-retro-sm">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-1 flex-col gap-1.5 p-4">
            <h3 className="font-groovy text-sm font-bold leading-tight sm:text-base">
              {product.title}
            </h3>

            <p className="line-clamp-1 text-xs text-muted-foreground sm:text-sm">
              {product.summary}
            </p>

            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="font-groovy text-base font-bold sm:text-lg">
                {product.price} <span className="text-[10px] font-normal uppercase tracking-wider text-muted-foreground">{product.currency}</span>
              </span>

              {product.stockStatus === "low-stock" && (
                <span className="font-display text-[10px] font-semibold uppercase tracking-wider text-destructive">
                  Low stock
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
