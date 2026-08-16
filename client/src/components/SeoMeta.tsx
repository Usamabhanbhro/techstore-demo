import { useEffect } from "react";
import { useLocation } from "wouter";
import { findCollection, findProduct } from "@/lib/catalog";

const staticMeta: Record<string, { title: string; description: string }> = {
  "/": { title: "Apple Store Demo — Shop iPhone, Mac, iPad and more", description: "Explore an Apple-inspired storefront for iPhone, Mac, iPad, Apple Watch, AirPods, Vision Pro, TV & Home, and accessories." },
  "/shop": { title: "Shop Apple products — Apple Store Demo", description: "Browse Apple products and accessories with category filters, availability, sorting, and transparent demo checkout." },
  "/collections": { title: "Collections — Apple Store Demo", description: "Explore Apple product families and find the right device or accessory for your setup." },
  "/compare": { title: "Compare products — Apple Store Demo", description: "Compare Apple products by category, configuration, price, and key features before you shop." },
  "/search": { title: "Search Apple products — Apple Store Demo", description: "Search the Apple Store Demo catalog for devices, accessories, chargers, cases, cables, and more." },
  "/cart": { title: "Your bag — Apple Store Demo", description: "Review your selected products, configurations, delivery options, discounts, and demo checkout total." },
  "/checkout": { title: "Checkout — Apple Store Demo", description: "Complete a transparent demo checkout. No real payment or financial information is processed." },
  "/account": { title: "Account — Apple Store Demo", description: "Review your demo profile, local order state, saved products, and account links." },
  "/wishlist": { title: "Saved products — Apple Store Demo", description: "Keep products close with a locally saved wishlist that can merge after secure sign-in." },
  "/journal": { title: "Product guides — Apple Store Demo", description: "Read practical product guides for choosing iPhone, Mac, iPad, Apple Watch, and accessories." },
  "/about": { title: "About this demo — Apple Store Demo", description: "Learn how this transparent Apple-inspired commerce showcase handles demo catalog, cart, and checkout state." },
  "/contact": { title: "Support — Apple Store Demo", description: "Find demo storefront support, product guidance, and contact information." },
};

function setMeta(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) { element = document.createElement("meta"); element.name = name; document.head.appendChild(element); }
  element.content = content;
}

function setProperty(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) { element = document.createElement("meta"); element.setAttribute("property", property); document.head.appendChild(element); }
  element.content = content;
}

export function SeoMeta() {
  const [location] = useLocation();
  useEffect(() => {
    const cleanPath = location.split("?")[0] || "/";
    const product = cleanPath.startsWith("/products/") ? findProduct(cleanPath.split("/")[2]) : undefined;
    const collection = cleanPath.startsWith("/collections/") ? findCollection(cleanPath.split("/")[2]) : undefined;
    const metadata = product
      ? { title: `${product.name} — Apple Store Demo`, description: `${product.subtitle} ${product.description}` }
      : collection
        ? { title: `${collection.name} — Apple Store Demo`, description: collection.description }
        : staticMeta[cleanPath] ?? { title: "Apple Store Demo — Considered technology, made for use", description: "Explore an Apple-inspired ecommerce storefront with transparent demo shopping and checkout." };
    const base = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
    const canonicalUrl = `${window.location.origin}${base}${cleanPath}`;
    document.title = metadata.title;
    setMeta("description", metadata.description);
    setProperty("og:title", metadata.title);
    setProperty("og:description", metadata.description);
    setProperty("og:url", canonicalUrl);
    setProperty("og:type", product ? "product" : "website");
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
  }, [location]);
  return null;
}
