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
                className="group relative block overflow-hidden rounded-2xl border-[2.5px] border-foreground bg-card p-8 shadow-retro transition-all duration-300 hover:-translate-y-1 hover:shadow-retro-lg lg:p-10"
              >
                <StickerBadge variant="filled" className="bg-naso-lilac" rotate={-4}>
                  Workshops
                </StickerBadge>
                <h3 className="mt-5 font-groovy text-2xl font-bold text-foreground lg:text-3xl">
                  Learn something
                  <br />
                  <span className="text-accent">you'll love.</span>
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Pottery, painting, cooking, music — hands-on creative sessions
                  led by Cairo's best artists and makers.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-groovy text-[10px] font-bold uppercase tracking-[0.12em] text-primary transition-transform duration-200 group-hover:translate-x-1">
                  Browse workshops <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <div className="absolute -bottom-4 -right-4 opacity-8">
                  <FlowerShape size={80} className="text-accent" />
                </div>
              </Link>
            </motion.div>

            <motion.div variants={slideInRight}>
              <Link
                to={ROUTES.SHOP}
                className="group relative block overflow-hidden rounded-2xl border-[2.5px] border-foreground bg-foreground p-8 text-background shadow-retro transition-all duration-300 hover:-translate-y-1 hover:shadow-retro-lg lg:p-10"
              >
                <StickerBadge
                  variant="filled"
                  className="border-background/30 bg-primary text-primary-foreground"
                  rotate={3}
                >
                  Shop
                </StickerBadge>
                <h3 className="mt-5 font-groovy text-2xl font-bold text-background lg:text-3xl">
                  Wear the
                  <br />
                  <span className="text-secondary">moment.</span>
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/60">
                  Original apparel, creative tools, limited editions, and
                  exclusive drops — all designed in Cairo.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-groovy text-[10px] font-bold uppercase tracking-[0.12em] text-secondary transition-transform duration-200 group-hover:translate-x-1">
                  Visit shop <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <div className="absolute -bottom-3 -right-3 opacity-10">
                  <Sparkle className="h-16 w-16 text-secondary" />
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
