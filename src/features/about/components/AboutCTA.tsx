import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { FlowerShape } from "@/components/shared/RetroElements";
import { ROUTES } from "@/config/routes";
import { popIn } from "@/lib/motion";

export function AboutCTA() {
  return (
    <Section className="relative overflow-hidden">
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

      <MotionDiv className="relative z-10 mx-auto max-w-2xl text-center">
        <MotionDiv variants={popIn} className="mb-6 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <FlowerShape size={40} className="text-primary" />
          </motion.div>
        </MotionDiv>

        <h2 className="font-groovy text-[clamp(1.5rem,4vw,2.5rem)] font-bold">
          Ready to do something <span className="text-primary">worth remembering?</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Browse our experiences, join a workshop, or tell us what you're dreaming up.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to={ROUTES.EXPERIENCES}>Explore experiences</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to={ROUTES.INQUIRIES}>Get in touch</Link>
          </Button>
        </div>
      </MotionDiv>
    </Section>
  );
}
