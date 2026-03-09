import { TrustCTA } from "@/components/shared/TrustCTA";
import { ROUTES } from "@/config/routes";

export function TestimonialsCTA() {
  return (
    <TrustCTA
      headline="Ready to make your own memories?"
      description="Whether it's an adventure, a workshop, or something wildly custom — let's create something you'll actually remember."
      primaryAction={{
        label: "Explore Experiences",
        href: ROUTES.EXPERIENCES,
      }}
      secondaryAction={{
        label: "Start an Inquiry",
        href: ROUTES.INQUIRIES,
      }}
    />
  );
}
