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
      <div className="pointer-events-none absolute inset-0 naso-grid-bg opacity-[0.35]" />

      <div className="container relative flex min-h-[calc(100svh-72px)] flex-col justify-center py-16 lg:flex-row lg:items-center lg:gap-12 lg:py-0 xl:gap-20">
        {/* ── Left: Content zone ── */}
        <div className="flex flex-1 flex-col items-start justify-center">
          {/* Pill label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              Cairo, Egypt
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mt-7 max-w-xl text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.025em]"
          >
            Creative{" "}
            <span className="relative inline-block">
              experiences
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.8 }}
                className="absolute -bottom-0.5 left-0 right-0 h-[3px] origin-left rounded-full bg-secondary"
              />
            </span>
            <br />
            worth remembering
            <span className="text-primary">.</span>
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground"
          >
            Curated outings, hands-on workshops, and original products — designed to make every moment more memorable.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg" className="group">
              <Link to={ROUTES.EXPERIENCES}>
                Explore experiences
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={ROUTES.SHOP}>Visit shop</Link>
            </Button>
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
