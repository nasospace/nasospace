/**
 * Database abstraction layer.
 *
 * @deprecated This placeholder is unused. All data access goes through:
 * - src/lib/cms/ — for CMS content reads
 * - src/server/services/ — for user-bound data (saved items, inquiries, profiles)
 * - src/integrations/supabase/client.ts — Supabase JS client (auto-generated)
 *
 * Migration note: When migrating to owned Supabase, the above import paths
 * remain the same — only the client.ts config changes.
 *
 * This file can be safely deleted in a future cleanup pass.
 */

export {};
