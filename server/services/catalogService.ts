import { collections, findProduct, products } from "../../client/src/lib/catalog";

export type CatalogSearchInput = {
  query?: string;
  collection?: string;
  category?: string;
  availability?: "in-stock" | "low-stock";
  sort?: "featured" | "newest" | "price-low" | "price-high";
};

export function listCatalogProducts(input: CatalogSearchInput = {}) {
  const normalizedQuery = input.query?.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesQuery = !normalizedQuery || [product.name, product.subtitle, product.category, product.collection, ...product.tags]
      .join(" ").toLowerCase().includes(normalizedQuery);
    const matchesCollection = !input.collection || product.collections.includes(input.collection);
    const matchesCategory = !input.category || product.category === input.category;
    const matchesAvailability = !input.availability || product.availability === input.availability;
    return matchesQuery && matchesCollection && matchesCategory && matchesAvailability;
  });

  return [...filtered].sort((left, right) => {
    if (input.sort === "price-low") return left.price - right.price;
    if (input.sort === "price-high") return right.price - left.price;
    if (input.sort === "newest") return Number(right.flags.includes("new-arrival")) - Number(left.flags.includes("new-arrival"));
    return Number(right.flags.includes("featured") || right.flags.includes("best-seller")) - Number(left.flags.includes("featured") || left.flags.includes("best-seller"));
  });
}

export const CatalogService = {
  listProducts: listCatalogProducts,
  getProduct: (slug: string) => findProduct(slug) ?? null,
  listCollections: () => collections,
  getCollection: (slug: string) => collections.find((collection) => collection.slug === slug) ?? null,
};
