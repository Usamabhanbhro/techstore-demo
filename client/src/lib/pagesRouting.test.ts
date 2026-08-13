import { describe, expect, it } from "vitest";
import { resolveTrpcUrl, restorePagesDeepLink } from "./pagesRouting";

describe("GitHub Pages route restoration", () => {
  it("restores an encoded product deep link below the repository base path", () => {
    expect(restorePagesDeepLink("?p=%2Fproducts%2Fatelier-tote%3Fcolour%3Dtobacco", "/e-commerce/")).toBe(
      "/e-commerce/products/atelier-tote?colour=tobacco",
    );
  });

  it("rejects blank and protocol-relative redirect values", () => {
    expect(restorePagesDeepLink("", "/e-commerce/")).toBeNull();
    expect(restorePagesDeepLink("?p=%2F%2Fevil.example", "/e-commerce/")).toBeNull();
  });
});

describe("tRPC endpoint resolution", () => {
  it("uses the local relative endpoint by default and trims a configured API origin", () => {
    expect(resolveTrpcUrl()).toBe("/api/trpc");
    expect(resolveTrpcUrl("https://api.example.test/")).toBe("https://api.example.test/api/trpc");
  });
});
