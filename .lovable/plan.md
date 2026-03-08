

# Sprint 7: Shop / Marketplace — Implementation Plan

## Architecture

Follows existing feature patterns (Experiences, Portfolio, Blog) exactly. 12 files created, 2 files modified.

## Files to Create

### 1. `src/features/shop/types.ts`
- `PRODUCT_CATEGORIES` array: apparel, stationery, art-kits, creative-tools, gifts, limited-drops, accessories, home-studio
- `ProductCategory`, `ProductCategoryMeta`, `PRODUCT_CATEGORY_META` (mapped to NASO palette colors)
- `StockStatus`: "in-stock" | "low-stock" | "sold-out"
- `ProductDetail` extends `BaseEntity` with all specified fields (title, slug, summary, description, category, tags, price, currency, stockStatus, featured, limitedEdition?, coverImage, gallery, sizes?, colors?, linkedExperienceSlug?, linkedWorkshopSlug?, linkedPortfolioSlug?)
- `ProductFilters` interface

### 2. `src/features/shop/data.ts`
8 NASO-branded products with real-feeling Cairo content:

| # | Product | Category | Price | Notable |
|---|---------|----------|-------|---------|
| 1 | NASO Classic Tee | apparel | 450 EGP | featured, sizes/colors, linked portfolio |
| 2 | Cairo Sketchbook | stationery | 280 EGP | linked experience |
| 3 | Pottery Starter Kit | art-kits | 650 EGP | featured, linked workshop+experience |
| 4 | NASO Tote Bag | accessories | 320 EGP | low-stock |
| 5 | Collage Night Kit | creative-tools | 380 EGP | linked workshop |
| 6 | Muizz Street Print | limited-drops | 550 EGP | featured, limitedEdition, low-stock |
| 7 | Handmade Ceramic Mug | gifts | 290 EGP | colors, linked workshop+portfolio |
| 8 | Home Studio Essentials Box | home-studio | 850 EGP | gift-box |

Helpers: `getProductBySlug()`, `getRelatedProducts()`, `getFeaturedProducts()`

### 3. `src/features/shop/components/ShopHero.tsx`
- `bg-naso-cream naso-dotgrid` pattern (matches other heroes)
- Groovy headline "The NASO Shop"
- Subtitle: "Curated objects, creative tools, and limited drops — made in Cairo."
- FlowerShape + Sparkle decorative accents
- Uses `staggerHero`, `charRevealDelay`, `fadeUpDelay`, `stickerDrop` motion presets

### 4. `src/features/shop/components/ProductCategoryFilter.tsx`
- Horizontal scrollable pills with `naso-scrollbar-hide`
- Same pattern as ExperienceCategoryFilter but `border-2` (slightly cleaner)
- "All" option + all 8 categories
- Groovy font, active state with color + shadow-retro

### 5. `src/features/shop/components/ProductCard.tsx`
Key differentiator from other cards — commerce-clean, product-focused:
- `aspect-[4/5]` image (taller product ratio, distinct from portfolio's 3:4)
- Small category pill top-left (using smaller StickerBadge, not poster-style)
- Limited edition indicator: "✦ Limited Drop" badge top-right if applicable
- Below image: title (groovy font), one-line summary, price (prominent)
- Stock status: subtle "Low stock" or "Sold out" text
- Hover: `scale: 1.03` + shadow lift (no rotation — commerce trust)
- `border-2` border (thinner than portfolio's 2.5px)
- Uses `fadeUp` variant (not `posterEnter` — no rotation for commerce cards)
- Link wraps to `/shop/:slug`

### 6. `src/features/shop/components/ProductGrid.tsx`
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` (4-col on XL for denser browse)
- `staggerContainer` + `AnimatePresence`
- Empty state with FlowerShape
- Matches ExperienceGrid pattern

### 7. `src/features/shop/components/ProductDetailView.tsx`
Conversion-first product page:
- **Not found state** with link back to /shop
- **Hero**: 2-col on md (image left, info right), stacked on mobile
  - Large product image with rounded corners
  - Category badge
  - Title (groovy font, large)
  - Summary text
  - Price block (large, bold)
  - Stock/limited edition status indicators
  - Sizes display (if present): simple inline pills
  - Colors display (if present): simple inline pills
  - **CTA section**:
    - "Add to Cart" button: primary style, on click shows toast "Cart coming soon — reach out to us to order this item!"
    - "Inquire About This" link: secondary style, links to /inquiries with product context
- **Description section**: full text
- **Gallery**: grid if present (same pattern as portfolio gallery)
- **Linked content block**: optional, shows if linkedExperienceSlug/linkedWorkshopSlug/linkedPortfolioSlug exists. Lightweight section with link buttons.
- **Related products**: uses `getRelatedProducts()`, renders ProductGrid
- **Bottom CTA**: inquiry link in `bg-naso-cream naso-dotgrid` section

### 8. `src/features/shop/components/index.ts`
Barrel exports for all 5 components.

### 9. `src/features/shop/index.ts`
Export types, data helpers, and components.

### 10. `src/pages/Shop.tsx`
Thin wrapper: ShopHero + CategoryFilter + ProductGrid with category state filtering. Same pattern as Portfolio.tsx.

### 11. `src/pages/ProductDetail.tsx`
Uses `useParams` to get slug, renders `ProductDetailView`. Same pattern as PortfolioDetail.tsx.

## Files to Modify

### 12. `src/config/routes.ts`
- Add `SHOP_DETAIL: "/shop/:slug"` to ROUTES
- Add `shopDetail: (slug: string) => \`/shop/\${slug}\`` to routeHelpers
- Add `"product"` to InquiryContext type union

### 13. `src/app/routes.tsx`
- Import Shop and ProductDetail pages
- Wire `/shop` → ShopPage (replace PlaceholderPage)
- Add `/shop/:slug` → ProductDetailPage

## CTA Strategy
- "Add to Cart": renders as real button, shows honest toast ("Cart coming soon — reach out to us to order!"). No broken checkout flow.
- "Inquire About This": uses `buildInquiryPath({ type: "product", slug, title })` linking to inquiry form with context.
- Clean, non-deceptive, future-ready for real Shopify integration via existing `commerceClient` abstraction.

## Design Distinctiveness

| Aspect | Shop | Portfolio | Experiences |
|--------|------|-----------|-------------|
| Card image ratio | 4:5 | 3:4 | Color header strip |
| Card border | 2px | 2.5px | 2.5px |
| Card hover | Scale only | Scale only | Y-shift + rotate |
| Card entrance | fadeUp | posterEnter (rotate) | posterEnter (rotate) |
| Grid max cols | 4 | 3 | 3 |
| Card info | Below image, price prominent | Overlaid on image | Below color strip |
| Badges | Small pills | Sticker-style | Sticker-style |

