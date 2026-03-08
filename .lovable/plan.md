

# Sprint 6: Blog Feature — Implementation Plan

All patterns explored and confirmed. Ready to implement the following:

## Files to Create (11)

| File | Purpose |
|------|---------|
| `src/features/blog/types.ts` | BlogCategory (6 categories), BlogPost interface, BlogFilters, BLOG_CATEGORY_META |
| `src/features/blog/data.ts` | 8 NASO-voice mock posts with helpers: getPostBySlug, getFeaturedPost, getRelatedPosts |
| `src/features/blog/index.ts` | Re-exports |
| `src/features/blog/components/BlogHero.tsx` | Calmer editorial hero — cream bg, dotgrid, single accent |
| `src/features/blog/components/BlogCategoryFilter.tsx` | Horizontal pill filter — lighter/more editorial than experiences |
| `src/features/blog/components/BlogCard.tsx` | Editorial content tile — cover image, category text label, title, excerpt, date + reading time. Softer hover (y:-4, no rotate). NOT an ecommerce card. |
| `src/features/blog/components/BlogGrid.tsx` | Responsive grid with stagger animation + empty state |
| `src/features/blog/components/BlogDetailView.tsx` | Full reading page: hero with cover/category/date, prose-width body (~680px), tags, optional linked content blocks, related posts |
| `src/features/blog/components/index.ts` | Component re-exports |
| `src/pages/Blog.tsx` | Thin page wrapper with filter state |
| `src/pages/BlogDetail.tsx` | Thin page wrapper extracting slug from params |

## Files to Modify (2)

| File | Change |
|------|--------|
| `src/config/routes.ts` | Add `BLOG_DETAIL: "/blog/:slug"` + `routeHelpers.blogDetail` |
| `src/app/routes.tsx` | Wire BlogPage + BlogDetailPage, remove blog placeholder |

## Key Design Decisions

- **BlogCard**: Editorial feel with category shown as colored text (not sticker badge), date + reading time as metadata line, "Read story →" CTA text, softer hover
- **BlogDetailView**: Max-width prose area for comfortable reading, markdown-like content rendered with proper heading/paragraph structure, restrained motion on article page
- **Filter**: Same pill pattern but slightly softer — no shadow-retro on active, uses filled bg instead
- **Mock data**: 8 posts with real NASO voice covering date ideas, Cairo guides, workshop stories, journal entries — all with Unsplash images and optional linked slugs

## Blog Categories
`outing-ideas`, `cairo-guides`, `creative-living`, `workshop-stories`, `event-inspiration`, `naso-journal`

