/**
 * Cart domain types.
 * Migration-friendly: no direct Supabase/backend coupling.
 */

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  currency: string;
  coverImageSrc: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  stockStatus: "in-stock" | "low-stock" | "sold-out";
  limitedEdition?: boolean;
}

export interface CartState {
  items: CartItem[];
}

export interface CartActions {
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string, selectedSize?: string, selectedColor?: string) => void;
  updateQuantity: (slug: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

/** Unique key for a cart line item (slug + options) */
export function cartItemKey(slug: string, size?: string, color?: string): string {
  return [slug, size ?? "", color ?? ""].join("__");
}
