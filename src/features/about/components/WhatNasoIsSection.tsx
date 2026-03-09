import { motion } from "framer-motion";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Sparkle } from "@/components/shared/RetroElements";
import { fadeUp, staggerSlow } from "@/lib/motion";

interface WhatNasoIsSectionProps {
  title?: string;
  body?: string;
}

export function WhatNasoIsSection({ title, body }: WhatNasoIsSectionProps) {
  return (
    <section className="relative overflow-hidden py-section">
      <div className="absolute inset-0 naso-grid-bg" />
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerSlow}
          className="mx-auto max-w-3xl text-center"
        >

          <motion.p
            variants={fadeUp}
            className="font-groovy text-[clamp(1.25rem,3.5vw,2rem)] font-bold leading-[1.3] tracking-[-0.01em]"
          >
            NASO is where your weekend stops being{" "}
            <span className="text-primary">forgettable</span>. We design outings,
            workshops, private events, and products that feel like they were made{" "}
            <span className="text-accent">just for you</span> — because they kind
            of were.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            Born in Cairo. Built on creativity. Fueled by the belief that how you
            spend your time should be worth talking about.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-8 flex max-w-sm items-center gap-3"
          >
            <span className="h-px flex-1 bg-border" />
            <Sparkle className="h-4 w-4 text-secondary" />
            <span className="h-px flex-1 bg-border" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
