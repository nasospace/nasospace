import { PageHero } from "@/components/shared";
import { StickerBadge } from "@/components/shared/RetroElements";
import type { InquiryPageContext } from "../types";

interface InquiryHeroProps {
  context: InquiryPageContext;
}

export function InquiryHero({ context }: InquiryHeroProps) {
  const hasBookingContext = context.ref && context.title;

  return (
    <PageHero
      tone="cream"
      eyebrow={hasBookingContext ? "Custom request" : "Special requests"}
      title={hasBookingContext ? "Build it" : "Reach out."}
      accent={hasBookingContext ? "with us." : "We make it real."}
      subtitle={
        hasBookingContext
          ? `You're requesting a spot for "${context.title}". Fill in a few details — we reply within 24 hours.`
          : "Questions, bookings, collaborations, or just saying hi — drop us a line and we'll get back fast."
      }
      marker={hasBookingContext ? "REQ" : "ASK"}
    >
      {hasBookingContext && (
        <StickerBadge variant="filled" rotate={-2} className="bg-secondary text-secondary-foreground">
          ✦ Custom Bookings
        </StickerBadge>
      )}
    </PageHero>
  );
}
