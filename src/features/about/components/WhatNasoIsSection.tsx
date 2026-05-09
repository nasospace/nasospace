import { motion } from "framer-motion";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Sparkle, StickerBadge } from "@/components/shared/RetroElements";
import { fadeUp, staggerSlow } from "@/lib/motion";

interface WhatNasoIsSectionProps {
  title?: string;
  body?: string;
}

export function WhatNasoIsSection({ title, body }: WhatNasoIsSectionProps) {
  return (
    <section className="relative overflow-hidden py-32 bg-foreground text-background">
      <div className="absolute inset-0 naso-checkerboard opacity-10 mix-blend-overlay" />
      <div className="absolute inset-0 naso-noise opacity-20 pointer-events-none" />
      
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerSlow}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-10 flex justify-center">
            <StickerBadge variant="filled" className="bg-primary text-naso-black px-6 py-2 border-2 border-foreground shadow-[4px_4px_0_hsl(var(--foreground))]" rotate={-2}>
              The Antidote
            </StickerBadge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-groovy text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.9] tracking-tighter uppercase"
          >
            NASO is an antidote to the <span className="relative inline-block text-primary rotate-[-2deg] scale-110 mx-2 filter drop-shadow-md">ordinary</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-12 max-w-2xl text-xl md:text-2xl font-medium leading-relaxed text-background/80"
          >
            We design environments, moments, and artifacts that refuse to blend in. It's not just about what you do, it's about how it makes you <span className="font-groovy text-naso-pink tracking-widest uppercase text-3xl">feel</span>.
          </motion.p>
          
          <motion.div variants={fadeUp} className="mt-12 flex justify-center">
             <div className="bg-background text-foreground p-8 rounded-3xl border-4 border-foreground shadow-[8px_8px_0_hsl(var(--foreground))] max-w-xl rotate-1 transition-all hover:rotate-0 hover:scale-105 duration-500">
               <p className="font-display text-lg font-bold">
                 Rooted in Cairo's chaotic beauty, fueled by radical creativity, and built for those who refuse to let their free time go to waste.
               </p>
             </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-16 flex max-w-sm items-center gap-3"
          >
            <span className="h-px flex-1 bg-background/20" />
            <Sparkle className="h-6 w-6 text-primary" />
            <span className="h-px flex-1 bg-background/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
