/**
 * SealedTeaser — "The next chapter drops soon" anticipation section.
 * 
 * Creates urgency and mystery at the bottom of the Experiences page.
 * Drives newsletter/Instagram follows for NASO.
 */
import { motion } from "framer-motion";
import { Lock, Sparkles, ArrowUpRight } from "lucide-react";
import { Sparkle, FlowerShape } from "@/components/shared/RetroElements";

export function SealedTeaser() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      {/* Background textures */}
      <div className="absolute inset-0 naso-dotgrid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 naso-noise opacity-30 pointer-events-none" />

      {/* Atmospheric orb */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Decorative flower */}
      <motion.div
        initial={{ opacity: 0, rotate: -30 }}
        whileInView={{ opacity: 0.08, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute -right-20 -bottom-20 pointer-events-none"
        aria-hidden
      >
        <FlowerShape size={300} className="text-secondary naso-flower-spin" />
      </motion.div>

      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          {/* Seal icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-background/15 bg-background/5 backdrop-blur-sm"
          >
            <Lock className="h-8 w-8 text-background/50" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/5 px-4 py-1.5 font-groovy text-[10px] font-bold uppercase tracking-widest text-background/70">
              <Sparkles className="h-3 w-3" />
              More coming soon
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-groovy text-3xl sm:text-4xl md:text-5xl font-black leading-[0.92] tracking-tight"
          >
            The next chapter
            <br />
            <span className="italic text-secondary" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              drops soon.
            </span>
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-6 text-base sm:text-lg text-background/60 leading-relaxed max-w-lg mx-auto"
          >
            Every new experience is crafted by hand, tested with love, 
            and dropped without warning. Follow NASO so you never miss 
            a chapter.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://www.instagram.com/nasospace"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full bg-secondary px-8 py-4 font-groovy text-sm font-black uppercase tracking-widest text-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--secondary)/0.4)]"
            >
              Follow @nasospace
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-12 flex items-center justify-center gap-8 sm:gap-12"
          >
            <div className="text-center">
              <span className="block font-groovy text-2xl font-black text-background/90">100</span>
              <span className="text-[10px] uppercase tracking-widest text-background/40">total chapters</span>
            </div>
            <div className="h-8 w-px bg-background/10" />
            <div className="text-center">
              <span className="block font-groovy text-2xl font-black text-secondary">∞</span>
              <span className="text-[10px] uppercase tracking-widest text-background/40">memories to make</span>
            </div>
            <div className="h-8 w-px bg-background/10" />
            <div className="text-center">
              <span className="block font-groovy text-2xl font-black text-background/90">1</span>
              <span className="text-[10px] uppercase tracking-widest text-background/40">unforgettable life</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
