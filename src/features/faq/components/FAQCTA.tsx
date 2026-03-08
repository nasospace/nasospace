import { Link } from "react-router-dom";
import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export function FAQCTA() {
  return (
    <Section className="bg-card">
      <MotionDiv className="mx-auto max-w-xl text-center">
        <h2 className="font-groovy text-2xl font-bold">
          Still have questions?
        </h2>
        <p className="mt-3 text-muted-foreground">
          No worries — reach out and we'll get back to you personally.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to={ROUTES.CONTACT}>Contact us</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to={ROUTES.INQUIRIES}>Submit an inquiry</Link>
          </Button>
        </div>
      </MotionDiv>
    </Section>
  );
}
