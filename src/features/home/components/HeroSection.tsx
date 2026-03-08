import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";

const ease = [0.16, 1, 0.3, 1] as const;
const pop = { type: "spring", stiffness: 500, damping: 20 } as const;

/* ── Decorative SVG shapes ── */
function StarBurst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      <polygon points="50,0 61,35 100,35 68,57 79,91 50,70 21,91 32,57 0,35 39,35" />
    </svg>
  );
}

function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
      <path d="M2 10 C 20 2, 30 18, 45 10 C 60 2, 70 18, 85 10 C 100 2, 110 18, 118 10" />
    </svg>
  );
}

function ZigZag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="2,14 12,2 22,14 32,2 42,14 52,2 62,14 72,2 78,10" />
    </svg>
  );
}

function CrossMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className}>
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-foreground">
      {/* ── Background: bold color blocks ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Big green wedge — right side */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.9, ease }}
          className="absolute right-0 top-0 h-full w-[55%] bg-secondary/[0.08] [clip-path:polygon(25%_0,100%_0,100%_100%,0%_100%)]"
        />
        {/* Blue corner — bottom left */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="absolute bottom-0 left-0 h-[45%] w-[35%] bg-primary/[0.06] [clip-path:polygon(0_20%,100%_0,100%_100%,0_100%)]"
        />
        {/* Lilac glow */}
        <div className="absolute left-[60%] top-[30%] h-[300px] w-[300px] rounded-full bg-naso-lilac/[0.06] blur-[100px]" />
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--naso-white)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container relative flex min-h-[100svh] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:py-0">
        {/* ═══════ COLLAGE LAYOUT ═══════ */}
        <div className="relative w-full max-w-5xl">

          {/* ── CENTER: Headline block ── */}
          <div className="relative z-20 flex flex-col items-center py-8 text-center lg:py-12">
            {/* Top badge row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                </span>
                Live from Cairo
              </span>
              <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-display text-[9px] font-bold uppercase tracking-[0.15em] text-primary sm:inline-flex">
                Est. 2024
              </span>
            </motion.div>

            {/* Main headline — BIG, expressive, multi-line */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.25 }}
              className="font-display text-[clamp(3.2rem,11vw,9rem)] font-bold leading-[0.88] tracking-[-0.05em]"
            >
              <span className="block text-white">Make</span>
              <span className="block text-white">it{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-foreground bg-secondary px-3 py-0 -skew-x-2 inline-block lg:px-5">
                    fun
                  </span>
                </span>
              </span>
              <span className="block italic text-naso-lilac/80 font-bold">
                & memorable
                <span className="not-italic text-primary">.</span>
              </span>
            </motion.h1>

            {/* Squiggle under headline */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.85 }}
              className="mt-3 origin-center"
            >
              <Squiggle className="h-4 w-32 text-secondary/60 lg:w-44" />
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
              className="mt-6 max-w-sm text-[14px] leading-[1.8] text-white/40 lg:max-w-md lg:text-base"
            >
              Curated outings, creative workshops & original products —
              for people who collect moments, not things.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to={ROUTES.EXPERIENCES}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-secondary px-7 font-display text-sm font-bold tracking-wide text-foreground shadow-[0_6px_28px_-4px_hsl(var(--naso-green)/0.4)] transition-all duration-200 hover:shadow-[0_10px_36px_-4px_hsl(var(--naso-green)/0.5)] hover:brightness-110 active:scale-[0.96]"
              >
                Explore experiences
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to={ROUTES.SHOP}
                className="inline-flex h-12 items-center rounded-full border-2 border-white/15 px-7 font-display text-sm font-bold tracking-wide text-white/70 transition-all duration-200 hover:border-white/30 hover:text-white active:scale-[0.96]"
              >
                Visit shop
              </Link>
            </motion.div>
          </div>

          {/* ═══════ FLOATING COLLAGE PIECES ═══════ */}

          {/* ── Piece 1: NASO logo stamp — top-left ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ ...pop, delay: 0.4 }}
            whileHover={{ rotate: -4, scale: 1.08 }}
            className="absolute -left-2 top-[8%] z-30 cursor-default sm:left-[2%] lg:left-[3%] lg:top-[10%]"
          >
            <div className="relative rounded-2xl border-[3px] border-white/20 bg-foreground p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] lg:p-5">
              <img src={nasoLogo} alt="NASO" className="h-6 w-auto brightness-0 invert lg:h-8" />
              <div className="mt-2 flex gap-1">
                <div className="h-1.5 w-4 rounded-full bg-secondary" />
                <div className="h-1.5 w-4 rounded-full bg-primary" />
                <div className="h-1.5 w-4 rounded-full bg-accent" />
              </div>
              {/* Corner fold effect */}
              <div className="absolute -right-1 -top-1 h-4 w-4 rounded-bl-md bg-secondary" />
            </div>
          </motion.div>

          {/* ── Piece 2: "Made in Cairo" circle sticker ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 8 }}
            transition={{ ...pop, delay: 0.55 }}
            whileHover={{ rotate: 0, scale: 1.1 }}
            className="absolute -right-1 top-[5%] z-30 cursor-default sm:right-[3%] lg:right-[5%] lg:top-[8%]"
          >
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-[3px] border-foreground bg-secondary font-display text-[9px] font-black uppercase leading-tight tracking-[0.08em] text-foreground shadow-[4px_4px_0_hsl(var(--foreground))] lg:h-24 lg:w-24 lg:text-[11px]">
              <span>Made</span>
              <span>in</span>
              <span>Cairo ☀</span>
            </div>
          </motion.div>

          {/* ── Piece 3: Event ticket — bottom-right ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            whileHover={{ rotate: 0, y: -4 }}
            className="absolute -right-2 bottom-[8%] z-30 hidden sm:block sm:right-[1%] lg:bottom-[10%] lg:right-[2%]"
          >
            <div className="w-[185px] rounded-xl border-[3px] border-white/15 bg-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-lg lg:w-[210px]">
              {/* Ticket stub top */}
              <div className="rounded-t-[9px] bg-primary px-4 py-2">
                <p className="font-display text-[9px] font-black uppercase tracking-[0.2em] text-white">
                  ★ Next Experience
                </p>
              </div>
              {/* Perforated edge */}
              <div className="border-b-2 border-dashed border-white/10" />
              <div className="p-4">
                <p className="font-display text-base font-bold leading-tight text-white lg:text-lg">
                  Old Cairo
                  <br />
                  Night Walk
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white/35">Mar 2026</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 font-display text-[8px] font-black uppercase tracking-wider text-foreground">
                    Go!
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Piece 4: Workshops tag — left side ── */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ ...pop, delay: 0.65 }}
            whileHover={{ rotate: 0, scale: 1.06 }}
            className="absolute bottom-[18%] left-0 z-30 hidden md:block lg:bottom-[22%] lg:left-[2%]"
          >
            <div className="rounded-xl border-[3px] border-accent/50 bg-accent/15 px-5 py-3 font-display text-xs font-black uppercase tracking-[0.1em] text-accent shadow-[3px_3px_0_hsl(var(--accent)/0.3)] backdrop-blur-sm lg:text-sm">
              ✦ Workshops
            </div>
          </motion.div>

          {/* ── Piece 5: Shop sticker — bottom-left area ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ ...pop, delay: 0.75 }}
            whileHover={{ rotate: 0, scale: 1.08 }}
            className="absolute bottom-[6%] left-[15%] z-30 hidden md:block lg:bottom-[8%] lg:left-[18%]"
          >
            <div className="rounded-full border-[3px] border-primary/40 bg-primary/15 px-5 py-2 font-display text-[11px] font-black uppercase tracking-[0.12em] text-primary shadow-[2px_2px_0_hsl(var(--primary)/0.2)] backdrop-blur-sm lg:text-xs">
              Shop NASO →
            </div>
          </motion.div>

          {/* ── Piece 6: Star burst — decorative ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ ...pop, delay: 0.85 }}
            className="absolute right-[18%] top-[3%] z-10 lg:right-[22%] lg:top-[5%]"
          >
            <StarBurst className="h-10 w-10 text-secondary/30 lg:h-14 lg:w-14" />
          </motion.div>

          {/* ── Piece 7: Cross marks — scattered ── */}
          <motion.div
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 0.2, rotate: 15 }}
            transition={{ ...pop, delay: 0.9 }}
            className="absolute left-[20%] top-[6%] z-10"
          >
            <CrossMark className="h-5 w-5 text-primary lg:h-6 lg:w-6" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 30 }}
            animate={{ opacity: 0.15, rotate: 45 }}
            transition={{ ...pop, delay: 1 }}
            className="absolute bottom-[28%] right-[25%] z-10"
          >
            <CrossMark className="h-4 w-4 text-naso-lilac" />
          </motion.div>

          {/* ── Piece 8: Zigzag accent ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.25, scaleX: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.95 }}
            className="absolute bottom-[35%] left-[5%] z-10 origin-left"
          >
            <ZigZag className="h-3 w-16 text-secondary lg:w-20" />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom marquee strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-40 overflow-hidden border-y-2 border-secondary/20 bg-secondary py-2.5"
      >
        <div className="naso-marquee">
          <div className="naso-marquee-inner flex w-max items-center gap-6 whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-6">
                {[
                  "Experiences",
                  "Workshops",
                  "Original Products",
                  "Cairo Nights",
                  "Creative Moments",
                  "Make Memories",
                ].map((text, j) => (
                  <span key={`${i}-${j}`} className="flex items-center gap-6">
                    <span className="font-display text-xs font-black uppercase tracking-[0.15em] text-foreground">
                      {text}
                    </span>
                    <span className="text-foreground/40">★</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
