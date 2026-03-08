import { motion } from "framer-motion";
import { staggerHero, charRevealDelay, fadeUpDelay, stickerDrop } from "@/lib/motion";
import { Section, FlowerShape, Sparkle } from "@/components/shared";

export function WorkshopHero() {
  return (
    <Section spacing="lg" fullBleed className="relative overflow-hidden bg-naso-cream">
      {/* Textured background — grid instead of dotgrid for a studio/maker feel */}
      <div className="naso-grid-bg absolute inset-0" />

      <div className="container relative">
        <motion.div
          variants={staggerHero}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 py-4 md:py-6"
        >
          <motion.h1
            variants={charRevealDelay(0.1)}
            className="font-groovy text-5xl font-bold leading-[0.95] md:text-7xl"
          >
            Workshops
          </motion.h1>

          <motion.p
            variants={fadeUpDelay(0.3)}
            className="max-w-md font-display text-base text-muted-foreground md:text-lg"
          >
            Hands-on making, learning, and creating across Cairo.
          </motion.p>
        </motion.div>

        {/* Decorative accents — different placement than Experiences hero */}
        <motion.div
          variants={stickerDrop(0.5, 12)}
          initial="hidden"
          animate="visible"
          className="pointer-events-none absolute -right-2 top-6 text-naso-coral md:right-8 md:top-4"
        >
          <FlowerShape size={52} className="naso-flower-spin opacity-50" />
        </motion.div>

        <motion.div
          variants={stickerDrop(0.7, -8)}
          initial="hidden"
          animate="visible"
          className="pointer-events-none absolute bottom-8 right-20 text-accent md:bottom-4 md:right-32"
        >
          <Sparkle className="h-5 w-5 opacity-40" />
        </motion.div>

        <motion.div
          variants={stickerDrop(0.6, 6)}
          initial="hidden"
          animate="visible"
          className="pointer-events-none absolute bottom-12 left-[60%] text-naso-lemon md:bottom-6"
        >
          <Sparkle className="h-4 w-4 opacity-30" />
        </motion.div>
      </div>
    </Section>
  );
}
