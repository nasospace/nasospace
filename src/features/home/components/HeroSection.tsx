import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { Sparkle, FlowerShape, MagneticButton, StickerBadge, MarqueeTicker } from "@/components/shared/RetroElements";
import { trackNaso } from "@/lib/analytics";
import { Link } from "react-router-dom";
import { ArrowUpRight, PlayCircle } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse Tracking Glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Stagger Text Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, rotate: 5, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] bg-foreground overflow-hidden"
      aria-label="NASO — Cairo's creative movement"
    >
      {/* Background image — slow parallax with infinite slow zoom */}
      <motion.div 
        style={{ y: yBg, scale: scaleBg }} 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-10%] bg-black"
      >
        <img
          src="/assets/hero_image_1776810151671.png"
          alt=""
          role="presentation"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Gradient + vignette grading */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/40 to-foreground pointer-events-none" />
      
      {/* Dynamic Animated Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] bg-naso-blue/40 rounded-full blur-[140px] pointer-events-none mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.6, 1],
          opacity: [0.1, 0.4, 0.1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-primary/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
      />

      {/* Interactive Mouse Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen bg-naso-purple/20 hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 0%, hsl(var(--foreground) / 0.8) 100%)",
        }}
      />

      {/* Huge Background Marquee */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center opacity-10 pointer-events-none select-none mix-blend-overlay">
        <motion.div style={{ y: yBg }} className="rotate-[-10deg] scale-125 w-[150vw]">
          <MarqueeTicker speed={30} className="text-[12vw] font-black font-poster text-transparent" style={{ WebkitTextStroke: "2px white" }}>
            NASO CAIRO <Sparkle className="inline-block h-[8vw] w-[8vw] mx-[3vw] text-white" /> A CREATIVE MOVEMENT <Sparkle className="inline-block h-[8vw] w-[8vw] mx-[3vw] text-white" />
          </MarqueeTicker>
        </motion.div>
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 naso-noise opacity-30 mix-blend-overlay pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* Top meta bar — small brand chip */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute top-20 sm:top-24 left-0 right-0 z-20 pointer-events-none"
      >
        <div className="container flex items-center justify-between text-white/80">
          <div className="flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span>Cairo · Est. 2024</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <span>A creative movement</span>
            <Sparkle className="h-3 w-3 text-secondary animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: yText, opacity: opacityFade }}
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center text-center px-6 pt-32 sm:pt-40 pb-20"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-lg shadow-[0_0_20px_hsl(var(--secondary)/0.2)]"
          >
            <Sparkle className="h-4 w-4 text-secondary animate-spin-slow" />
            <span className="font-body text-[11px] sm:text-xs font-bold uppercase tracking-[0.4em] text-white">
              Not just a space
            </span>
            <Sparkle className="h-4 w-4 text-secondary animate-spin-slow" />
          </motion.div>

          {/* Headline — editorial, confident */}
          <div className="relative flex flex-col items-center justify-center gap-2 sm:gap-4 mt-2">
            
            {/* Background Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16 -left-16 hidden md:block z-20"
            >
              <FlowerShape size={80} className="text-secondary drop-shadow-[4px_4px_0_hsl(var(--foreground))] opacity-90" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-12 -right-16 hidden md:block z-20"
            >
              <Sparkle className="h-16 w-16 text-primary drop-shadow-[4px_4px_0_hsl(var(--foreground))] opacity-90" />
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-groovy font-black leading-[0.85] tracking-[-0.04em] text-white text-[clamp(4rem,15vw,12rem)] drop-shadow-2xl z-10 relative">
              A movement
            </motion.h1>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-2 z-20">
              <StickerBadge 
                variant="filled" 
                rotate={-6} 
                className="bg-primary text-naso-black text-sm sm:text-lg md:text-2xl px-8 py-4 border-transparent shadow-[6px_6px_0_hsl(var(--naso-blue))] hover:rotate-0 transition-transform duration-300"
              >
                for the
              </StickerBadge>
              <h1 className="font-groovy font-black leading-[0.85] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-br from-secondary via-naso-blue to-naso-purple text-[clamp(4rem,15vw,12rem)] pb-2 filter drop-shadow-[0_0_30px_hsl(var(--naso-blue)/0.5)]">
                curious.
              </h1>
            </motion.div>
          </div>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="mt-10 max-w-xl font-body text-base sm:text-lg text-white/90 leading-relaxed font-medium"
          >
            Workshops, kits, and experiences designed to make ordinary days
            <span className="text-secondary font-bold inline-block mx-1 animate-pulse"> unforgettable</span>.
          </motion.p>

          {/* CTAs — punchy, minimal */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <MagneticButton
              to={ROUTES.EXPERIENCES}
              onClick={() => trackNaso("hero_cta_click")}
              className="group relative inline-flex items-center gap-3 rounded-full bg-secondary px-10 py-5 font-groovy text-sm sm:text-lg font-black uppercase tracking-[0.15em] text-naso-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_hsl(var(--secondary)/0.6)] overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white/30 -skew-x-12 -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center gap-3">
                Enter NASO
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110" />
              </span>
            </MagneticButton>
            
            <MagneticButton
              to={ROUTES.ABOUT}
              className="group flex items-center gap-3 rounded-full border-2 border-white/20 bg-black/20 px-10 py-5 font-groovy text-sm sm:text-lg font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/50 shadow-[0_0_30px_hsl(var(--foreground)/0.5)]"
            >
              <PlayCircle className="h-6 w-6 text-primary group-hover:scale-110 transition-transform group-hover:text-secondary" />
              Our story
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Floating Pills - Parallax Background */}
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-32 h-10 rounded-full border-2 border-primary/30 rotate-12 backdrop-blur-sm" />
        <div className="absolute bottom-[30%] left-[10%] w-24 h-8 rounded-full border-2 border-secondary/30 -rotate-12 backdrop-blur-sm" />
        <div className="absolute top-[60%] left-[5%] w-16 h-16 rounded-full bg-naso-blue/20 blur-xl" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ opacity: opacityFade }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.4em] text-white/70">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-[2px] rounded-full bg-gradient-to-b from-secondary to-transparent"
        />
      </motion.div>
    </section>
  );
}
