import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { MotionDiv } from "@/components/shared/MotionDiv";
import {
  FlowerShape,
  StickerBadge,
  Sparkle,
} from "@/components/shared/RetroElements";
import { staggerContainer, fadeUp, slideInLeft, slideInRight, popIn } from "@/lib/motion";

export function MoreToExploreSection() {
  return (
    <section className="relative overflow-hidden border-y-[2.5px] border-foreground bg-secondary/15 py-section-lg">
      <div className="absolute inset-0 naso-checkerboard opacity-25" />
      <div className="absolute inset-0 naso-noise" />

      <MotionDiv variants={popIn} className="absolute -left-12 top-20 opacity-10">
        <FlowerShape size={120} className="text-naso-purple naso-flower-spin" />
      </MotionDiv>
      <MotionDiv variants={popIn} className="absolute -right-8 bottom-16 opacity-8">
        <FlowerShape size={80} className="text-primary naso-flower-spin" />
      </MotionDiv>

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="font-groovy text-[clamp(1.6rem,4.5vw,3rem)] font-black leading-[1.05] text-foreground">
              More to explore
            </h2>
            <p className="mt-3 text-sm text-muted-foreground lg:text-base">
              Creative sessions and original products, all designed by NASO.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div variants={slideInLeft}>
              <Link
                to={ROUTES.WORKSHOPS}
                className="group relative block overflow-hidden rounded-2xl border-[2.5px] border-foreground bg-card shadow-retro transition-all duration-300 hover:-translate-y-1 hover:shadow-retro-lg min-h-[360px] lg:min-h-[400px]"
              >
                <img 
                  src="/assets/workshops_bg_1776810244802.png" 
                  alt="Workshops" 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-naso-lilac/30 mix-blend-multiply" />
                
                <div className="relative z-10 flex h-full flex-col p-8 lg:p-10">
                  <div className="mb-auto">
                    <StickerBadge variant="filled" className="bg-naso-lilac text-foreground" rotate={-4}>
                      Workshops
                    </StickerBadge>
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="mt-5 font-groovy text-2xl font-bold text-white lg:text-3xl">
                      Learn something
                      <br />
                      <span className="text-naso-lilac">you'll love.</span>
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                      Pottery, painting, cooking, music — hands-on creative sessions
                      led by Cairo's best artists and makers.
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-groovy text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-transform duration-200 group-hover:translate-x-1">
                      Browse workshops <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={slideInRight}>
              <Link
                to={ROUTES.SHOP}
                className="group relative block overflow-hidden rounded-2xl border-[2.5px] border-foreground bg-foreground shadow-retro transition-all duration-300 hover:-translate-y-1 hover:shadow-retro-lg min-h-[360px] lg:min-h-[400px]"
              >
                <img 
                  src="/assets/shop_bg_1776810267092.png" 
                  alt="Shop" 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-secondary/30 mix-blend-multiply" />
                
                <div className="relative z-10 flex h-full flex-col p-8 lg:p-10">
                  <div className="mb-auto">
                    <StickerBadge
                      variant="filled"
                      className="border-background/30 bg-primary text-primary-foreground"
                      rotate={3}
                    >
                      Shop
                    </StickerBadge>
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="mt-5 font-groovy text-2xl font-bold text-white lg:text-3xl">
                      Wear the
                      <br />
                      <span className="text-secondary">moment.</span>
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                      Original apparel, creative tools, limited editions, and
                      exclusive drops — all designed in Cairo.
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-groovy text-[10px] font-bold uppercase tracking-[0.12em] text-secondary transition-transform duration-200 group-hover:translate-x-1">
                      Visit shop <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
