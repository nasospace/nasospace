import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Sparkle, FlowerShape } from "@/components/shared/RetroElements";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function TestimonialsHero() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 naso-dotgrid pointer-events-none" />

      {/* Decorative elements — subtle, branded */}
      <motion.div
        className="absolute top-16 right-[10%] text-primary/10 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <FlowerShape size={100} />
      </motion.div>
      <motion.div
        className="absolute bottom-12 left-[8%] text-accent/10 pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkle className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute top-1/3 left-[5%] text-secondary/10 pointer-events-none"
        animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkle className="w-5 h-5" />
      </motion.div>

      <MotionDiv
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <MotionDiv variants={fadeUp}>
          <SectionHeader
            eyebrow="Community Love"
            title="Real stories from real humans"
            description="We don't do testimonials. We collect memories, tiny revelations, and the occasional happy tear. Here's what people say when they think we're not listening."
            align="center"
          />
        </MotionDiv>

        <MotionDiv
          variants={fadeUp}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <motion.span
            className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>From experiences, workshops, events &amp; more</span>
        </MotionDiv>
      </MotionDiv>
    </Section>
  );
}
