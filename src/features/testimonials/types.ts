export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  sourceType: "experience" | "workshop" | "event" | "product" | "general";
  contextTag?: string;
  image?: string;
}
