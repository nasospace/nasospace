import { SEOHead, Section } from "@/components/shared";
import {
  TestimonialsHero,
  TestimonialGrid,
  TestimonialsCTA,
  testimonials,
} from "@/features/testimonials";

export default function CommunityLove() {
  return (
    <>
      <SEOHead
        title="Community Love"
        description="Real stories from real humans. Memories, tiny revelations, and happy tears from NASO experiences, workshops, and events."
      />

      <TestimonialsHero />

      <Section>
        <TestimonialGrid testimonials={testimonials} />
      </Section>

      <TestimonialsCTA />
    </>
  );
}
