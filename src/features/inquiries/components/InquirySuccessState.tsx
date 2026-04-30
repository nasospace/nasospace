import { motion } from "framer-motion";
import { fadeUp, springBouncy } from "@/lib/motion";
import { FlowerShape, MagneticButton } from "@/components/shared";
import { ROUTES } from "@/config/routes";

interface InquirySuccessStateProps {
  referenceId?: string;
}

export function InquirySuccessState({ referenceId }: InquirySuccessStateProps) {
  // Short, human-friendly reference (last 6 chars of UUID, uppercase)
  const shortRef = referenceId ? referenceId.slice(-6).toUpperCase() : null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      role="status"
      aria-live="polite"
      className="flex flex-col items-center py-12 text-center md:py-20"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={springBouncy}
      >
        <FlowerShape size={72} className="text-secondary naso-flower-spin" aria-hidden="true" />
      </motion.div>

      <h2 className="mt-6 font-groovy text-2xl font-bold sm:text-3xl">
        Request sent! ✦
      </h2>

      <p className="mt-3 max-w-sm text-sm text-muted-foreground md:text-base">
        Thanks for reaching out. We'll review your request and get back to you within{" "}
        <strong className="text-foreground">24 hours</strong> via email.
      </p>

      {shortRef && (
        <div className="mt-5 rounded-xl border-2 border-foreground bg-card px-4 py-2.5 shadow-retro-sm">
          <p className="font-display text-[10px] uppercase tracking-wider text-muted-foreground">
            Reference
          </p>
          <p className="font-groovy text-sm font-bold tracking-wider">#{shortRef}</p>
        </div>
      )}

      <p className="mt-4 max-w-sm text-xs text-muted-foreground">
        Keep an eye on your inbox (and spam folder, just in case). You can track this request anytime from{" "}
        <a href={ROUTES.ACCOUNT_REQUESTS} className="font-semibold text-foreground underline underline-offset-2">
          Your Account
        </a>
        .
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <MagneticButton
          to={ROUTES.EXPERIENCES}
          className="rounded-full border-[2.5px] border-foreground bg-secondary px-6 py-2.5 font-groovy text-[10px] font-bold uppercase tracking-wider text-secondary-foreground shadow-retro transition-shadow hover:shadow-retro-lg"
        >
          Browse Experiences
        </MagneticButton>
        <MagneticButton
          to={ROUTES.SHOP}
          className="rounded-full border-[2.5px] border-foreground bg-card px-6 py-2.5 font-groovy text-[10px] font-bold uppercase tracking-wider shadow-retro transition-shadow hover:shadow-retro-lg"
        >
          Visit Shop
        </MagneticButton>
      </div>
    </motion.div>
  );
}
