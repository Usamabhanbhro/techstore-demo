import type { AddressInput, OrderLineInput, PaymentMethod } from "../../shared/commerce";
import { products } from "../../client/src/lib/catalog";
import { CatalogService } from "./catalogService";
import { DemoCommerceService } from "./demoCommerce";

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
 * Explicit façades preserve stable domain names while the managed database is
 * temporarily unavailable. Each façade can later move from the demo adapter to
 * Drizzle without changing tRPC procedure contracts.
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
    return carts.get(userId) ?? [];
  },
  replace(userId: number, lines: CartLineInput[]) {
    const sanitized = validateCartLines(lines);
    carts.set(userId, sanitized);
    return sanitized;
  },
};

export const WishlistService = {
  list: DemoCommerceService.listWishlist,
  merge: DemoCommerceService.mergeWishlist,
  setItem: DemoCommerceService.setWishlistItem,
};

export const AccountService = {
  listAddresses: DemoCommerceService.listAddresses,
  saveAddress(userId: number, address: AddressInput) {
    return DemoCommerceService.saveAddress(userId, address);
  },
};

export const OrderService = {
  list: DemoCommerceService.listOrders,
  getDetail: DemoCommerceService.getOrder,
  create(userId: number, email: string, lines: OrderLineInput[], address: AddressInput) {
    return DemoCommerceService.createOrder(userId, email, lines, address);
  },
};

export const PaymentService = {
  create(userId: number, input: { orderId: string; method: PaymentMethod; idempotencyKey: string; demoOutcome?: "success" | "failure" | "pending" | "cancelled" }) {
    return DemoCommerceService.createPayment(userId, input);
  },
};
