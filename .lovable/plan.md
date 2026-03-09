

# Sprint 10: Account Shell — Implementation Plan

## Overview
Build the NASO account area with 4 pages, reusable components, and mock data pulled from the real NASO ecosystem. Calm, branded, utility-focused — not a SaaS dashboard.

## Files to Create (16 files)

### Types & Data
- **`src/features/account/types.ts`** — `AccountUser`, `SavedItem`, `RequestHistoryItem`, `RequestStatus` with status color metadata
- **`src/features/account/data.ts`** — Mock data pulling real items from existing `MOCK_EXPERIENCES`, `MOCK_WORKSHOPS`, `MOCK_PRODUCTS`
- **`src/features/account/hooks/useAccountData.ts`** — `useAccountData()` and `useSavedItems()` hooks (single swap point for future API)
- **`src/features/account/index.ts`** — Public exports

### Components (8 files)
- **`AccountLayout.tsx`** — Wraps account pages with nav + container; uses `<Outlet />` for nested routing
- **`AccountNav.tsx`** — Horizontal tabs (desktop) / scrollable pill bar (mobile) linking to 4 account sections; uses `useLocation` for active state
- **`AccountSummaryCard.tsx`** — Icon + count + label card for dashboard quick links
- **`SavedItemCard.tsx`** — Cover image, type badge, title, summary, meta, price; links to real detail pages via `routeHelpers`
- **`RequestStatusCard.tsx`** — Inquiry type, item title, dates, status badge with NASO colors, optional notes
- **`EmptyState.tsx`** — Illustration-free branded empty state with emoji, message, description, optional CTA button
- **`SettingsSection.tsx`** — Grouped settings block with title + description wrapper
- **`components/index.ts`** — Barrel exports

### Pages (4 files)
- **`src/pages/Account.tsx`** — Dashboard: welcome greeting, 3 summary cards, recent saved preview (2 items), recent requests preview (2 items), explore CTA
- **`src/pages/AccountSaved.tsx`** — Filter tabs (All/Experiences/Workshops/Products) + `SavedItemCard` grid + empty state
- **`src/pages/AccountRequests.tsx`** — Request list with `RequestStatusCard` + empty state
- **`src/pages/AccountSettings.tsx`** — Profile info (read-only), communication preferences (visual-only toggles with honest disclaimer), help CTA

## Files to Modify (2 files)

### `src/config/routes.ts`
Add `ACCOUNT_SAVED`, `ACCOUNT_REQUESTS`, `ACCOUNT_SETTINGS` route constants.

### `src/app/routes.tsx`
Add nested route group under `/account` using `AccountLayout` as the layout element with 4 child routes.

## Key Design Decisions

**Navigation**: Horizontal tab bar (not sidebar) — avoids SaaS dashboard feel. On mobile, tabs are a scrollable row with pill-shaped items. Active tab uses `bg-foreground text-background` for clear indication.

**Mock data honesty**: Saved items pull real titles, images, prices, and locations from existing NASO mock data. No fake "John Doe" data — everything feels like the real NASO ecosystem. Settings page has a clear note: "These settings will be connected when accounts go live."

**Motion**: Uses existing `fadeUp` and `staggerContainer` variants from `src/lib/motion.ts`. Subtle entrance animations only — no flashy effects on utility pages.

**Future auth integration**: `useAccountData()` hook is the single data source. When auth is added: (1) swap mock returns with API calls inside the hook, (2) add an auth guard wrapper around the `/account` route group in `routes.tsx`. Zero component rewrites needed.

**Routing structure**: Nested routes under `/account` with `AccountLayout` as parent — same pattern as `RootLayout` with `<Outlet />`.

