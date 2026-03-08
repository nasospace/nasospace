import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, springBouncy } from "@/lib/motion";
import { FlowerShape, MagneticButton } from "@/components/shared";
import { ROUTES } from "@/config/routes";

export function InquirySuccessState() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="flex flex-col items-center py-12 text-center md:py-20"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={springBouncy}
      >
        <FlowerShape size={72} className="text-secondary naso-flower-spin" />
      </motion.div>

      <h2 className="mt-6 font-groovy text-2xl font-bold sm:text-3xl">
        Request sent!
      </h2>

      <p className="mt-3 max-w-sm text-sm text-muted-foreground md:text-base">
        Thanks for reaching out. We'll review your request and get back to you
        within 24 hours — check your email.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <MagneticButton
          to={ROUTES.EXPERIENCES}
          className="rounded-full border-[2.5px] border-foreground bg-card px-6 py-2.5 font-groovy text-[10px] font-bold uppercase tracking-wider shadow-retro transition-shadow hover:shadow-retro-lg"
        >
          Browse Experiences
        </MagneticButton>
        <MagneticButton
          to={ROUTES.WORKSHOPS}
          className="rounded-full border-[2.5px] border-foreground bg-secondary px-6 py-2.5 font-groovy text-[10px] font-bold uppercase tracking-wider text-secondary-foreground shadow-retro transition-shadow hover:shadow-retro-lg"
        >
          Browse Workshops
        </MagneticButton>
      </div>
    </motion.div>
  );
}
