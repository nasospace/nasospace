import type { PortfolioItem } from "./types";

export const MOCK_PORTFOLIO: PortfolioItem[] = [
  {
    id: "pf-001",
    createdAt: "2025-10-20",
    updatedAt: "2025-11-01",
    title: "Nadia's 25th at the Citadel",
    slug: "nadias-25th-at-the-citadel",
    summary: "A surprise golden-hour birthday with 30 of her closest friends, string lights, and a cake that almost didn't survive the stairs.",
    story:
      "Nadia's best friend Mariam reached out two months before her birthday with a wild idea — take over a terrace overlooking the Citadel at sunset, surprise her with all her university friends, and make it look like a film set. We draped the space in fairy lights, set up a long communal table with dried flowers and vintage glassware, and coordinated a fake 'casual hangout' to get Nadia there. When she walked in, 30 people screamed happy birthday while the call to prayer echoed across the skyline. The cake — a three-tier lemon-lavender situation from a local baker — almost tumbled on the narrow stairs, but our team caught it. She cried. Everyone cried. The photographer caught every golden-hour tear. This is the kind of night people talk about for years.",
    category: "birthdays",
    tags: ["surprise", "golden-hour", "terrace", "citadel", "friends"],
    location: "Saladin Citadel, Cairo",
    date: "Oct 2025",
    audienceType: "Friends group (20s)",
    vibe: "golden hour, cinematic, emotional",
    coverImage: { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", alt: "Golden hour birthday at the Citadel" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", alt: "String lights over communal table" },
      { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Nadia arriving surprised" },
      { src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80", alt: "Lemon-lavender birthday cake" },
      { src: "https://images.unsplash.com/photo-1529543544282-ea95407407db?w=800&q=80", alt: "Group photo at sunset" },
    ],
    linkedExperienceSlug: "sunset-at-the-citadel",
    featured: true,
    testimonialQuote: "I still can't believe they pulled this off. The most magical night of my life — I felt so loved.",
    testimonialName: "Nadia M.",
  },
  {
    id: "pf-002",
    createdAt: "2025-09-15",
    updatedAt: "2025-09-20",
    title: "Pottery Session: The Quiet Ones",
    slug: "pottery-session-the-quiet-ones",
    summary: "A meditative Saturday afternoon where eight strangers sat around a wheel and said almost nothing — and it was perfect.",
    story:
      "Not every gathering needs to be loud. This particular pottery session fell on a rainy Saturday in October, and only eight people showed up. Something about the weather, the soft music, and the small group made it deeply meditative. People barely spoke. They just shaped clay, sipped tea, and let the afternoon unfold. One guest — a writer going through burnout — told us later it was the first time in months she'd felt genuinely calm. Another made a lopsided mug that he now uses every single morning. We didn't plan for it to be this intimate, but it reminded us why we do what we do: to create pockets of stillness in a city that never stops.",
    category: "workshops",
    tags: ["pottery", "meditative", "intimate", "rainy-day"],
    location: "Old Cairo Studio, Fustat",
    date: "Sep 2025",
    audienceType: "Mixed (25–40)",
    vibe: "meditative, quiet, rainy-day calm",
    coverImage: { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80", alt: "Hands shaping clay on a pottery wheel" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1606585486091-44e3b58f0299?w=800&q=80", alt: "Close-up of hands on clay" },
      { src: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80", alt: "Tea cups on a wooden table" },
      { src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80", alt: "Finished ceramic pieces drying" },
    ],
    linkedWorkshopSlug: "pottery-and-chill",
    featured: true,
    testimonialQuote: "The first time in months I didn't check my phone for three hours. I needed that more than I knew.",
    testimonialName: "Salma A.",
  },
  {
    id: "pf-003",
    createdAt: "2025-11-10",
    updatedAt: "2025-11-15",
    title: "Fayoum Under Stars",
    slug: "fayoum-under-stars",
    summary: "Sixteen strangers drove into the desert, sandboarded at golden hour, and woke up to a sunrise they'll never shut up about.",
    story:
      "The bus left Maadi at 6 AM and by noon we were deep in Wadi El-Rayan. The group — a mix of solo adventurers, couples, and a birthday squad — bonded fast over shared snacks and bad road jokes. By late afternoon they were sandboarding the dunes, falling, laughing, and filming each other like content creators on assignment. Dinner was a communal spread under a sky so full of stars that one guy from Heliopolis said he'd never actually seen the Milky Way before. We stayed up late around the fire trading stories. By sunrise, nobody wanted to leave. That's the thing about the desert — it strips away the noise and leaves only what matters.",
    category: "group-outings",
    tags: ["desert", "camping", "stargazing", "sandboarding", "fayoum"],
    location: "Wadi El-Rayan, Fayoum",
    date: "Nov 2025",
    audienceType: "Mixed group (20s–30s)",
    vibe: "wild, free, starlit",
    coverImage: { src: "https://images.unsplash.com/photo-1475483768684-6163159e5742?w=800&q=80", alt: "Group around a campfire under the stars" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80", alt: "Sandboarding at golden hour" },
      { src: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80", alt: "Communal dinner in the desert" },
      { src: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80", alt: "Desert sunrise over the dunes" },
      { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", alt: "Stars over the campsite" },
    ],
    linkedExperienceSlug: "fayoum-overnight",
    featured: true,
    testimonialQuote: "I've lived in Cairo my whole life and never seen this many stars. NASO gave me my own city back.",
    testimonialName: "Karim H.",
  },
  {
    id: "pf-004",
    createdAt: "2025-08-14",
    updatedAt: "2025-08-20",
    title: "Yara & Tarek's Anniversary",
    slug: "yara-and-tareks-anniversary",
    summary: "A rooftop dinner for two with handwritten menus, a vinyl playlist they chose together, and a view that didn't quit.",
    story:
      "Tarek wanted something that felt personal, not fancy. No hotel ballroom, no stiff waiters — just a beautiful evening alone with Yara on their third anniversary. We set up a single candlelit table on a private Downtown rooftop with a view of the Nile. The menu was handwritten on kraft paper — dishes inspired by their first-date restaurant. A vintage turntable played a playlist they'd built together on Spotify, transferred to vinyl for the night. Yara cried when she saw the photos from their first year projected on the wall behind them. It wasn't about production value. It was about knowing the story and letting the details speak.",
    category: "couples",
    tags: ["anniversary", "rooftop", "intimate", "vinyl", "downtown"],
    location: "Private Rooftop, Downtown Cairo",
    date: "Aug 2025",
    audienceType: "Couple",
    vibe: "romantic, intimate, cinematic",
    coverImage: { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Candlelit rooftop dinner for two" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80", alt: "Handwritten menu on kraft paper" },
      { src: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800&q=80", alt: "Vinyl turntable on the rooftop" },
      { src: "https://images.unsplash.com/photo-1549882167-945d8c0cde5a?w=800&q=80", alt: "Nile view at night" },
    ],
    featured: false,
    testimonialQuote: "He remembered the songs from our first date. I don't know how you pulled this off, but thank you.",
    testimonialName: "Yara S.",
  },
  {
    id: "pf-005",
    createdAt: "2025-07-05",
    updatedAt: "2025-07-10",
    title: "Creativa Team Day",
    slug: "creativa-team-day",
    summary: "A design agency swapped Figma for scissors and glue — and discovered things about each other no standup meeting ever could.",
    story:
      "Creativa, a Cairo design agency, came to us for a team day that wasn't a trust fall or an escape room. We built a half-day creative offsite: a collage workshop in the morning, a long lunch, and an afternoon of screen printing custom merch for their studio. The collage session cracked everyone open — the quietest developer made the wildest piece and became the office legend. During screen printing, the CEO pulled her own ink. By the end of the day, they had inside jokes, printed totes, and something no corporate retreat PowerPoint could replicate: genuine connection.",
    category: "corporate",
    tags: ["team-building", "design", "collage", "screen-printing", "offsite"],
    location: "NASO Studio, Zamalek",
    date: "Jul 2025",
    audienceType: "Corporate team (15 people)",
    vibe: "creative, collaborative, surprising",
    coverImage: { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", alt: "Team collaborating on collage art" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80", alt: "Collage materials spread on table" },
      { src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80", alt: "CEO pulling screen print ink" },
      { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", alt: "Team showing finished tote bags" },
      { src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80", alt: "Group lunch at long table" },
    ],
    linkedWorkshopSlug: "collage-night-cut-and-compose",
    featured: true,
  },
  {
    id: "pf-006",
    createdAt: "2025-12-01",
    updatedAt: "2025-12-05",
    title: "Midnight Collage Club",
    slug: "midnight-collage-club",
    summary: "Twenty people, vintage magazines, lo-fi beats, and glue sticks until 2 AM. Nobody wanted to leave.",
    story:
      "The Midnight Collage Club was supposed to end at midnight. It didn't. Something about the combination of dim lighting, stacks of 70s and 80s magazines, and a perfectly curated lo-fi playlist made people want to stay. Some came alone and left with new friends. One woman made a full zine in a single sitting. A couple worked on a collaborative piece that told the story of their relationship in cut-outs. By 2 AM the table was covered in paper scraps, empty tea glasses, and finished artworks that looked like they belonged in a gallery. We framed the best ones and hung them in the studio the next week.",
    category: "creative-nights",
    tags: ["collage", "late-night", "lo-fi", "social", "creative"],
    location: "NASO Studio, Zamalek",
    date: "Dec 2025",
    audienceType: "Creatives & curious minds (20s–30s)",
    vibe: "late-night, lo-fi, immersive",
    coverImage: { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80", alt: "Hands cutting magazine pages under warm light" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1452860606245-08b6178ee5a4?w=800&q=80", alt: "Spread of vintage magazines" },
      { src: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80", alt: "Close-up of finished collage artwork" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80", alt: "Lo-fi studio ambiance at night" },
    ],
    linkedWorkshopSlug: "collage-night-cut-and-compose",
    featured: false,
  },
  {
    id: "pf-007",
    createdAt: "2025-06-20",
    updatedAt: "2025-06-25",
    title: "Omar's Proposal Picnic",
    slug: "omars-proposal-picnic",
    summary: "A secret garden, 200 candles, one nervous question, and the happiest yes in Al-Azhar Park.",
    story:
      "Omar called us six weeks before the proposal with a vision: a hidden garden, warm light, their favourite food, and no one else around. We scouted a secluded corner of Al-Azhar Park, lined the path with 200 LED candles, set up a low wooden table with cushions, and arranged a spread of sushi (her favourite) and kunafa (his). A hidden photographer captured the moment from behind the jasmine bushes. When he got down on one knee, she laughed, cried, and said yes before he finished the sentence. The photos are stunning. The video makes everyone who watches it tear up. Omar texted us the next day: 'You made the most important moment of my life feel like a dream.'",
    category: "couples",
    tags: ["proposal", "garden", "candles", "romantic", "surprise"],
    location: "Al-Azhar Park, Cairo",
    date: "Jun 2025",
    audienceType: "Couple",
    vibe: "romantic, dreamy, heartfelt",
    coverImage: { src: "https://images.unsplash.com/photo-1529636444744-adffc9135a5e?w=800&q=80", alt: "Candlelit garden setup at Al-Azhar Park" },
    gallery: [
      { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", alt: "Path lined with LED candles" },
      { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", alt: "Low table with cushions and food" },
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "The proposal moment" },
      { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", alt: "Couple celebrating after the yes" },
    ],
    featured: true,
    testimonialQuote: "You made the most important moment of my life feel like a dream. She said yes before I even finished.",
    testimonialName: "Omar F.",
  },
  {
    id: "pf-008",
    createdAt: "2025-05-10",
    updatedAt: "2025-05-15",
    title: "Screen Print Saturday",
    slug: "screen-print-saturday",
    summary: "Ink-stained hands, custom totes, and a group that bonded over bad first prints and great second ones.",
    story:
      "Screen Print Saturday started as a simple maker workshop but turned into something more. Ten people came in knowing nothing about screen printing and left with custom-designed tote bags, sticker sheets, and a group chat that's still active months later. The best part was the fails — first pulls that smudged, designs that bled, one guy who accidentally printed his tote upside down and decided it was 'avant-garde.' Our instructor Maya turned every mistake into a teaching moment. By the end, everyone was pulling clean prints and cheering each other on. One participant came back the next month with her sister. Another signed up for every workshop we've run since.",
    category: "workshops",
    tags: ["screen-printing", "tote-bag", "maker", "beginner-friendly"],
    location: "NASO Studio, Zamalek",
    date: "May 2025",
    audienceType: "Beginners & makers (20s–30s)",
    vibe: "hands-on, playful, maker energy",
    coverImage: { src: "/placeholder.svg", alt: "Hands pulling a screen print" },
    gallery: [
      { src: "/placeholder.svg", alt: "Ink-stained hands at the workshop" },
      { src: "/placeholder.svg", alt: "Custom tote bag designs" },
      { src: "/placeholder.svg", alt: "Group showing off their prints" },
    ],
    linkedWorkshopSlug: "tote-bag-screen-printing",
    featured: false,
    testimonialQuote: "I came for the tote bag. I stayed for the people. Now I'm signed up for everything NASO does.",
    testimonialName: "Dina K.",
  },
];

/** Find a single portfolio item by its URL slug */
export function getPortfolioBySlug(slug: string): PortfolioItem | undefined {
  return MOCK_PORTFOLIO.find((p) => p.slug === slug);
}

/** Get related portfolio items — same category first, then others */
export function getRelatedPortfolio(
  current: PortfolioItem,
  limit = 3
): PortfolioItem[] {
  const sameCategory = MOCK_PORTFOLIO.filter(
    (p) => p.category === current.category && p.id !== current.id
  );
  const others = MOCK_PORTFOLIO.filter(
    (p) => p.category !== current.category && p.id !== current.id
  );
  return [...sameCategory, ...others].slice(0, limit);
}
