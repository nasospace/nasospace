import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Heart, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, FlowerShape, MagneticButton } from "@/components/shared";
import { StickerBadge } from "@/components/shared/RetroElements";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { SEOHead } from "@/components/shared/SEOHead";
import { useCart } from "@/features/cart";
import { ROUTES, routeHelpers } from "@/config/routes";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackNaso } from "@/lib/analytics";
import { getDeviceId } from "@/lib/deviceId";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getItemCount } = useCart();
  const count = getItemCount();
  const subtotal = getSubtotal();
  const currency = items[0]?.currency ?? "EGP";

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "details" | "success">("cart");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const summary = items.map((i) => `${i.title} (x${i.quantity})`).join(", ");
      
      const { error } = await supabase.from("inquiries").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: `Order Details:\n${summary}\nTotal: ${subtotal} ${currency}\n\nCustomer Notes:\n${formData.notes}`,
        status: "sent",
        inquiry_type: "order",
        device_id: getDeviceId(),
      });

      if (error) throw error;
      
      setCheckoutStep("success");
      trackNaso("checkout_submitted", { itemCount: items.length, total: subtotal, currency });
      clearCart();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Your Cart"
        description="Review your NASO cart."
        noindex
      />

      {/* Hero */}
      <Section spacing="lg" className="text-center pb-8">
        <MotionDiv>
          <StickerBadge className="bg-naso-lilac text-foreground shadow-retro-sm mb-6" rotate={-2}>
            {checkoutStep === "cart" ? "Your Bag" : checkoutStep === "details" ? "Almost Yours" : "Got It!"}
          </StickerBadge>
          <h1 className="font-groovy text-[clamp(2.5rem,5vw,4rem)] font-black tracking-tighter">
            {checkoutStep === "cart" && "Ready to vibe?"}
            {checkoutStep === "details" && "Let's make it official."}
            {checkoutStep === "success" && "You're all set."}
          </h1>
          {checkoutStep === "cart" && (
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md mx-auto font-medium">
              {count === 0
                ? "Your cart is looking a little empty. Let's fix that."
                : `You've got ${count} item${count > 1 ? "s" : ""} waiting for you.`}
            </p>
          )}
        </MotionDiv>
      </Section>

      {/* Empty state */}
      {count === 0 && checkoutStep === "cart" && (
        <Section>
          <div className="flex flex-col items-center justify-center gap-6 py-10 text-center">
            <FlowerShape className="text-muted-foreground/20 naso-flower-spin" size={80} />
            <MagneticButton
              to={ROUTES.SHOP}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-4 border-foreground px-8 py-4",
                "font-groovy text-sm font-black uppercase tracking-widest shadow-retro",
                "bg-primary text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-retro-lg active:translate-y-0"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
              Go Explore
            </MagneticButton>
          </div>
        </Section>
      )}

      {count > 0 && checkoutStep !== "success" && (
        <Section>
          <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Main Content Area */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                
                {/* CART STEP */}
                {checkoutStep === "cart" && (
                  <motion.div
                    key="cart-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="divide-y divide-border rounded-3xl border-4 border-foreground bg-card shadow-retro-lg overflow-hidden">
                      {items.map((item) => (
                        <div
                          key={`${item.slug}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`}
                          className="flex items-start gap-4 p-5 sm:items-center sm:gap-6 sm:p-6 bg-white transition-colors hover:bg-muted/50"
                        >
                          <Link to={routeHelpers.shopDetail(item.slug)} className="shrink-0 block overflow-hidden rounded-2xl border-2 border-foreground shadow-retro-sm">
                            <img
                              src={item.coverImageSrc}
                              alt={item.title}
                              className="h-24 w-24 object-cover transition-transform hover:scale-105"
                            />
                          </Link>

                          <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <Link
                              to={routeHelpers.shopDetail(item.slug)}
                              className="font-groovy text-lg font-black leading-tight hover:text-primary transition-colors"
                            >
                              {item.title}
                            </Link>

                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground font-medium mt-1">
                              {item.selectedSize && <span className="bg-muted px-2 py-1 rounded-md border border-border">Size: {item.selectedSize}</span>}
                              {item.selectedColor && <span className="bg-muted px-2 py-1 rounded-md border border-border">Color: {item.selectedColor}</span>}
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center gap-1 bg-muted rounded-full p-1 border-2 border-border">
                                <button
                                  onClick={() => updateQuantity(item.slug, item.quantity - 1, item.selectedSize, item.selectedColor)}
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-border text-foreground hover:bg-primary hover:text-white transition-colors"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-8 text-center font-groovy text-sm font-bold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.slug, item.quantity + 1, item.selectedSize, item.selectedColor)}
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-border text-foreground hover:bg-primary hover:text-white transition-colors"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <div className="text-right">
                                <span className="font-groovy text-lg font-black">
                                  {item.price * item.quantity}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">
                                  {item.currency}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.slug, item.selectedSize, item.selectedColor)}
                            className="absolute top-4 right-4 sm:static flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={clearCart}
                      className="font-groovy text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-destructive underline underline-offset-4 transition-colors px-2"
                    >
                      Clear everything
                    </button>
                  </motion.div>
                )}

                {/* DETAILS STEP */}
                {checkoutStep === "details" && (
                  <motion.div
                    key="details-step"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-card rounded-3xl border-4 border-foreground p-6 sm:p-8 shadow-retro-lg"
                  >
                    <button 
                      onClick={() => setCheckoutStep("cart")}
                      className="text-xs font-groovy font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1"
                    >
                      ← Back to Cart
                    </button>
                    
                    <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-5">
                      <div>
                        <label className="block font-groovy text-sm font-bold text-foreground mb-2">What should we call you?</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full h-14 rounded-2xl border-4 border-foreground px-4 font-body text-base focus:ring-4 focus:ring-primary/20 outline-none transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block font-groovy text-sm font-bold text-foreground mb-2">Where do we send updates?</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full h-14 rounded-2xl border-4 border-foreground px-4 font-body text-base focus:ring-4 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Email address"
                          />
                        </div>
                        <div>
                          <label className="block font-groovy text-sm font-bold text-foreground mb-2">Phone number for delivery</label>
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full h-14 rounded-2xl border-4 border-foreground px-4 font-body text-base focus:ring-4 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-groovy text-sm font-bold text-foreground mb-2">Any special requests? (Optional)</label>
                        <textarea 
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          className="w-full rounded-2xl border-4 border-foreground p-4 font-body text-base focus:ring-4 focus:ring-primary/20 outline-none transition-all resize-none h-28"
                          placeholder="Tell us if it's a gift, or any delivery instructions..."
                        />
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Summary Area */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 bg-naso-cream rounded-3xl border-4 border-foreground p-6 sm:p-8 shadow-retro-lg">
                <h3 className="font-groovy text-xl font-black mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground font-medium text-sm">
                    <span>Subtotal ({count} items)</span>
                    <span>{subtotal} {currency}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground font-medium text-sm">
                    <span>Shipping</span>
                    <span>Calculated later</span>
                  </div>
                </div>
                
                <div className="border-t-4 border-foreground pt-4 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="font-groovy font-bold text-lg">Total</span>
                    <div className="text-right">
                      <span className="font-groovy text-3xl font-black">{subtotal}</span>
                      <span className="text-sm font-bold ml-1">{currency}</span>
                    </div>
                  </div>
                </div>

                {checkoutStep === "cart" ? (
                  <button
                    onClick={() => {
                      setCheckoutStep("details");
                      trackNaso("checkout_intent", { itemCount: count, total: subtotal, currency });
                    }}
                    className="group flex w-full h-14 items-center justify-center gap-2 rounded-full border-4 border-foreground bg-primary px-8 font-groovy text-sm font-black uppercase tracking-widest text-primary-foreground shadow-retro transition-transform hover:-translate-y-1 hover:shadow-retro-lg active:translate-y-0 active:shadow-none"
                  >
                    Secure Checkout
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="group flex w-full h-14 items-center justify-center gap-2 rounded-full border-4 border-foreground bg-secondary px-8 font-groovy text-sm font-black uppercase tracking-widest text-foreground shadow-retro transition-transform hover:-translate-y-1 hover:shadow-retro-lg active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Order"}
                    {!isSubmitting && <Check className="h-4 w-4 text-foreground" />}
                  </button>
                )}

                <div className="mt-6 flex flex-col items-center justify-center gap-2 text-center">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-naso-purple" />
                    <span>No payment needed right now.</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">We'll reach out to finalize the details and payment.</span>
                </div>
              </div>
            </div>

          </div>
        </Section>
      )}

      {/* Success State */}
      {checkoutStep === "success" && (
        <Section className="min-h-[50vh] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-card rounded-3xl border-4 border-foreground p-8 sm:p-12 text-center shadow-retro-lg"
          >
            <div className="w-20 h-20 mx-auto bg-[#B9EC84] rounded-full border-4 border-foreground flex items-center justify-center mb-6 shadow-retro-sm">
              <Check className="w-10 h-10 text-foreground" />
            </div>
            <h2 className="font-groovy text-3xl font-black mb-4">Order Confirmed!</h2>
            <p className="text-muted-foreground font-medium mb-8">
              We received your order. The NASO team will reach out to you via WhatsApp or Email within 24 hours to finalize delivery and payment details. 
            </p>
            <Link
              to={ROUTES.HOME}
              className="inline-flex h-14 items-center justify-center rounded-full border-4 border-foreground bg-primary px-8 font-groovy text-sm font-black uppercase tracking-widest text-primary-foreground shadow-retro transition-transform hover:-translate-y-1 hover:shadow-retro-lg active:translate-y-0"
            >
              Back to Vibes
            </Link>
          </motion.div>
        </Section>
      )}
    </>
  );
}
