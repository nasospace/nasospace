import type { ProductDetail } from "./types";

export const MOCK_PRODUCTS: ProductDetail[] = [
  {
    id: "prod-001",
    createdAt: "2025-11-01",
    updatedAt: "2025-12-10",
    title: "NASO Classic Tee",
    slug: "naso-classic-tee",
    summary: "The everyday tee with the NASO flower print — soft cotton, Cairo-made.",
    description:
      "Our signature tee, screen-printed by hand at our Zamalek studio. 100% Egyptian cotton in a relaxed unisex fit. The chest features our iconic groovy flower motif — the same one you've seen at every NASO event. Each run is limited to 50 pieces per colorway, so once they're gone, they're gone. Pair it with paint stains, clay dust, or just your morning coffee.",
    category: "apparel",
    tags: ["tee", "cotton", "unisex", "screen-printed", "essentials"],
    price: 450,
    currency: "EGP",
    stockStatus: "in-stock",
    featured: true,
    coverImage: { src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", alt: "NASO Classic Tee flat lay" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80", alt: "Tee detail close-up" },
      { src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80", alt: "Tee on hanger" },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Off-White", "Black", "Sage"],
    linkedPortfolioSlug: "screen-print-saturday",
  },
  {
    id: "prod-002",
    createdAt: "2025-10-15",
    updatedAt: "2025-11-20",
    title: "Cairo Sketchbook",
    slug: "cairo-sketchbook",
    summary: "180gsm mixed-media pages, kraft cover, elastic closure — sketch anywhere.",
    description:
      "Designed for doodlers, urban sketchers, and anyone who carries a pen. The Cairo Sketchbook has 80 pages of 180gsm mixed-media paper that handles ink, watercolour, and markers without bleed-through. The kraft cover is stamped with a custom NASO Cairo skyline and secured with an elastic band. Small enough for a tote bag, sturdy enough for desert trips. Made in collaboration with a local Shoubra bindery.",
    category: "stationery",
    tags: ["sketchbook", "mixed-media", "kraft", "portable", "drawing"],
    price: 280,
    currency: "EGP",
    stockStatus: "in-stock",
    featured: false,
    coverImage: { src: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80", alt: "Cairo Sketchbook on a wooden desk" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80", alt: "Sketchbook open with drawings" },
      { src: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&q=80", alt: "Sketchbook in a tote bag" },
    ],
    linkedExperienceSlug: "street-art-walk",
  },
  {
    id: "prod-003",
    createdAt: "2025-09-20",
    updatedAt: "2025-10-25",
    title: "Pottery Starter Kit",
    slug: "pottery-starter-kit",
    summary: "Everything you need for your first pinch pot — clay, tools, glaze, and a guide.",
    description:
      "Can't make it to the studio? Start at home. The Pottery Starter Kit includes 2 kg of air-dry clay, a wooden modelling tool set, two sample glazes (ocean blue and desert sand), a sponge, a wire cutter, and our illustrated beginner's guide with five project ideas. Perfect as a gift or a solo Sunday project. All materials sourced from Egyptian suppliers. The kit ships in a reusable linen drawstring bag.",
    category: "art-kits",
    tags: ["pottery", "clay", "beginner", "kit", "air-dry"],
    price: 650,
    currency: "EGP",
    stockStatus: "in-stock",
    featured: true,
    coverImage: { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80", alt: "Pottery tools and clay laid out" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80", alt: "Clay tools close-up" },
      { src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80", alt: "Finished pinch pots" },
    ],
    linkedWorkshopSlug: "pottery-and-chill",
    linkedExperienceSlug: "pottery-and-chill-experience",
  },
  {
    id: "prod-004",
    createdAt: "2025-08-10",
    updatedAt: "2025-09-15",
    title: "NASO Tote Bag",
    slug: "naso-tote-bag",
    summary: "Heavy-duty screen-printed canvas tote — carries your groceries and your taste.",
    description:
      "The NASO Tote is a 12 oz canvas bag screen-printed with our signature retro-groovy pattern. Wide base, reinforced handles, internal pocket for your phone. Every batch features a slightly different print run — colours shift, placements vary — so no two bags are exactly alike. Used by our team at every market and pop-up. Machine washable. Looks better with age.",
    category: "accessories",
    tags: ["tote", "canvas", "screen-printed", "everyday", "carry"],
    price: 320,
    currency: "EGP",
    stockStatus: "low-stock",
    featured: false,
    coverImage: { src: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80", alt: "NASO Tote Bag hanging on a hook" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", alt: "Tote bag in use" },
    ],
    linkedPortfolioSlug: "screen-print-saturday",
  },
  {
    id: "prod-005",
    createdAt: "2025-07-25",
    updatedAt: "2025-08-30",
    title: "Collage Night Kit",
    slug: "collage-night-kit",
    summary: "Vintage paper packs, glue sticks, scissors, and a playlist QR — host your own collage night.",
    description:
      "Bring the Midnight Collage Club home. This kit includes 60+ sheets of curated vintage paper (magazine cuts, patterned stock, tissue overlays), a precision glue stick, craft scissors, two blank A4 collage boards, and a QR code linking to our official lo-fi collage playlist. Everything's packed in a resealable envelope with assembly suggestions and prompts to get you started. Perfect for a solo creative session or a group hangout.",
    category: "creative-tools",
    tags: ["collage", "paper", "DIY", "night-in", "creative"],
    price: 380,
    currency: "EGP",
    stockStatus: "in-stock",
    featured: false,
    coverImage: { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80", alt: "Collage materials spread on table" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=800&q=80", alt: "Vintage paper sheets" },
      { src: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80", alt: "Finished collage" },
    ],
    linkedWorkshopSlug: "collage-night-cut-and-compose",
  },
  {
    id: "prod-006",
    createdAt: "2025-12-01",
    updatedAt: "2025-12-05",
    title: "Muizz Street Print",
    slug: "muizz-street-print",
    summary: "Limited-edition risograph print of El-Moez Street — only 30 signed copies.",
    description:
      "A two-colour risograph print of El-Moez Street at golden hour, illustrated by Cairo-based artist Mona Adel. Printed on 250gsm textured stock in terracotta and deep navy. Each print is hand-numbered and signed. Edition of 30. Fits standard A3 frames. This is part of our ongoing 'Cairo Walls' series — a collection of prints celebrating the streets, corners, and textures that make this city unlike anywhere else.",
    category: "limited-drops",
    tags: ["print", "risograph", "limited-edition", "cairo", "art"],
    price: 550,
    currency: "EGP",
    stockStatus: "low-stock",
    featured: true,
    limitedEdition: true,
    coverImage: { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80", alt: "Risograph art print of El-Moez Street" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&q=80", alt: "Print detail close-up" },
    ],
  },
  {
    id: "prod-007",
    createdAt: "2025-06-15",
    updatedAt: "2025-07-10",
    title: "Handmade Ceramic Mug",
    slug: "handmade-ceramic-mug",
    summary: "Wheel-thrown in our studio, glazed in ocean blue or desert sand — your daily ritual, upgraded.",
    description:
      "Each mug is thrown on the wheel by one of our pottery instructors, fired in a local kiln, and hand-dipped in our signature glazes. Slight variations in form and colour make every piece one-of-a-kind. Holds about 350ml — perfect for coffee, tea, or pretending you're in a Wes Anderson film. Dishwasher and microwave safe. Comes wrapped in tissue inside a kraft gift box.",
    category: "gifts",
    tags: ["ceramic", "mug", "handmade", "glazed", "gift"],
    price: 290,
    currency: "EGP",
    stockStatus: "in-stock",
    featured: false,
    colors: ["Ocean Blue", "Desert Sand"],
    coverImage: { src: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80", alt: "Handmade ceramic mug with ocean blue glaze" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80", alt: "Mug on pottery wheel" },
    ],
    linkedWorkshopSlug: "pottery-and-chill",
    linkedPortfolioSlug: "pottery-session-the-quiet-ones",
  },
  {
    id: "prod-008",
    createdAt: "2025-11-15",
    updatedAt: "2025-12-01",
    title: "Home Studio Essentials Box",
    slug: "home-studio-essentials-box",
    summary: "A curated box of creative basics — brushes, ink, paper, and a mini zine of prompts.",
    description:
      "The Essentials Box is our gift to anyone starting (or restarting) a creative practice. Inside: a set of 6 round brushes, a bottle of India ink, 20 sheets of mixed-media paper, a NASO mini zine packed with creative prompts and exercises, and two NASO sticker sheets. All packed in a screen-printed box that doubles as storage. We designed this for the person who says 'I wish I was more creative' — because they already are, they just need the right nudge.",
    category: "home-studio",
    tags: ["gift-box", "brushes", "ink", "creative", "starter"],
    price: 850,
    currency: "EGP",
    stockStatus: "in-stock",
    featured: false,
    coverImage: { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80", alt: "Creative essentials laid out on a table" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80", alt: "Brushes and ink bottles" },
      { src: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&q=80", alt: "NASO mini zine" },
    ],
  },
];

/** Find a single product by its URL slug */
export function getProductBySlug(slug: string): ProductDetail | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

/** Get related products — same category first, then others */
export function getRelatedProducts(
  current: ProductDetail,
  limit = 4
): ProductDetail[] {
  const sameCategory = MOCK_PRODUCTS.filter(
    (p) => p.category === current.category && p.id !== current.id
  );
  const others = MOCK_PRODUCTS.filter(
    (p) => p.category !== current.category && p.id !== current.id
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Get featured products for highlight sections */
export function getFeaturedProducts(): ProductDetail[] {
  return MOCK_PRODUCTS.filter((p) => p.featured);
}
