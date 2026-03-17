import { motion, useMotionValue, useSpring } from "framer-motion";
import { forwardRef, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════
   FLOWER SHAPE — 6-petal retro flower
   ═══════════════════════════════════════════ */
export function FlowerShape({
  className,
  petals = 6,
  size = 60,
}: {
  className?: string;
  petals?: number;
  size?: number;
}) {
  const petalPath = Array.from({ length: petals }, (_, i) => {
    const angle = (360 / petals) * i;
    return `rotate(${angle} ${size / 2} ${size / 2})`;
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={cn("shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {petalPath.map((transform, i) => (
        <ellipse
          key={i}
          cx={size / 2}
          cy={size / 4}
          rx={size / 6}
          ry={size / 3.2}
          transform={transform}
          fill="currentColor"
          opacity={0.9}
        />
      ))}
      <circle cx={size / 2} cy={size / 2} r={size / 7} fill="currentColor" opacity={0.6} />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   STICKER BADGE — pill/rounded label
   ═══════════════════════════════════════════ */
export const StickerBadge = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    rotate?: number;
    variant?: "default" | "filled" | "outline";
  }
>(({ children, className, rotate = -3, variant = "default" }, ref) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-groovy text-[10px] font-bold uppercase tracking-[0.15em] whitespace-nowrap";
  const variants = {
    default: "border-[2.5px] border-foreground bg-card px-5 py-2 shadow-retro",
    filled: "border-[2.5px] border-foreground px-5 py-2 shadow-retro",
    outline: "border-[2px] border-foreground/30 px-4 py-1.5",
  };

  return (
    <motion.div
      ref={ref}
      className={cn(base, variants[variant], className)}
      style={{ rotate }}
      whileHover={{ scale: 1.08, rotate: rotate + 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.div>
  );
});
StickerBadge.displayName = "StickerBadge";

/* ═══════════════════════════════════════════
   SPARKLE — retro 4-point star
   ═══════════════════════════════════════════ */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={cn("shrink-0", className)}>
      <path d="M16 0l2.35 13.65L32 16l-13.65 2.35L16 32l-2.35-13.65L0 16l13.65-2.35z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   WAVY DIVIDER — retro section separator
   ═══════════════════════════════════════════ */
export function WavyDivider({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <div className={cn("w-full overflow-hidden leading-[0]", flip && "rotate-180", className)}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: "clamp(30px, 5vw, 60px)" }}
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAGNETIC BUTTON — tactile hover CTA
   ═══════════════════════════════════════════ */
export function MagneticButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };

  return (
    <motion.div style={{ x: sx, y: sy }} className="inline-block">
      <Link
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className={className}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MARQUEE TICKER — horizontal scrolling text
   ═══════════════════════════════════════════ */
export function MarqueeTicker({
  children,
  className,
  speed = 25,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={cn("naso-marquee overflow-hidden whitespace-nowrap", className)}>
      <div
        className="inline-flex"
        style={{ animation: `marquee-scroll ${speed}s linear infinite` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CHECKERBOARD BLOCK — decorative pattern area
   ═══════════════════════════════════════════ */
export function CheckerboardBlock({ className }: { className?: string }) {
  return <div className={cn("naso-checkerboard", className)} />;
}
