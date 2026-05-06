import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MotionDiv } from "@/components/shared/MotionDiv";
import {
  StickerBadge,
  FlowerShape,
  MagneticButton
} from "@/components/shared/RetroElements";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { ArrowRight, Sparkles } from "lucide-react";

export function WhatNasoIsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Continuous/Scroll Parallax effects instead of hover
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [3, -3]);
  const stickerY = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const flower1Y = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const flower2Y = useTransform(scrollYProgress, [0, 1], [-50, 100]);

  // Stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, rotate: 2 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Background Textures */}
      <div className="absolute inset-0 naso-checkerboard opacity-[0.03] mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 naso-noise opacity-30 mix-blend-overlay pointer-events-none z-[5]" />
      
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] bg-naso-lilac/30 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2"
      />

      <div className="container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          
          {/* Left Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 text-left relative z-10"
          >
            <motion.div variants={itemVariants} className="inline-block mb-8">
              <StickerBadge variant="filled" className="bg-secondary text-naso-black text-xs md:text-sm shadow-[4px_4px_0_hsl(var(--foreground))] px-6 py-2" rotate={-3}>
                The Movement
              </StickerBadge>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-groovy text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tighter text-foreground"
            >
              This started <br />
              with a <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-naso-blue rotate-[-2deg] scale-110 mx-2 filter drop-shadow-sm">question.</span>
            </motion.h2>

            <div className="mt-10 space-y-10 max-w-xl">
              
              {/* Point 1: The Problem */}
              <motion.div variants={itemVariants} className="flex flex-col gap-2">
                <span className="font-groovy text-base md:text-lg font-bold uppercase tracking-widest text-muted-foreground/50 line-through decoration-destructive decoration-4">
                  "Where are we going?"
                </span>
                <span className="font-groovy text-base md:text-lg font-bold uppercase tracking-widest text-muted-foreground/50 line-through decoration-destructive decoration-4">
                  "Nowhere worth remembering."
                </span>
              </motion.div>
              
              {/* Point 2: The Core Message */}
              <motion.div variants={itemVariants} className="relative z-20">
                {/* Continuous glowing aura */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-primary via-naso-blue to-naso-purple opacity-40 blur-xl animate-pulse" />
                
                <div className="relative bg-background/95 backdrop-blur-xl p-8 rounded-3xl border-4 border-foreground shadow-[10px_10px_0_hsl(var(--foreground))]">
                  <Sparkles className="absolute -top-5 -right-5 h-12 w-12 text-primary bg-background rounded-full p-2 border-4 border-foreground animate-pulse" />
                  
                  <h3 className="font-groovy text-2xl md:text-3xl font-black leading-tight text-foreground">
                    NASO is the creative energy Cairo was missing.
                  </h3>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <StickerBadge variant="filled" className="bg-primary text-naso-black border-2 border-foreground" rotate={2}>Spaces</StickerBadge>
                    <StickerBadge variant="filled" className="bg-naso-blue text-white border-2 border-foreground" rotate={-2}>Kits</StickerBadge>
                    <StickerBadge variant="filled" className="bg-naso-pink text-naso-black border-2 border-foreground" rotate={1}>Moments</StickerBadge>
                  </div>
                </div>
              </motion.div>

              {/* Point 3: The Result */}
              <motion.div variants={itemVariants}>
                <p className="text-2xl md:text-3xl font-groovy font-bold text-foreground leading-snug">
                  You show up. <br/>
                  <span className="text-naso-blue inline-block mt-1">You make something.</span> <br/>
                  <span className="bg-secondary text-naso-black px-3 py-1 mt-2 inline-block -rotate-1 border-2 border-foreground shadow-[4px_4px_0_hsl(var(--foreground))]">
                    You leave with a story.
                  </span>
                </p>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-12">
              <MagneticButton
                to={ROUTES.ABOUT}
                className="group inline-flex h-16 items-center justify-center gap-3 rounded-full border-4 border-foreground bg-primary px-10 font-groovy text-sm md:text-base font-black uppercase tracking-[0.15em] text-naso-black shadow-[6px_6px_0_hsl(var(--foreground))] transition-all hover:scale-105 hover:bg-naso-pink hover:shadow-[10px_10px_0_hsl(var(--foreground))] active:scale-95 active:shadow-[2px_2px_0_hsl(var(--foreground))]"
              >
                Read our story
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Image Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative mt-16 lg:mt-0 px-4 md:px-0"
          >
            <motion.div 
              style={{ y: imgY, rotate: imgRotate }}
              className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border-4 border-foreground bg-naso-lilac shadow-[16px_16px_0_hsl(var(--foreground))] aspect-[4/5] w-full max-w-md mx-auto"
            >
              {/* Continuous subtle scale on image instead of hover */}
              <motion.img 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                src="/assets/about_portrait_1776810281914.png" 
                alt="NASO Community"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Sticker using Parallax instead of Hover */}
              <motion.div 
                style={{ y: stickerY }}
                className="absolute bottom-6 md:bottom-10 left-6 right-6 z-10"
              >
                <div className="bg-white p-5 rounded-2xl border-4 border-foreground shadow-[8px_8px_0_hsl(var(--foreground))] -rotate-3">
                  <p className="font-groovy font-bold text-sm md:text-base text-foreground text-center">
                    "Finally, a weekend that doesn't feel like a copy-paste of the last one."
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Parallax Flowers */}
            <motion.div style={{ y: flower1Y }} className="absolute -top-12 -right-4 md:-top-16 md:-right-16 z-20 pointer-events-none">
              <FlowerShape size={120} className="text-primary drop-shadow-[6px_6px_0_hsl(var(--foreground))] animate-[spin_10s_linear_infinite]" />
            </motion.div>
            
            <motion.div style={{ y: flower2Y }} className="absolute -bottom-8 -left-4 md:-bottom-12 md:-left-12 z-20 opacity-90 pointer-events-none">
              <FlowerShape size={80} className="text-naso-pink drop-shadow-[4px_4px_0_hsl(var(--foreground))] animate-[spin_8s_linear_infinite_reverse]" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
