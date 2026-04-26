import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, Map } from "lucide-react";
import { SEOHead } from "@/components/shared/SEOHead";
import { FlowerShape, Sparkle } from "@/components/shared/RetroElements";
import { ROUTES } from "@/config/routes";

const NotFound = () => {
  return (
    <>
      <SEOHead
        title="Lost in space — NASO"
        description="This page doesn't exist — but there's plenty more to explore."
        noindex
      />

      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 naso-dotgrid opacity-10" />
        <div className="absolute inset-0 naso-noise opacity-30" />

        {/* Decorative floating elements */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: -40, rotate: -45 }}
          animate={{ opacity: 0.7, y: 0, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[8%] top-[18%] hidden md:block"
        >
          <FlowerShape size={110} className="text-secondary naso-flower-spin" />
        </motion.div>
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.5, rotate: 30 }}
          animate={{ opacity: 0.55, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[10%] bottom-[18%] hidden md:block"
        >
          <FlowerShape size={140} className="text-naso-lilac naso-flower-spin" />
        </motion.div>
        <motion.div
          aria-hidden
          animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[18%] top-[22%]"
        >
          <Sparkle className="h-7 w-7 text-secondary" />
        </motion.div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-secondary" />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
              Off the map
            </span>
            <span className="h-px w-8 bg-secondary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-groovy font-black leading-[0.85] tracking-[-0.05em] text-[clamp(7rem,22vw,18rem)]"
            style={{ textShadow: "0 4px 50px hsl(var(--secondary) / 0.4)" }}
          >
            4
            <span
              className="italic font-normal text-secondary"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              0
            </span>
            4
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-2 max-w-md font-body text-sm text-background/70 sm:text-base"
          >
            This page slipped through our cracks. The good news: there's still
            a lot of NASO worth your time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              to={ROUTES.HOME}
              className="group inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-4 font-groovy text-sm font-black uppercase tracking-[0.15em] text-foreground shadow-[4px_4px_0_hsl(var(--background))] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_hsl(var(--background))] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_hsl(var(--background))]"
            >
              <Home className="h-4 w-4" />
              Take me home
            </Link>

            <Link
              to={ROUTES.EXPERIENCES}
              className="group inline-flex items-center gap-2 rounded-full border-2 border-background/40 bg-transparent px-7 py-4 font-groovy text-sm font-black uppercase tracking-[0.15em] text-background transition-all duration-200 hover:border-background hover:bg-background/10"
            >
              <Map className="h-4 w-4" />
              Browse experiences
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
