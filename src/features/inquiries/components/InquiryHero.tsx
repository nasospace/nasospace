import { motion } from "framer-motion";
import { staggerHero, charRevealDelay, fadeUpDelay } from "@/lib/motion";
import { Section, StickerBadge } from "@/components/shared";
import type { InquiryPageContext } from "../types";

interface InquiryHeroProps {
  context: InquiryPageContext;
}

export function InquiryHero({ context }: InquiryHeroProps) {
  const hasBookingContext = context.ref && context.title;

  return (
    <Section spacing="lg" fullBleed className="relative overflow-hidden bg-naso-cream">
      <div className="naso-dotgrid absolute inset-0" />
      <div className="container relative">
        <motion.div
          variants={staggerHero}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 py-4 md:py-6"
        >
          {hasBookingContext && (
            <motion.div variants={fadeUpDelay(0)}>
              <StickerBadge variant="filled" rotate={-2} className="bg-secondary text-secondary-foreground">
                {context.ref === "workshop" ? "🎨" : "🌿"}{" "}
                Booking Request
              </StickerBadge>
            </motion.div>
          )}

          <motion.h1
            variants={charRevealDelay(0.1)}
            className="font-groovy text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl"
          >
            {hasBookingContext ? "Let's book it" : "Get in touch"}
          </motion.h1>

          <motion.p
            variants={fadeUpDelay(0.3)}
            className="max-w-lg text-base text-muted-foreground md:text-lg"
          >
            {hasBookingContext
              ? `You're requesting a spot for "${context.title}". Fill in a few details and we'll get back to you within 24 hours.`
              : "Questions, bookings, collaborations, or just saying hi — we'd love to hear from you."}
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}
