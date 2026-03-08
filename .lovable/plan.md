

# Sprint 2: Experiences Feature — Full Implementation

## Overview
Build the complete Experiences feature with 12 new files and 2 modified files. All motion uses centralized presets, all UI uses shared components, homepage untouched.

## New Files

### 1. `src/features/experiences/types.ts`
- `EXPERIENCE_CATEGORIES` const array: `"outing" | "workshop" | "cultural" | "adventure" | "nightlife" | "creative"`
- `ExperienceDetail` interface extending `BaseEntity` with: `title`, `slug`, `summary`, `description`, `category`, `tags[]`, `date`, `location`, `price`, `currency`, `capacity`, `difficulty`, `coverImage`, `gallery`, `featured`, `seo?`
- `ExperienceFilters` type: `{ category: ExperienceCategory | "all" }`
- `CATEGORY_META` record mapping each category to `{ label, emoji, color (bg class), textColor }`
  - outing → `bg-secondary`, workshop → `bg-naso-lilac`, cultural → `bg-primary`, adventure → `bg-naso-coral`, nightlife → `bg-naso-purple`, creative → `bg-naso-pink`

### 2. `src/features/experiences/data.ts`
- 8 mock `ExperienceDetail` objects with Cairo-themed content (Sunset at the Citadel, Pottery & Chill, Cairo Jazz Night, Street Art Walk: Muizz, Wadi Degla Hike, Collage Night, Rooftop Film Club, Fayoum Overnight)
- Helper functions: `getExperienceBySlug(slug)`, `getRelatedExperiences(experience, limit)`
- Data shaped as flat objects — ready to swap for CMS queries

### 3. `src/features/experiences/components/ExperienceCard.tsx`
Poster/sticker-style tile — the core visual component:
- Outer wrapper: `motion.div` with `posterEnter(index * 0.08)` entrance, `layout` prop for filter transitions
- Card: `rounded-2xl border-[2.5px] border-foreground shadow-retro overflow-hidden bg-card` — entire card is a `Link` to `/experiences/:slug`
- **Top strip**: Category-colored block (from `CATEGORY_META.color`) with `naso-halftone` overlay, ~120px tall
- **Category badge**: `StickerBadge` from shared components, positioned overlapping top strip edge with `absolute -bottom-3 left-4`, uses `variant="filled"` with category color
- **Body**: Padding with title in `font-groovy text-lg`, date + location in `text-sm text-muted-foreground`, summary truncated to 2 lines
- **Footer**: Price pill `font-groovy text-xs` bottom-right, difficulty tag if not "easy"
- **Hover**: `whileHover={{ y: -6, rotate: 1 }}` with `spring` transition — subtle tilt lift
- **Mobile**: Full-width card, same visual personality, slightly less padding

### 4. `src/features/experiences/components/ExperienceCategoryFilter.tsx`
Horizontal pill filter bar:
- Container: `flex gap-3 overflow-x-auto pb-2` with hidden scrollbar (`scrollbar-hide` or inline style), `motion.div` with `staggerFast` entrance
- Pills: "All" + each category from `CATEGORY_META`
- Each pill: `motion.button` with styles matching `StickerBadge` — `rounded-full border-2 border-foreground px-4 py-2 font-groovy text-[11px] uppercase tracking-wider`
- Active state: filled with category color + `shadow-retro`, inactive: `bg-card`
- Active pill gets slight rotate via `style={{ rotate: -2 }}`
- `fadeUp` entrance per pill
- Props: `active: ExperienceCategory | "all"`, `onChange: (cat) => void`

### 5. `src/features/experiences/components/ExperienceGrid.tsx`
- `motion.div` parent with `staggerContainer` variant, `initial="hidden" whileInView="visible" viewport={{ once: true }}`
- CSS grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- `AnimatePresence mode="popLayout"` wrapping cards
- Each `ExperienceCard` keyed by `id` with `layout` prop
- Empty state: centered message "No experiences found" with `FlowerShape` accent

### 6. `src/features/experiences/components/ExperienceHero.tsx`
Compact listing-page hero banner:
- `Section` wrapper with `spacing="lg"`, `bg-naso-cream naso-dotgrid` background via className
- `motion.div` parent with `staggerHero` variant
- Headline: `font-groovy` "Experiences" at `text-5xl md:text-7xl` with `charRevealDelay(0.1)`
- Subtext: "Curated moments across Cairo" with `fadeUpDelay(0.3)`
- 2 decorative accents: `FlowerShape` (absolute, `text-naso-green naso-flower-spin`, top-right area) and `Sparkle` (absolute, `text-primary`, bottom-left area) — both with `stickerDrop` entrance
- Kept compact — no more than ~300px viewport height

### 7. `src/features/experiences/components/ExperienceDetailView.tsx`
Full detail page layout:
- Uses `useParams()` to get `slug`, calls `getExperienceBySlug`
- If not found: renders a "not found" state with link back to `/experiences`
- **Hero zone**: Full-width `Section` with category color background, `StickerBadge` for category, title in `font-groovy text-4xl md:text-6xl`, date + location below
- **Content area**: `Section` with two-column layout on desktop (`grid md:grid-cols-3 gap-12`)
  - Left (2 cols): description text, tags as small pills
  - Right (1 col): Retro-styled info card (`border-2 border-foreground rounded-2xl shadow-retro p-6`) with price, capacity, difficulty, and a CTA button using `MagneticButton` styling
- **Related section**: "More like this" at bottom with 3 `ExperienceCard`s from `getRelatedExperiences`, uses `ExperienceGrid` — falls back to random picks if same-category results are < 3
- All motion uses `fadeUp`, `staggerContainer` from centralized presets

### 8. `src/features/experiences/components/index.ts`
Barrel export: `ExperienceCard`, `ExperienceCategoryFilter`, `ExperienceGrid`, `ExperienceHero`, `ExperienceDetailView`

### 9. `src/features/experiences/index.ts`
Barrel export: re-export `./types`, `./data`, `./components`

### 10. `src/pages/Experiences.tsx`
Listing page composition:
- `useState<ExperienceCategory | "all">("all")` for filter state
- Filter logic: `MOCK_EXPERIENCES.filter(e => active === "all" || e.category === active)`
- Renders: `ExperienceHero` → `Section` containing `ExperienceCategoryFilter` → `ExperienceGrid`

### 11. `src/pages/ExperienceDetail.tsx`
Thin page wrapper: renders `ExperienceDetailView` component

## Modified Files

### 12. `src/config/routes.ts`
Add: `EXPERIENCE_DETAIL: "/experiences/:slug"` to ROUTES constant

### 13. `src/app/routes.tsx`
- Import `ExperiencesPage` from `@/pages/Experiences` and `ExperienceDetailPage` from `@/pages/ExperienceDetail`
- Replace `PlaceholderPage` for EXPERIENCES route with `<ExperiencesPage />`
- Add new route: `{ path: ROUTES.EXPERIENCE_DETAIL, element: <ExperienceDetailPage /> }`
- Place detail route BEFORE the wildcard

## Design System Reuse
| Element | Source |
|---|---|
| `posterEnter`, `staggerContainer`, `staggerFast`, `fadeUp`, `fadeUpDelay`, `charRevealDelay`, `stickerDrop`, `staggerHero` | `src/lib/motion.ts` |
| `StickerBadge`, `FlowerShape`, `Sparkle`, `MagneticButton` | `src/components/shared/RetroElements.tsx` |
| `Section`, `SectionHeader`, `MotionDiv` | `src/components/shared/` |
| `shadow-retro`, `font-groovy`, `naso-dotgrid`, `naso-halftone`, `naso-cream`, brand colors | CSS/Tailwind config |

## What stays untouched
Homepage (`Index.tsx` + all section components), Header, Footer, RootLayout, shared components, design system tokens, motion presets — all preserved exactly as-is.

