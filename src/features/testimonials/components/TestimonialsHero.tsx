import { Section, SectionHeader } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function TestimonialsHero() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <MotionDiv
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <MotionDiv variants={fadeUp}>
          <SectionHeader
            eyebrow="Community Love"
            title="Real stories from real humans"
            description="We don't do testimonials. We collect memories, tiny revelations, and the occasional happy tear. Here's what people say when they think we're not listening."
            align="center"
          />
        </MotionDiv>

        <MotionDiv
          variants={fadeUp}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          <span>From experiences, workshops, events &amp; more</span>
        </MotionDiv>
      </MotionDiv>
    </Section>
  );
}
