import { motion } from "framer-motion";
import { MotionDiv } from "@/components/shared/MotionDiv";
import {
  StickerBadge,
  FlowerShape
} from "@/components/shared/RetroElements";
import {
  staggerSlow,
  fadeUp,
  popIn,
} from "@/lib/motion";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { ArrowRight } from "lucide-react";

export function WhatNasoIsSection() {
  return (
    <section className="relative overflow-hidden bg-card py-section-lg border-y-4 border-foreground">
      <div className="absolute inset-0 naso-checkerboard opacity-20" />
      <div className="absolute inset-0 naso-noise opacity-40" />
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerSlow}
            className="lg:col-span-7 text-left"
          >
            <MotionDiv variants={popIn}>
              <StickerBadge variant="filled" className="bg-secondary text-foreground shadow-retro" rotate={-2}>
                The Movement
              </StickerBadge>
            </MotionDiv>

            <motion.h2
              variants={fadeUp}
              className="mt-8 font-groovy text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1] tracking-tighter text-foreground"
            >
              This started with a question.
            </motion.h2>

            <div className="mt-8 space-y-6 max-w-xl">
              <motion.p variants={fadeUp} className="text-lg md:text-xl font-medium text-muted-foreground leading-relaxed">
                Every Thursday, the same conversation: <span className="text-foreground italic font-semibold">"Where are we going?"</span> Every weekend, the same answer: nowhere worth remembering.
              </motion.p>
              
              <motion.p variants={fadeUp} className="text-lg md:text-xl font-medium text-foreground leading-relaxed bg-primary/10 p-4 rounded-2xl border-l-4 border-primary">
                So we stopped waiting. NASO isn't an event company — it's the creative energy Cairo was missing. We design the spaces, the kits, and the moments that make you actually feel something.
              </motion.p>

              <motion.p variants={fadeUp} className="text-lg md:text-xl font-medium text-muted-foreground leading-relaxed">
                You show up. You meet people who get it. You leave with something you made — and a story worth telling.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="mt-10">
              <Link
                to={ROUTES.ABOUT}
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full border-4 border-foreground bg-white px-8 font-groovy text-sm font-black uppercase tracking-widest text-foreground shadow-retro transition-transform hover:-translate-y-1 hover:shadow-retro-lg active:translate-y-0 active:shadow-none"
              >
                Read our story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-foreground bg-naso-lilac shadow-retro-lg aspect-[4/5] w-full transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/assets/about_portrait_1776810281914.png" 
                alt="NASO Community"
                className="w-full h-full object-cover mix-blend-multiply opacity-90 grayscale-[10%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white p-4 rounded-2xl border-2 border-foreground shadow-retro-sm transform -rotate-2">
                  <p className="font-groovy font-bold text-sm text-foreground text-center">
                    "Finally, a weekend that doesn't feel like a copy-paste of the last one."
                  </p>
                </div>
              </div>
            </div>
            
            <FlowerShape size={100} className="absolute -top-10 -right-10 text-primary naso-flower-spin z-20" />
            <FlowerShape size={60} className="absolute -bottom-5 -left-5 text-naso-pink naso-flower-spin z-20 opacity-80" style={{ animationDirection: 'reverse' }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
