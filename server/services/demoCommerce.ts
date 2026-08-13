import { randomUUID } from "node:crypto";
import { findProduct, products } from "../../client/src/lib/catalog";
import type { AddressInput, OrderLineInput, PaymentMethod, PaymentStatus } from "../../shared/commerce";

export type DemoOrder = {
  id: string;
  orderNumber: string;
  userId: number;
  email: string;
  lines: Array<{ productId: string; productName: string; variant?: string; quantity: number; unitPricePkr: number; imageUrl: string }>;
  address: AddressInput;
  subtotalPkr: number;
  shippingPkr: number;
  discountPkr: number;
  totalPkr: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  demoMode: true;
  createdAt: number;
};

export type DemoPayment = {
  id: string;
  orderId: string;
  provider: PaymentMethod;
  amountPkr: number;
  status: PaymentStatus;
  referenceId: string;
  idempotencyKey: string;
  message: string;
  providerMetadata: Record<string, string>;
  createdAt: number;
};

const orders = new Map<string, DemoOrder>();
const paymentsByIdempotency = new Map<string, DemoPayment>();
const wishlists = new Map<number, Set<string>>();
const addresses = new Map<number, AddressInput[]>();

const resolveProduct = (identifier: string) => products.find((product) => product.id === identifier) ?? findProduct(identifier) ?? findProduct(identifier.replace(/^.*\//, ""));

function calculateOrder(lines: OrderLineInput[]) {
  if (!lines.length) throw new Error("Your bag is empty.");
  const resolvedLines = lines.map((line) => {
    const product = resolveProduct(line.productId);
    if (!product) throw new Error("One or more products are no longer available.");
    if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > Math.max(1, product.stock)) throw new Error(`Quantity is not available for ${product.name}.`);
    const selectedVariant = line.variantId ? product.variants.find((variant) => `${variant.label}:${variant.value}` === line.variantId) : undefined;
    if (line.variantId && !selectedVariant?.available) throw new Error(`Selected variant is not available for ${product.name}.`);
    return { productId: product.id, productName: product.name, variant: selectedVariant ? `${selectedVariant.label}: ${selectedVariant.value}` : undefined, quantity: line.quantity, unitPricePkr: product.price, imageUrl: product.images[0] };
  });
  const subtotalPkr = resolvedLines.reduce((sum, line) => sum + line.quantity * line.unitPricePkr, 0);
  const shippingPkr = subtotalPkr >= 25000 ? 0 : 650;
  return { resolvedLines, subtotalPkr, shippingPkr, discountPkr: 0, totalPkr: subtotalPkr + shippingPkr };
}

function paymentStatusFor(provider: PaymentMethod, outcome?: "success" | "failure" | "pending" | "cancelled"): PaymentStatus {
  if (outcome === "failure") return "failed";
  if (outcome === "cancelled") return "cancelled";
  if (outcome === "pending" || provider === "cod") return "pending";
  return "successful";
}

export const DemoCommerceService = {
  createOrder(userId: number, email: string, lines: OrderLineInput[], address: AddressInput) {
    const calculated = calculateOrder(lines);
    const id = randomUUID();
    const order: DemoOrder = {
      id,
      orderNumber: `UB-${new Date().getFullYear()}-${id.slice(0, 8).toUpperCase()}`,
      userId,
      email,
      lines: calculated.resolvedLines,
      address,
      subtotalPkr: calculated.subtotalPkr,
      shippingPkr: calculated.shippingPkr,
      discountPkr: calculated.discountPkr,
      totalPkr: calculated.totalPkr,
      paymentStatus: "pending",
      fulfillmentStatus: "pending",
      demoMode: true,
      createdAt: Date.now(),
    };
    orders.set(id, order);
    return order;
  },
  listOrders(userId: number) {
    return Array.from(orders.values()).filter((order) => order.userId === userId).sort((left, right) => right.createdAt - left.createdAt);
  },
  getOrder(userId: number, orderId: string) {
    const order = orders.get(orderId);
    return order?.userId === userId ? order : null;
  },
  createPayment(userId: number, input: { orderId: string; method: PaymentMethod; idempotencyKey: string; demoOutcome?: "success" | "failure" | "pending" | "cancelled" }) {
    const existing = paymentsByIdempotency.get(input.idempotencyKey);
    if (existing) return existing;
    const order = this.getOrder(userId, input.orderId);
    if (!order) throw new Error("Order was not found for this account.");
    const status = paymentStatusFor(input.method, input.demoOutcome);
    const referenceId = `UB-${input.method.toUpperCase()}-${randomUUID().slice(0, 10).toUpperCase()}`;
    const payment: DemoPayment = {
      id: randomUUID(),
      orderId: order.id,
      provider: input.method,
      amountPkr: order.totalPkr,
      status,
      referenceId,
      idempotencyKey: input.idempotencyKey,
      message: status === "successful" ? "Demo payment authorised. No real payment information was collected or transmitted." : status === "failed" ? "Demo payment was declined. No money moved." : status === "cancelled" ? "Demo payment was cancelled. No money moved." : "Demo payment remains pending collection.",
      providerMetadata: { mode: "mock", provider: input.method, currency: "PKR", amountPkr: String(order.totalPkr) },
      createdAt: Date.now(),
    };
    order.paymentStatus = status;
    paymentsByIdempotency.set(input.idempotencyKey, payment);
    return payment;
  },
  listWishlist(userId: number) { return Array.from(wishlists.get(userId) ?? new Set()); },
  mergeWishlist(userId: number, productIds: string[]) {
    const next = wishlists.get(userId) ?? new Set<string>();
    productIds.filter((id) => Boolean(resolveProduct(id))).forEach((id) => next.add(id));
    wishlists.set(userId, next);
    return Array.from(next);
  },
  setWishlistItem(userId: number, productId: string, saved: boolean) {
    const next = wishlists.get(userId) ?? new Set<string>();
    if (saved) next.add(productId); else next.delete(productId);
    wishlists.set(userId, next);
    return Array.from(next);
  },
  listAddresses(userId: number) { return addresses.get(userId) ?? []; },
  saveAddress(userId: number, address: AddressInput) {
    const current = addresses.get(userId) ?? [];
    const withoutSameLabel = current.filter((entry) => entry.label !== address.label);
    addresses.set(userId, [address, ...withoutSameLabel].slice(0, 10));
    return addresses.get(userId)!;
  },
};
