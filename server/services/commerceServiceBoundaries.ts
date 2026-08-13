import type { AddressInput, OrderLineInput, PaymentMethod } from "../../shared/commerce";
import { products } from "../../client/src/lib/catalog";
import { CatalogService } from "./catalogService";
import { PersistentCommerceService } from "./persistentCommerce";

export type CartLineInput = OrderLineInput;

const carts = new Map<number, CartLineInput[]>();

function validateCartLines(lines: CartLineInput[]) {
  if (lines.length > 30) throw new Error("A cart can contain at most 30 line items.");
  const seen = new Set<string>();
  return lines.map((line) => {
    const product = products.find((item) => item.id === line.productId || item.slug === line.productId);
    if (!product) throw new Error("One or more cart products are unavailable.");
    if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > Math.max(1, product.stock)) {
      throw new Error(`Quantity is not available for ${product.name}.`);
    }
    const key = `${product.id}:${line.variantId ?? ""}`;
    if (seen.has(key)) throw new Error("Duplicate cart lines are not permitted.");
    seen.add(key);
    return { productId: product.id, variantId: line.variantId, quantity: line.quantity };
  });
}

/**
 * Explicit façades preserve stable domain names while the durable repositories
 * manage migrated database records beneath the existing typed API contracts.
 */
export const ProductService = {
  list: CatalogService.listProducts,
  getBySlug: CatalogService.getProduct,
};

export const CollectionService = {
  list: CatalogService.listCollections,
  getBySlug: CatalogService.getCollection,
};

export const CartService = {
  list(userId: number) {
    return PersistentCommerceService.listCart(userId, () => carts.get(userId) ?? []);
  },
  replace(userId: number, lines: CartLineInput[]) {
    const sanitized = validateCartLines(lines);
    return PersistentCommerceService.replaceCart(userId, sanitized, () => {
      carts.set(userId, sanitized);
      return sanitized;
    });
  },
};

export const WishlistService = {
  list: PersistentCommerceService.listWishlist,
  merge: PersistentCommerceService.mergeWishlist,
  setItem: PersistentCommerceService.setWishlistItem,
};

export const AccountService = {
  listAddresses: PersistentCommerceService.listAddresses,
  saveAddress(userId: number, address: AddressInput) {
    return PersistentCommerceService.saveAddress(userId, address);
  },
};

export const OrderService = {
  list: PersistentCommerceService.listOrders,
  getDetail: PersistentCommerceService.getOrder,
  create(userId: number, email: string, lines: OrderLineInput[], address: AddressInput) {
    return PersistentCommerceService.createOrder(userId, email, lines, address);
  },
};

export const PaymentService = {
  create(userId: number, input: { orderId: string; method: PaymentMethod; idempotencyKey: string; demoOutcome?: "success" | "failure" | "pending" | "cancelled" }) {
    return PersistentCommerceService.createPayment(userId, input);
  },
};
