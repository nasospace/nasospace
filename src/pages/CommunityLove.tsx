import { SEOHead, Section } from "@/components/shared";
import {
  TestimonialsHero,
  TestimonialGrid,
  TestimonialsCTA,
} from "@/features/testimonials";
import { useTestimonials } from "@/features/testimonials/hooks/useTestimonials";
import { Skeleton } from "@/components/ui/skeleton";

export default function CommunityLove() {
  const { data: testimonials = [], isLoading } = useTestimonials();

  return (
    <>
      <SEOHead
        title="Community Love"
        description="Real stories from real humans. Memories, tiny revelations, and happy tears from NASO experiences, workshops, and events."
      />

      <TestimonialsHero />

      <Section spacing="default">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No testimonials yet — stay tuned!</p>
          </div>
        ) : (
          <TestimonialGrid testimonials={testimonials} />
        )}
      </Section>

      <TestimonialsCTA />
    </>
  );
}
