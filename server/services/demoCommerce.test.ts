import { describe, expect, it } from "vitest";
import { CatalogService } from "./catalogService";
import { CartService, WishlistService } from "./commerceServiceBoundaries";
import { DemoCommerceService } from "./demoCommerce";

const address = {
  label: "Studio",
  recipient: "Demo Customer",
  phone: "+1 408 555 0100",
  line1: "1 Apple Park Way",
  city: "Cupertino",
  country: "Pakistan" as const,
};

describe("CatalogService", () => {
  it("returns the expanded Apple catalog and supports collection-aware search", () => {
    expect(CatalogService.listProducts()).toHaveLength(48);
    expect(CatalogService.listProducts({ collection: "iphone" }).every((product) => product.collections.includes("iphone"))).toBe(true);
    expect(CatalogService.listProducts({ query: "charger" })[0]?.slug).toBe("magsafe-charger");
  });
});

describe("DemoCommerceService", () => {
  it("recalculates totals from the current catalog and protects payment idempotency", () => {
    const order = DemoCommerceService.createOrder(11, "demo@example.com", [{ productId: "iphone-17-pro", quantity: 1 }], address);
    expect(order.lines[0]?.productId).toBe("apple-001");
    expect(order.subtotalPkr).toBe(1099);
    expect(order.shippingPkr).toBe(650);
    expect(order.totalPkr).toBe(1749);

    const input = { orderId: order.id, method: "sadapay" as const, idempotencyKey: "00000000-0000-4000-8000-000000000001", demoOutcome: "success" as const };
    const first = DemoCommerceService.createPayment(11, input);
    const second = DemoCommerceService.createPayment(11, input);
    expect(second.id).toBe(first.id);
    expect(first.status).toBe("successful");
    expect(first.message).toContain("No real payment information");
  });

  it("keeps COD and bank transfer in pending collection state and reports failures safely", () => {
    const order = DemoCommerceService.createOrder(12, "demo2@example.com", [{ productId: "iphone-17", quantity: 1 }], address);
    const cod = DemoCommerceService.createPayment(12, { orderId: order.id, method: "cod", idempotencyKey: "00000000-0000-4000-8000-000000000002" });
    expect(cod.status).toBe("pending");
    const failed = DemoCommerceService.createPayment(12, { orderId: order.id, method: "jazzcash", idempotencyKey: "00000000-0000-4000-8000-000000000003", demoOutcome: "failure" });
    expect(failed.status).toBe("failed");
    expect(failed.message).toContain("No money moved");
  });
});

describe("CartService", () => {
  it("stores canonical product lines durably when available and rejects duplicate or unavailable cart input", async () => {
    await expect(CartService.replace(91, [{ productId: "iphone-17-pro", quantity: 2 }])).resolves.toEqual([{ productId: "apple-001", variantId: undefined, quantity: 2 }]);
    await expect(CartService.list(91)).resolves.toHaveLength(1);
    expect(() => CartService.replace(91, [{ productId: "iphone-17-pro", quantity: 1 }, { productId: "apple-001", quantity: 1 }])).toThrow("Duplicate cart lines");
    expect(() => CartService.replace(91, [{ productId: "missing-product", quantity: 1 }])).toThrow("cart products are unavailable");
  });

  it("rejects unknown durable-wishlist entries before persistence", async () => {
    await expect(WishlistService.setItem(91, "missing-product", true)).rejects.toThrow("cannot be saved");
  });
});
