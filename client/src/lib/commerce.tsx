// Local commerce state for the transparent Mehronex Store showcase. It never handles real payments.
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { findProduct, products, type Product } from "./catalog";

export type CartLine = { product: Product; quantity: number; variant?: string };
export type DemoOrder = {
  id: string;
  date: string;
  items: CartLine[];
  configurations: Record<string, string | undefined>;
  subtotal: number;
  discount: number;
  shipping: number;
  delivery: number;
  total: number;
  customer: { name: string; email: string };
  deliveryAddress: { address: string; city: string; state: string; zip: string };
  status: "confirmed" | "pending";
  paymentMethod: string;
  paymentStatus: string;
  referenceId?: string;
};

type CommerceContextValue = {
  cart: CartLine[];
  wishlist: string[];
  lastOrder: DemoOrder | null;
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  setQuantity: (productId: string, quantity: number, variant?: string) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
  createOrder: (order: DemoOrder) => void;
  cartCount: number;
  subtotal: number;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);
const CART_KEY = "usamabhanbhro-cart";
const WISHLIST_KEY = "usamabhanbhro-wishlist";
const ORDER_KEY = "usamabhanbhro-order";
const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
};
const lineKey = (line: CartLine) => `${line.product.id}::${line.variant ?? line.product.variants[0]?.value ?? "default"}`;

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => read(CART_KEY, []));
  const [wishlist, setWishlist] = useState<string[]>(() => read(WISHLIST_KEY, []));
  const [lastOrder, setLastOrder] = useState<DemoOrder | null>(() => read(ORDER_KEY, null));

  useEffect(() => window.localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);
  useEffect(() => window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => {
    if (lastOrder) window.localStorage.setItem(ORDER_KEY, JSON.stringify(lastOrder));
  }, [lastOrder]);

  const addToCart = (product: Product, quantity = 1, variant?: string) => setCart((current) => {
    const normalizedVariant = variant ?? product.variants[0]?.value;
    const found = current.find((line) => line.product.id === product.id && (line.variant ?? product.variants[0]?.value) === normalizedVariant);
    if (found) return current.map((line) => line === found ? { ...line, quantity: Math.min(10, line.quantity + Math.max(1, quantity)) } : line);
    return [...current, { product, quantity: Math.min(10, Math.max(1, quantity)), variant: normalizedVariant }];
  });
  const removeFromCart = (productId: string, variant?: string) => setCart((current) => current.filter((line) => line.product.id !== productId || (variant !== undefined && (line.variant ?? line.product.variants[0]?.value) !== variant)));
  const setQuantity = (productId: string, quantity: number, variant?: string) => setCart((current) => {
    const target = current.find((line) => line.product.id === productId && (variant === undefined || (line.variant ?? line.product.variants[0]?.value) === variant));
    if (!target || quantity < 1) return target ? current.filter((line) => line !== target) : current;
    return current.map((line) => line === target ? { ...line, quantity: Math.min(10, quantity) } : line);
  });
  const toggleWishlist = (productId: string) => setWishlist((current) => current.includes(productId) ? current.filter((item) => item !== productId) : [...current, productId]);
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const value = useMemo(() => ({
    cart, wishlist, lastOrder, addToCart, removeFromCart, setQuantity, toggleWishlist,
    clearCart: () => setCart([]), createOrder: setLastOrder,
    cartCount: cart.reduce((sum, line) => sum + line.quantity, 0), subtotal,
  }), [cart, wishlist, lastOrder, subtotal]);
  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export const useCommerce = () => {
  const value = useContext(CommerceContext);
  if (!value) throw new Error("useCommerce must be used inside CommerceProvider");
  return value;
};
export const wishlistProducts = (ids: string[]) => ids.map((id) => products.find((product) => product.id === id)).filter(Boolean) as Product[];
export const cartProduct = (slug: string) => findProduct(slug);
export const cartLineKey = lineKey;
