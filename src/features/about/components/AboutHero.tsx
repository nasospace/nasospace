import { motion } from "framer-motion";
import { staggerSlow, fadeUp, popIn } from "@/lib/motion";
import { StickerBadge, FlowerShape } from "@/components/shared/RetroElements";
import { aboutHero } from "../data";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-card py-section-lg">
      <div className="absolute inset-0 naso-dotgrid opacity-50" />
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerSlow}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={popIn} className="flex justify-center">
            <StickerBadge variant="filled" className="bg-secondary" rotate={-2}>
              About NASO
            </StickerBadge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 font-groovy text-[clamp(2rem,6vw,4rem)] font-black leading-[1.05] tracking-[-0.02em]"
          >
            {aboutHero.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl"
          >
            {aboutHero.subline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <span className="h-3 w-3 rounded-full bg-primary" />
            <FlowerShape size={28} className="text-naso-purple" />
            <span className="h-3 w-3 rounded-full bg-secondary" />
            <FlowerShape size={28} className="text-naso-pink" />
            <span className="h-3 w-3 rounded-full bg-naso-lilac" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
