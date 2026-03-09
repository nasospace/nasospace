import { TestimonialCard } from "./TestimonialCard";
import type { Testimonial } from "../types";

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          index={index}
          featured={index === 0 || index === 6}
        />
      ))}
    </div>
  );
}
