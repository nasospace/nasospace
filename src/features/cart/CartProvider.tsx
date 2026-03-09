import { createContext, useContext, useCallback, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { cartItemKey, type CartItem, type CartState, type CartActions } from "./types";

interface CartContextValue extends CartState, CartActions {}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "naso-cart";
const INITIAL: CartState = { items: [] };

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<CartState>(STORAGE_KEY, INITIAL);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setState((prev) => {
        const key = cartItemKey(item.slug, item.selectedSize, item.selectedColor);
        const existing = prev.items.find(
          (i) => cartItemKey(i.slug, i.selectedSize, i.selectedColor) === key
        );
        if (existing) {
          return {
            items: prev.items.map((i) =>
              cartItemKey(i.slug, i.selectedSize, i.selectedColor) === key
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          };
        }
        return { items: [...prev.items, { ...item, quantity }] };
      });
    },
    [setState]
  );

  const removeItem = useCallback(
    (slug: string, selectedSize?: string, selectedColor?: string) => {
      const key = cartItemKey(slug, selectedSize, selectedColor);
      setState((prev) => ({
        items: prev.items.filter(
          (i) => cartItemKey(i.slug, i.selectedSize, i.selectedColor) !== key
        ),
      }));
    },
    [setState]
  );

  const updateQuantity = useCallback(
    (slug: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
      const key = cartItemKey(slug, selectedSize, selectedColor);
      setState((prev) => ({
        items:
          quantity <= 0
            ? prev.items.filter((i) => cartItemKey(i.slug, i.selectedSize, i.selectedColor) !== key)
            : prev.items.map((i) =>
                cartItemKey(i.slug, i.selectedSize, i.selectedColor) === key
                  ? { ...i, quantity }
                  : i
              ),
      }));
    },
    [setState]
  );

  const clearCart = useCallback(() => setState(INITIAL), [setState]);

  const getItemCount = useCallback(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const getSubtotal = useCallback(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({ ...state, addItem, removeItem, updateQuantity, clearCart, getItemCount, getSubtotal }),
    [state, addItem, removeItem, updateQuantity, clearCart, getItemCount, getSubtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
