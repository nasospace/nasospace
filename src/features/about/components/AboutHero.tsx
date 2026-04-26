import { PageHero } from "@/components/shared";
import { aboutHero } from "../data";

interface AboutHeroProps {
  headline?: string;
  subline?: string;
}

export function AboutHero({ headline, subline }: AboutHeroProps) {
  const h = headline ?? aboutHero.headline;
  const s = subline ?? aboutHero.subline;

  return (
    <PageHero
      cmsPageKey="about"
      tone="lilac"
      eyebrow="The NASO Manifesto"
      title={h}
      accent="Built in Cairo."
      subtitle={s}
      marker="EST · 24"
    />
  );
}
