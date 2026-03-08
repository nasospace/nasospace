import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background">
      {/* Subtle dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative flex min-h-[100svh] flex-col items-center justify-center px-4 py-24 sm:px-6">
        {/* ── The single visual statement: Logo + headline as one composition ── */}
        <div className="relative flex w-full max-w-3xl flex-col items-center text-center">

          {/* Location tag */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Cairo, Egypt
          </motion.span>

          {/* Logo mark — central, proud */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            <img
              src={nasoLogo}
              alt="NASO"
              className="h-10 w-auto lg:h-12"
            />
          </motion.div>

          {/* ── Headline — the hero moment ── */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
            className="mt-8 font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.88] tracking-[-0.045em] text-foreground"
          >
            <span className="block">Make it</span>
            <span className="relative mt-1 block lg:mt-2">
              {/* Green highlight block behind "memorable" */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.9 }}
                className="absolute inset-0 origin-left -skew-x-2 rounded-md bg-secondary"
                aria-hidden
              />
              <span className="relative z-10 px-2 text-foreground lg:px-4">
                memorable
              </span>
              <span className="relative z-10 text-primary">.</span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.55 }}
            className="mt-7 max-w-md text-[15px] leading-[1.75] text-muted-foreground lg:text-base"
          >
            Curated outings, creative workshops & original products —
            for people who collect moments, not things.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.7 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              to={ROUTES.EXPERIENCES}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 font-display text-sm font-bold tracking-wide text-background shadow-elevated transition-all duration-200 hover:shadow-[0_14px_40px_-8px_hsl(var(--foreground)/0.3)] active:scale-[0.97]"
            >
              Explore experiences
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to={ROUTES.SHOP}
              className="inline-flex h-12 items-center rounded-full border-2 border-foreground/15 px-7 font-display text-sm font-bold tracking-wide text-foreground transition-all duration-200 hover:border-foreground/40 hover:bg-foreground/[0.03] active:scale-[0.97]"
            >
              Visit shop
            </Link>
          </motion.div>

          {/* ── Accent 1: Sticker badge — bottom-right of headline ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 22, delay: 1 }}
            className="absolute -right-4 bottom-[55%] z-30 sm:-right-8 lg:-right-16"
          >
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-[2.5px] border-foreground bg-secondary font-display text-[8px] font-black uppercase leading-tight tracking-[0.08em] text-foreground shadow-[3px_3px_0_hsl(var(--foreground))] lg:h-20 lg:w-20 lg:text-[10px]">
              <span>Made</span>
              <span>in</span>
              <span>Cairo</span>
            </div>
          </motion.div>

          {/* ── Accent 2: Small color dots — left of headline ── */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease, delay: 1.1 }}
            className="absolute -left-2 top-[45%] flex flex-col gap-2 sm:-left-6 lg:-left-12"
          >
            <div className="h-3 w-3 rounded-full bg-primary" />
            <div className="h-3 w-3 rounded-full bg-secondary" />
            <div className="h-3 w-3 rounded-full bg-accent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
