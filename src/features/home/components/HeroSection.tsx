import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";

const ease = [0.16, 1, 0.3, 1] as const;
const bouncy = { type: "spring", stiffness: 400, damping: 25 } as const;

/* Reusable retro star */
function RetroStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0l3.09 8.26L24 9.27l-6.91 5.52L19.09 24 12 18.9 4.91 24l1.91-9.21L0 9.27l8.91-1.01z" />
    </svg>
  );
}

/* 4-point sparkle */
function Sparkle4({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16 0C16 0 18 12 16 16C14 12 16 0 16 0ZM16 32C16 32 14 20 16 16C18 20 16 32 16 32ZM0 16C0 16 12 14 16 16C12 18 0 16 0 16ZM32 16C32 16 20 18 16 16C20 14 32 16 32 16Z" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-foreground pt-[72px]">
      {/* Background color blocks */}
      <div className="pointer-events-none absolute inset-0">
        {/* Large green diagonal block */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease }}
          className="absolute -right-20 top-0 h-[70%] w-[45%] origin-top-right -skew-x-6 bg-secondary/15"
        />
        {/* Blue accent block bottom-left */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="absolute bottom-0 left-0 h-[35%] w-[30%] bg-primary/10"
        />
        {/* Lilac blob — organic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.2, ease }}
          className="absolute right-[15%] top-[55%] h-[280px] w-[280px] rounded-full bg-naso-lilac blur-3xl"
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 naso-grid-bg opacity-[0.06]" />
      </div>

      <div className="container relative flex min-h-[calc(100svh-72px)] flex-col justify-center py-12 lg:py-0">
        {/* ── Main content — poster-style stacked layout ── */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Location pill — playful */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              Cairo, Egypt
            </span>
          </motion.div>

          {/* ── BIG headline — expressive, mixed colors ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="relative mt-8 lg:mt-10"
          >
            <h1 className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
              Make it
              <br />
              <span className="relative inline-block text-secondary">
                memorable
                {/* Scribble underline */}
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease, delay: 0.9 }}
                  viewBox="0 0 286 12"
                  fill="none"
                  className="absolute -bottom-2 left-0 w-full lg:-bottom-3"
                >
                  <motion.path
                    d="M2 8.5C47.3 3.5 93.7 1.5 143 3.5C192.3 5.5 239.3 7.5 284 5.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease, delay: 0.9 }}
                  />
                </motion.svg>
              </span>
              <span className="text-primary">.</span>
            </h1>

            {/* Floating retro star near headline */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ ...bouncy, delay: 0.7 }}
              className="absolute -right-6 -top-4 lg:-right-12 lg:-top-8"
            >
              <RetroStar className="h-8 w-8 text-secondary lg:h-12 lg:w-12" />
            </motion.div>

            {/* Small sparkle */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...bouncy, delay: 0.9 }}
              className="absolute -left-4 top-2 lg:-left-10 lg:top-4"
            >
              <Sparkle4 className="h-5 w-5 text-primary lg:h-7 lg:w-7" />
            </motion.div>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-white/50 lg:text-base"
          >
            Curated outings, hands-on workshops & original products.
            <br className="hidden sm:block" />
            Your next favorite memory starts here.
          </motion.p>

          {/* CTAs — bold, colorful */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="group rounded-full bg-secondary text-foreground font-display font-bold text-base hover:bg-secondary/90 active:scale-[0.97] shadow-[0_8px_30px_-6px_hsl(var(--naso-green)/0.4)]">
              <Link to={ROUTES.EXPERIENCES}>
                Explore experiences
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" className="rounded-full border-2 border-white/20 bg-transparent text-white font-display font-bold text-base hover:bg-white/10 hover:border-white/40 active:scale-[0.97]">
              <Link to={ROUTES.SHOP}>
                Visit shop
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* ── Floating sticker / collage elements ── */}

        {/* Sticker 1: "Made in Cairo" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ ...bouncy, delay: 0.6 }}
          whileHover={{ rotate: 0, scale: 1.08 }}
          className="absolute left-[5%] top-[65%] z-20 cursor-default lg:left-[8%] lg:top-[58%]"
        >
          <div className="flex h-[80px] w-[80px] flex-col items-center justify-center rounded-full border-[2.5px] border-dashed border-secondary bg-secondary/20 font-display text-[9px] font-bold uppercase leading-tight tracking-[0.1em] text-secondary backdrop-blur-sm lg:h-[100px] lg:w-[100px] lg:text-[11px]">
            <span>Made</span>
            <span>in</span>
            <span>Cairo</span>
          </div>
        </motion.div>

        {/* Sticker 2: Logo badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 3 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          whileHover={{ rotate: 0, y: -4 }}
          className="absolute right-[6%] top-[20%] z-20 lg:right-[10%] lg:top-[22%]"
        >
          <div className="rounded-xl border-2 border-white/15 bg-white/[0.07] px-5 py-4 backdrop-blur-md">
            <img
              src={nasoLogo}
              alt="NASO"
              className="h-6 w-auto brightness-0 invert lg:h-8"
            />
            <div className="mt-2 h-[2px] w-full bg-gradient-to-r from-secondary via-primary to-accent" />
          </div>
        </motion.div>

        {/* Sticker 3: Event teaser card — poster style */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ duration: 0.8, ease, delay: 0.65 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="absolute bottom-[12%] right-[4%] z-20 hidden sm:block lg:right-[6%] lg:bottom-[15%]"
        >
          <div className="w-[180px] overflow-hidden rounded-xl border-2 border-white/10 bg-white/[0.06] backdrop-blur-md lg:w-[210px]">
            {/* Top color bar */}
            <div className="flex h-2">
              <div className="flex-1 bg-secondary" />
              <div className="flex-1 bg-primary" />
              <div className="flex-1 bg-accent" />
            </div>
            <div className="p-4">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-secondary">
                Next up
              </p>
              <p className="mt-1.5 font-display text-sm font-bold leading-tight text-white">
                Old Cairo
                <br />
                Night Walk
              </p>
              <p className="mt-1.5 text-[11px] text-white/40">Mar 2026 · Limited spots</p>
              <div className="mt-3 flex items-center gap-1.5">
                <RetroStar className="h-3 w-3 text-secondary" />
                <RetroStar className="h-3 w-3 text-primary" />
                <RetroStar className="h-3 w-3 text-accent" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sticker 4: Workshops pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: 8 }}
          animate={{ opacity: 1, scale: 1, rotate: 5 }}
          transition={{ ...bouncy, delay: 0.75 }}
          whileHover={{ rotate: 0, scale: 1.06 }}
          className="absolute left-[3%] top-[28%] z-20 hidden md:block lg:left-[5%] lg:top-[30%]"
        >
          <div className="rounded-full border-2 border-accent/40 bg-accent/15 px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-accent backdrop-blur-sm lg:text-xs">
            ✦ Workshops
          </div>
        </motion.div>

        {/* Sticker 5: Shop tag */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ ...bouncy, delay: 0.85 }}
          whileHover={{ rotate: 0, y: -2 }}
          className="absolute bottom-[20%] left-[12%] z-20 hidden md:block lg:left-[15%] lg:bottom-[22%]"
        >
          <div className="rounded-lg border-2 border-primary/30 bg-primary/15 px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-primary backdrop-blur-sm lg:text-xs">
            Shop →
          </div>
        </motion.div>

        {/* Decorative stars scattered */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ ...bouncy, delay: 1 }}
          className="absolute right-[30%] top-[18%] z-0"
        >
          <Sparkle4 className="h-4 w-4 text-white lg:h-5 lg:w-5" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ ...bouncy, delay: 1.1 }}
          className="absolute left-[35%] bottom-[18%] z-0"
        >
          <RetroStar className="h-4 w-4 text-secondary lg:h-5 lg:w-5" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ ...bouncy, delay: 1.2 }}
          className="absolute right-[22%] bottom-[30%] z-0"
        >
          <Sparkle4 className="h-3 w-3 text-accent" />
        </motion.div>

        {/* Bottom marquee — ticker strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden border-t border-white/10 bg-white/[0.03] py-3 backdrop-blur-sm"
        >
          <div className="naso-marquee">
            <div className="naso-marquee-inner flex w-max items-center gap-8 whitespace-nowrap">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-8">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                    Experiences
                  </span>
                  <RetroStar className="h-3 w-3 text-secondary/50" />
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                    Workshops
                  </span>
                  <RetroStar className="h-3 w-3 text-primary/50" />
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                    Original Products
                  </span>
                  <RetroStar className="h-3 w-3 text-accent/50" />
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                    Cairo Nights
                  </span>
                  <RetroStar className="h-3 w-3 text-secondary/50" />
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                    Creative Moments
                  </span>
                  <RetroStar className="h-3 w-3 text-naso-lilac/50" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
