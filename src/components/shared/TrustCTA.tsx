import { Link } from "react-router-dom";
import { Section } from "./Section";
import { MotionDiv } from "./MotionDiv";
import { MagneticButton, Sparkle } from "./RetroElements";
import { fadeUp } from "@/lib/motion";

interface CTAAction {
  label: string;
  href: string;
}

interface TrustCTAProps {
  headline: string;
  description?: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
  className?: string;
}

/**
 * TrustCTA — Reusable warm, inviting call-to-action section.
 * Elevated with retro border, noise texture, and magnetic buttons.
 */
export function TrustCTA({
  headline,
  description,
  primaryAction,
  secondaryAction,
  className,
}: TrustCTAProps) {
  return (
    <Section className={className}>
      <MotionDiv
        variants={fadeUp}
        className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border-[2.5px] border-foreground bg-card px-8 py-12 md:px-14 md:py-16 text-center shadow-retro"
      >
        <div className="absolute inset-0 naso-dotgrid opacity-30" />
        <div className="absolute inset-0 naso-noise" />
        <div className="relative z-10">
          <Sparkle className="mx-auto mb-4 h-5 w-5 text-primary/40" />
          <h2 className="font-groovy text-[clamp(1.4rem,3.5vw,2.2rem)] font-bold text-foreground leading-tight">
            {headline}
          </h2>

          {description && (
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg mx-auto">
              {description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              to={primaryAction.href}
              className="inline-flex h-12 items-center gap-2 rounded-full border-[2.5px] border-foreground bg-foreground px-7 font-groovy text-[11px] font-bold uppercase tracking-[0.1em] text-background shadow-retro transition-all hover:shadow-retro-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              {primaryAction.label}
            </MagneticButton>

            {secondaryAction && (
              <MagneticButton
                to={secondaryAction.href}
                className="inline-flex h-12 items-center rounded-full border-[2.5px] border-foreground bg-card px-7 font-groovy text-[11px] font-bold uppercase tracking-[0.1em] text-foreground shadow-retro transition-all hover:bg-secondary hover:shadow-retro-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                {secondaryAction.label}
              </MagneticButton>
            )}
          </div>
        </div>
      </MotionDiv>
    </Section>
  );
}
