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
 * Keeps a lightweight feel with single headline + up to 2 buttons.
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
        className="mx-auto max-w-xl rounded-3xl border-2 border-foreground/10 bg-card p-8 md:p-12 text-center shadow-soft"
      >
        <h2 className="font-groovy text-2xl md:text-3xl font-bold text-foreground">
          {headline}
        </h2>

        {description && (
          <p className="mt-4 text-muted-foreground leading-relaxed">
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
