import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ROUTES } from "@/config/routes";
import nasoLogo from "@/assets/naso-logo.png";

/* ── Motion config ── */
const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay } },
});

const stickerPop = (delay = 0, rotate = 0) => ({
  hidden: { opacity: 0, scale: 0.3, rotate: rotate - 15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate,
    transition: { type: "spring", stiffness: 420, damping: 18, delay },
  },
});

const wipe = (delay = 0) => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5, ease, delay } },
});

/* ── Magnetic button ── */
function MagneticButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Link
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className={className}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}

/* ── Decorative SVGs ── */
function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0l3.09 8.26L24 9.27l-6.91 5.52L19.18 24 12 19.27 4.82 24l2.09-9.21L0 9.27l8.91-1.01z" />
    </svg>
  );
}

function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 20" fill="none" className={className}>
      <motion.path
        d="M2 10c10-8 20 8 30 0s20 8 30 0 20 8 30 0 20 8 26 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease, delay: 1.4 }}
      />
    </svg>
  );
}

/* ── Floating sticker wrapper ── */
function FloatingSticker({
  children,
  className,
  amplitude = 4,
  duration = 5,
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════
   HERO SECTION
   ════════════════════════════════════════════════ */
export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background">
      {/* ── Paper texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground) / 0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* ── Poster color blocks — asymmetric background shapes ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease, delay: 0.1 }}
        className="pointer-events-none absolute -right-20 top-[8%] h-[55vh] w-[45vw] rounded-[3rem] bg-secondary/15 blur-sm"
        style={{ transform: "rotate(-6deg)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease, delay: 0.2 }}
        className="pointer-events-none absolute -left-16 bottom-[5%] h-[35vh] w-[30vw] rounded-[3rem] bg-primary/8 blur-sm"
        style={{ transform: "rotate(3deg)" }}
      />

      {/* ── Main content ── */}
      <div className="container relative flex min-h-[100svh] items-center px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[1fr,auto] lg:items-center lg:gap-16">

          {/* ════ LEFT: Typography + CTAs ════ */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp(0)} className="mb-6 flex items-center gap-3">
              <img src={nasoLogo} alt="NASO" className="h-7 w-auto" />
              <span className="h-px w-8 bg-foreground/20" />
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Cairo, Egypt
              </span>
            </motion.div>

            {/* ── Headline ── */}
            <motion.h1
              variants={fadeUp(0.1)}
              className="font-poster text-[clamp(3.5rem,9.5vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-foreground"
            >
              <span className="block">Go out</span>
              <span className="relative mt-1 inline-block lg:mt-2">
                {/* Green highlight wipe */}
                <motion.span
                  variants={wipe(0.7)}
                  className="absolute inset-y-[0.05em] -inset-x-[0.12em] origin-left -skew-x-3 rounded-md bg-secondary"
                  aria-hidden
                />
                <span className="relative z-10">different</span>
              </span>
              <span className="relative z-10 text-primary">ly.</span>
            </motion.h1>

            {/* Squiggle accent */}
            <Squiggle className="mt-3 h-3 w-28 text-accent lg:w-36" />

            {/* Subtext */}
            <motion.p
              variants={fadeUp(0.35)}
              className="mt-6 max-w-md text-[15px] leading-[1.8] text-muted-foreground lg:text-base"
            >
              Curated outings, creative workshops &amp; original products
              for people who collect moments, not things.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp(0.5)}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <MagneticButton
                to={ROUTES.EXPERIENCES}
                className="group inline-flex h-[52px] items-center gap-2.5 rounded-full bg-foreground px-8 font-display text-sm font-bold tracking-wide text-background shadow-elevated transition-shadow duration-300 hover:shadow-[0_16px_48px_-10px_hsl(var(--foreground)/0.35)] active:scale-[0.96]"
              >
                Explore experiences
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton
                to={ROUTES.SHOP}
                className="inline-flex h-[52px] items-center rounded-full border-[2.5px] border-foreground/15 px-8 font-display text-sm font-bold tracking-wide text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/[0.03] active:scale-[0.96]"
              >
                Visit shop
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* ════ RIGHT: Poster composition ════ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative hidden h-[480px] w-[380px] lg:block xl:h-[520px] xl:w-[420px]"
          >
            {/* ── Main poster frame ── */}
            <motion.div
              variants={stickerPop(0.4, -3)}
              className="absolute inset-0 overflow-hidden rounded-2xl border-[3px] border-foreground bg-card shadow-[6px_6px_0_hsl(var(--foreground))]"
            >
              {/* Inner poster content */}
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                {/* Big NASO wordmark */}
                <div className="font-poster text-[5.5rem] font-extrabold leading-none tracking-[-0.06em] text-foreground xl:text-[6.5rem]">
                  NASO
                </div>
                {/* Tagline strip */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-px w-6 bg-foreground/25" />
                  <span className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                    Creative moments
                  </span>
                  <span className="h-px w-6 bg-foreground/25" />
                </div>
                {/* Color bar */}
                <div className="mt-6 flex gap-1.5">
                  {[
                    "bg-primary",
                    "bg-secondary",
                    "bg-accent",
                    "bg-[hsl(var(--naso-lilac))]",
                    "bg-foreground",
                  ].map((c, i) => (
                    <div key={i} className={`h-3 w-8 rounded-sm ${c}`} />
                  ))}
                </div>
                {/* Year */}
                <div className="mt-6 font-poster text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50">
                  Est. Cairo 2024
                </div>
              </div>
            </motion.div>

            {/* ── "Made in Cairo" circular badge ── */}
            <FloatingSticker
              className="absolute -left-10 -top-6 z-20 xl:-left-14"
              amplitude={3}
              duration={4.5}
            >
              <motion.div
                variants={stickerPop(0.6, -8)}
                whileHover={{ scale: 1.1, rotate: -2 }}
                className="flex h-[72px] w-[72px] cursor-default flex-col items-center justify-center rounded-full border-[2.5px] border-foreground bg-secondary font-poster text-[8px] font-extrabold uppercase leading-tight tracking-[0.1em] text-foreground shadow-[3px_3px_0_hsl(var(--foreground))] xl:h-20 xl:w-20 xl:text-[9px]"
              >
                <span>Made</span>
                <span>in</span>
                <span>Cairo</span>
              </motion.div>
            </FloatingSticker>

            {/* ── Star accent — top right ── */}
            <FloatingSticker
              className="absolute -right-5 -top-3 z-20"
              amplitude={2.5}
              duration={5.5}
            >
              <motion.div variants={stickerPop(0.85, 15)}>
                <Star className="h-8 w-8 text-primary xl:h-9 xl:w-9" />
              </motion.div>
            </FloatingSticker>

            {/* ── Lilac sticker label ── */}
            <FloatingSticker
              className="absolute -right-8 bottom-20 z-20 xl:-right-12"
              amplitude={3.5}
              duration={6}
            >
              <motion.div
                variants={stickerPop(0.95, 5)}
                whileHover={{ scale: 1.08, rotate: 0 }}
                className="cursor-default rounded-full border-2 border-foreground bg-[hsl(var(--naso-lilac))] px-4 py-1.5 font-poster text-[10px] font-bold uppercase tracking-[0.12em] text-foreground shadow-[2px_2px_0_hsl(var(--foreground))] xl:text-[11px]"
              >
                ✦ Outings &amp; Vibes
              </motion.div>
            </FloatingSticker>

            {/* ── Small purple star — bottom-left ── */}
            <motion.div
              variants={stickerPop(1.1, -10)}
              className="absolute -bottom-4 left-4 z-20"
            >
              <Star className="h-5 w-5 text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile poster composition (simplified) ── */}
      <div className="container relative z-10 -mt-8 mb-16 px-4 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
          className="mx-auto max-w-[280px] rounded-xl border-[2.5px] border-foreground bg-card p-6 text-center shadow-[5px_5px_0_hsl(var(--foreground))]"
        >
          <div className="font-poster text-4xl font-extrabold tracking-[-0.04em] text-foreground">
            NASO
          </div>
          <div className="mt-2 font-display text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Creative moments · Cairo
          </div>
          <div className="mx-auto mt-4 flex justify-center gap-1">
            {["bg-primary", "bg-secondary", "bg-accent", "bg-[hsl(var(--naso-lilac))]"].map((c, i) => (
              <div key={i} className={`h-2 w-6 rounded-sm ${c}`} />
            ))}
          </div>
        </motion.div>
        {/* Mobile sticker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.9 }}
          className="absolute -top-6 right-8 flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-foreground bg-secondary font-poster text-[7px] font-extrabold uppercase leading-tight tracking-wider text-foreground shadow-[2px_2px_0_hsl(var(--foreground))]"
        >
          <span>Made</span>
          <span>in</span>
          <span>Cairo</span>
        </motion.div>
      </div>
    </section>
  );
}
