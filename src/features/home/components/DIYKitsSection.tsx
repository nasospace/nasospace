import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { StickerBadge, FlowerShape } from "@/components/shared/RetroElements";
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import { ArrowRight, Package, Sparkles, Heart } from "lucide-react";
import { trackNaso } from "@/lib/analytics";

export function DIYKitsSection() {
  return (
    <section className="relative overflow-hidden bg-naso-cream py-32">
      {/* Playful background elements */}
      <div className="absolute inset-0 naso-wavy-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 naso-noise opacity-30 mix-blend-overlay pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center lg:items-start"
        >
          {/* Left: Product Experience Focus */}
          <motion.div variants={slideInLeft} className="flex-1 w-full relative flex flex-col items-center">

            {/* The Box Image Showcase */}
            <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-[2rem] border-4 border-foreground bg-naso-lilac p-4 shadow-[12px_12px_0_hsl(var(--foreground))] transform -rotate-2 group">

              {/* Floating badges */}
              <StickerBadge variant="filled" className="absolute -top-6 -left-6 bg-primary text-white z-20 shadow-[4px_4px_0_hsl(var(--foreground))]" rotate={-6}>
                Artifact Drop
              </StickerBadge>
              <div className="absolute -top-4 -right-4 z-20 bg-white text-foreground font-groovy font-black text-xl px-5 py-2 rounded-full border-4 border-foreground shadow-[4px_4px_0_hsl(var(--foreground))] rotate-6 hover:rotate-12 transition-transform">
                950 EGP
              </div>

              {/* The Product Image */}
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden border-4 border-foreground relative bg-white flex items-center justify-center">
                <img
                  src="/assets/naso-box.png"
                  alt="NASO Artifact Box"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback if the image isn't saved yet
                    e.currentTarget.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
              </div>

              <FlowerShape size={80} className="absolute -bottom-10 -right-6 text-naso-pink naso-flower-spin z-20" />
            </div>

            {/* The "What's inside" details card */}
            <div className="w-full max-w-md mx-auto mt-12 bg-white p-6 md:p-8 rounded-[2rem] border-4 border-foreground shadow-[8px_8px_0_hsl(var(--foreground))] transform rotate-1 relative hover:-translate-y-1 transition-transform">
              {/* Binding rings to make it look like a notebook */}
              <div className="absolute -left-3 top-8 w-6 h-6 bg-secondary rounded-full border-4 border-foreground shadow-[2px_2px_0_hsl(var(--foreground))]" />
              <div className="absolute -left-3 top-20 w-6 h-6 bg-secondary rounded-full border-4 border-foreground shadow-[2px_2px_0_hsl(var(--foreground))]" />

              <h3 className="font-groovy text-2xl md:text-3xl font-black text-foreground mb-6 ml-4">The Messy Art Kit</h3>

              <div className="space-y-6 ml-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-xl border-2 border-primary shrink-0">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-groovy font-bold text-base">What's inside</p>
                    <p className="font-body text-sm md:text-base text-foreground/70 mt-1 font-medium leading-relaxed">Premium air-dry clay, 5 custom NASO acrylic colors, sculpting tools, and a curated Spotify playlist.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-naso-pink/10 p-2 rounded-xl border-2 border-naso-pink shrink-0">
                    <Heart className="w-6 h-6 text-naso-pink" />
                  </div>
                  <div>
                    <p className="font-groovy font-bold text-base">What you'll feel</p>
                    <p className="font-body text-sm md:text-base text-foreground/70 mt-1 font-medium leading-relaxed">Completely disconnected from your screen. Messy, creative, and unexpectedly calm.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Copy & Conversion */}
          <motion.div variants={slideInRight} className="flex-1 text-center lg:text-left lg:sticky lg:top-32">
            <h2 className="font-groovy text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[0.95] text-foreground tracking-tighter">
              Not just a box. <br />
              <span className="text-secondary inline-block mt-2 transform -rotate-1">A ritual for your</span><br />
              <span className="text-primary inline-block transform rotate-1">own space.</span>
            </h2>

            <p className="mt-8 text-lg md:text-xl text-foreground/80 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              For the nights you choose to stay in. We curated our most iconic experiences into physical artifacts—premium materials, a private guide, and the atmosphere you need to actually disconnect.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <Link
                to={ROUTES.SHOP}
                className="group flex h-16 w-full sm:w-auto items-center justify-center gap-3 rounded-full border-4 border-foreground bg-primary px-10 font-groovy text-base font-black uppercase tracking-widest text-white shadow-[6px_6px_0_hsl(var(--foreground))] transition-all hover:-translate-y-1 hover:bg-secondary hover:shadow-[10px_10px_0_hsl(var(--foreground))] active:translate-y-0 active:shadow-[2px_2px_0_hsl(var(--foreground))]"
                onClick={() => trackNaso("diy_kit_cta_click")}
              >
                Send me one
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Link>

              <div className="flex items-center gap-2 text-sm md:text-base font-groovy font-bold text-foreground/60 bg-white px-4 py-2 rounded-full border-2 border-foreground shadow-[2px_2px_0_hsl(var(--foreground))] transform rotate-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Delivered anywhere in Egypt</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
