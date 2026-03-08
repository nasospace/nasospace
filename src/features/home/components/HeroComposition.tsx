import { motion } from "framer-motion";
import nasoLogo from "@/assets/naso-logo.png";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Right-side visual composition — editorial poster/collage inspired.
 * Layered brand elements with intentional overlap and retro details.
 */
export function HeroComposition() {
  return (
    <div className="relative h-[480px] w-full max-w-[480px] lg:h-[560px]">
      {/* ── Layer 0: Vertical typographic strip ── */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="absolute left-0 top-6 z-0 flex h-[420px] w-[52px] origin-top flex-col items-center justify-end rounded-lg bg-foreground/[0.04] pb-6 lg:h-[480px]"
      >
        <span className="font-display text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/50 [writing-mode:vertical-lr] rotate-180">
          Creative Studio — Cairo
        </span>
      </motion.div>

      {/* ── Layer 1: Main poster panel — dark brand card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="absolute left-[52px] top-0 z-10 h-[340px] w-[240px] overflow-hidden rounded-sm bg-foreground sm:w-[260px] lg:h-[380px] lg:w-[280px]"
      >
        {/* Diagonal green stripe — signature detail */}
        <div className="absolute -right-8 top-10 h-[180px] w-[60px] rotate-12 bg-secondary/20" />

        {/* Logo treatment — elegant, centered */}
        <div className="relative flex h-full flex-col items-center justify-center px-8">
          <div className="relative">
            <img
              src={nasoLogo}
              alt="NASO"
              className="relative z-10 h-10 w-auto brightness-0 invert lg:h-12"
            />
          </div>

          {/* Thin rule + tagline */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-6 bg-secondary" />
            <span className="font-display text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
              Est. 2024
            </span>
            <div className="h-px w-6 bg-secondary" />
          </div>
        </div>

        {/* Bottom color bar — green/blue split */}
        <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
          <div className="flex-1 bg-secondary" />
          <div className="flex-1 bg-primary" />
        </div>
      </motion.div>

      {/* ── Layer 2: Overlapping "experience" ticket card ── */}
      <motion.div
        initial={{ opacity: 0, y: 32, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 1.5 }}
        transition={{ duration: 0.8, ease, delay: 0.4 }}
        className="absolute right-2 top-[60px] z-20 w-[170px] rounded-sm border border-foreground/8 bg-card p-5 shadow-card sm:right-6 sm:w-[190px] lg:right-4 lg:w-[200px]"
      >
        {/* Ticket top — perforated line simulation */}
        <div className="mb-4 border-b border-dashed border-foreground/10 pb-4">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
            Next Experience
          </p>
        </div>
        <p className="font-display text-sm font-semibold leading-tight text-foreground">
          Old Cairo
          <br />
          Night Walk
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          A curated evening through historic streets
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-[10px] font-semibold text-muted-foreground">
            Mar 2026
          </span>
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        </div>
      </motion.div>

      {/* ── Layer 3: Sticker badge — signature round element ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -5 }}
        transition={{ duration: 0.7, ease, delay: 0.65 }}
        className="absolute left-[200px] top-[330px] z-30 sm:left-[220px] lg:left-[240px] lg:top-[370px]"
      >
        <div className="flex h-[68px] w-[68px] flex-col items-center justify-center rounded-full border-[1.5px] border-foreground bg-secondary font-display text-[8px] font-bold uppercase leading-tight tracking-[0.12em] text-foreground lg:h-[76px] lg:w-[76px] lg:text-[9px]">
          <span>Made</span>
          <span>in</span>
          <span>Cairo</span>
        </div>
      </motion.div>

      {/* ── Layer 4: Stamp / retro corner detail ── */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.55 }}
        className="absolute bottom-[60px] right-0 z-10 sm:right-4 lg:right-2"
      >
        <div className="rounded-sm border border-foreground/10 bg-card px-4 py-3 shadow-soft">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15">
              <div className="h-2 w-2 rounded-full bg-accent" />
            </div>
            <div>
              <p className="font-display text-[10px] font-semibold text-foreground">Workshops</p>
              <p className="text-[9px] text-muted-foreground">Coming soon</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Layer 5: Thin editorial rules ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease, delay: 0.3 }}
        className="absolute left-[52px] top-[350px] z-0 h-px w-[65%] origin-left bg-foreground/8 lg:top-[390px]"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.45 }}
        className="absolute right-[120px] top-0 z-0 h-[50px] w-px origin-top bg-foreground/8 sm:right-[140px]"
      />

      {/* ── Layer 6: Lilac accent — small controlled shape ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.5, ease, delay: 0.8 }}
        className="absolute bottom-[30px] left-[80px] z-0 h-5 w-5 rounded-full bg-naso-lilac lg:h-6 lg:w-6"
      />
    </div>
  );
}
