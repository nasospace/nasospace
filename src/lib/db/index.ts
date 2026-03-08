/**
 * Database abstraction layer.
 * Will be backed by Prisma + PostgreSQL or Supabase — swap implementation here.
 */

export interface DBClient {
  query<T>(table: string, filter?: Record<string, unknown>): Promise<T[]>;
}

export const dbClient: DBClient = {
  async query<T>(): Promise<T[]> {
    console.warn("[DB] Client not configured yet.");
    return [];
  },
};
