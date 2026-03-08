/**
 * Commerce integration abstraction layer.
 * Will be backed by Shopify Headless — swap implementation here.
 */

export interface CommerceClient {
  getProducts(): Promise<unknown[]>;
  getProduct(handle: string): Promise<unknown | null>;
}

export const commerceClient: CommerceClient = {
  async getProducts() {
    console.warn("[Commerce] Client not configured yet.");
    return [];
  },
  async getProduct() {
    console.warn("[Commerce] Client not configured yet.");
    return null;
  },
};
