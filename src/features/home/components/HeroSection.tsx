import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";
import {
  FlowerShape,
  StickerBadge,
  Sparkle,
  MagneticButton,
  MarqueeTicker,
} from "@/components/shared/RetroElements";

/* ── Easing ── */
const ease = [0.16, 1, 0.3, 1] as const;

/* ── Variants ── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
});

const charReveal = (delay = 0) => ({
  hidden: { opacity: 0, y: 80, rotateX: 40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease, delay },
  },
});

const stickerDrop = (delay = 0, rotate = 0) => ({
  hidden: { opacity: 0, scale: 0, rotate: rotate - 30, y: -60 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 340,
      damping: 12,
      delay,
    },
  },
});

const wipeRight = (delay = 0) => ({
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease, delay },
  },
});

const posterEnter = (delay = 0) => ({
  hidden: { opacity: 0, y: 80, rotate: -12, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: -4,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 16,
      delay,
    },
  },
});

/* ═══════════════════════════════════════════════
   HERO — Retro-Groovy Poster World v3
   ═══════════════════════════════════════════════ */
export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  /* Cursor-reactive accent */
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 80, damping: 25 });
  const smoothY = useSpring(cursorY, { stiffness: 80, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    cursorX.set((e.clientX - r.left - r.width / 2) * 0.02);
    cursorY.set((e.clientY - r.top - r.height / 2) * 0.02);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* ── Background ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-naso-cream" />
        <div className="absolute inset-0 naso-dotgrid opacity-50" />
        {/* Color washes */}
        <div className="absolute -right-[15%] -top-[10%] h-[55vh] w-[40vw] rounded-[50%] bg-secondary/25 blur-[100px]" />
        <div className="absolute -left-[10%] bottom-[0%] h-[40vh] w-[35vw] rounded-[50%] bg-naso-lilac/20 blur-[80px]" />
        <div className="absolute left-[30%] top-[20%] h-[25vh] w-[20vw] rounded-[50%] bg-primary/8 blur-[60px]" />
      </motion.div>

      {/* ── Main content ── */}
      <div className="container relative z-10 flex min-h-[100svh] flex-col justify-center px-5 pb-24 pt-28 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* ── Top bar: logo + location ── */}
          <motion.div
            variants={fadeUp(0)}
            className="mb-10 flex items-center gap-4 lg:mb-14"
          >
            <img src={nasoLogo} alt="NASO" className="h-8 w-auto" />
            <span className="h-[2px] w-10 bg-foreground/15" />
            <span className="font-groovy text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Cairo, Egypt
            </span>
          </motion.div>

          {/* ══ HEADLINE BLOCK ══ */}
          <div className="relative">
            {/* Main headline — oversized groovy */}
            <div className="overflow-hidden">
              <motion.h1
                variants={charReveal(0.1)}
                className="font-groovy text-[clamp(3rem,10vw,8rem)] font-black leading-[0.88] tracking-[-0.04em] text-foreground"
                style={{ perspective: 800 }}
              >
                <span className="block">Make it</span>
              </motion.h1>
            </div>

            <div className="mt-1 overflow-hidden lg:mt-2">
              <motion.div
                variants={charReveal(0.25)}
                className="relative inline-block"
                style={{ perspective: 800 }}
              >
                <h1 className="font-groovy text-[clamp(3rem,10vw,8rem)] font-black leading-[0.88] tracking-[-0.04em] text-foreground">
                  <span className="relative inline-block">
                    {/* Green highlight wipe behind "memorable" */}
                    <motion.span
                      variants={wipeRight(0.65)}
                      className="absolute -inset-x-[0.1em] inset-y-[0.02em] origin-left -skew-x-3 rounded-xl bg-secondary"
                      aria-hidden
                    />
                    <span className="relative z-10">memorable</span>
                  </span>
                  <span className="text-primary">.</span>
                </h1>

                {/* Offset shadow text — layered retro feel */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.06 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="pointer-events-none absolute left-[6px] top-[6px] font-groovy text-[clamp(3rem,10vw,8rem)] font-black leading-[0.88] tracking-[-0.04em] text-foreground"
                  aria-hidden
                >
                  memorable.
                </motion.span>
              </motion.div>
            </div>

            {/* ── "Made in Cairo" sticker — attached to headline ── */}
            <motion.div
              variants={stickerDrop(0.5, -12)}
              whileHover={{ scale: 1.15, rotate: -4 }}
              className="absolute -right-2 -top-4 z-20 sm:right-[10%] lg:-top-8 lg:right-[15%]"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full border-[2.5px] border-foreground bg-primary font-groovy text-[7px] font-black uppercase leading-tight tracking-[0.12em] text-primary-foreground shadow-retro sm:h-[82px] sm:w-[82px] sm:text-[8px] lg:h-[95px] lg:w-[95px] lg:text-[9px]"
              >
                <span>Made</span>
                <span>in</span>
                <span>Cairo</span>
              </motion.div>
            </motion.div>

            {/* ── Flower — near headline, cursor-reactive ── */}
            <motion.div
              variants={stickerDrop(0.7, 20)}
              style={{ x: smoothX, y: smoothY }}
              className="absolute -left-6 bottom-0 z-20 sm:-left-10 lg:-left-14"
            >
              <FlowerShape
                size={52}
                className="text-naso-purple naso-flower-spin"
              />
            </motion.div>
          </div>

          {/* ══ SUBTEXT + CTAs ══ */}
          <div className="mt-8 grid items-end gap-10 lg:mt-12 lg:grid-cols-[1fr_auto] lg:gap-20">
            {/* Left: copy + buttons */}
            <div>
              <motion.p
                variants={fadeUp(0.4)}
                className="max-w-[28rem] text-[15px] leading-[1.85] text-muted-foreground lg:text-base"
              >
                Curated outings, creative workshops &amp; original products
                — for people who collect{" "}
                <span className="font-semibold text-foreground">moments</span>,
                not things.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={fadeUp(0.55)}
                className="mt-7 flex flex-wrap items-center gap-3.5"
              >
                <MagneticButton
                  to={ROUTES.EXPERIENCES}
                  className="group inline-flex h-[56px] items-center gap-2.5 rounded-full border-[3px] border-foreground bg-foreground px-9 font-groovy text-[11px] font-bold uppercase tracking-[0.1em] text-background shadow-retro transition-all duration-200 hover:shadow-retro-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  Explore experiences
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton
                  to={ROUTES.SHOP}
                  className="inline-flex h-[56px] items-center rounded-full border-[3px] border-foreground bg-card px-9 font-groovy text-[11px] font-bold uppercase tracking-[0.1em] text-foreground shadow-retro transition-all duration-200 hover:bg-secondary hover:shadow-retro-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  Visit shop
                </MagneticButton>
              </motion.div>

              {/* Supporting micro-detail */}
              <motion.div
                variants={fadeUp(0.68)}
                className="mt-5 flex items-center gap-2 text-muted-foreground/40"
              >
                <Sparkle className="h-3 w-3 text-naso-purple" />
                <span className="font-groovy text-[8px] font-bold uppercase tracking-[0.22em]">
                  Experiences · Workshops · Products
                </span>
              </motion.div>
            </div>

            {/* Right: Poster artifact */}
            <motion.div
              variants={posterEnter(0.4)}
              whileHover={{ rotate: -1, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative hidden w-[280px] lg:block xl:w-[320px]"
            >
              {/* Poster card */}
              <div className="overflow-hidden rounded-2xl border-[3px] border-foreground bg-card shadow-retro-lg">
                {/* Checker header */}
                <div className="h-8 w-full naso-checkerboard border-b-[2px] border-foreground" />

                <div className="flex flex-col items-center px-6 py-8">
                  {/* NASO wordmark */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 18,
                      delay: 0.8,
                    }}
                    className="font-groovy text-[4.5rem] font-black leading-none tracking-[-0.05em] text-foreground xl:text-[5.5rem]"
                  >
                    NASO
                  </motion.span>

                  {/* Tagline */}
                  <div className="mt-3 flex items-center gap-2.5">
                    <span className="h-[1.5px] w-6 bg-foreground/15" />
                    <span className="font-groovy text-[7px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                      Creative moments
                    </span>
                    <span className="h-[1.5px] w-6 bg-foreground/15" />
                  </div>

                  {/* Brand palette strip */}
                  <div className="mt-5 flex gap-1.5">
                    {[
                      "bg-primary",
                      "bg-secondary",
                      "bg-accent",
                      "bg-naso-lilac",
                      "bg-naso-pink",
                    ].map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{
                          delay: 1.0 + i * 0.07,
                          duration: 0.4,
                          ease,
                        }}
                        className={`h-3.5 w-7 origin-bottom rounded-sm border border-foreground/10 ${c}`}
                      />
                    ))}
                  </div>

                  <span className="mt-5 font-groovy text-[7px] font-bold uppercase tracking-[0.4em] text-muted-foreground/25">
                    Est. 2024
                  </span>
                </div>
              </div>

              {/* Sparkle accent — bottom right of poster */}
              <motion.div
                variants={stickerDrop(1.0, 10)}
                className="absolute -bottom-4 -right-4 z-10"
              >
                <Sparkle className="h-8 w-8 text-primary" />
              </motion.div>

              {/* Lilac dot — top left of poster */}
              <motion.div
                variants={stickerDrop(0.9, 0)}
                className="absolute -left-3 -top-3 z-10 h-5 w-5 rounded-full border-[2px] border-foreground bg-naso-lilac shadow-retro"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom marquee ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t-[2.5px] border-foreground bg-foreground py-3">
        <MarqueeTicker speed={22}>
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
            <span
              key={word}
              className="mx-7 font-groovy text-[11px] font-bold uppercase tracking-[0.18em] text-background"
            >
              {word}
              <Sparkle className="ml-7 inline-block h-2.5 w-2.5 text-secondary" />
            </span>
          ))}
        </MarqueeTicker>
      </div>
    </section>
  );
}
