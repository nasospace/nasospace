import { motion } from "framer-motion";
import { staggerSlow, fadeUp, popIn } from "@/lib/motion";
import { StickerBadge } from "@/components/shared/RetroElements";

interface ContactHeroProps {
  headline?: string;
  subline?: string;
}

export function ContactHero({ headline, subline }: ContactHeroProps) {
  return (
    <section className="relative overflow-hidden bg-card py-section-lg">
      <div className="absolute inset-0 naso-halftone opacity-40" />
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerSlow}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={popIn} className="flex justify-center">
            <StickerBadge variant="filled" className="bg-naso-coral text-background" rotate={2}>
              Say hello ✦
            </StickerBadge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 font-groovy text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1]"
          >
            {headline || "Let's talk"}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-muted-foreground lg:text-lg"
          >
            {subline || "Whether you have a question, want to collaborate, or just want to say hi — we'd love to hear from you."}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
