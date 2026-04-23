import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { StickerBadge, FlowerShape } from "@/components/shared/RetroElements";
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import { ArrowRight, Package, Sparkles, Heart } from "lucide-react";
import { trackNaso } from "@/lib/analytics";

export function DIYKitsSection() {
  return (
    <section className="relative overflow-hidden bg-background py-section-lg border-y-4 border-foreground">
      <div className="absolute inset-0 naso-wavy-bg opacity-10" />
      <div className="absolute inset-0 naso-noise opacity-30" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
        >
          {/* Left: Product Experience Focus */}
          <motion.div variants={slideInLeft} className="flex-1 w-full relative">
            <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] max-w-md mx-auto w-full rounded-[2rem] border-4 border-foreground bg-secondary/20 p-6 overflow-hidden shadow-retro-lg transform -rotate-2">
              {/* Product Background Image */}
              <img 
                src="/assets/shop_bg_1776810267092.png" 
                alt="DIY Kit Experience"
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50 grayscale-[20%]"
                loading="lazy"
              />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <StickerBadge variant="filled" className="bg-white text-foreground shadow-retro-sm" rotate={4}>
                    Artifact Ritual
                  </StickerBadge>
                  <div className="bg-primary text-white font-groovy font-black text-xl px-4 py-2 rounded-full border-2 border-foreground shadow-retro-sm rotate-6">
                    950 EGP
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-foreground shadow-retro">
                  <h3 className="font-groovy text-2xl font-black text-foreground mb-4">The Messy Art Kit</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-groovy font-bold text-sm">What's inside</p>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">Premium air-dry clay, 5 custom NASO acrylic colors, sculpting tools, and a curated Spotify playlist.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-naso-pink shrink-0 mt-0.5" />
                      <div>
                        <p className="font-groovy font-bold text-sm">What you'll feel</p>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">Completely disconnected from your screen. Messy, creative, and unexpectedly calm.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <FlowerShape size={80} className="absolute -bottom-6 -right-6 text-naso-purple naso-flower-spin z-20" />
          </motion.div>

          {/* Right: Copy & Conversion */}
          <motion.div variants={slideInRight} className="flex-1 text-center lg:text-left">
            <h2 className="font-groovy text-[clamp(2rem,4vw,3.5rem)] font-black leading-tight text-foreground tracking-tighter">
              Not just a box. <br/>
              <span className="text-primary">A ritual for your own space.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              For the nights you choose to stay in. We curated our most iconic experiences into physical artifacts—premium materials, a private guide, and the atmosphere you need to actually disconnect.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                to={ROUTES.SHOP}
                className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border-4 border-foreground bg-primary px-8 font-groovy text-sm font-black uppercase tracking-widest text-primary-foreground shadow-retro transition-transform hover:-translate-y-1 hover:shadow-retro-lg active:translate-y-0 active:shadow-none"
                onClick={() => trackNaso("diy_kit_cta_click")}
              >
                Send me one
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex items-center gap-2 text-sm font-groovy font-bold text-muted-foreground">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Delivered anywhere in Egypt</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
