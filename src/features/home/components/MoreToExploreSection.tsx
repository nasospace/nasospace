import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ShoppingBag, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import {
  FlowerShape,
  StickerBadge,
} from "@/components/shared/RetroElements";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { EXPLORE_CARDS_DATA } from "@/config/homeData";

// Mapping IDs to Lucide icons since we don't store components in JSON config
const iconMap: Record<string, any> = {
  chapters: MapPin,
  artifacts: ShoppingBag,
};

export function MoreToExploreSection() {
  return (
    <section className="relative overflow-hidden bg-foreground py-32">
      {/* Background textures */}
      <div className="absolute inset-0 naso-checkerboard opacity-[0.03] mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 naso-noise opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-20 text-center flex flex-col items-center">
            <StickerBadge variant="filled" className="bg-primary text-foreground mb-8" rotate={2}>
              <Zap className="inline w-4 h-4 mr-1 -mt-0.5" /> Keep Going
            </StickerBadge>
            <h2 className="font-groovy text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.85] tracking-tighter text-background uppercase">
              More To <br />
              <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">Explore.</span>
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {EXPLORE_CARDS_DATA.map((card, idx) => {
              const Icon = iconMap[card.id] || Zap;
              // Alternate slight rotations
              const rotate = idx % 2 === 0 ? -1 : 1;
              return (
                <motion.div key={idx} variants={fadeUp}>
                  <Link
                    to={card.link}
                    className="group relative block overflow-hidden rounded-[2rem] border-4 border-white/10 min-h-[480px] md:min-h-[520px] transition-all duration-500 hover:-translate-y-2 hover:border-white/30"
                    style={{ transform: `rotate(${rotate}deg)` }}
                  >
                    {/* Background Image */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                    <div className={cn("absolute inset-0 opacity-20 mix-blend-multiply", card.theme)} />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col p-8 md:p-12">
                      {/* Top: Badge */}
                      <div className="mb-auto flex items-start justify-between">
                        <StickerBadge variant="filled" className={cn("text-foreground shadow-[4px_4px_0_rgba(0,0,0,0.3)]", card.theme)} rotate={-4}>
                          {card.badge}
                        </StickerBadge>
                        <div className={cn("w-14 h-14 rounded-full border-4 border-white/20 flex items-center justify-center opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all", card.theme)}>
                          <Icon className="w-6 h-6 text-foreground" />
                        </div>
                      </div>

                      {/* Bottom: Text & CTA */}
                      <div className="mt-auto">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 mb-3 font-bold">
                          {card.id === "chapters" ? "Sealed experiences across Cairo" : "Bring NASO home"}
                        </p>
                        <h3 className="font-groovy text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] tracking-tight mb-4">
                          {card.title}
                        </h3>
                        <p className="max-w-sm text-base md:text-lg text-white/70 font-medium leading-relaxed mb-8">
                          {card.description}
                        </p>
                        <div className="inline-flex items-center gap-3 font-groovy text-sm font-black uppercase tracking-[0.15em] text-white transition-all group-hover:gap-5">
                          {card.buttonText}
                          <div className={cn("w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:border-white/60 transition-all", card.theme)}>
                            <ArrowRight className="h-4 w-4 text-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      
      {/* Decorative */}
      <FlowerShape size={100} className="absolute top-20 -right-8 text-primary/10 naso-flower-spin pointer-events-none hidden lg:block" />
    </section>
  );
}
