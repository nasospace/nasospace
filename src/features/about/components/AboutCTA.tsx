import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { MagneticButton, FlowerShape } from "@/components/shared/RetroElements";
import { ROUTES } from "@/config/routes";
import { popIn } from "@/lib/motion";

export function AboutCTA() {
  return (
    <Section className="relative overflow-hidden bg-primary/5">
      {/* Decorative flowers */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.15, scale: 1, rotate: 20 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -left-8 bottom-4 hidden lg:block"
      >
        <FlowerShape size={120} className="text-naso-purple" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.12, scale: 1, rotate: -15 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="absolute -right-6 top-8 hidden lg:block"
      >
        <FlowerShape size={90} className="text-secondary" />
      </motion.div>

      <MotionDiv className="relative z-10 mx-auto max-w-4xl text-center">
        <MotionDiv variants={popIn} className="mb-6 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <FlowerShape size={40} className="text-primary" />
          </motion.div>
        </MotionDiv>

        <h2 className="font-groovy text-[clamp(2.5rem,6vw,4rem)] font-black leading-[0.9] tracking-tighter text-foreground uppercase">
          EGYPT'S MOST EXCLUSIVE EXPERIENCES <br/><span className="text-primary inline-block rotate-[-2deg] scale-110 mt-2 filter drop-shadow-[4px_4px_0_hsl(var(--foreground))]">ARE WAITING.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg md:text-xl font-medium leading-relaxed text-foreground/70">
          Stop existing and start living. Dive into our latest experiences or tell us what you're dreaming up. Let's make some noise.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <MagneticButton
            to={ROUTES.EXPERIENCES}
            className="group inline-flex h-16 items-center justify-center gap-3 rounded-full border-4 border-foreground bg-primary px-10 font-groovy text-sm md:text-base font-black uppercase tracking-[0.15em] text-naso-black shadow-[6px_6px_0_hsl(var(--foreground))] transition-all hover:scale-105 hover:bg-naso-pink hover:shadow-[10px_10px_0_hsl(var(--foreground))] active:scale-95 active:shadow-[2px_2px_0_hsl(var(--foreground))]"
          >
            Explore experiences
          </MagneticButton>
          <MagneticButton
            to={ROUTES.INQUIRIES}
            className="group inline-flex h-16 items-center justify-center gap-3 rounded-full border-4 border-foreground bg-white px-10 font-groovy text-sm md:text-base font-black uppercase tracking-[0.15em] text-naso-black shadow-[6px_6px_0_hsl(var(--foreground))] transition-all hover:scale-105 hover:bg-naso-blue hover:text-white hover:shadow-[10px_10px_0_hsl(var(--foreground))] active:scale-95 active:shadow-[2px_2px_0_hsl(var(--foreground))]"
          >
            Get in touch
          </MagneticButton>
        </div>
      </MotionDiv>
    </Section>
  );
}
