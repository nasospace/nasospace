import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, FlowerShape, MagneticButton } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { SEOHead } from "@/components/shared/SEOHead";
import { useCart } from "@/features/cart";
import { ROUTES, routeHelpers } from "@/config/routes";
import type { CartItem } from "@/features/cart/types";

/** Build an inquiry path that includes cart summary as context */
function buildCartInquiryPath(items: CartItem[], subtotal: number, currency: string): string {
  const summary = items
    .map((i) => `${i.title} x${i.quantity}`)
    .join(", ");
  const params = new URLSearchParams({
    ref: "product",
    title: `Cart Order (${items.length} item${items.length > 1 ? "s" : ""})`,
    cart_summary: summary,
    cart_total: `${subtotal} ${currency}`,
  });
  return `${ROUTES.INQUIRIES}?${params.toString()}`;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getItemCount } = useCart();
  const count = getItemCount();
  const subtotal = getSubtotal();
  const currency = items[0]?.currency ?? "EGP";

  return (
    <>
      <SEOHead
        title="Your Cart"
        description="Review your NASO cart."
        noindex
      />

      {/* Hero */}
      <Section spacing="lg" className="text-center">
        <MotionDiv>
          <h1 className="font-groovy text-4xl font-bold md:text-5xl">Your Cart</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {count === 0
              ? "Your cart is empty — go explore our shop!"
              : `${count} item${count > 1 ? "s" : ""} in your cart`}
          </p>
        </MotionDiv>
      </Section>

      {/* Empty state */}
      {count === 0 && (
        <Section>
          <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
            <FlowerShape className="text-muted-foreground/30" size={64} />
            <p className="font-display text-sm text-muted-foreground">
              Nothing here yet. Let's change that.
            </p>
            <MagneticButton
              to={ROUTES.SHOP}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 border-foreground px-8 py-3",
                "font-groovy text-xs font-bold uppercase tracking-wider shadow-retro",
                "bg-primary text-primary-foreground transition-shadow hover:shadow-retro-lg"
              )}
            >
              <ShoppingBag className="h-4 w-4" />
              Browse Shop
            </MagneticButton>
          </div>
        </Section>
      )}

      {/* Cart items */}
      {count > 0 && (
        <Section>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl"
          >
            <div className="divide-y divide-border rounded-2xl border-2 border-foreground bg-card shadow-retro">
              {items.map((item) => (
                <motion.div
                  key={`${item.slug}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-4 sm:items-center sm:gap-6 sm:p-6"
                >
                  {/* Thumbnail */}
                  <Link to={routeHelpers.shopDetail(item.slug)} className="shrink-0">
                    <img
                      src={item.coverImageSrc}
                      alt={item.title}
                      className="h-20 w-20 rounded-xl border border-border object-cover sm:h-24 sm:w-24"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <Link
                      to={routeHelpers.shopDetail(item.slug)}
                      className="font-groovy text-sm font-bold leading-tight hover:underline sm:text-base"
                    >
                      {item.title}
                    </Link>

                    {/* Options */}
                    <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.limitedEdition && (
                        <span className="font-semibold text-primary">✦ Limited</span>
                      )}
                    </div>

                    {/* Price */}
                    <span className="font-groovy text-sm font-bold">
                      {item.price} {item.currency}
                    </span>

                    {/* Quantity controls */}
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.slug, item.quantity - 1, item.selectedSize, item.selectedColor)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center font-display text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.slug, item.quantity + 1, item.selectedSize, item.selectedColor)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.slug, item.selectedSize, item.selectedColor)}
                        className="ml-2 flex h-7 w-7 items-center justify-center rounded-lg text-destructive transition-colors hover:bg-destructive/10"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="shrink-0 text-right">
                    <span className="font-groovy text-sm font-bold sm:text-base">
                      {item.price * item.quantity}
                    </span>
                    <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                      {item.currency}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <button
                onClick={clearCart}
                className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground underline underline-offset-4 transition-colors hover:text-destructive"
              >
                Clear Cart
              </button>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-groovy text-2xl font-bold">
                    {subtotal} {currency}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={ROUTES.SHOP}
                    className={cn(
                      "inline-flex items-center justify-center rounded-full border-2 border-foreground px-6 py-2.5",
                      "font-groovy text-[10px] font-bold uppercase tracking-wider",
                      "bg-card text-foreground transition-shadow hover:shadow-retro"
                    )}
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to={buildCartInquiryPath(items, subtotal, currency)}
                    className={cn(
                      "inline-flex items-center justify-center rounded-full border-2 border-foreground px-6 py-2.5",
                      "font-groovy text-[10px] font-bold uppercase tracking-wider shadow-retro",
                      "bg-primary text-primary-foreground transition-shadow hover:shadow-retro-lg"
                    )}
                  >
                    Proceed to Inquiry
                  </Link>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Checkout coming soon — inquire to place your order now.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Section>
      )}
    </>
  );
}
