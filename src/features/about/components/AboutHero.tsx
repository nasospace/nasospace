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
      tone="ink"
      eyebrow="The Manifesto"
      title={h}
      accent=""
      subtitle={s}
      marker="EST · 24"
    />
  );
}
