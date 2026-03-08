import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";

/* ── Motion ── */
const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease, delay } },
});

const wipe = (delay = 0) => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.55, ease, delay } },
});

const posterEnter = {
  hidden: { opacity: 0, y: 50, rotate: -6 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: -2.5,
    transition: { type: "spring" as const, stiffness: 200, damping: 22, delay: 0.5 },
  },
};

const badgePop = (delay = 0, rotate = 0) => ({
  hidden: { opacity: 0, scale: 0.2, rotate: rotate - 20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate,
    transition: { type: "spring" as const, stiffness: 400, damping: 16, delay },
  },
});

/* ── Magnetic CTA ── */
function MagneticCTA({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 20 });
  const sy = useSpring(y, { stiffness: 280, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.2);
    y.set((e.clientY - r.top - r.height / 2) * 0.2);
  };

  return (
    <motion.div style={{ x: sx, y: sy }} className="inline-block">
      <Link
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className={className}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}

/* ── Sparkle SVG ── */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16 0l2.35 13.65L32 16l-13.65 2.35L16 32l-2.35-13.65L0 16l13.65-2.35z" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   HERO
   ══════════════════════════════════════════ */
export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background">
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground) / 0.045) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Soft ambient color wash — just two shapes */}
      <div className="pointer-events-none absolute -right-32 top-[12%] h-[50vh] w-[40vw] rounded-[4rem] bg-secondary/10 blur-2xl" />
      <div className="pointer-events-none absolute -left-24 bottom-[10%] h-[30vh] w-[25vw] rounded-[4rem] bg-naso-lilac/8 blur-2xl" />

      {/* ── 2-column layout ── */}
      <div className="container relative flex min-h-[100svh] items-center px-5 py-28 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.1fr_auto] lg:gap-20">

          {/* ═══ LEFT COLUMN ═══ */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-[620px]"
          >
            {/* Location kicker */}
            <motion.div variants={fadeUp(0)} className="mb-7 flex items-center gap-3">
              <img src={nasoLogo} alt="NASO" className="h-6 w-auto" />
              <span className="h-px w-6 bg-foreground/20" />
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Cairo, Egypt
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp(0.12)}
              className="font-poster text-[clamp(3.2rem,9vw,7.8rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-foreground"
            >
              <span className="block">Go out</span>
              <span className="relative mt-1 inline-block lg:mt-2">
                {/* Green highlight wipe — the ONE treatment */}
                <motion.span
                  variants={wipe(0.65)}
                  className="absolute -inset-x-[0.1em] inset-y-[0.02em] origin-left -skew-x-2 rounded-md bg-secondary"
                  aria-hidden
                />
                <span className="relative z-10">different</span>
              </span>
              <span className="text-primary">ly.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp(0.32)}
              className="mt-7 max-w-[26rem] text-[15px] leading-[1.75] text-muted-foreground lg:text-base"
            >
              Curated outings, creative workshops &amp; original products — for
              people who collect moments, not things.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp(0.48)}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <MagneticCTA
                to={ROUTES.EXPERIENCES}
                className="group inline-flex h-[52px] items-center gap-2.5 rounded-full bg-foreground px-8 font-display text-sm font-bold tracking-wide text-background shadow-elevated transition-shadow duration-300 hover:shadow-[0_14px_44px_-8px_hsl(var(--foreground)/0.3)] active:scale-[0.97]"
              >
                Explore experiences
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticCTA>
              <MagneticCTA
                to={ROUTES.SHOP}
                className="inline-flex h-[52px] items-center rounded-full border-[2.5px] border-foreground/15 px-8 font-display text-sm font-bold tracking-wide text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/[0.04] active:scale-[0.97]"
              >
                Visit shop
              </MagneticCTA>
            </motion.div>

            {/* Tiny supporting detail */}
            <motion.div
              variants={fadeUp(0.6)}
              className="mt-5 flex items-center gap-2 text-muted-foreground/50"
            >
              <Sparkle className="h-3 w-3" />
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.15em]">
                Experiences · Workshops · Products
              </span>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT COLUMN — Poster block ═══ */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="relative hidden h-[500px] w-[380px] lg:block xl:h-[540px] xl:w-[410px]"
          >
            {/* Main poster frame */}
            <motion.div
              variants={posterEnter}
              className="absolute inset-0 overflow-hidden rounded-2xl border-[3px] border-foreground bg-card shadow-[8px_8px_0_hsl(var(--foreground))]"
            >
              <div className="flex h-full flex-col items-center justify-center p-10">
                {/* NASO wordmark */}
                <span className="font-poster text-[6rem] font-extrabold leading-none tracking-[-0.06em] text-foreground xl:text-[7rem]">
                  NASO
                </span>

                {/* Tagline */}
                <div className="mt-5 flex items-center gap-2.5">
                  <span className="h-px w-7 bg-foreground/20" />
                  <span className="font-display text-[9px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
                    Creative moments
                  </span>
                  <span className="h-px w-7 bg-foreground/20" />
                </div>

                {/* Brand color bar */}
                <div className="mt-7 flex gap-1.5">
                  {["bg-primary", "bg-secondary", "bg-accent", "bg-naso-lilac", "bg-foreground"].map(
                    (c, i) => (
                      <div key={i} className={`h-3.5 w-9 rounded-sm ${c}`} />
                    )
                  )}
                </div>

                {/* Year stamp */}
                <span className="mt-8 font-poster text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground/40">
                  Est. Cairo 2024
                </span>
              </div>
            </motion.div>

            {/* "Made in Cairo" badge — top-left, gently floating */}
            <motion.div
              variants={badgePop(0.75, -7)}
              whileHover={{ scale: 1.1, rotate: -2 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute -left-10 -top-6 z-20 flex h-[76px] w-[76px] cursor-default flex-col items-center justify-center rounded-full border-[2.5px] border-foreground bg-secondary font-poster text-[8px] font-extrabold uppercase leading-tight tracking-[0.12em] text-foreground shadow-[3px_3px_0_hsl(var(--foreground))] xl:-left-14 xl:h-[88px] xl:w-[88px] xl:text-[9px]"
            >
              <span>Made</span>
              <span>in</span>
              <span>Cairo</span>
            </motion.div>

            {/* Sparkle accent — top-right */}
            <motion.div
              variants={badgePop(0.9, 12)}
              className="absolute -right-4 -top-2 z-20"
            >
              <Sparkle className="h-7 w-7 text-primary xl:h-8 xl:w-8" />
            </motion.div>

            {/* Small lilac dot — bottom-left */}
            <motion.div
              variants={badgePop(1.05, 0)}
              className="absolute -bottom-3 left-8 z-20 h-4 w-4 rounded-full bg-naso-lilac border-2 border-foreground"
            />
          </motion.div>
        </div>
      </div>

      {/* ── Mobile poster (simplified) ── */}
      <div className="container relative z-10 -mt-4 mb-20 px-5 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.7, ease, delay: 0.55 }}
          className="mx-auto max-w-[260px] rounded-xl border-[2.5px] border-foreground bg-card p-6 text-center shadow-[5px_5px_0_hsl(var(--foreground))]"
        >
          <div className="font-poster text-4xl font-extrabold tracking-[-0.05em] text-foreground">
            NASO
          </div>
          <div className="mt-2 font-display text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Creative moments · Cairo
          </div>
          <div className="mx-auto mt-3 flex justify-center gap-1">
            {["bg-primary", "bg-secondary", "bg-accent", "bg-naso-lilac"].map((c, i) => (
              <div key={i} className={`h-2 w-5 rounded-sm ${c}`} />
            ))}
          </div>
        </motion.div>
        {/* Mobile badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.85 }}
          className="absolute -top-5 right-10 flex h-12 w-12 flex-col items-center justify-center rounded-full border-2 border-foreground bg-secondary font-poster text-[6px] font-extrabold uppercase leading-tight tracking-wider text-foreground shadow-[2px_2px_0_hsl(var(--foreground))]"
        >
          <span>Made</span>
          <span>in</span>
          <span>Cairo</span>
        </motion.div>
      </div>
    </section>
  );
}
