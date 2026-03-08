import { motion } from "framer-motion";
import { staggerHero, charRevealDelay, fadeUpDelay, stickerDrop } from "@/lib/motion";
import { Section, Sparkle } from "@/components/shared";

export function BlogHero() {
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
          className="flex min-h-[200px] flex-col items-start justify-center py-8 md:min-h-[260px]"
        >
          <motion.h1
            variants={charRevealDelay(0.1)}
            className="font-groovy text-4xl font-bold leading-[1.05] md:text-6xl"
          >
            Stories & Ideas
          </motion.h1>

          <motion.p
            variants={fadeUpDelay(0.3)}
            className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Creative inspiration, Cairo discoveries, behind-the-scenes moments,
            and ideas for living a more interesting life.
          </motion.p>
        </motion.div>

        {/* Single subtle accent */}
        <motion.div
          variants={stickerDrop(0.6, 8)}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 right-8 hidden text-accent md:block"
        >
          <Sparkle className="h-5 w-5" />
        </motion.div>
      </div>
    </Section>
  );
}
