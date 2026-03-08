import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";
import {
  FlowerShape,
  StickerBadge,
  Sparkle,
  MagneticButton,
  MarqueeTicker,
} from "@/components/shared/RetroElements";

/* ── Motion presets ── */
const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay } },
});

const stickerPop = (delay = 0, rotate = 0) => ({
  hidden: { opacity: 0, scale: 0.15, rotate: rotate - 25 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate,
    transition: { type: "spring" as const, stiffness: 380, damping: 14, delay },
  },
});

const wipe = (delay = 0) => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.65, ease, delay } },
});

const posterSlide = (delay = 0) => ({
  hidden: { opacity: 0, y: 60, rotate: -8 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: -3,
    transition: { type: "spring" as const, stiffness: 160, damping: 18, delay },
  },
});

/* ══════════════════════════════════════════
   HERO — Retro-Groovy Poster World
   ══════════════════════════════════════════ */
export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
      {/* ── Background layers ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {/* Warm cream base */}
        <div className="absolute inset-0 bg-naso-cream" />
        {/* Dot grid texture */}
        <div className="absolute inset-0 naso-dotgrid opacity-60" />
        {/* Large green blob — top right */}
        <div className="absolute -right-[10%] -top-[5%] h-[60vh] w-[45vw] rounded-[50%] bg-secondary/20 blur-3xl" />
        {/* Lilac wash — bottom left */}
        <div className="absolute -left-[8%] bottom-[5%] h-[35vh] w-[30vw] rounded-[50%] bg-naso-lilac/15 blur-3xl" />
      </motion.div>

      {/* ── Hero Content ── */}
      <div className="container relative z-10 flex min-h-[100svh] flex-col justify-center px-5 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-24">

          {/* ═══ LEFT COLUMN — Typography + CTAs ═══ */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* Location kicker */}
            <motion.div variants={fadeUp(0)} className="mb-6 flex items-center gap-3">
              <img src={nasoLogo} alt="NASO" className="h-7 w-auto" />
              <span className="h-[2px] w-8 rounded-full bg-foreground/20" />
              <span className="font-groovy text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Cairo, Egypt
              </span>
            </motion.div>

            {/* ── Headline ── */}
            <motion.h1
              variants={fadeUp(0.1)}
              className="font-groovy text-[clamp(2.6rem,8vw,6.5rem)] font-black leading-[0.92] tracking-[-0.03em] text-foreground"
            >
              <span className="block">Make it</span>
              <span className="relative mt-1 inline-block lg:mt-2">
                {/* Green highlight block wipe */}
                <motion.span
                  variants={wipe(0.7)}
                  className="absolute -inset-x-[0.12em] inset-y-[0.04em] origin-left -skew-x-2 rounded-lg bg-secondary"
                  aria-hidden
                />
                <span className="relative z-10">memorable</span>
              </span>
              <span className="text-primary">.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp(0.3)}
              className="mt-6 max-w-[26rem] text-[15px] leading-[1.8] text-muted-foreground lg:text-base"
            >
              Curated outings, creative workshops &amp; original products — for
              people who collect moments, not things.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp(0.45)}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <MagneticButton
                to={ROUTES.EXPERIENCES}
                className="group inline-flex h-[54px] items-center gap-2.5 rounded-full border-[2.5px] border-foreground bg-foreground px-8 font-groovy text-xs font-bold uppercase tracking-[0.1em] text-background shadow-retro transition-all duration-200 hover:shadow-retro-lg active:scale-[0.96] active:shadow-retro"
              >
                Explore experiences
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton
                to={ROUTES.SHOP}
                className="inline-flex h-[54px] items-center rounded-full border-[2.5px] border-foreground bg-card px-8 font-groovy text-xs font-bold uppercase tracking-[0.1em] text-foreground shadow-retro transition-all duration-200 hover:bg-secondary hover:shadow-retro-lg active:scale-[0.96] active:shadow-retro"
              >
                Visit shop
              </MagneticButton>
            </motion.div>

            {/* Supporting detail */}
            <motion.div
              variants={fadeUp(0.58)}
              className="mt-6 flex items-center gap-2.5 text-muted-foreground/50"
            >
              <Sparkle className="h-3.5 w-3.5 text-naso-purple" />
              <span className="font-groovy text-[8px] font-bold uppercase tracking-[0.2em]">
                Experiences · Workshops · Products
              </span>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT COLUMN — Poster Composition ═══ */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="relative mx-auto h-[420px] w-[340px] sm:h-[460px] sm:w-[370px] lg:mx-0 lg:h-[520px] lg:w-[400px] xl:h-[560px] xl:w-[430px]"
          >
            {/* ── Main poster frame ── */}
            <motion.div
              variants={posterSlide(0.35)}
              className="absolute inset-0 overflow-hidden rounded-3xl border-[3px] border-foreground bg-card shadow-retro-lg"
            >
              {/* Checkerboard strip at top */}
              <div className="h-10 w-full naso-checkerboard border-b-[2px] border-foreground" />

              <div className="flex h-[calc(100%-2.5rem)] flex-col items-center justify-center p-8">
                {/* NASO wordmark */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.7 }}
                  className="font-groovy text-[5.5rem] font-black leading-none tracking-[-0.04em] text-foreground sm:text-[6rem] xl:text-[7rem]"
                >
                  NASO
                </motion.span>

                {/* Tagline bar */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-foreground/20" />
                  <span className="font-groovy text-[7px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    Creative moments
                  </span>
                  <span className="h-[2px] w-8 bg-foreground/20" />
                </div>

                {/* Brand color strip */}
                <div className="mt-6 flex gap-2">
                  {[
                    "bg-primary",
                    "bg-secondary",
                    "bg-accent",
                    "bg-naso-lilac",
                    "bg-naso-pink",
                    "bg-foreground",
                  ].map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.9 + i * 0.06, duration: 0.4, ease }}
                      className={`h-4 w-8 origin-bottom rounded-sm border border-foreground/10 ${c}`}
                    />
                  ))}
                </div>

                {/* Year stamp */}
                <span className="mt-6 font-groovy text-[8px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">
                  Est. Cairo 2024
                </span>
              </div>
            </motion.div>

            {/* ── "Made in Cairo" sticker ── */}
            <motion.div
              variants={stickerPop(0.6, -8)}
              whileHover={{ scale: 1.12, rotate: -2 }}
              className="absolute -left-8 -top-6 z-20 sm:-left-10 lg:-left-12"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-[80px] w-[80px] flex-col items-center justify-center rounded-full border-[2.5px] border-foreground bg-secondary font-groovy text-[7px] font-black uppercase leading-tight tracking-[0.12em] text-foreground shadow-retro xl:h-[90px] xl:w-[90px] xl:text-[8px]"
              >
                <span>Made</span>
                <span>in</span>
                <span>Cairo</span>
              </motion.div>
            </motion.div>

            {/* ── Flower accent — top right ── */}
            <motion.div
              variants={stickerPop(0.85, 15)}
              className="absolute -right-5 -top-4 z-20"
            >
              <FlowerShape size={48} className="text-naso-purple naso-flower-spin" />
            </motion.div>

            {/* ── Blue sparkle — bottom right ── */}
            <motion.div
              variants={stickerPop(1.0, 0)}
              className="absolute -bottom-3 -right-3 z-20"
            >
              <Sparkle className="h-7 w-7 text-primary" />
            </motion.div>

            {/* ── Lilac dot — bottom left ── */}
            <motion.div
              variants={stickerPop(0.95, 0)}
              className="absolute -bottom-2 left-10 z-20 h-5 w-5 rounded-full border-2 border-foreground bg-naso-lilac shadow-retro"
            />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom marquee ticker ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t-[2px] border-foreground bg-foreground py-3">
        <MarqueeTicker speed={20}>
          {[
            "Outings",
            "Workshops",
            "Events",
            "Products",
            "Art",
            "Culture",
            "Cairo",
            "Memories",
            "Moments",
            "Friends",
          ].map((word) => (
            <span key={word} className="mx-6 font-groovy text-xs font-bold uppercase tracking-[0.15em] text-background">
              {word}
              <Sparkle className="ml-6 inline-block h-2.5 w-2.5 text-secondary" />
            </span>
          ))}
        </MarqueeTicker>
      </div>
    </section>
  );
}
