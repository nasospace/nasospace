import { motion } from "framer-motion";
import { staggerSlow, fadeUp, popIn } from "@/lib/motion";
import { StickerBadge, FlowerShape } from "@/components/shared/RetroElements";
import { aboutHero } from "../data";
import heroCollage from "@/assets/about-hero-collage.png";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-card py-section-lg">
      <div className="absolute inset-0 naso-dotgrid opacity-50" />

      {/* Decorative collage — left, slow float */}
      <motion.img
        src={heroCollage}
        alt=""
        aria-hidden
        initial={{ opacity: 0, x: -60, scale: 0.85 }}
        animate={{ opacity: 0.7, x: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="pointer-events-none absolute left-4 top-1/2 hidden w-[180px] -translate-y-1/2 select-none naso-float lg:block xl:left-12 xl:w-[200px]"
      />

      {/* Decorative collage — right, slow float (offset) */}
      <motion.img
        src={heroCollage}
        alt=""
        aria-hidden
        initial={{ opacity: 0, x: 60, scale: 0.85 }}
        animate={{ opacity: 0.7, x: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-none absolute right-4 top-1/2 hidden w-[180px] -translate-y-1/2 -scale-x-100 select-none lg:block xl:right-12 xl:w-[200px]"
        style={{ animationDelay: "2.5s", animationName: "gentle-float", animationDuration: "6s", animationIterationCount: "infinite", animationTimingFunction: "ease-in-out" }}
      />

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
            <motion.span
              className="h-3 w-3 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <FlowerShape size={28} className="text-naso-purple naso-flower-spin" />
            <motion.span
              className="h-3 w-3 rounded-full bg-secondary"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.4 }}
            />
            <div className="naso-flower-spin" style={{ animationDirection: "reverse" }}>
              <FlowerShape size={28} className="text-naso-pink" />
            </div>
            <motion.span
              className="h-3 w-3 rounded-full bg-naso-lilac"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.8 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
