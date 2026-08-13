import { and, desc, eq } from "drizzle-orm";
import { customerAddresses, orderItems, orders, paymentAttempts, savedCartLines, wishlistItems } from "../../drizzle/schema";
import type { AddressInput, OrderLineInput, PaymentMethod, PaymentStatus } from "../../shared/commerce";
import { findProduct, products } from "../../client/src/lib/catalog";
import { getDb } from "../db";
import { calculateOrder, DemoCommerceService, type DemoOrder, type DemoPayment, paymentStatusFor } from "./demoCommerce";

type PaymentInput = { orderId: string; method: PaymentMethod; idempotencyKey: string; demoOutcome?: "success" | "failure" | "pending" | "cancelled" };

async function usingDatabase<T>(work: (db: NonNullable<Awaited<ReturnType<typeof getDb>>>) => Promise<T>, fallback: () => T | Promise<T>) {
  if (process.env.VITEST) return fallback();
  const db = await getDb();
  if (!db) return fallback();
  try {
    return await work(db);
  } catch (error) {
    console.warn("[CommercePersistence] Database request failed; returning the safe demo fallback.", error);
    return fallback();
  }
}

function isKnownProduct(productId: string) {
  return Boolean(products.find((product) => product.id === productId) ?? findProduct(productId) ?? findProduct(productId.replace(/^.*\//, "")));
}

function paymentMessage(status: PaymentStatus) {
  if (status === "successful") return "Demo payment authorised. No real payment information was collected or transmitted.";
  if (status === "failed") return "Demo payment was declined. No money moved.";
  if (status === "cancelled") return "Demo payment was cancelled. No money moved.";
  return "Demo payment remains pending collection.";
}

function toAddress(row: typeof customerAddresses.$inferSelect): AddressInput {
  return { label: row.label, recipient: row.recipient, phone: row.phone, line1: row.line1, line2: row.line2 ?? undefined, city: row.city, postalCode: row.postalCode ?? undefined, country: "Pakistan" };
}

function toPayment(row: typeof paymentAttempts.$inferSelect): DemoPayment {
  const status = row.status as PaymentStatus;
  return {
    id: String(row.id),
    orderId: String(row.orderId),
    provider: row.provider as PaymentMethod,
    amountPkr: row.amountPkr,
    status,
    referenceId: row.referenceId,
    idempotencyKey: row.idempotencyKey,
    message: paymentMessage(status),
    providerMetadata: (row.providerMetadata ?? {}) as Record<string, string>,
    createdAt: row.createdAt.getTime(),
  };
}

async function hydrateOrder(row: typeof orders.$inferSelect): Promise<DemoOrder> {
  const db = await getDb();
  if (!db) throw new Error("Database became unavailable while reading an order.");
  const lines = await db.select().from(orderItems).where(eq(orderItems.orderId, row.id));
  return {
    id: row.orderNumber,
    orderNumber: row.orderNumber,
    userId: row.userId,
    email: row.email,
    lines: lines.map((line) => ({ productId: line.productKey, productName: line.productName, variant: line.variant ?? undefined, quantity: line.quantity, unitPricePkr: line.unitPricePkr, imageUrl: line.imageUrl ?? "" })),
    address: row.shippingAddress as AddressInput,
    subtotalPkr: row.subtotalPkr,
    shippingPkr: row.shippingPkr,
    discountPkr: row.discountPkr,
    totalPkr: row.totalPkr,
    paymentStatus: row.paymentStatus as PaymentStatus,
    fulfillmentStatus: row.fulfillmentStatus,
    demoMode: Boolean(row.demoMode) as true,
    createdAt: row.createdAt.getTime(),
  };
}

/** Durable repositories use the migrated MySQL schema, falling back only when local tooling has no database configured. */
export const PersistentCommerceService = {
  async listCart(userId: number, fallback: () => OrderLineInput[]) {
    return usingDatabase(async (db) => {
      const rows = await db.select().from(savedCartLines).where(eq(savedCartLines.userId, userId)).orderBy(desc(savedCartLines.updatedAt));
      return rows.map((line) => ({ productId: line.productKey, variantId: line.variantKey || undefined, quantity: line.quantity }));
    }, fallback);
  },
  async replaceCart(userId: number, lines: OrderLineInput[], fallback: () => OrderLineInput[]) {
    return usingDatabase(async (db) => {
      await db.delete(savedCartLines).where(eq(savedCartLines.userId, userId));
      if (lines.length) await db.insert(savedCartLines).values(lines.map((line) => ({ userId, productKey: line.productId, variantKey: line.variantId ?? "", quantity: line.quantity })));
      return lines;
    }, fallback);
  },
  async listAddresses(userId: number) {
    return usingDatabase(async (db) => {
      const rows = await db.select().from(customerAddresses).where(eq(customerAddresses.userId, userId)).orderBy(desc(customerAddresses.updatedAt));
      return rows.map(toAddress);
    }, () => DemoCommerceService.listAddresses(userId));
  },
  async saveAddress(userId: number, address: AddressInput) {
    return usingDatabase(async (db) => {
      const existing = await db.select({ id: customerAddresses.id }).from(customerAddresses).where(and(eq(customerAddresses.userId, userId), eq(customerAddresses.label, address.label))).limit(1);
      const values = { label: address.label, recipient: address.recipient, phone: address.phone, line1: address.line1, line2: address.line2 ?? null, city: address.city, postalCode: address.postalCode ?? null, country: address.country };
      if (existing[0]) await db.update(customerAddresses).set(values).where(eq(customerAddresses.id, existing[0].id));
      else {
        const hasAddress = await db.select({ id: customerAddresses.id }).from(customerAddresses).where(eq(customerAddresses.userId, userId)).limit(1);
        await db.insert(customerAddresses).values({ userId, ...values, isDefault: hasAddress.length ? 0 : 1 });
      }
      const rows = await db.select().from(customerAddresses).where(eq(customerAddresses.userId, userId)).orderBy(desc(customerAddresses.updatedAt));
      return rows.map(toAddress);
    }, () => DemoCommerceService.saveAddress(userId, address));
  },
  async listWishlist(userId: number) {
    return usingDatabase(async (db) => {
      const rows = await db.select({ productKey: wishlistItems.productKey }).from(wishlistItems).where(eq(wishlistItems.userId, userId)).orderBy(desc(wishlistItems.createdAt));
      return rows.map((row) => row.productKey);
    }, () => DemoCommerceService.listWishlist(userId));
  },
  async mergeWishlist(userId: number, productIds: string[]) {
    const validProductIds = Array.from(new Set(productIds.filter(isKnownProduct)));
    return usingDatabase(async (db) => {
      for (const productId of validProductIds) await db.insert(wishlistItems).values({ userId, productKey: productId }).onDuplicateKeyUpdate({ set: { productKey: productId } });
      const rows = await db.select({ productKey: wishlistItems.productKey }).from(wishlistItems).where(eq(wishlistItems.userId, userId)).orderBy(desc(wishlistItems.createdAt));
      return rows.map((row) => row.productKey);
    }, () => DemoCommerceService.mergeWishlist(userId, validProductIds));
  },
  async setWishlistItem(userId: number, productId: string, saved: boolean) {
    if (saved && !isKnownProduct(productId)) throw new Error("This product is unavailable and cannot be saved.");
    return usingDatabase(async (db) => {
      if (saved) await db.insert(wishlistItems).values({ userId, productKey: productId }).onDuplicateKeyUpdate({ set: { productKey: productId } });
      else await db.delete(wishlistItems).where(and(eq(wishlistItems.userId, userId), eq(wishlistItems.productKey, productId)));
      const rows = await db.select({ productKey: wishlistItems.productKey }).from(wishlistItems).where(eq(wishlistItems.userId, userId)).orderBy(desc(wishlistItems.createdAt));
      return rows.map((row) => row.productKey);
    }, () => DemoCommerceService.setWishlistItem(userId, productId, saved));
  },
  async listOrders(userId: number) {
    return usingDatabase(async (db) => {
      const rows = await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
      return Promise.all(rows.map(hydrateOrder));
    }, () => DemoCommerceService.listOrders(userId));
  },
  async getOrder(userId: number, orderId: string) {
    return usingDatabase(async (db) => {
      const rows = await db.select().from(orders).where(and(eq(orders.userId, userId), eq(orders.orderNumber, orderId))).limit(1);
      return rows[0] ? hydrateOrder(rows[0]) : null;
    }, () => DemoCommerceService.getOrder(userId, orderId));
  },
  async createOrder(userId: number, email: string, lines: OrderLineInput[], address: AddressInput) {
    return usingDatabase(async (db) => {
      const calculated = calculateOrder(lines);
      const orderNumber = `UB-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
      const result = await db.insert(orders).values({ orderNumber, userId, email, subtotalPkr: calculated.subtotalPkr, shippingPkr: calculated.shippingPkr, discountPkr: calculated.discountPkr, totalPkr: calculated.totalPkr, shippingAddress: address, demoMode: 1 });
      const orderId = Number(result[0].insertId);
      await db.insert(orderItems).values(calculated.resolvedLines.map((line) => ({ orderId, productKey: line.productId, productName: line.productName, variant: line.variant ?? null, quantity: line.quantity, unitPricePkr: line.unitPricePkr, imageUrl: line.imageUrl })));
      return { id: orderNumber, orderNumber, userId, email, lines: calculated.resolvedLines, address, subtotalPkr: calculated.subtotalPkr, shippingPkr: calculated.shippingPkr, discountPkr: calculated.discountPkr, totalPkr: calculated.totalPkr, paymentStatus: "pending" as PaymentStatus, fulfillmentStatus: "pending" as const, demoMode: true as const, createdAt: Date.now() } satisfies DemoOrder;
    }, () => DemoCommerceService.createOrder(userId, email, lines, address));
  },
  async createPayment(userId: number, input: PaymentInput) {
    return usingDatabase(async (db) => {
      const prior = await db.select().from(paymentAttempts).where(eq(paymentAttempts.idempotencyKey, input.idempotencyKey)).limit(1);
      if (prior[0]) return toPayment(prior[0]);
      const orderRows = await db.select().from(orders).where(and(eq(orders.userId, userId), eq(orders.orderNumber, input.orderId))).limit(1);
      const order = orderRows[0];
      if (!order) throw new Error("Order was not found for this account.");
      const status = paymentStatusFor(input.method, input.demoOutcome);
      const referenceId = `UB-${input.method.toUpperCase()}-${crypto.randomUUID().slice(0, 10).toUpperCase()}`;
      try {
        const result = await db.insert(paymentAttempts).values({ orderId: order.id, provider: input.method, amountPkr: order.totalPkr, status, referenceId, idempotencyKey: input.idempotencyKey, providerMetadata: { mode: "mock", provider: input.method, currency: "PKR", amountPkr: String(order.totalPkr) } });
        await db.update(orders).set({ paymentStatus: status }).where(eq(orders.id, order.id));
        return { id: String(result[0].insertId), orderId: input.orderId, provider: input.method, amountPkr: order.totalPkr, status, referenceId, idempotencyKey: input.idempotencyKey, message: paymentMessage(status), providerMetadata: { mode: "mock", provider: input.method, currency: "PKR", amountPkr: String(order.totalPkr) }, createdAt: Date.now() } satisfies DemoPayment;
      } catch (error) {
        const retry = await db.select().from(paymentAttempts).where(eq(paymentAttempts.idempotencyKey, input.idempotencyKey)).limit(1);
        if (retry[0]) return toPayment(retry[0]);
        throw error;
      }
    }, () => DemoCommerceService.createPayment(userId, input));
  },
};
