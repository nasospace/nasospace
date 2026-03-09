import { Link } from "react-router-dom";
import { Section } from "./Section";
import { MotionDiv } from "./MotionDiv";
import { Button } from "@/components/ui/button";
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
        className="mx-auto max-w-2xl rounded-3xl border border-border bg-card px-8 py-12 md:px-14 md:py-16 text-center shadow-soft"
      >
        <h2 className="font-groovy text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {headline}
        </h2>

        {description && (
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {description}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to={primaryAction.href}>{primaryAction.label}</Link>
          </Button>

          {secondaryAction && (
            <Button asChild variant="outline" size="lg">
              <Link to={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          )}
        </div>
      </MotionDiv>
    </Section>
  );
}
