/**
 * CMS integration abstraction layer.
 * Will be backed by Sanity CMS — swap implementation here without touching UI.
 */

export interface CMSClient {
  fetch<T>(query: string, params?: Record<string, unknown>): Promise<T>;
}

// No-op placeholder
export const cmsClient: CMSClient = {
  async fetch<T>(): Promise<T> {
    console.warn("[CMS] Client not configured yet.");
    return [] as unknown as T;
  },
};
