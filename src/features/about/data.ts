export const aboutHero = {
  headline: "This is NASO.",
  subline:
    "We build worlds. We design the moments you didn't know you needed. NASO is Cairo's creative pulse—where experiences, artifacts, and connection collide.",
};

export interface OfferingItem {
  emoji: string;
  title: string;
  description: string;
}

export const offerings: OfferingItem[] = [
  {
    emoji: "🔮",
    title: "Experiences",
    description:
      "Curated trips and immersive gatherings designed to shake up your routine and unlock new perspectives.",
  },
  {
    emoji: "🛠️",
    title: "Workshops",
    description:
      "Get your hands dirty. Real-world creative sessions led by Cairo's most passionate makers and doers.",
  },
  {
    emoji: "🥂",
    title: "Private Events",
    description:
      "Bespoke gatherings tailored to your exact vibe. From intimate dinners to high-energy celebrations.",
  },
  {
    emoji: "📦",
    title: "Artifacts",
    description:
      "Tangible pieces of the NASO world. Goods, kits, and products designed with intention and brutalist flair.",
  },
];

export interface ValueItem {
  title: string;
  body: string;
}

export const values: ValueItem[] = [
  {
    title: "Vibe is everything",
    body: "We obsess over the invisible details. The lighting, the sound, the energy—if it doesn't feel alive, we don't do it.",
  },
  {
    title: "Cairo DNA",
    body: "We are shaped by this city's beautiful chaos. Our work reflects its raw edge, its hidden beauty, and its relentless pulse.",
  },
  {
    title: "Radical Intentionality",
    body: "Every experience, every product, every pixel is placed with purpose. We reject the generic and embrace the bold.",
  },
  {
    title: "Community First",
    body: "We don't just host events; we build culture. NASO is a space for the curious, the creative, and the unapologetic.",
  },
];
