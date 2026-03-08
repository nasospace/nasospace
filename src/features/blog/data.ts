import type { BlogPost } from "./types";

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-001",
    createdAt: "2026-01-10",
    updatedAt: "2026-01-10",
    title: "7 Creative Date Ideas in Cairo That Aren't Basic",
    slug: "creative-date-ideas-cairo",
    excerpt: "Forget the same old dinner-and-movie routine. Cairo is full of unexpected, creative ways to spend time with someone you like — here are our favorites.",
    content: `There's nothing wrong with a nice dinner. But if you're the kind of person who'd rather make something with your hands, get lost in an old neighborhood, or watch the sunset from a place most people don't know about — Cairo has you covered.\n\n## 1. Pottery for Two\n\nThere's something about sitting across from someone while you both try (and fail) to center clay on a wheel. It's messy, it's funny, and you walk away with something you made together. Check out our Pottery & Chill experience.\n\n## 2. Sunset at the Citadel\n\nSkip the Nile dinner cruise. Head to the Citadel around 5pm, grab a bench near the mosque courtyard, and watch the city turn gold. Bring tea in a thermos if you want bonus points.\n\n## 3. Al-Muizz Street After Dark\n\nMost people visit during the day. Come after sunset when the lanterns are lit and the crowds thin out — it's a completely different vibe. Walk slow. Stop for sugarcane juice.\n\n## 4. Collage Night at NASO\n\nOur collage nights are genuinely fun dates. You sit next to each other, flip through old magazines, and make something weird. No pressure, no performance — just vibes.\n\n## 5. Rooftop Cinema\n\nA blanket, some popcorn, and a classic film projected onto a wall. Downtown rooftops were made for this.\n\n## 6. Cook Together at a Workshop\n\nForget restaurants — learn to make the food yourselves. Our cooking workshops are hands-on and always end with a shared meal.\n\n## 7. Get Lost in Downtown\n\nNo plan. Just walk. Start at Talaat Harb, wander through the side streets, pop into a bookshop, get coffee at a place you've never been. Cairo rewards the curious.`,
    category: "outing-ideas",
    tags: ["dates", "cairo", "creative", "couples"],
    publishDate: "2026-01-10",
    readingTime: "5 min read",
    coverImage: { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", alt: "Couple walking through a colorful Cairo alley" },
    featured: true,
    authorName: "NASO Team",
    linkedExperienceSlug: "pottery-and-chill",
  },
  {
    id: "blog-002",
    createdAt: "2026-01-18",
    updatedAt: "2026-01-18",
    title: "A Slow Weekend Guide to Downtown Cairo",
    slug: "slow-weekend-downtown-cairo",
    excerpt: "Downtown Cairo has its own rhythm — one that rewards people who take their time. Here's how to spend a weekend there without rushing.",
    content: `Downtown Cairo is loud and chaotic if you fight it. But if you lean into the pace — stop where things look interesting, sit when you need to sit, and let the streets surprise you — it becomes one of the best weekends you'll have.\n\n## Saturday Morning: Coffee and Books\n\nStart at one of downtown's old-school ahwas. Order a Turkish coffee, sit outside, and watch the city wake up. Then walk to Leila or Alef for a bookshop browse.\n\n## Saturday Afternoon: Art and Architecture\n\nThe Townhouse Gallery, Contemporary Image Collective, and the dozens of art deco buildings along Qasr El Nil Street make for an incredible visual afternoon.\n\n## Saturday Evening: The Golden Hour Walk\n\nHead toward Tahrir as the sun gets low. Walk along the Nile corniche toward Garden City. The light does something magical to the buildings at that hour.\n\n## Sunday Morning: Studio Time\n\nJoin a morning workshop — pottery, journaling, painting. Use your hands and reset from the screen.\n\n## Sunday Afternoon: Zamalek Wander\n\nCross the bridge. Walk Zamalek's tree-lined streets. Get a juice, sit in a park, visit a gallery. End with lunch at a local spot.\n\nDowntown doesn't need a plan. It needs patience and good shoes.`,
    category: "cairo-guides",
    tags: ["downtown", "weekend", "slow living", "walking"],
    publishDate: "2026-01-18",
    readingTime: "6 min read",
    coverImage: { src: "https://images.unsplash.com/photo-1553913861-c0a2e4da145e?w=800&q=80", alt: "Downtown Cairo street with art deco architecture" },
    featured: false,
    authorName: "NASO Team",
  },
  {
    id: "blog-003",
    createdAt: "2026-02-02",
    updatedAt: "2026-02-02",
    title: "Why Making Things With Your Hands Changes Everything",
    slug: "making-things-with-your-hands",
    excerpt: "In a world of screens, tapping, and scrolling — the act of making something physical with your own two hands feels almost radical.",
    content: `When was the last time you made something? Not typed, not designed on a screen — actually made something with your hands?\n\nIf you can't remember, you're not alone. Most of us spend our days interacting with flat surfaces. We tap, we swipe, we scroll. Our hands are busy, but they're not creating.\n\n## The Case for Getting Messy\n\nThere's real research behind this: working with your hands reduces cortisol levels, improves focus, and creates a sense of accomplishment that digital work rarely matches. But you don't need a study to know it. You can feel it.\n\nThe first time you pull a mug off a pottery wheel — wobbly, uneven, undeniably yours — something clicks. You made that. It exists because of you.\n\n## It's Not About Being Good\n\nThe biggest barrier to creative activities is the idea that you need to be talented. You don't. You need to be willing to try, to mess up, and to enjoy the process without judging the output.\n\nAt NASO, we design every workshop around this idea. No one is grading you. No one expects a masterpiece. The goal is the experience itself — the focus, the laughter, the surprise of what comes out.\n\n## Start Small\n\nYou don't have to commit to a pottery course or buy oil paints. Start with a collage. Grab some magazines, scissors, and glue. Cut out things that catch your eye and arrange them on a page. That's it. You just made something.\n\nAnd once you start, it's hard to stop.`,
    category: "creative-living",
    tags: ["creativity", "wellness", "hands-on", "mindfulness"],
    publishDate: "2026-02-02",
    readingTime: "4 min read",
    coverImage: { src: "https://images.unsplash.com/photo-1452860606245-08b6dc28b2db?w=800&q=80", alt: "Hands covered in clay working on pottery" },
    featured: true,
    authorName: "NASO Team",
    linkedWorkshopSlug: "pottery-and-chill",
  },
  {
    id: "blog-004",
    createdAt: "2026-02-14",
    updatedAt: "2026-02-14",
    title: "Behind the Clay: What Actually Happens at a NASO Pottery Workshop",
    slug: "behind-the-clay-pottery-workshop",
    excerpt: "Ever wondered what it's like inside one of our pottery sessions? Here's the real story — from first touch to fired finish.",
    content: `People ask us all the time: "What's it actually like?" So here's the honest, unfiltered version of what happens when you walk into a NASO pottery workshop.\n\n## You Walk In Nervous\n\nAlmost everyone does. The studio smells like wet earth and old wood. There are wheels set up, aprons hanging, and someone's playing lo-fi in the background. You look at the clay and think: "I can't do this."\n\nYou can.\n\n## The First Touch\n\nThe instructor hands you a lump of clay and shows you how to slam it on the table to get the air bubbles out. It's called wedging, and it's oddly satisfying. By the time you've done it for two minutes, you've forgotten you were nervous.\n\n## Wheel Time\n\nHere's the truth: centering clay is hard. Your first attempt will wobble. Your second attempt might wobble more. But by the third or fourth try, you'll feel it — that moment when the clay finds its center and starts to rise between your fingers.\n\nThat's the moment people get hooked.\n\n## The In-Between\n\nWhile you work, conversations happen naturally. People share stories, ask questions, laugh at their lopsided bowls. The instructor walks around, adjusts a hand here, gives a tip there. It's relaxed and focused at the same time.\n\n## The Finish\n\nYou trim your piece, smooth it out, and leave it to dry. It gets bisque-fired, glazed, and fired again. A week later, you pick up something that's undeniably yours — imperfect, beautiful, and real.\n\nThat's the workshop. No pretension, no pressure. Just clay, hands, and time.`,
    category: "workshop-stories",
    tags: ["pottery", "behind-the-scenes", "workshops", "ceramics"],
    publishDate: "2026-02-14",
    readingTime: "5 min read",
    coverImage: { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80", alt: "Person shaping clay on a pottery wheel" },
    featured: false,
    authorName: "NASO Team",
    linkedWorkshopSlug: "pottery-and-chill",
  },
  {
    id: "blog-005",
    createdAt: "2026-02-22",
    updatedAt: "2026-02-22",
    title: "How to Plan a Group Outing That People Actually Remember",
    slug: "plan-group-outing-people-remember",
    excerpt: "Most group outings are forgettable. Here's how to plan one that sticks — without overthinking it.",
    content: `You've been there. Someone says "let's all do something together" and three weeks later you're at the same restaurant you always go to, having the same conversations.\n\nHere's how to break the cycle.\n\n## 1. Start With a Feeling, Not a Venue\n\nInstead of "where should we go?" ask "how do we want to feel?" Relaxed? Energized? Creative? The answer changes everything about what you plan.\n\n## 2. Add a Shared Activity\n\nEating together is great. But doing something together — making, walking, playing, creating — gives people a shared experience to bond over and talk about later.\n\n## 3. Keep the Group Right-Sized\n\n4-12 people is the sweet spot. Big enough for energy, small enough that everyone can actually talk to each other.\n\n## 4. Choose Something Slightly Unfamiliar\n\nDon't pick something everyone's done a hundred times. A pottery workshop, a street art walk, a sunset hike — something just different enough to create new memories.\n\n## 5. Don't Over-Plan\n\nLeave room for spontaneity. The best moments at any outing are usually unplanned — the detour, the accidental discovery, the inside joke that happens in the moment.\n\n## 6. End With Something Shared\n\nA meal, a drink, a campfire, a rooftop hang. Give the group a way to decompress and talk about what just happened.\n\nThe secret isn't finding the perfect place. It's creating the right conditions for something real to happen.`,
    category: "event-inspiration",
    tags: ["groups", "planning", "outings", "friendship"],
    publishDate: "2026-02-22",
    readingTime: "4 min read",
    coverImage: { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", alt: "Group of friends laughing together outdoors" },
    featured: false,
    authorName: "NASO Team",
    linkedExperienceSlug: "sunset-at-the-citadel",
  },
  {
    id: "blog-006",
    createdAt: "2026-03-01",
    updatedAt: "2026-03-01",
    title: "The NASO Journal: Spring Edition",
    slug: "naso-journal-spring-edition",
    excerpt: "What we've been up to, what's coming next, and a few things we've been loving lately. A dispatch from the NASO world.",
    content: `Spring in Cairo hits different. The air softens, the light gets warmer, and the city opens up again after months of winter hibernation. Here's what's been happening in the NASO world.\n\n## What We've Been Making\n\nThe pottery studio has been running nonstop. We've added a new hand-building session on Fridays — less wheel work, more sculpting and slab-building. People have been making some genuinely beautiful stuff.\n\nOur collage nights have grown too. What started as a small weekly thing has become a real community — regulars who come back, bring friends, and keep pushing their work further.\n\n## What's Coming\n\nSpring means outdoor season. We're planning a series of sunset outings at spots around Cairo that most people don't know about. The first one is at the Citadel — watch this space.\n\nWe're also launching our first overnight trip: a Fayoum camping + sandboarding weekend. Desert, stars, breakfast at sunrise. Details dropping soon.\n\n## What We've Been Loving\n\n- The new coffee shop on Mohamed Mahmoud — tiny, perfect\n- Studio Ghibli movie nights on the roof\n- Buying old magazines from Azbakeya for collage material\n- Walking downtown at 7am when no one's around\n- That specific shade of green Cairo gets in spring\n\n## A Note\n\nNASO started because we wanted to do things differently. Not louder, not bigger — just more intentional. More creative. More real. Every workshop, every outing, every event is built around that idea.\n\nThanks for being part of it. Spring's going to be good.`,
    category: "naso-journal",
    tags: ["journal", "update", "spring", "community"],
    publishDate: "2026-03-01",
    readingTime: "4 min read",
    coverImage: { src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80", alt: "Spring light over Cairo rooftops" },
    featured: true,
    authorName: "NASO Team",
    linkedExperienceSlug: "sunset-at-the-citadel",
  },
  {
    id: "blog-007",
    createdAt: "2026-03-05",
    updatedAt: "2026-03-05",
    title: "Cairo's Best Hidden Spots for Creative People",
    slug: "cairo-hidden-spots-creative-people",
    excerpt: "The city's most interesting creative corners aren't on Google Maps. Here's where to find them.",
    content: `Cairo's creative scene isn't in one place. It's scattered across neighborhoods, tucked behind unmarked doors, hiding in plain sight. Here are the spots we keep coming back to.\n\n## Darb 1718 — Old Cairo\n\nAn arts center in a converted historic building that hosts exhibitions, workshops, and performances. The courtyard alone is worth the visit.\n\n## The Townhouse Gallery — Downtown\n\nStill one of the most important independent art spaces in the region. Check their exhibition schedule, and don't skip the library upstairs.\n\n## Azbakeya Book Market — Ataba\n\nOverwhelming and wonderful. Mountains of used books, old magazines, vintage prints. Bring cash and patience.\n\n## Zamalek's Side Streets\n\nSome of Cairo's best small galleries are on Zamalek's quiet streets. Walk between Brazil and Hassan Sabry and you'll find spaces that rotate shows monthly.\n\n## Fustat Ceramics District — Old Cairo\n\nA cluster of ceramics workshops where you can watch potters work, buy handmade pieces, and even try your hand at the wheel.\n\n## The Rooftops\n\nCairo's rooftops are its secret weapon. Downtown rooftops for views, Zamalek rooftops for greenery, Islamic Cairo rooftops for minarets. Find someone who knows the way up.\n\n## The River\n\nThe Nile between Zamalek and Garden City at sunset. Bring headphones. Walk slowly. Look at the light on the water.\n\nCreative Cairo isn't hidden because it's exclusive. It's hidden because the city is so dense that you have to look.`,
    category: "cairo-guides",
    tags: ["cairo", "creative", "hidden gems", "art"],
    publishDate: "2026-03-05",
    readingTime: "5 min read",
    coverImage: { src: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80", alt: "Colorful Cairo alleyway with hanging lanterns" },
    featured: false,
    authorName: "NASO Team",
  },
  {
    id: "blog-008",
    createdAt: "2026-03-07",
    updatedAt: "2026-03-07",
    title: "What We Learned From 50 Workshops",
    slug: "what-we-learned-50-workshops",
    excerpt: "After running 50 creative workshops, here's what surprised us — about people, creativity, and what actually makes a great experience.",
    content: `Fifty workshops. Hundreds of people. Thousands of hours of clay, paint, paper, and conversation. Here's what we've learned.\n\n## 1. People Are More Creative Than They Think\n\nAlmost everyone walks in saying "I'm not creative." Almost everyone walks out saying "I didn't know I could do that." The gap between those two sentences is everything.\n\n## 2. The Best Workshops Feel Like Play\n\nWhen people stop trying to make something "good" and start having fun, the quality of what they create goes up dramatically. Fun is not the opposite of serious work — it's the engine.\n\n## 3. Small Groups > Big Groups\n\n8-14 people is our sweet spot. Big enough for energy and conversation. Small enough that no one hides in the back.\n\n## 4. Materials Matter\n\nGood clay, good paper, good tools — these aren't luxuries. When materials feel good in your hands, you're more likely to enjoy using them. We invest in supplies because they're part of the experience.\n\n## 5. Music Sets the Tone\n\nWe spend real time on playlists. The right music makes people relax, focus, and stay longer. Bad music? People check their phones.\n\n## 6. The Instructor Makes or Breaks It\n\nNot because they need to be an expert — but because they need to create the right atmosphere. Patient, warm, encouraging, with high standards but zero pretension.\n\n## 7. People Come Back for the Feeling\n\nThey don't come back because they want to get better at pottery. They come back because of how they felt — present, creative, connected. That's what we're actually selling.\n\n## 8. Every Single Person Has a Story\n\nThe most surprising thing about running workshops is the conversations that happen. People share things while their hands are busy that they wouldn't share over dinner. There's something about making that opens people up.\n\nFifty workshops in, we're more convinced than ever: creative experiences change people. Not in dramatic, life-altering ways — but in quiet, real, meaningful ones.`,
    category: "workshop-stories",
    tags: ["workshops", "lessons", "creativity", "community"],
    publishDate: "2026-03-07",
    readingTime: "6 min read",
    coverImage: { src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80", alt: "Creative workshop table with art supplies" },
    featured: false,
    authorName: "NASO Team",
    linkedPortfolioSlug: "screen-print-saturday",
  },
];

/** Find a single blog post by slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return MOCK_BLOG_POSTS.find((p) => p.slug === slug);
}

/** Get the first featured post (for hero section) */
export function getFeaturedPost(): BlogPost | undefined {
  return MOCK_BLOG_POSTS.find((p) => p.featured);
}

/** Get related posts — same category first, then fill from others */
export function getRelatedPosts(current: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = MOCK_BLOG_POSTS.filter(
    (p) => p.category === current.category && p.id !== current.id
  );
  const others = MOCK_BLOG_POSTS.filter(
    (p) => p.category !== current.category && p.id !== current.id
  );
  return [...sameCategory, ...others].slice(0, limit);
}
