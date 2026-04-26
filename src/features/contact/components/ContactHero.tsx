import { PageHero } from "@/components/shared";

interface ContactHeroProps {
  headline?: string;
  subline?: string;
}

export function ContactHero({ headline, subline }: ContactHeroProps) {
  return (
    <PageHero
      tone="coral"
      eyebrow="Connect with NASO"
      title={headline || "Say it."}
      accent="We're listening."
      subtitle={
        subline ||
        "Questions, collabs, private events, or just hi — we read everything and reply within 24–48 hours."
      }
      marker="HI"
    />
  );
}
