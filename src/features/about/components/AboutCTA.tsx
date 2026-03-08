import { Link } from "react-router-dom";
import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export function AboutCTA() {
  return (
    <Section>
      <MotionDiv className="mx-auto max-w-2xl text-center">
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
