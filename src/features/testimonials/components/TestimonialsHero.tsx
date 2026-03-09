import { Section, SectionHeader } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { FlowerShape } from "@/components/shared/RetroElements";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function TestimonialsHero() {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-12 right-8 opacity-10 pointer-events-none">
        <FlowerShape size={120} className="text-primary naso-flower-spin" />
      </div>
      <div className="absolute bottom-8 left-4 opacity-10 pointer-events-none">
        <FlowerShape size={80} className="text-secondary" />
      </div>

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
          className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          <span>From experiences, workshops, events & more</span>
        </MotionDiv>
      </MotionDiv>
    </Section>
  );
}
