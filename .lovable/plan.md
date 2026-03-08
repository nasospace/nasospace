
# Sprint 5: Portfolio / Gallery Feature — Implementation

## Overview
13 new files, 4 modified files. All patterns follow established Experiences/Workshops conventions.

## New Files

### 1. `src/features/portfolio/types.ts`
- `PORTFOLIO_CATEGORIES`: birthdays, workshops, group-outings, couples, corporate, creative-nights, custom-events
- `PortfolioCategoryMeta` with emoji, color, textColor per category
- `PortfolioItem` extending `BaseEntity`: title, slug, summary, story, category, tags, location, date, audienceType, vibe, coverImage, gallery, optional linkedExperienceSlug/linkedWorkshopSlug, featured, optional testimonialQuote/testimonialName
- `PortfolioFilters`: category filter type

### 2. `src/features/portfolio/data.ts`
8 Cairo-specific mock items with emotionally rich stories:
1. **Nadia's 25th at the Citadel** (birthdays) — surprise birthday, linked to sunset-at-the-citadel experience
2. **Pottery Session: The Quiet Ones** (workshops) — meditative clay session, linked to pottery-and-chill workshop
3. **Fayoum Under Stars** (group-outings) — desert camping, linked to fayoum-overnight experience
4. **Yara & Tarek's Anniversary** (couples) — rooftop dinner for two
5. **Creativa Team Day** (corporate) — design agency offsite, linked to collage-night workshop
6. **Midnight Collage Club** (creative-nights) — late-night creative session, linked to collage workshop
7. **Omar's Proposal Picnic** (couples) — garden proposal surprise
8. **Screen Print Saturday** (workshops) — maker session, linked to tote-bag workshop

Helper functions: `getPortfolioBySlug()`, `getRelatedPortfolio()`

### 3. `src/features/portfolio/components/PortfolioHero.tsx`
- `bg-naso-lilac` with `naso-dotgrid` texture (distinct from experiences' cream)
- Uses `staggerHero`, `charRevealDelay`, `fadeUpDelay` from motion system
- Decorative `FlowerShape` + `Sparkle` accents
- Copy: "Our World" / memory-driven subtitle

### 4. `src/features/portfolio/components/PortfolioCategoryFilter.tsx`
- Same structural pattern as `ExperienceCategoryFilter`
- Horizontal scroll mobile, flex-wrap desktop
- Uses `PORTFOLIO_CATEGORY_META` for colors/emojis

### 5. `src/features/portfolio/components/PortfolioCard.tsx`
**Distinct from ExperienceCard/WorkshopCard:**
- Portrait aspect ratio (`aspect-[3/4]`) with full-bleed cover image
- Gradient overlay from bottom for text readability
- Title + summary overlaid at bottom with backdrop blur
- Category `StickerBadge` top-left corner
- Italic vibe tag (e.g., "✦ golden hour, cinematic")
- "See the story →" CTA text
- Hover: `scale(1.03)` + shadow lift (no rotate — different from experiences)
- Uses `posterEnter` for entrance, `spring` for hover

### 6. `src/features/portfolio/components/PortfolioGrid.tsx`
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` responsive grid
- `staggerContainer` + `AnimatePresence`
- Empty state with `FlowerShape`

### 7. `src/features/portfolio/components/PortfolioDetailView.tsx`
Lightweight case-study page structure:
- **Hero**: category-colored bg, category badge, title, location · date, vibe tag
- **Story section**: full prose text, tags below, sidebar with audience/vibe info card + testimonial quote block (if exists)
- **Gallery**: responsive image grid (2-col on mobile, 3-col on desktop)
- **Linked item**: if `linkedExperienceSlug` or `linkedWorkshopSlug` exists, show a card linking to that item with "Explore the experience/workshop" CTA
- **Booking CTA**: "Want a moment like this?" → `buildInquiryPath({ type: "portfolio", slug, title })`
- **Related items**: 3 related portfolio cards at bottom

### 8. `src/features/portfolio/components/index.ts`
Barrel exports for all components

### 9. `src/features/portfolio/index.ts`
Barrel exports for types + components

### 10. `src/pages/Portfolio.tsx`
Thin page: filter state, PortfolioHero + PortfolioCategoryFilter + PortfolioGrid

### 11. `src/pages/PortfolioDetail.tsx`
Thin wrapper: `useParams` → slug → `PortfolioDetailView`

## Modified Files

### 12. `src/config/routes.ts`
- Add `PORTFOLIO_DETAIL: "/portfolio/:slug"` to ROUTES
- Add `portfolioDetail` to `routeHelpers`
- Extend `InquiryContext.type` to include `"portfolio"`

### 13. `src/app/routes.tsx`
- Import and wire Portfolio + PortfolioDetail pages
- Replace portfolio PlaceholderPage

### 14. `src/config/site.ts`
- Add `{ label: "Portfolio", href: ROUTES.PORTFOLIO }` to nav (after Workshops)

### 15. `src/features/inquiries/hooks/useInquiryContext.ts`
- Add `"portfolio"` to valid ref check on line 16

## Quality Rules Applied
- Cards use portrait image-first layout with gradient overlay — atmospheric, not transactional
- Detail page is story-led with prose narrative, not just data blocks
- Linked items are fully optional — clean conditional rendering
- Mobile: portrait cards stack cleanly at full width, gallery goes 2-col, text stays readable
- All motion from centralized `lib/motion.ts` presets
- Mock stories are emotionally specific to Cairo, not generic filler
