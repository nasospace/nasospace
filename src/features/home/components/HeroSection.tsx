import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { Sparkle, FlowerShape } from "@/components/shared/RetroElements";
import { trackNaso } from "@/lib/analytics";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] bg-foreground overflow-hidden"
      aria-label="NASO — Cairo's creative movement"
    >
      {/* Background image — slow parallax */}
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-[-10%] bg-black">
        <img
          src="/assets/hero_image_1776810151671.png"
          alt=""
          role="presentation"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Gradient + vignette grading */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/30 to-foreground pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, hsl(var(--foreground) / 0.55) 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 naso-noise opacity-20 mix-blend-overlay pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* Top meta bar — small brand chip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-24 sm:top-28 left-0 right-0 z-20 pointer-events-none"
      >
        <div className="container flex items-center justify-between text-white/70">
          <div className="flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
            <span>Cairo · Est. 2024</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em]">
            <span>A creative movement</span>
            <Sparkle className="h-3 w-3 text-secondary" />
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: yText, opacity: opacityFade }}
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center text-center px-6"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-6 sm:mb-8 inline-flex items-center gap-3"
        >
          <span className="h-px w-8 bg-secondary" />
          <span className="font-body text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Not just a space
          </span>
          <span className="h-px w-8 bg-secondary" />
        </motion.div>

        {/* Headline — editorial, confident */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-groovy font-black leading-[0.85] tracking-[-0.04em] text-white text-[clamp(3.5rem,14vw,11rem)]"
          style={{ textShadow: "0 4px 40px hsl(var(--foreground) / 0.4)" }}
        >
          A movement
          <br />
          <span className="italic font-normal text-secondary" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            for the
          </span>{" "}
          <span className="text-primary">curious.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 max-w-lg font-body text-sm sm:text-base text-white/80 leading-relaxed"
        >
          Workshops, kits, and experiences designed to make ordinary days
          <span className="text-white"> unforgettable</span>.
        </motion.p>

        {/* CTAs — punchy, minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to={ROUTES.EXPERIENCES}
            onClick={() => trackNaso("hero_cta_click")}
            className="group inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-4 font-groovy text-sm font-black uppercase tracking-[0.15em] text-foreground shadow-[4px_4px_0_hsl(var(--foreground))] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_hsl(var(--foreground))] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            Enter NASO
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45" />
          </Link>
          <Link
            to={ROUTES.ABOUT}
            className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors underline-offset-8 hover:underline decoration-secondary decoration-2"
          >
            Our story
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative flower — corner accent, no overlap */}
      <motion.div
        initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
        animate={{ opacity: 0.5, rotate: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 right-6 sm:bottom-12 sm:right-12 z-10 hidden md:block pointer-events-none"
        aria-hidden="true"
      >
        <FlowerShape
          size={70}
          className="text-secondary drop-shadow-[2px_2px_0_hsl(var(--foreground))] naso-float"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{ opacity: opacityFade }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
