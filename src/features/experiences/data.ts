import type { ExperienceDetail } from "./types";

export const MOCK_EXPERIENCES: ExperienceDetail[] = [
  {
    id: "exp-001",
    createdAt: "2025-01-15",
    updatedAt: "2025-03-01",
    title: "Sunset at the Citadel",
    slug: "sunset-at-the-citadel",
    summary: "Golden-hour views over Cairo's skyline from the medieval Citadel walls.",
    description:
      "Join us for a magical evening at the Saladin Citadel as the sun dips below Cairo's sprawling skyline. We'll explore the mosque courtyards, catch the golden light bouncing off minarets, and end with mint tea on the terrace. Photographers, dreamers, and sunset chasers — this one's for you.",
    category: "outing",
    tags: ["sunset", "photography", "history", "views"],
    date: "2026-04-12",
    location: "Saladin Citadel, Cairo",
    price: 350,
    currency: "EGP",
    capacity: 25,
    difficulty: "easy",
    coverImage: { src: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80", alt: "Sunset at the Citadel" },
    gallery: [],
    featured: true,
  },
  {
    id: "exp-002",
    createdAt: "2025-02-01",
    updatedAt: "2025-03-01",
    title: "Pottery & Chill",
    slug: "pottery-and-chill",
    summary: "Get your hands dirty in Old Cairo's coolest ceramics studio.",
    description:
      "Spend an afternoon learning the basics of wheel-throwing and hand-building at a hidden studio in Old Cairo. No experience needed — just vibes, clay, and good company. Take home your creation after it's kiln-fired the following week.",
    category: "workshop",
    tags: ["ceramics", "hands-on", "art", "relaxing"],
    date: "2026-04-18",
    location: "Old Cairo Studio, Fustat",
    price: 500,
    currency: "EGP",
    capacity: 12,
    difficulty: "easy",
    coverImage: { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80", alt: "Pottery & Chill" },
    gallery: [],
    featured: true,
  },
  {
    id: "exp-003",
    createdAt: "2025-02-10",
    updatedAt: "2025-03-01",
    title: "Cairo Jazz Night",
    slug: "cairo-jazz-night",
    summary: "Live jazz, dim lights, and the best cocktails downtown has to offer.",
    description:
      "An intimate evening of live jazz at one of downtown Cairo's legendary venues. Expect soulful sets from local musicians, creative cocktails, and a crowd that knows how to listen. Doors open at 8 PM — grab a seat early.",
    category: "nightlife",
    tags: ["music", "jazz", "downtown", "cocktails"],
    date: "2026-04-20",
    location: "Downtown Cairo",
    price: 400,
    currency: "EGP",
    capacity: 40,
    difficulty: "easy",
    coverImage: { src: "/placeholder.svg", alt: "Cairo Jazz Night" },
    gallery: [],
    featured: false,
  },
  {
    id: "exp-004",
    createdAt: "2025-02-15",
    updatedAt: "2025-03-01",
    title: "Street Art Walk: Muizz",
    slug: "street-art-walk-muizz",
    summary: "Discover hidden murals and graffiti gems along Cairo's oldest street.",
    description:
      "Walk Al-Muizz li-Din Allah Street with a local artist-guide who'll show you the murals, stencils, and paste-ups most people walk right past. Learn the stories behind the art and the artists shaping Cairo's street culture.",
    category: "cultural",
    tags: ["street art", "walking tour", "culture", "art"],
    date: "2026-04-25",
    location: "Al-Muizz Street, Islamic Cairo",
    price: 250,
    currency: "EGP",
    capacity: 15,
    difficulty: "easy",
    coverImage: { src: "/placeholder.svg", alt: "Street Art Walk: Muizz" },
    gallery: [],
    featured: true,
  },
  {
    id: "exp-005",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01",
    title: "Wadi Degla Hike",
    slug: "wadi-degla-hike",
    summary: "Escape the city into Cairo's surprising desert canyon.",
    description:
      "A morning hike through Wadi Degla's dramatic limestone canyon, just 30 minutes from central Cairo. We'll trek the main trail, spot fossils, and have a picnic breakfast at the canyon overlook. Moderate fitness required.",
    category: "adventure",
    tags: ["hiking", "nature", "desert", "fitness"],
    date: "2026-05-03",
    location: "Wadi Degla Protectorate, Maadi",
    price: 300,
    currency: "EGP",
    capacity: 20,
    difficulty: "moderate",
    coverImage: { src: "/placeholder.svg", alt: "Wadi Degla Hike" },
    gallery: [],
    featured: false,
  },
  {
    id: "exp-006",
    createdAt: "2025-03-05",
    updatedAt: "2025-03-05",
    title: "Collage Night",
    slug: "collage-night",
    summary: "Cut, paste, and create — a chill evening of analog art-making.",
    description:
      "Bring your scissors and your imagination. We supply vintage magazines, glue, card stock, and the soundtrack. Whether you're making art, a mood board, or just vibing — this is your creative playground for the night.",
    category: "creative",
    tags: ["collage", "art", "chill", "creative"],
    date: "2026-05-08",
    location: "NASO Studio, Zamalek",
    price: 200,
    currency: "EGP",
    capacity: 18,
    difficulty: "easy",
    coverImage: { src: "/placeholder.svg", alt: "Collage Night" },
    gallery: [],
    featured: false,
  },
  {
    id: "exp-007",
    createdAt: "2025-03-10",
    updatedAt: "2025-03-10",
    title: "Rooftop Film Club",
    slug: "rooftop-film-club",
    summary: "Classic cinema under the stars on a downtown rooftop.",
    description:
      "Grab a beanbag, some popcorn, and settle in for a classic film projected on a downtown rooftop. This month: a 35mm-inspired screening of a cult favorite. The skyline is the backdrop — the movie is the excuse.",
    category: "nightlife",
    tags: ["film", "rooftop", "cinema", "social"],
    date: "2026-05-15",
    location: "Downtown Rooftop, Cairo",
    price: 350,
    currency: "EGP",
    capacity: 30,
    difficulty: "easy",
    coverImage: { src: "/placeholder.svg", alt: "Rooftop Film Club" },
    gallery: [],
    featured: true,
  },
  {
    id: "exp-008",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
    title: "Fayoum Overnight",
    slug: "fayoum-overnight",
    summary: "Desert camping, stargazing, and sandboarding in Fayoum.",
    description:
      "A full overnight escape to Fayoum's Wadi El-Rayan. We'll sandboard the dunes at golden hour, camp under a blanket of stars, and wake up to a desert sunrise breakfast. Transport, meals, and gear included.",
    category: "adventure",
    tags: ["camping", "desert", "stargazing", "sandboarding"],
    date: "2026-05-22",
    location: "Wadi El-Rayan, Fayoum",
    price: 1200,
    currency: "EGP",
    capacity: 16,
    difficulty: "challenging",
    coverImage: { src: "/placeholder.svg", alt: "Fayoum Overnight" },
    gallery: [],
    featured: true,
  },
];

/** Find a single experience by its URL slug */
export function getExperienceBySlug(slug: string): ExperienceDetail | undefined {
  return MOCK_EXPERIENCES.find((e) => e.slug === slug);
}

/** Get related experiences (same category first, then random fill) */
export function getRelatedExperiences(
  current: ExperienceDetail,
  limit = 3
): ExperienceDetail[] {
  const sameCategory = MOCK_EXPERIENCES.filter(
    (e) => e.category === current.category && e.id !== current.id
  );
  const others = MOCK_EXPERIENCES.filter(
    (e) => e.category !== current.category && e.id !== current.id
  );
  return [...sameCategory, ...others].slice(0, limit);
}
