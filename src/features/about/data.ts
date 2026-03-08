export const aboutHero = {
  headline: "We don't do ordinary.",
  subline:
    "NASO is a Cairo-born creative world — designing experiences, workshops, events, and products for people who want their free time to actually mean something.",
};

export interface OfferingItem {
  emoji: string;
  title: string;
  description: string;
}

export const offerings: OfferingItem[] = [
  {
    emoji: "🌿",
    title: "Experiences",
    description:
      "Curated outings across Cairo that turn a random weekend into a core memory.",
  },
  {
    emoji: "🎨",
    title: "Workshops",
    description:
      "Hands-on creative sessions — pottery, art, cooking, and more — led by passionate makers.",
  },
  {
    emoji: "🎉",
    title: "Private Events",
    description:
      "Custom-designed gatherings for friends, couples, or teams — every detail handled.",
  },
  {
    emoji: "🛍️",
    title: "Shop",
    description:
      "Original NASO products and creative goods — things you'll actually want to keep.",
  },
];

export interface ValueItem {
  title: string;
  body: string;
}

export const values: ValueItem[] = [
  {
    title: "Human over hustle",
    body: "We're not a tech startup. We're people who love good moments — and build them for others.",
  },
  {
    title: "Cairo at heart",
    body: "Every experience is rooted in the city we love. Cairo's energy, chaos, and beauty fuel everything we do.",
  },
  {
    title: "Details matter",
    body: "From the playlist to the packaging — if it doesn't feel right, it doesn't go out.",
  },
  {
    title: "Creativity first",
    body: "We'd rather do one thing that's unforgettable than ten things that are fine.",
  },
];
