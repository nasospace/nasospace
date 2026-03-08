import { motion } from "framer-motion";
import { staggerHero, charRevealDelay, fadeUpDelay, stickerDrop } from "@/lib/motion";
import { Section, FlowerShape, Sparkle } from "@/components/shared";

export function ShopHero() {
  return (
    <Section
      spacing="lg"
      fullBleed
      className="relative overflow-hidden bg-naso-cream naso-dotgrid"
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
            The NASO Shop
          </motion.h1>

          <motion.p
            variants={fadeUpDelay(0.3)}
            className="mt-4 max-w-md text-base text-muted-foreground md:text-lg"
          >
            Curated objects, creative tools, and limited drops — made in Cairo.
          </motion.p>
        </motion.div>

        {/* Decorative accents */}
        <motion.div
          variants={stickerDrop(0.5, 12)}
          initial="hidden"
          animate="visible"
          className="absolute right-6 top-8 hidden text-naso-coral md:block"
        >
          <FlowerShape size={56} className="naso-flower-spin" />
        </motion.div>

        <motion.div
          variants={stickerDrop(0.7, -8)}
          initial="hidden"
          animate="visible"
          className="absolute bottom-6 left-8 hidden text-primary md:block"
        >
          <Sparkle className="h-6 w-6" />
        </motion.div>
      </div>
    </Section>
  );
}
