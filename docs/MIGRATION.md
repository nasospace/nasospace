# NASO — Migration Guide: Lovable Cloud → Owned Supabase

> This document outlines the plan for migrating NASO's backend from Lovable Cloud
> to a self-owned Supabase project.

## Current Architecture Overview

### Database Tables

| Table | Purpose | RLS | Auth-tied |
|-------|---------|-----|-----------|
| `profiles` | User profiles (auto-created on signup via trigger) | Yes | user_id |
| `inquiries` | Inquiry submissions from visitors/users | Yes | user_id (nullable) |
| `saved_items` | User-saved content bookmarks | Yes | user_id |
| `user_roles` | Admin/moderator role assignments | Yes | user_id |
| `cms_experiences` | CMS: experience listings | Yes (public read) | No |
| `cms_workshops` | CMS: workshop listings | Yes (public read) | No |
| `cms_products` | CMS: shop products | Yes (public read) | No |
| `cms_blog_posts` | CMS: blog articles | Yes (public read) | No |
| `cms_portfolio_items` | CMS: portfolio items | Yes (public read) | No |
| `cms_faq_items` | CMS: FAQ entries | Yes (public read) | No |
| `cms_testimonials` | CMS: testimonial quotes | Yes (public read) | No |
| `cms_site_settings` | CMS: key-value site settings | Yes (public read) | No |
| `cms_page_content` | CMS: structured page content blocks | Yes (public read) | No |

### Database Functions

| Function | Type | Purpose |
|----------|------|---------|
| `handle_new_user()` | Trigger (SECURITY DEFINER) | Auto-creates profile on auth.users insert |
| `validate_inquiry_insert()` | Trigger | Server-side validation for inquiry data |
| `update_last_updated_column()` | Trigger | Auto-updates timestamp columns |
| `has_role(_user_id, _role)` | Query helper (SECURITY DEFINER) | Safe role-checking without RLS recursion |

### Edge Functions

| Function | Purpose | Secrets Used |
|----------|---------|--------------|
| `migrate-device-data` | One-time migration of pre-auth device data to user accounts | SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY |

### Auth Configuration

- Email/password authentication (standard signup + email verification)
- No OAuth providers configured yet
- Profile auto-creation via `handle_new_user` trigger on `auth.users`

---

## Migration Steps

### Phase 1: Preparation (Before Migration)

1. **Create new Supabase project** under your own account
2. **Export schema** from Lovable Cloud using the migration files in `supabase/migrations/`
3. **Apply migrations** to the new project in order
4. **Re-create database functions** (listed above)
5. **Re-create triggers** — note: the `handle_new_user` trigger is on `auth.users`
6. **Copy RLS policies** — all policies are defined in migrations
7. **Set up secrets** in new project:
   - `SUPABASE_SERVICE_ROLE_KEY` (auto-provided by new project)

### Phase 2: Data Migration

1. **Export CMS data** (all `cms_*` tables) — these are the most important
2. **Export `user_roles`** table
3. **Export `profiles`**, `inquiries`, `saved_items` if retaining user data
4. **Note**: `auth.users` cannot be directly exported; users will need to re-register OR use Supabase's auth admin API to migrate

### Phase 3: Code Changes

All Supabase client references are isolated. Only **two files** need updating:

1. **`.env`** — Update these three variables:
   ```
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
   VITE_SUPABASE_PROJECT_ID=your_project_id
   ```

2. **`src/integrations/supabase/client.ts`** — Auto-generated, will work with new env vars

3. **Edge functions** — Redeploy `supabase/functions/` to new project (or retire `migrate-device-data` if no longer needed)

### Phase 4: Verification

- [ ] Auth signup/signin works
- [ ] Profile auto-creation trigger fires
- [ ] CMS content loads on all public pages
- [ ] Saved items CRUD works for authenticated users
- [ ] Inquiry submission works (both anonymous and authenticated)
- [ ] Admin role check works
- [ ] Admin CRUD on inquiries works
- [ ] RLS policies block unauthorized access

---

## Code Touchpoints (Supabase Client Usage)

All Supabase imports go through `@/integrations/supabase/client`. Here are the service files:

| File | Tables Accessed |
|------|-----------------|
| `src/server/services/inquiries.ts` | `inquiries` |
| `src/server/services/savedItems.ts` | `saved_items` |
| `src/server/services/account.ts` | `profiles` |
| `src/server/services/admin/role-check.ts` | `user_roles` |
| `src/server/services/admin/overview.ts` | `inquiries`, `saved_items`, `profiles` |
| `src/server/services/admin/inquiries.ts` | `inquiries` |
| `src/server/services/admin/profiles.ts` | `profiles` |
| `src/server/services/admin/saved-items.ts` | `saved_items` |
| `src/lib/cms/*.ts` | All `cms_*` tables |
| `src/lib/auth/provider.tsx` | `auth` (via supabase.auth) |

---

## Deprecation Notes

- **`device_id` column** on `saved_items` and `inquiries`: Legacy from pre-auth phase. Can be dropped after migration if all device data has been migrated.
- **`migrate-device-data` edge function**: Can be retired after migration.
- **`src/lib/deviceId.ts`**: Can be deleted after edge function retirement.

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| User data loss | Export all tables before switching |
| Auth users can't login | Use Supabase auth admin API to migrate users, or require re-registration |
| CMS content missing | Export/import all cms_* tables first |
| RLS policies missing | Apply all migrations in order |
| Edge function secrets | Set SERVICE_ROLE_KEY in new project |

---

## Timeline Estimate

- Schema + function migration: ~1 hour
- Data export/import: ~1 hour
- Code env var swap: ~5 minutes
- Testing: ~2 hours
- **Total: ~4-5 hours**
