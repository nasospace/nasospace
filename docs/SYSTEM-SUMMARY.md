# NASO — System Summary & Handoff Guide

> Last updated: 2026-03-10 — Sprint 24

## 1. What NASO Is

NASO is a Cairo-based creative brand website covering experiences, workshops, events, portfolio, blog, shop (products), and community testimonials. It is built with **React + Vite + Tailwind CSS + TypeScript** and backed by **Lovable Cloud** (Supabase under the hood).

---

## 2. Feature Status

### Launch-Ready (Public)

| Page / Feature | Route | Backend | Notes |
|---|---|---|---|
| Homepage | `/` | CMS (featured experiences) | Fully styled, hero + sections |
| Experiences listing | `/experiences` | `cms_experiences` | CMS-backed, category filter |
| Experience detail | `/experiences/:slug` | `cms_experiences` | Full detail + inquiry CTA |
| Workshops listing | `/workshops` | `cms_workshops` | CMS-backed, category filter |
| Workshop detail | `/workshops/:slug` | `cms_workshops` | Full detail + inquiry CTA |
| Portfolio listing | `/portfolio` | `cms_portfolio_items` | CMS-backed |
| Portfolio detail | `/portfolio/:slug` | `cms_portfolio_items` | Full detail |
| Blog listing | `/blog` | `cms_blog_posts` | CMS-backed, category filter |
| Blog detail | `/blog/:slug` | `cms_blog_posts` | Full article view |
| Shop listing | `/shop` | `cms_products` | CMS-backed |
| Product detail | `/shop/:slug` | `cms_products` | Detail + add-to-cart |
| Cart | `/cart` | Client-side (localStorage) | No checkout/payment yet |
| FAQ | `/faq` | `cms_faq_items` | CMS-backed accordion |
| About | `/about` | `cms_page_content` | CMS-backed sections |
| Contact | `/contact` | Static + inquiry form | Submits to `inquiries` table |
| Inquiries | `/inquiries` | `inquiries` table | Context-aware form |
| Community Love | `/community-love` | `cms_testimonials` | Testimonial grid |
| 404 | `*` | — | Styled not-found page |

### Auth-Protected (Account)

| Page | Route | Backend |
|---|---|---|
| Account overview | `/account` | `profiles`, `saved_items`, `inquiries` |
| Saved items | `/account/saved` | `saved_items` + CMS lookups |
| My requests | `/account/requests` | `inquiries` |
| Settings | `/account/settings` | `profiles` |

### Admin-Protected

| Page | Route | Backend |
|---|---|---|
| Overview dashboard | `/admin` | Aggregate counts from `inquiries`, `profiles`, `saved_items` |
| Inquiries management | `/admin/inquiries` | `inquiries` (status + notes update) |
| Users list | `/admin/users` | `profiles` |
| Saved items analytics | `/admin/saved` | `saved_items` aggregates |
| Experiences CRUD | `/admin/experiences` | `cms_experiences` |
| Workshops CRUD | `/admin/workshops` | `cms_workshops` |
| Products CRUD | `/admin/products` | `cms_products` |
| Portfolio CRUD | `/admin/portfolio` | `cms_portfolio_items` |

### Placeholder / Not Yet Built

| Item | Notes |
|---|---|
| `/services` | Placeholder page — remove or build before launch |
| Checkout / Payment | Cart exists but no payment flow |
| Blog admin CRUD | Table exists, admin RLS not yet added |
| FAQ admin CRUD | Table exists, admin RLS not yet added |
| Testimonials admin CRUD | Table exists, admin RLS not yet added |
| Site settings admin | Table exists, admin RLS not yet added |
| Page content admin | Table exists, admin RLS not yet added |
| Image upload in admin | Currently uses URL text fields |

---

## 3. Data Architecture

### CMS Tables (Public Read, Admin Write)

All prefixed `cms_*`. Public reads via RLS `published = true`. Admin writes via `has_role(auth.uid(), 'admin')`.

- `cms_experiences` — ✅ Full admin CRUD
- `cms_workshops` — ✅ Full admin CRUD
- `cms_products` — ✅ Full admin CRUD
- `cms_portfolio_items` — ✅ Full admin CRUD
- `cms_blog_posts` — ⚠️ Public read only, no admin write RLS yet
- `cms_faq_items` — ⚠️ Public read only, no admin write RLS yet
- `cms_testimonials` — ⚠️ Public read only, no admin write RLS yet
- `cms_site_settings` — ⚠️ Public read only, no admin write RLS yet
- `cms_page_content` — ⚠️ Public read only, no admin write RLS yet

### User Data Tables

- `profiles` — Auto-created by `handle_new_user()` trigger on `auth.users`
- `saved_items` — Auth-scoped bookmarks
- `inquiries` — Public submission, auth-scoped read, admin full access
- `user_roles` — Admin role assignments (enum: admin, moderator, user)

### Key Database Functions

- `has_role(uuid, app_role)` — SECURITY DEFINER, prevents RLS recursion
- `handle_new_user()` — Trigger on `auth.users` INSERT → creates profile
- `validate_inquiry_insert()` — Server-side validation trigger
- `update_last_updated_column()` — Timestamp auto-update trigger

### Edge Functions

- `migrate-device-data` — One-time device→user data migration (transitional, can be retired)

---

## 4. Auth System

- Email/password signup + email verification (not auto-confirmed)
- Session managed via `AuthProvider` in `src/lib/auth/provider.tsx`
- Route guards: `RequireAuth` (account pages), `RequireAdmin` (admin pages)
- Admin check: queries `user_roles` table for `admin` role
- No OAuth providers configured

---

## 5. Code Architecture

### Key Directories

```
src/
  app/           → Layout shell, routes, providers
  features/      → Domain modules (experiences, shop, blog, etc.)
  components/    → Shared UI (shadcn + custom)
  lib/           → Auth, CMS queries, motion, SEO, utils
  server/        → Service layer (queries, mutations, admin)
  pages/         → Route page components
  config/        → Routes, site config
  integrations/  → Supabase client + types (auto-generated)
```

### Service Layer Pattern

All database access goes through `src/server/services/` or `src/lib/cms/`. Components never import Supabase directly. This makes migration to owned Supabase a matter of updating the client import.

### CMS Query Pattern

Each domain has a query file in `src/lib/cms/` and a mapper in `src/features/*/mappers/` to transform DB rows into typed domain objects.

---

## 6. What Is Still Transitional

| Item | Status | Action Needed |
|---|---|---|
| `device_id` column on `saved_items`, `inquiries`, `profiles` | Legacy from pre-auth phase | Can be dropped after confirming no device data remains |
| `migrate-device-data` edge function | Transitional | Retire after migration or when device data is gone |
| `src/lib/deviceId.ts` | Deprecated utility | Delete when edge function is retired |
| `/services` route | Placeholder | Remove or build before launch |
| Cart localStorage | No payment integration | Add Stripe/payment before commerce launch |
| `siteConfig.url` = `"https://naso.co"` | Placeholder domain | Update when real domain is ready |
| Social links in `siteConfig` | Generic placeholders | Update with real social URLs |

---

## 7. Operational Notes for the Team

### Content Management

- **Experiences, Workshops, Products, Portfolio**: Manageable via `/admin/*` pages (create, edit, delete)
- **Blog, FAQ, Testimonials**: Content must be managed via backend directly until admin CRUD is added
- **Site Settings, Page Content**: Backend-only management for now

### Admin Access

To make a user an admin, insert into `user_roles`:
```sql
INSERT INTO user_roles (user_id, role) VALUES ('<user-uuid>', 'admin');
```

### Content Visibility

All CMS content uses a `published` boolean. Unpublished items are hidden from public pages but visible to admins.

---

## 8. Technical Debt Summary

### Must-Do Before Launch

- [ ] Remove or redirect `/services` placeholder route
- [ ] Update `siteConfig.url` and social links with real values
- [ ] Add real OG image at `public/og-default.png`
- [ ] Verify email verification flow works end-to-end
- [ ] Populate initial CMS content for all public pages

### Safe to Do After Launch

- [ ] Add admin CRUD for blog, FAQ, testimonials, site-settings, page-content
- [ ] Add image upload to admin forms (storage bucket)
- [ ] Drop `device_id` columns and retire migration edge function
- [ ] Add pagination to admin list views
- [ ] Add richer admin analytics/dashboard

### Required Before Migration to Owned Supabase

- [ ] See `docs/MIGRATION.md` for full plan
- [ ] Export all table data
- [ ] Re-create triggers (especially `handle_new_user` on `auth.users`)
- [ ] Re-create RLS policies
- [ ] Set secrets in new project
- [ ] Update `.env` with new project credentials

### Optional Polish

- [ ] OAuth providers (Google, etc.)
- [ ] Rich text editor for blog/description fields
- [ ] Draft/scheduled publishing workflow
- [ ] Multi-language support
- [ ] Advanced search across content types
