

# Sprint 11: Backend Integration Phase 1

## Prerequisite

You selected **Supabase (Lovable Cloud)** as the backend. Before I can implement, you need to **enable Lovable Cloud** for this project. In the Cloud view panel (right side), click the button to enable it. Once the Supabase project is provisioned, I'll have access to create tables, RLS policies, and edge functions.

Let me know once Lovable Cloud is enabled and I'll proceed with the full implementation.

---

## What Will Be Built

### 1. Database Schema (3 tables)

**`inquiries`** — stores all form submissions
```text
id              uuid PK default gen_random_uuid()
created_at      timestamptz default now()
name            text NOT NULL
email           text NOT NULL
phone           text
inquiry_type    text NOT NULL  (experience|workshop|custom-event|product|corporate|general)
preferred_date  text
group_size      text
notes           text
item_type       text           (experience|workshop|portfolio|product)
item_slug       text
item_title      text
status          text default 'sent'  (sent|reviewing|contacted|completed)
last_updated    timestamptz default now()
admin_notes     text
```

**`saved_items`** — per-user saved items (uses anonymous device ID until auth is added)
```text
id              uuid PK default gen_random_uuid()
created_at      timestamptz default now()
user_id         text NOT NULL   (device ID now, auth.uid() later)
item_type       text NOT NULL   (experience|workshop|product)
item_slug       text NOT NULL
UNIQUE(user_id, item_type, item_slug)
```

**`profiles`** — minimal user identity placeholder
```text
id              uuid PK default gen_random_uuid()
device_id       text UNIQUE NOT NULL
display_name    text default 'Explorer'
email           text
created_at      timestamptz default now()
```

RLS: All tables get `anon` read/write policies scoped by device_id until auth replaces it. The device_id approach is explicitly temporary and clearly documented for easy swap.

### 2. Service Layer (new files)

**`src/lib/supabase.ts`** — Supabase client initialization

**`src/server/services/inquiries.ts`** — `submitInquiry(data)`, `getInquiries(deviceId)`
- Validates with existing Zod schema
- Inserts into `inquiries` table
- Returns typed `InquirySubmissionResult`

**`src/server/services/savedItems.ts`** — `getSavedItems(deviceId)`, `addSavedItem(deviceId, type, slug)`, `removeSavedItem(deviceId, type, slug)`, `isItemSaved(deviceId, type, slug)`
- Toggle-friendly: add if not exists, remove if exists

**`src/server/services/account.ts`** — `getAccountData(deviceId)`
- Fetches profile, saved items count, inquiry count
- Composes the account dashboard data shape

**`src/lib/deviceId.ts`** — Generates and persists a stable device UUID in localStorage
- Clearly marked as temporary pre-auth identity
- Single function: `getDeviceId(): string`

### 3. React Hooks (modify existing + new)

**`src/features/account/hooks/useAccountData.ts`** — Refactor all 3 hooks to use `@tanstack/react-query` + service layer
- `useAccountData()` → queries profile + counts from Supabase
- `useSavedItems()` → queries `saved_items` joined with mock catalog data for display
- `useRequestHistory()` → queries `inquiries` table filtered by device ID
- All return `{ data, isLoading, error }` patterns

**`src/features/inquiries/hooks/useSubmitInquiry.ts`** (new) — `useMutation` wrapping `submitInquiry` service

**`src/hooks/useSavedItemState.ts`** (new) — Reusable hook for save button state
- `useSavedItemState(itemType, slug)` → `{ isSaved, isLoading, toggle }`
- Used by `SaveButton` component

### 4. Component Wiring (modify existing, no redesign)

**`SaveButton.tsx`** — Replace local `useState` with `useSavedItemState` hook
- Shows loading spinner during toggle
- Reads initial state from Supabase

**`InquiryForm.tsx`** — Replace mock `setTimeout` with `useSubmitInquiry` mutation
- Real error handling, real success state
- No UX changes

**`Account.tsx`** — Add loading skeleton when `useAccountData` is loading

**`AccountSaved.tsx`** — Add loading state from `useSavedItems`

**`AccountRequests.tsx`** — Add loading state from `useRequestHistory`

### 5. Temporary Identity Strategy

- `getDeviceId()` generates a UUIDv4 on first visit, stores in localStorage
- All queries/mutations pass this as `user_id`
- When auth is added later: replace `getDeviceId()` with `auth.uid()` in the service layer — zero component changes needed
- This is NOT a security mechanism — it's a development convenience clearly documented as such

## Architecture Diagram

```text
┌─────────────────────────────────────────────┐
│  UI Components (no direct DB calls)         │
│  SaveButton / InquiryForm / Account pages   │
└──────────────┬──────────────────────────────┘
               │ React Query hooks
┌──────────────▼──────────────────────────────┐
│  Hooks Layer                                │
│  useSavedItemState / useSubmitInquiry       │
│  useAccountData / useSavedItems             │
└──────────────┬──────────────────────────────┘
               │ service functions
┌──────────────▼──────────────────────────────┐
│  Service Layer (src/server/services/)       │
│  inquiries.ts / savedItems.ts / account.ts  │
└──────────────┬──────────────────────────────┘
               │ supabase client
┌──────────────▼──────────────────────────────┐
│  Supabase (Lovable Cloud)                   │
│  inquiries / saved_items / profiles tables  │
└─────────────────────────────────────────────┘
```

## Files Changed/Created Summary

| Action | File | Purpose |
|--------|------|---------|
| Create | `src/lib/supabase.ts` | Supabase client |
| Create | `src/lib/deviceId.ts` | Temp identity |
| Create | `src/server/services/inquiries.ts` | Inquiry persistence |
| Create | `src/server/services/savedItems.ts` | Save/unsave persistence |
| Create | `src/server/services/account.ts` | Account data loader |
| Create | `src/features/inquiries/hooks/useSubmitInquiry.ts` | Mutation hook |
| Create | `src/hooks/useSavedItemState.ts` | Save button state hook |
| Modify | `src/features/account/hooks/useAccountData.ts` | Real data queries |
| Modify | `src/components/shared/SaveButton.tsx` | Wire to persistent state |
| Modify | `src/features/inquiries/components/InquiryForm.tsx` | Real submission |
| Modify | `src/pages/Account.tsx` | Loading states |
| Modify | `src/pages/AccountSaved.tsx` | Loading states |
| Modify | `src/pages/AccountRequests.tsx` | Loading states |
| Migration | 3 tables + RLS policies | Database schema |

## What Becomes Real vs Stays Mock

| Flow | Status After Sprint |
|------|-------------------|
| Inquiry submission | **Real** — persisted to Supabase |
| Saved items (save/unsave) | **Real** — persisted to Supabase |
| Account request history | **Real** — reads from inquiries table |
| Account saved items list | **Real** — reads from saved_items + joins catalog |
| User identity/auth | **Temporary** — device ID, ready for auth swap |
| Catalog data (experiences, workshops, products) | **Still mock** — awaits CMS sprint |
| User profile details | **Hybrid** — stored in profiles table, seeded on first visit |

## Action Required

Please **enable Lovable Cloud** in the Cloud panel so I can proceed with creating the database tables and implementing the full integration.

