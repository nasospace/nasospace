import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { FlowerShape, MagneticButton, Sparkle } from "@/components/shared/RetroElements";
import nasoLogo from "@/assets/naso-logo.png";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { trackNaso } from "@/lib/analytics";
import { Link } from "react-router-dom";
<div className="badge">✨</div>
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Multi-speed parallax for depth perception
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yLogo = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yCta = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] min-h-[600px] max-h-[1200px] bg-foreground overflow-hidden"
      aria-label="NASO hero — Cairo's creative movement"
    >
      {/* Layer 1: Background image — slowest parallax */}
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-[-10%] bg-black">
        <img
          src="/assets/hero_image_1776810151671.png"
          alt=""
          role="presentation"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Layer 2: Cinematic color grading */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-foreground pointer-events-none" />
      <div className="absolute inset-0 bg-primary/10 mix-blend-color pointer-events-none" />

      {/* Layer 3: Edge vignette — cinematic framing */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Layer 4: Grain texture — mid-speed parallax */}
      <motion.div
        style={{ y: yMid, opacity: opacityFade }}
        className="absolute inset-0 naso-noise opacity-30 mix-blend-overlay pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* Headline & tagline — fastest parallax */}
      <motion.div
        style={{ y: yText, opacity: opacityFade }}
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
      >
        {/* Cinematic Light Leak Overlay */}
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/5 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="container relative z-20 flex min-h-screen flex-col items-center justify-center text-center">
          <div className="text-center">
            <motion.h1
              initial={{ y: 80, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-groovy text-[clamp(3.2rem,15vw,14rem)] font-black leading-[0.78] text-white tracking-tighter"
            >
              NOT JUST
              <br />
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_100%]"
                style={{ textShadow: "0 0 80px rgba(185,236,132,0.15)" }}
              >
                A SPACE
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="mt-6 sm:mt-8 max-w-md mx-auto font-body text-[13px] sm:text-base font-medium text-white/80 leading-relaxed"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
            >
              Leave the ordinary behind.<br className="hidden sm:block" />
              <span className="text-secondary font-semibold">We design the moments you weren't supposed to find.</span>
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Floating Logo — gentle float animation */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.15}
        whileDrag={{ scale: 1.08, rotate: 4 }}
        style={{ y: yLogo }}
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        className="absolute top-[15%] left-[3%] lg:left-[8%] z-20 cursor-grab active:cursor-grabbing"
        aria-hidden="true"
      >
        <img src={nasoLogo} alt="" className="w-36 lg:w-56 drop-shadow-[0_8px_32px_rgba(0,0,0,0.4)] naso-float" draggable={false} />
      </motion.div>

      {/* Easter Egg */}
      <motion.div
        drag
        dragConstraints={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute top-[18%] right-[4%] sm:right-[12%] cursor-grab active:cursor-grabbing z-20"
      >
        <button
          onClick={(e) => {
            if (e.detail === 3) {
              confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ["#7C3AED", "#DB2777", "#FCD34D"] });
              toast.success("You found the secret drop! Use code NASOFAM for 10% off your next booking.", { duration: 5000 });
              trackNaso("easter_egg_found");
            }
          }}
          aria-label="Secret interactive element"
          className="bg-card text-foreground font-groovy font-bold px-3 py-1.5 rounded-lg text-xs border-[2px] border-foreground shadow-retro-sm -rotate-6 hover:scale-110 hover:-rotate-3 transition-all duration-300 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          DO NOT CLICK ⚠️
        </button>
      </motion.div>

      {/* Decorative flower */}
      <motion.div
        drag
        dragConstraints={containerRef}
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.4, rotate: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute top-[12%] right-[18%] cursor-grab active:cursor-grabbing z-10 hidden lg:block"
        aria-hidden="true"
      >
        <FlowerShape size={90} className="text-secondary drop-shadow-[3px_3px_0_rgba(0,0,0,0.4)] hover:scale-110 transition-transform duration-300" />
      </motion.div>

      {/* Primary CTA — with glow pulse */}
      <motion.div
        style={{ y: yCta, opacity: opacityFade }}
        className="absolute bottom-10 sm:bottom-14 w-full flex flex-col items-center justify-center gap-6 z-30"
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
        >
          <MagneticButton
            to={ROUTES.EXPERIENCES}
            onClick={() => trackNaso("hero_cta_click")}
            className="group relative flex h-14 w-60 sm:h-[72px] sm:w-80 items-center justify-center overflow-hidden rounded-full border-[3px] sm:border-4 border-white/90 bg-primary shadow-[0_0_40px_rgba(0,99,226,0.3),5px_5px_0px_#000] sm:shadow-[0_0_50px_rgba(0,99,226,0.25),8px_8px_0px_#000] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(0,99,226,0.4),10px_10px_0px_#000] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary"
          >
            <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 naso-ease group-hover:translate-y-0" />
            <span className="relative z-10 font-groovy text-base sm:text-xl font-black uppercase tracking-[0.15em] text-white group-hover:text-foreground transition-colors duration-300">
              See what's happening
            </span>
            <Sparkle className="relative z-10 ml-2 sm:ml-3 h-4 w-4 sm:h-6 sm:w-6 text-white group-hover:text-foreground transition-colors duration-300" />
          </MagneticButton>
        </motion.div>
        <Link
          to={ROUTES.EXPERIENCES}
          className="font-groovy text-sm font-bold uppercase tracking-[0.15em] text-primary transition-colors hover:text-foreground underline decoration-2 underline-offset-8"
        >
          Discover the full drop →
        </Link>
      </motion.div>
    </section>
  );
}
