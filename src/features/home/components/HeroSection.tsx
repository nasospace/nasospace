import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { HeroComposition } from "./HeroComposition";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background pt-[72px]">
      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 naso-grid-bg opacity-[0.3]" />

      <div className="container relative flex min-h-[calc(100svh-72px)] flex-col justify-center py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-0 xl:gap-24">
        {/* ── Left: Content zone ── */}
        <div className="flex flex-1 flex-col items-start justify-center">
          {/* Pill label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-foreground/12 bg-foreground/[0.02] px-4 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              Cairo, Egypt
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mt-8 max-w-[520px] text-[clamp(2.2rem,5.2vw,4rem)] font-bold leading-[1.06] tracking-[-0.03em]"
          >
            Creative{" "}
            <span className="relative inline-block">
              experiences
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.8 }}
                className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] origin-left rounded-full bg-secondary"
              />
            </span>
            <br />
            worth{" "}
            <span className="text-primary">remembering</span>
            <span className="text-secondary">.</span>
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            className="mt-6 max-w-[420px] text-[15px] leading-[1.7] text-muted-foreground"
          >
            Curated outings, hands-on workshops, and original products —
            designed to make every moment more memorable.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg" variant="brand" className="group">
              <Link to={ROUTES.EXPERIENCES}>
                Explore experiences
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={ROUTES.SHOP}>Visit shop</Link>
            </Button>
          </motion.div>

          {/* Micro social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.7 }}
            className="mt-12 flex items-center gap-3"
          >
            <div className="flex -space-x-1.5">
              {["bg-primary", "bg-secondary", "bg-accent"].map((c, i) => (
                <div
                  key={i}
                  className={`h-5 w-5 rounded-full border-2 border-background ${c}`}
                />
              ))}
            </div>
            <p className="font-display text-[11px] font-medium text-muted-foreground">
              500+ guests hosted
            </p>
          </motion.div>
        </div>

        {/* ── Right: Visual composition ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mt-12 flex flex-1 items-center justify-center lg:mt-0"
        >
          <HeroComposition />
        </motion.div>
      </div>
    </section>
  );
}
