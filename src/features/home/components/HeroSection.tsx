import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";

const ease = [0.16, 1, 0.3, 1] as const;
const bouncy = { type: "spring", stiffness: 380, damping: 22 } as const;

/* 5-point retro star */
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
      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease }}
          className="absolute -right-16 top-0 h-[65%] w-[40%] origin-top-right -skew-x-6 bg-secondary/12"
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="absolute bottom-0 left-0 h-[30%] w-[25%] bg-primary/8"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="absolute right-[12%] top-[50%] h-[240px] w-[240px] rounded-full bg-naso-lilac blur-[80px]"
        />
        <div className="absolute inset-0 naso-grid-bg opacity-[0.05]" />
      </div>

      <div className="container relative flex min-h-[calc(100svh-72px)] flex-col justify-center py-12 lg:py-0">
        {/* ── Center content ── */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Location pill */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-5 py-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
              </span>
              Cairo, Egypt
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="relative mt-8 lg:mt-10"
          >
            <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-white">
              <span className="block">Make it</span>
              <span className="relative mt-1 inline-block lg:mt-2">
                <span className="bg-gradient-to-r from-secondary to-secondary bg-clip-text text-transparent">
                  memorable
                </span>
                {/* Hand-drawn underline — wavy, organic */}
                <motion.svg
                  viewBox="0 0 320 14"
                  fill="none"
                  className="absolute -bottom-1 left-0 w-full lg:-bottom-2"
                  aria-hidden
                >
                  <motion.path
                    d="M3 9C30 4 65 6 100 5C140 4 175 8 215 6C250 4 285 7 317 5"
                    stroke="hsl(var(--naso-green))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease, delay: 0.95 }}
                  />
                  <motion.path
                    d="M8 11.5C45 8 90 10 140 8.5C185 7 240 10 310 8"
                    stroke="hsl(var(--naso-green))"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeOpacity="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease, delay: 1.15 }}
                  />
                </motion.svg>
                <span className="text-primary">.</span>
              </span>
            </h1>

            {/* Star accent — top-right of headline */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ ...bouncy, delay: 0.75 }}
              className="absolute -right-5 -top-3 lg:-right-14 lg:-top-6"
            >
              <RetroStar className="h-7 w-7 text-secondary lg:h-10 lg:w-10" />
            </motion.div>

            {/* Sparkle accent — left of headline */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ ...bouncy, delay: 0.95 }}
              className="absolute -left-3 top-1 lg:-left-10 lg:top-3"
            >
              <Sparkle4 className="h-4 w-4 text-primary lg:h-6 lg:w-6" />
            </motion.div>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="mt-7 max-w-[26rem] text-[14px] leading-[1.75] text-white/45 lg:text-[15px]"
          >
            Curated outings, hands-on workshops & original products.
            <br className="hidden sm:block" />
            Your next favorite memory starts here.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-secondary px-7 font-display text-sm font-bold tracking-wide text-foreground shadow-[0_6px_24px_-4px_hsl(var(--naso-green)/0.35)] transition-all duration-200 hover:bg-secondary/90 hover:shadow-[0_8px_32px_-4px_hsl(var(--naso-green)/0.45)] active:scale-[0.97]"
            >
              <Link to={ROUTES.EXPERIENCES}>
                Explore experiences
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full border-2 border-white/15 bg-transparent px-7 font-display text-sm font-bold tracking-wide text-white/80 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06] hover:text-white active:scale-[0.97]"
            >
              <Link to={ROUTES.SHOP}>Visit shop</Link>
            </Button>
          </motion.div>
        </div>

        {/* ════════ Floating sticker elements ════════ */}

        {/* "Made in Cairo" — dashed circle sticker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: -7 }}
          transition={{ ...bouncy, delay: 0.6 }}
          whileHover={{ rotate: 0, scale: 1.06 }}
          className="absolute left-[4%] top-[62%] z-20 cursor-default lg:left-[7%] lg:top-[55%]"
        >
          <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full border-[2px] border-dashed border-secondary/70 bg-secondary/10 font-display text-[8px] font-bold uppercase leading-tight tracking-[0.12em] text-secondary/90 backdrop-blur-sm lg:h-[92px] lg:w-[92px] lg:text-[10px]">
            <span>Made</span>
            <span>in</span>
            <span>Cairo</span>
          </div>
        </motion.div>

        {/* Logo badge — glassmorphism with brand stripe */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 2.5 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          whileHover={{ rotate: 0, y: -3 }}
          className="absolute right-[5%] top-[18%] z-20 lg:right-[9%] lg:top-[20%]"
        >
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-lg">
            <div className="px-5 py-4">
              <img
                src={nasoLogo}
                alt="NASO"
                className="h-5 w-auto brightness-0 invert lg:h-7"
              />
              <p className="mt-1.5 font-display text-[8px] font-semibold uppercase tracking-[0.2em] text-white/25">
                Creative Studio
              </p>
            </div>
            {/* Tri-color bottom edge */}
            <div className="flex h-1">
              <div className="flex-1 bg-secondary" />
              <div className="flex-1 bg-primary" />
              <div className="flex-1 bg-accent" />
            </div>
          </div>
        </motion.div>

        {/* Event teaser — ticket-style card */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 1.5 }}
          transition={{ duration: 0.8, ease, delay: 0.65 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          className="absolute bottom-[13%] right-[3%] z-20 hidden sm:block lg:bottom-[16%] lg:right-[5%]"
        >
          <div className="w-[170px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] backdrop-blur-lg lg:w-[195px]">
            {/* Ticket header with perforated line */}
            <div className="border-b border-dashed border-white/10 px-4 py-2.5">
              <div className="flex items-center justify-between">
                <span className="font-display text-[9px] font-bold uppercase tracking-[0.18em] text-secondary">
                  Next up
                </span>
                <RetroStar className="h-2.5 w-2.5 text-secondary/60" />
              </div>
            </div>
            {/* Ticket body */}
            <div className="px-4 py-3.5">
              <p className="font-display text-[13px] font-bold leading-[1.2] text-white lg:text-sm">
                Old Cairo
                <br />
                Night Walk
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-medium text-white/35">
                  Mar 2026
                </span>
                <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 font-display text-[8px] font-bold uppercase tracking-wider text-secondary">
                  Limited
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Workshops pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: 7 }}
          animate={{ opacity: 1, scale: 1, rotate: 4 }}
          transition={{ ...bouncy, delay: 0.75 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="absolute left-[3%] top-[26%] z-20 hidden md:block lg:left-[4%] lg:top-[28%]"
        >
          <div className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-accent/80 backdrop-blur-sm lg:text-[11px]">
            ✦ Workshops
          </div>
        </motion.div>

        {/* Shop tag */}
        <motion.div
          initial={{ opacity: 0, y: -16, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ ...bouncy, delay: 0.85 }}
          whileHover={{ rotate: 0, y: -2 }}
          className="absolute bottom-[22%] left-[10%] z-20 hidden md:block lg:left-[14%]"
        >
          <div className="rounded-md border border-primary/25 bg-primary/10 px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-primary/70 backdrop-blur-sm lg:text-[11px]">
            Shop →
          </div>
        </motion.div>

        {/* ── Scattered decorative sparkles (subtle) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ ...bouncy, delay: 1 }}
          className="absolute right-[28%] top-[16%] z-0"
        >
          <Sparkle4 className="h-3.5 w-3.5 text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ ...bouncy, delay: 1.1 }}
          className="absolute bottom-[20%] left-[32%] z-0"
        >
          <RetroStar className="h-3 w-3 text-secondary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ ...bouncy, delay: 1.15 }}
          className="absolute bottom-[32%] right-[20%] z-0"
        >
          <Sparkle4 className="h-2.5 w-2.5 text-accent" />
        </motion.div>

        {/* ── Bottom marquee ticker ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.9 }}
          className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden border-t border-white/[0.06] bg-white/[0.02] py-2.5"
        >
          <div className="naso-marquee">
            <div className="naso-marquee-inner flex w-max items-center gap-10 whitespace-nowrap">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-10">
                  {[
                    "Experiences",
                    "Workshops",
                    "Original Products",
                    "Cairo Nights",
                    "Creative Moments",
                  ].map((text, j) => (
                    <span key={`${i}-${j}`} className="flex items-center gap-10">
                      <span className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-white/20">
                        {text}
                      </span>
                      <span className="text-white/10">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
