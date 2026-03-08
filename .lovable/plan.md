

# Pre-Sprint 5: Full Project Refinement Pass

## Summary of Findings

After reviewing every file across homepage, experiences, workshops, inquiries, shared components, types, routing, motion, and config, the project is in good shape architecturally. The issues are mostly small consistency gaps, minor dead code, and a few structural improvements that will make the codebase meaningfully stronger.

## Changes Organized by Area

### 1. Global Architecture & Config

**Site nav missing Workshops link.** `siteConfig.nav` has Home, Experiences, Blog, Shop but not Workshops — a built feature. Add it.

**NotFound page is unstyled/off-brand.** Uses generic styling (`bg-muted`, no brand fonts). Restyle to match NASO design system with `font-groovy`, retro elements, and proper layout.

**Header nav active state too simple.** Only matches exact `pathname === item.href`. Detail pages like `/experiences/sunset-at-the-citadel` won't highlight "Experiences". Use `pathname.startsWith()` for parent matching.

### 2. Design Token & Style Consistency

All colors used (`bg-naso-coral`, `bg-naso-pink`, `bg-naso-lemon`, `bg-naso-cream`, `bg-naso-lilac`, `bg-naso-purple`) are already properly defined in CSS variables and Tailwind config. No ad-hoc colors found. **No changes needed here.**

### 3. Motion System Consistency

Almost all motion comes from `src/lib/motion.ts`. Found two instances of inline motion in homepage sections (`MoreToExploreSection`, `BigCTASection`) using raw `initial/whileInView` instead of centralized variants. These are decorative accents — minor, but should use the existing `popIn` or `scaleIn` preset for consistency.

**WorkshopDetailView** still imports `useParams` directly despite receiving `slug` as prop. The fallback to `useParams` should be removed since page wrappers now handle this.

**ExperienceDetailView** — same issue, still has `useParams` fallback.

### 4. Homepage Quality

**FeaturedExperiencesSection** uses hardcoded data in `home/data.ts` rather than pulling from the real `MOCK_EXPERIENCES`. This means the featured section shows different content than what exists in the experiences feature. Wire it to real data.

**Unused imports** in `WhatNasoIsSection.tsx`: `Link`, `ArrowRight` are imported but never used.

### 5. Experiences Feature

Clean overall. One improvement: the `ExperienceCard` footer shows difficulty only when not "easy" — good pattern. No issues found with route helpers, CTA paths, or data structure.

### 6. Workshops Feature

Clean and parallel to Experiences. The `WorkshopCategoryFilter` and `ExperienceCategoryFilter` are structurally very similar but appropriately separate (no premature abstraction). No issues.

### 7. Inquiries Feature

Clean validation, good context handling. One small improvement: the `InquiryForm` uses `update("inquiryType", type)` with a string value but `InquiryFormData.inquiryType` is typed as `InquiryType`. The `update` function signature accepts `string` for the value param — should be tightened to accept the correct type for each field.

### 8. CTA & Conversion Readiness

`buildInquiryPath` is used correctly in both detail views. The flow from detail page CTA to inquiry page with context works well. No issues.

### 9. Type Safety & Code Quality

- `WorkshopDetailView` and `ExperienceDetailView` both still import and use `useParams` despite receiving slug via props — residual coupling
- `WhatNasoIsSection`: unused `Link` and `ArrowRight` imports
- `NotFound` page uses `console.error` for 404 logging — unnecessary noise

### 10. Mobile Quality

Filter components use `overflow-x-auto` with hidden scrollbar and `sm:flex-wrap` — good pattern. Cards use `h-full` for equal heights in grid. Form fields have proper `autoComplete` attributes. No issues found.

---

## Implementation Plan

### Task 1: Fix site nav and header active state
- Add `{ label: "Workshops", href: ROUTES.WORKSHOPS }` to `siteConfig.nav`
- Update Header active state to use `pathname.startsWith(item.href)` (with special case for "/" to avoid matching everything)

### Task 2: Clean up detail view router coupling
- Remove `useParams` import and fallback from `ExperienceDetailView` — require `slug` prop
- Remove `useParams` import and fallback from `WorkshopDetailView` — require `slug` prop
- Make `slug` prop required (non-optional) in both components

### Task 3: Clean up dead code and unused imports
- Remove `Link`, `ArrowRight` from `WhatNasoIsSection.tsx`
- Remove `console.error` from `NotFound.tsx`

### Task 4: Wire FeaturedExperiencesSection to real data
- Import from `MOCK_EXPERIENCES` and filter `featured: true`
- Use `routeHelpers.experienceDetail()` for links
- Remove the hardcoded `featuredExperiences` array from `home/data.ts`

### Task 5: Normalize decorative motion in homepage
- Replace inline `initial/whileInView` on decorative elements in `MoreToExploreSection` and `BigCTASection` with `popIn` or `scaleIn` variants

### Task 6: Restyle NotFound page
- Use NASO brand styling: `font-groovy`, `FlowerShape`, retro shadow, proper layout with `Section` wrapper, `MagneticButton` for home link

### Task 7: Tighten InquiryForm update function typing
- Change `update` to use proper field-specific value types instead of generic `string`

These are all focused, non-disruptive improvements. No architecture changes, no visual redesign, no feature removal. Every change makes the codebase cleaner and more consistent.

**Estimated scope**: ~8 files modified, 0 new files created.

