/**
 * ExperienceArchiveHero — Cinematic full-bleed dark hero for the Experiences archive.
 * Creates the feeling of entering a secret vault of creative memories.
 * Animated counter, atmospheric orbs, typewriter tagline.
 */
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Sparkle, MarqueeTicker } from "@/components/shared/RetroElements";

interface ArchiveHeroProps {
  unlockedCount: number;
  totalSlots: number;
}

export function ExperienceArchiveHero({ unlockedCount, totalSlots }: ArchiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Mouse glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Animated counter
  const [displayCount, setDisplayCount] = useState(0);
  useEffect(() => {
    const target = unlockedCount;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayCount(target);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [unlockedCount]);

  // Typewriter tagline
  const tagline = "Every experience is a memory you haven't made yet.";
  const [typedLen, setTypedLen] = useState(0);
  useEffect(() => {
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        setTypedLen((prev) => {
          if (prev >= tagline.length) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 35);
      return () => clearInterval(timer);
    }, 1200);
    return () => clearTimeout(delay);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] bg-foreground overflow-hidden"
      aria-label="100 Experiences — NASO's creative archive"
    >
      {/* Deep dark base with subtle image */}
      <motion.div
        style={{ scale: scaleBg }}
        className="absolute inset-[-10%] bg-black"
      >
        <img
          src="/assets/workshops_bg_1776810244802.png"
          alt=""
          role="presentation"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Gradient grading */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black pointer-events-none" />

      {/* Atmospheric orbs */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] bg-naso-purple/30 rounded-full blur-[160px] pointer-events-none mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 right-1/3 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[130px] pointer-events-none mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.2, 0.08],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute top-1/2 right-1/4 w-[35vw] h-[35vw] bg-secondary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
      />

      {/* Mouse-tracking glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 mix-blend-screen bg-naso-purple/15 hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Huge background marquee — atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }} className="rotate-[-8deg] scale-150 w-[200vw]">
          <MarqueeTicker speed={40} className="text-[14vw] font-black font-poster text-transparent">
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>100 EXPERIENCES</span>
            <Sparkle className="inline-block h-[8vw] w-[8vw] mx-[4vw] text-white/20" />
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>ONE LIFE</span>
            <Sparkle className="inline-block h-[8vw] w-[8vw] mx-[4vw] text-white/20" />
          </MarqueeTicker>
        </motion.div>
      </div>

      {/* Film grain */}
      <div
        className="absolute inset-0 naso-noise opacity-40 mix-blend-overlay pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ y: yText, opacity: opacityFade }}
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center text-center px-6 pt-24 pb-20"
      >
        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">
              The Archive · Vol. 001
            </span>
          </div>
        </motion.div>

        {/* Counter — the emotional centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative mb-6"
        >
          {/* Glow ring behind counter */}
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-[80px] scale-150" />
          
          <div className="relative flex flex-col items-center">
            <div className="flex items-baseline gap-2">
              <span className="font-groovy font-black text-[clamp(5rem,20vw,14rem)] leading-[0.85] text-white tabular-nums tracking-[-0.04em] drop-shadow-[0_0_60px_hsl(var(--primary)/0.4)]">
                {String(displayCount).padStart(2, "0")}
              </span>
              <span className="font-body text-white/30 text-[clamp(1.5rem,4vw,3rem)] font-light tracking-[-0.02em]">
                / {totalSlots}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4 w-48 sm:w-64 h-[3px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / totalSlots) * 100}%` }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                className="h-full bg-gradient-to-r from-primary via-naso-purple to-secondary rounded-full"
              />
            </div>
            <span className="mt-3 font-body text-[11px] uppercase tracking-[0.3em] text-white/40">
              chapters unlocked
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="mb-6"
        >
          <h1 className="font-groovy font-black leading-[0.88] tracking-[-0.04em] text-[clamp(2.5rem,8vw,6rem)]">
            <span className="text-white">100 experiences.</span>
            <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-secondary via-naso-lilac to-primary" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              One unforgettable life.
            </span>
          </h1>
        </motion.div>

        {/* Typewriter tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mb-10 h-8"
        >
          <p className="font-body text-base sm:text-lg text-white/60 font-medium tracking-wide">
            {tagline.slice(0, typedLen)}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="text-secondary"
            >
              |
            </motion.span>
          </p>
        </motion.div>

        {/* Scroll prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[9px] font-bold uppercase tracking-[0.5em] text-white/30">
            Enter the archive
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-[1.5px] rounded-full bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
