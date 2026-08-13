import { describe, expect, it } from "vitest";
import { CatalogService } from "./catalogService";
import { CartService } from "./commerceServiceBoundaries";
import { DemoCommerceService } from "./demoCommerce";

const address = {
  label: "Studio",
  recipient: "Demo Customer",
  phone: "+92 300 0000000",
  line1: "12 Studio Lane",
  city: "Karachi",
  country: "Pakistan" as const,
};

describe("CatalogService", () => {
  it("returns the expanded catalog and supports collection-aware search", () => {
    expect(CatalogService.listProducts()).toHaveLength(36);
    expect(CatalogService.listProducts({ collection: "travel" }).every((product) => product.collections.includes("travel"))).toBe(true);
    expect(CatalogService.listProducts({ query: "passport" })[0]?.slug).toBe("ledger-passport-holder");
  });
});

describe("DemoCommerceService", () => {
  it("recalculates totals from server catalog prices and protects payment idempotency", () => {
    const order = DemoCommerceService.createOrder(11, "demo@example.com", [{ productId: "ub-001", quantity: 1 }], address);
    expect(order.subtotalPkr).toBe(48500);
    expect(order.shippingPkr).toBe(0);
    expect(order.totalPkr).toBe(48500);

    const input = { orderId: order.id, method: "sadapay" as const, idempotencyKey: "00000000-0000-4000-8000-000000000001", demoOutcome: "success" as const };
    const first = DemoCommerceService.createPayment(11, input);
    const second = DemoCommerceService.createPayment(11, input);
    expect(second.id).toBe(first.id);
    expect(first.status).toBe("successful");
    expect(first.message).toContain("No real payment information");
  });

  it("keeps COD and bank transfer in pending collection state and reports failures safely", () => {
    const order = DemoCommerceService.createOrder(12, "demo2@example.com", [{ productId: "ub-002", quantity: 1 }], address);
    const cod = DemoCommerceService.createPayment(12, { orderId: order.id, method: "cod", idempotencyKey: "00000000-0000-4000-8000-000000000002" });
    expect(cod.status).toBe("pending");
    const failed = DemoCommerceService.createPayment(12, { orderId: order.id, method: "jazzcash", idempotencyKey: "00000000-0000-4000-8000-000000000003", demoOutcome: "failure" });
    expect(failed.status).toBe("failed");
    expect(failed.message).toContain("No money moved");
  });
});

describe("CartService", () => {
  it("stores canonical product lines and rejects duplicate or unavailable cart input", () => {
    expect(CartService.replace(91, [{ productId: "ub-001", quantity: 2 }])).toEqual([{ productId: "ub-001", variantId: undefined, quantity: 2 }]);
    expect(CartService.list(91)).toHaveLength(1);
    expect(() => CartService.replace(91, [{ productId: "ub-001", quantity: 1 }, { productId: "ub-001", quantity: 1 }])).toThrow("Duplicate cart lines");
    expect(() => CartService.replace(91, [{ productId: "missing-product", quantity: 1 }])).toThrow("cart products are unavailable");
  });
});
