import { motion } from "framer-motion";
import { staggerHero, charRevealDelay, fadeUpDelay, stickerDrop } from "@/lib/motion";
import { Section, FlowerShape, Sparkle } from "@/components/shared";

export function PortfolioHero() {
  return (
    <Section
      spacing="lg"
      fullBleed
      className="relative overflow-hidden bg-naso-lilac naso-dotgrid"
    >
      <div className="container relative">
        <motion.div
          variants={staggerHero}
          initial="hidden"
          animate="visible"
          className="flex min-h-[220px] flex-col items-start justify-center py-8 md:min-h-[280px]"
        >
          <motion.h1
            variants={charRevealDelay(0.1)}
            className="font-groovy text-5xl font-bold leading-[1.05] md:text-7xl"
          >
            Our World
          </motion.h1>

          <motion.p
            variants={fadeUpDelay(0.3)}
            className="mt-4 max-w-lg text-base text-foreground/70 md:text-lg"
          >
            Real moments, real people, real magic. Every story here is proof of what happens when you let NASO handle the details.
          </motion.p>
        </motion.div>

        {/* Decorative accents */}
        <motion.div
          variants={stickerDrop(0.5, 15)}
          initial="hidden"
          animate="visible"
          className="absolute right-6 top-8 hidden text-naso-coral md:block"
        >
          <FlowerShape size={56} className="naso-flower-spin" />
        </motion.div>

        <motion.div
          variants={stickerDrop(0.7, -10)}
          initial="hidden"
          animate="visible"
          className="absolute bottom-6 left-8 hidden text-naso-purple md:block"
        >
          <Sparkle className="h-6 w-6" />
        </motion.div>
      </div>
    </Section>
  );
}
