import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ShoppingBag, Share2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, fadeUpDelay } from "@/lib/motion";
import { Section, MagneticButton, SaveButton } from "@/components/shared";
import { SEOHead } from "@/components/shared/SEOHead";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { ROUTES, buildInquiryPath, routeHelpers } from "@/config/routes";
import { buildProductSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { trackNaso } from "@/lib/analytics";
import { useCart } from "@/features/cart";
import { useProduct, useProducts } from "../hooks/useProducts";
import { PRODUCT_CATEGORY_META } from "../types";
import { ProductGrid } from "./ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductDetailViewProps {
  slug: string;
}

export function ProductDetailView({ slug }: ProductDetailViewProps) {
  const { data: product, isLoading } = useProduct(slug);
  const { data: allProducts = [] } = useProducts();
  const { toast } = useToast();
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (isLoading) {
    return (
      <Section spacing="lg">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-48 rounded-full" />
          </div>
        </div>
      </Section>
    );
  }

  if (!product) {
    return (
      <Section className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="font-groovy text-3xl font-bold">Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          This product doesn't exist or has been removed.
        </p>
        <Link
          to={ROUTES.SHOP}
          className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary underline underline-offset-4"
        >
          ← Back to Shop
        </Link>
      </Section>
    );
  }

  const meta = PRODUCT_CATEGORY_META[product.category];
  const related = [
    ...allProducts.filter((p) => p.category === product.category && p.id !== product.id),
    ...allProducts.filter((p) => p.category !== product.category && p.id !== product.id),
  ].slice(0, 4);
  const isSoldOut = product.stockStatus === "sold-out";
  const hasSizes = product.sizes && product.sizes.length > 0;
  const hasColors = product.colors && product.colors.length > 0;
  const needsSize = hasSizes && !selectedSize;
  const needsColor = hasColors && !selectedColor;
  const canAdd = !isSoldOut && !needsSize && !needsColor;

  const hasLinkedExperience = !!product.linkedExperienceSlug;
  const hasLinkedWorkshop = !!product.linkedWorkshopSlug;
  const hasLinkedPortfolio = !!product.linkedPortfolioSlug;
  const hasLinks = hasLinkedExperience || hasLinkedWorkshop || hasLinkedPortfolio;

  const handleAddToCart = () => {
    if (!canAdd) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        currency: product.currency,
        coverImageSrc: product.coverImage.src,
        selectedSize,
        selectedColor,
        stockStatus: product.stockStatus,
        limitedEdition: product.limitedEdition,
      },
      quantity
    );
    setJustAdded(true);
    toast({
      title: "Added to cart ✦",
      description: `${product.title}${selectedSize ? ` — ${selectedSize}` : ""}${selectedColor ? ` / ${selectedColor}` : ""} × ${quantity}`,
    });
    trackNaso("product_add_to_cart", { slug: product.slug, quantity, price: product.price });
    setTimeout(() => setJustAdded(false), 2000);
  };

  const inquiryPath = buildInquiryPath({
    type: "product" as "experience",
    slug: product.slug,
    title: product.title,
  });

  const stockAvailability = isSoldOut
    ? "OutOfStock" as const
    : product.stockStatus === "low-stock"
      ? "LimitedAvailability" as const
      : "InStock" as const;

  return (
    <>
      <SEOHead
        title={`${product.title} — NASO Shop`}
        description={product.summary || product.description.slice(0, 155)}
        canonical={`/shop/${product.slug}`}
        ogImage={product.coverImage.src}
        jsonLd={buildProductSchema({
          name: product.title,
          description: product.summary || product.description.slice(0, 155),
          url: `${siteConfig.url}/shop/${product.slug}`,
          image: product.coverImage.src,
          price: product.price,
          currency: product.currency,
          availability: stockAvailability,
        })}
      />
      {/* ── Product Hero ── */}
      <Section spacing="lg">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Image */}
          <MotionDiv className="overflow-hidden rounded-2xl border-2 border-foreground shadow-retro">
            <img
              src={product.coverImage.src}
              alt={product.coverImage.alt}
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </MotionDiv>

          {/* Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {/* Category badge */}
            <motion.div variants={fadeUp}>
              <span
                className={cn(
                  "inline-flex rounded-full px-3 py-1 border-2 border-foreground",
                  "font-groovy text-[10px] font-bold uppercase tracking-wider",
                  meta.color,
                  meta.textColor
                )}
              >
                {meta.emoji} {meta.label}
              </span>
            </motion.div>

            {/* Title + Save */}
            <motion.div variants={fadeUpDelay(0.05)} className="flex items-start justify-between gap-4">
              <h1 className="font-groovy text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {product.title}
              </h1>
              <SaveButton itemType="product" itemSlug={product.slug} title={product.title} />
            </motion.div>

            {/* Summary */}
            <motion.p
              variants={fadeUpDelay(0.1)}
              className="text-base text-muted-foreground md:text-lg"
            >
              {product.summary}
            </motion.p>

            {/* Price */}
            <motion.div variants={fadeUpDelay(0.15)} className="flex items-baseline gap-2">
              <span className="font-groovy text-3xl font-bold">{product.price}</span>
              <span className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                {product.currency}
              </span>
            </motion.div>

            {/* Status indicators */}
            <motion.div variants={fadeUpDelay(0.2)} className="flex flex-wrap items-center gap-3">
              {product.limitedEdition && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 font-groovy text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  ✦ Limited Edition
                </span>
              )}
              {product.stockStatus === "low-stock" && (
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-destructive">
                  Low stock — order soon
                </span>
              )}
              {isSoldOut && (
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Currently sold out
                </span>
              )}
            </motion.div>

            {/* Sizes */}
            {hasSizes && (
              <motion.div variants={fadeUpDelay(0.25)} className="flex flex-col gap-2">
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Size {needsSize && <span className="text-destructive">— select one</span>}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes!.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "inline-flex items-center justify-center rounded-lg border-2 px-3 py-1.5 font-display text-xs font-semibold transition-all",
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-foreground/20 hover:border-foreground/50"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Colors */}
            {hasColors && (
              <motion.div variants={fadeUpDelay(0.3)} className="flex flex-col gap-2">
                <span className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Color {needsColor && <span className="text-destructive">— select one</span>}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors!.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "inline-flex items-center rounded-full border px-3 py-1 font-display text-xs transition-all",
                        selectedColor === color
                          ? "border-foreground bg-foreground text-background"
                          : "border-foreground/15 hover:border-foreground/40"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity */}
            <motion.div variants={fadeUpDelay(0.32)} className="flex items-center gap-3">
              <span className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Qty
              </span>
              <div className="flex items-center gap-1 rounded-lg border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  −
                </button>
                <span className="w-8 text-center font-display text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  +
                </button>
              </div>
            </motion.div>

            {/* CTAs */}
              <div className="flex flex-col gap-3 w-full pt-2">
                <div className="flex flex-col w-full">
                  <button
                    onClick={handleAddToCart}
                    disabled={!canAdd}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground px-8 py-3",
                      "font-groovy text-xs font-bold uppercase tracking-wider shadow-retro",
                      "transition-all hover:shadow-retro-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                      !canAdd
                        ? "cursor-not-allowed bg-muted text-muted-foreground"
                        : justAdded
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                    )}
                  >
                    {isSoldOut ? (
                      "Sold Out"
                    ) : justAdded ? (
                      <>
                        <Check className="h-4 w-4" /> Added!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" /> Secure Checkout
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`Look at this! We need to try it: 🔗 https://naso.space/shop/${product.slug}`);
                    sonnerToast.success("Copied link! Send it to the group chat 💅", { duration: 4000 });
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-foreground bg-white px-6 py-2.5 font-groovy text-[10px] font-bold uppercase tracking-wider text-foreground shadow-retro-sm transition-all hover:-translate-y-0.5 hover:bg-secondary active:translate-y-0"
                >
                  <Share2 className="h-4 w-4" />
                  Send to Group Chat
                </button>

                <div className="mt-2 flex flex-col gap-2">
                  <div className="rounded-xl bg-muted/50 p-3 text-center">
                    <p className="font-groovy text-xs font-bold text-foreground">
                      ✦ Everything you need is inside
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      No experience needed. Comes with premium materials and a curated guide to set the vibe.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-secondary" />
                    Premium quality. Delivered anywhere in Egypt.
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
      </Section>

      {/* ── Description ── */}
      <Section className="border-t border-border">
        <MotionDiv className="max-w-2xl">
          <h2 className="mb-4 font-groovy text-xl font-bold">About this product</h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
            {product.description}
          </p>
          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/15 px-3 py-1 font-display text-[11px] uppercase tracking-wider text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </MotionDiv>
      </Section>

      {/* ── Gallery ── */}
      {product.gallery.length > 0 && (
        <Section>
          <MotionDiv>
            <h2 className="mb-6 font-groovy text-xl font-bold">Gallery</h2>
          </MotionDiv>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 md:grid-cols-3"
          >
            {product.gallery.map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="overflow-hidden rounded-xl border-2 border-foreground/10"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[4/3] h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

      {/* ── Linked Content ── */}
      {hasLinks && (
        <Section className="border-t border-border">
          <MotionDiv className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-groovy text-lg font-bold">Part of the NASO world</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This product connects to other things we do.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {hasLinkedExperience && (
                <Link
                  to={routeHelpers.experienceDetail(product.linkedExperienceSlug!)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2",
                    "font-groovy text-[10px] font-bold uppercase tracking-wider",
                    "bg-card text-foreground transition-shadow hover:shadow-retro"
                  )}
                >
                  View Experience →
                </Link>
              )}
              {hasLinkedWorkshop && (
                <Link
                  to={routeHelpers.workshopDetail(product.linkedWorkshopSlug!)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2",
                    "font-groovy text-[10px] font-bold uppercase tracking-wider",
                    "bg-card text-foreground transition-shadow hover:shadow-retro"
                  )}
                >
                  View Workshop →
                </Link>
              )}
              {hasLinkedPortfolio && (
                <Link
                  to={routeHelpers.portfolioDetail(product.linkedPortfolioSlug!)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2",
                    "font-groovy text-[10px] font-bold uppercase tracking-wider",
                    "bg-card text-foreground transition-shadow hover:shadow-retro"
                  )}
                >
                  View Story →
                </Link>
              )}
            </div>
          </MotionDiv>
        </Section>
      )}

      {/* ── Bottom CTA ── */}
      <Section fullBleed className="bg-naso-cream naso-dotgrid">
        <div className="container">
          <MotionDiv className="flex flex-col items-center gap-6 py-8 text-center">
            <h2 className="font-groovy text-2xl font-bold md:text-3xl">
              Want something custom?
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              We make things by hand, by heart, and by request. If you want a custom order, bulk pricing, or a gift set — just ask.
            </p>
            <MagneticButton
              to={ROUTES.INQUIRIES}
              className={cn(
                "inline-flex items-center justify-center rounded-full border-2 border-foreground px-8 py-3",
                "font-groovy text-xs font-bold uppercase tracking-wider shadow-retro",
                "bg-primary text-primary-foreground transition-shadow hover:shadow-retro-lg"
              )}
            >
              Get in Touch
            </MagneticButton>
          </MotionDiv>
        </div>
      </Section>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <Section className="border-t border-border">
          <MotionDiv>
            <h2 className="mb-8 font-groovy text-2xl font-bold">You might also like</h2>
          </MotionDiv>
          <ProductGrid products={related} />
        </Section>
      )}
    </>
  );
}
