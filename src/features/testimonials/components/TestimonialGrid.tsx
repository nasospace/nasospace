import { TestimonialCard } from "./TestimonialCard";
import type { Testimonial } from "../types";

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          // Feature the first and sixth items for visual rhythm
          featured={index === 0 || index === 5}
        />
      ))}
    </div>
  );
}
