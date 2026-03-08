import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { MotionDiv } from "@/components/shared/MotionDiv";
import {
  FlowerShape,
  Sparkle,
  MagneticButton,
} from "@/components/shared/RetroElements";
import { staggerContainer, fadeUp, popIn } from "@/lib/motion";

export function BigCTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-section-lg text-primary-foreground">
      <div className="absolute inset-0 naso-dotgrid opacity-10" />

      <MotionDiv variants={popIn} className="absolute right-[10%] top-[15%] opacity-25 rotate-[15deg]">
        <Sparkle className="h-12 w-12 text-primary-foreground" />
      </MotionDiv>
      <MotionDiv variants={popIn} className="absolute left-[8%] bottom-[20%] opacity-15">
        <FlowerShape size={60} className="text-primary-foreground naso-flower-spin" />
      </MotionDiv>

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-groovy text-[clamp(2rem,6vw,4rem)] font-black leading-[1] text-primary-foreground"
          >
            Ready to go out
            <br />
            differently?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-base text-primary-foreground/70 lg:text-lg"
          >
            Join the NASO universe. Explore experiences, book workshops, and find
            your next favorite thing.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton
              to={ROUTES.EXPERIENCES}
              className="group inline-flex h-[54px] items-center gap-2.5 rounded-full border-[2.5px] border-primary-foreground bg-primary-foreground px-8 font-groovy text-xs font-bold uppercase tracking-[0.1em] text-primary shadow-retro transition-all hover:shadow-retro-lg active:scale-[0.96]"
            >
              Explore now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              to={ROUTES.SHOP}
              className="inline-flex h-[54px] items-center rounded-full border-[2.5px] border-primary-foreground/40 px-8 font-groovy text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:border-primary-foreground hover:bg-primary-foreground/10 active:scale-[0.96]"
            >
              Shop NASO
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
