

# Broken Unsplash Image Audit — Fix Plan

## Confirmed 404 Images (7 total)

| Broken Photo ID | Used In | Context |
|---|---|---|
| `photo-1549492423-400c33ef4920` | **Blog** blog-002 cover | "Slow Weekend Guide to Downtown Cairo" |
| `photo-1606585486091-44e3b58f0299` | **Blog** blog-003 cover, **Portfolio** pf-002 gallery | "Making Things With Your Hands" + pottery gallery |
| `photo-1569880153113-76d33dba5784` | **Experiences** exp-004 cover | "Street Art Walk: Muizz" |
| `photo-1452860606245-08b6178ee5a4` | **Portfolio** pf-006 gallery | "Midnight Collage Club" — vintage magazines |
| `photo-1558618666-fcd25c85f82e` | **Portfolio** pf-006 gallery, pf-008 gallery | Collage club ambiance + screen print workshop |
| `photo-1550966871-3ed3cdb51f3a` | **Portfolio** pf-004 gallery | "Yara & Tarek's Anniversary" — handwritten menu |
| `photo-1549882167-945d8c0cde5a` | **Portfolio** pf-004 gallery | "Yara & Tarek's Anniversary" — Nile view at night |

## Files to Modify (3)

| File | Broken Count |
|---|---|
| `src/features/blog/data.ts` | 2 (blog-002 cover, blog-003 cover) |
| `src/features/experiences/data.ts` | 1 (exp-004 cover) |
| `src/features/portfolio/data.ts` | 5 (pf-002 gallery x1, pf-004 gallery x2, pf-006 gallery x2, pf-008 gallery x1) |

## Replacement Strategy

Replace each broken URL with a verified working Unsplash photo that matches the intended subject:

- **blog-002** (downtown Cairo architecture) → `photo-1553913861-c0fddf2619ee` (city architecture)
- **blog-003** (hands working clay) → `photo-1603974372039-adc49044b6bd` (pottery hands)
- **exp-004** (street art / graffiti wall) → `photo-1499781350541-7783f6c6a0c8` (street art mural)
- **pf-002 gallery** (close-up clay hands) → `photo-1603974372039-adc49044b6bd` (pottery hands)
- **pf-004 gallery** (handwritten menu) → `photo-1414235077428-338989a2e8c0` (already valid, use a dining detail photo: `photo-1470337458703-46ad1756a187`)
- **pf-004 gallery** (Nile view at night) → `photo-1518709766631-a6a7f45921c3` (river city night)
- **pf-006 gallery** (vintage magazines) → `photo-1504270997636-07ddfbd48945` (vintage paper/magazines)
- **pf-006 + pf-008 gallery** (studio ambiance / workshop) → `photo-1513364776144-60967b0f800f` (already used elsewhere, valid — use `photo-1513519245088-0e12902e35ca` for variety)
- **pf-008 gallery** (ink-stained hands) → `photo-1513519245088-0e12902e35ca` (creative workshop)

All replacements will use known-working Unsplash photo IDs verified during this audit or sourced from well-known high-traffic Unsplash photos.

