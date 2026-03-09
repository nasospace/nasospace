import { motion } from "framer-motion";
import { MotionDiv } from "@/components/shared/MotionDiv";
import {
  FlowerShape,
  StickerBadge,
} from "@/components/shared/RetroElements";
import {
  staggerSlow,
  fadeUp,
  popIn,
  sectionReveal,
} from "@/lib/motion";

export function WhatNasoIsSection() {
  return (
    <section className="relative overflow-hidden bg-card py-section-lg">
      <div className="absolute inset-0 naso-checkerboard opacity-30" />
      <div className="absolute inset-0 naso-noise" />
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerSlow}
          className="mx-auto max-w-3xl text-center"
        >
          <MotionDiv variants={popIn}>
            <StickerBadge variant="filled" className="bg-secondary" rotate={-2}>
              Who we are
            </StickerBadge>
          </MotionDiv>

          <motion.h2
            variants={fadeUp}
            className="mt-8 font-groovy text-[clamp(1.8rem,5vw,3.5rem)] font-black leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            Not just an outing.
            <br />
            <span className="text-primary">A whole vibe.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg"
          >
            NASO is a Cairo-based creative world — curating experiences,
            workshops, events, and original products for people who want their
            free time to mean something.
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
