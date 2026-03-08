import { motion } from "framer-motion";
import nasoLogo from "@/assets/naso-logo.png";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Right-side visual composition — editorial, poster-inspired collage.
 * Uses controlled brand shapes, logo treatment, and sticker badges.
 */
export function HeroComposition() {
  return (
    <div className="relative h-[480px] w-full lg:h-[540px]">
      {/* Main card / panel — dark, featured */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="absolute left-4 top-8 z-10 h-[320px] w-[260px] overflow-hidden rounded-2xl bg-foreground shadow-elevated sm:left-8 sm:w-[280px] lg:h-[360px] lg:w-[300px]"
      >
        {/* Interior — logo treatment centered */}
        <div className="flex h-full flex-col items-center justify-center p-8">
          <img
            src={nasoLogo}
            alt="NASO"
            className="h-12 w-auto brightness-0 invert lg:h-14"
          />
          <div className="mt-6 h-px w-12 bg-naso-green" />
          <p className="mt-4 text-center font-display text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Creative Studio
          </p>
          <p className="text-center font-display text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Cairo, Egypt
          </p>
        </div>
        {/* Green accent bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary" />
      </motion.div>

      {/* Secondary card — lighter, overlapping */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.4 }}
        className="absolute right-0 top-20 z-20 h-[200px] w-[180px] rounded-2xl border-2 border-foreground/10 bg-card p-6 shadow-card sm:right-4 sm:w-[200px] lg:right-8 lg:h-[220px] lg:w-[220px]"
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="h-3 w-3 rounded-full bg-primary" />
            <p className="mt-3 font-display text-sm font-semibold text-foreground">
              Experiences
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Curated outings across the city
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
        </div>
      </motion.div>

      {/* Sticker badge — "Est. 2024" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: -6 }}
        transition={{ duration: 0.6, ease, delay: 0.7 }}
        className="absolute left-[45%] top-0 z-30"
      >
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-foreground bg-secondary font-display text-[10px] font-bold uppercase tracking-widest text-foreground lg:h-20 lg:w-20 lg:text-xs">
          Est.
          <br />
          2024
        </div>
      </motion.div>

      {/* Accent shape — blue rectangle, editorial */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.5 }}
        className="absolute bottom-12 right-12 z-0 h-[140px] w-[100px] origin-bottom rounded-xl bg-primary/15 lg:right-20 lg:h-[160px] lg:w-[120px]"
      />

      {/* Small lilac circle accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 0.5, ease, delay: 0.9 }}
        className="absolute bottom-8 left-[55%] z-0 h-10 w-10 rounded-full bg-naso-lilac lg:h-12 lg:w-12"
      />

      {/* Thin decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.6 }}
        className="absolute bottom-[100px] left-0 z-0 h-px w-[60%] origin-left bg-foreground/10"
      />
    </div>
  );
}
