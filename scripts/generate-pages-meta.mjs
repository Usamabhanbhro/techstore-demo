import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDir = join(process.cwd(), "dist", "public");
const basePath = process.env.GITHUB_PAGES === "true" ? "/techstore-demo" : (process.env.VITE_BASE_PATH ?? "").replace(/\/$/, "");
const configuredSiteUrl = (process.env.PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
const siteUrlCandidate = configuredSiteUrl || (process.env.GITHUB_PAGES === "true" ? "https://usamabhanbhro.github.io" : "");
const siteUrl = basePath && siteUrlCandidate.endsWith(basePath) ? siteUrlCandidate.slice(0, -basePath.length) : siteUrlCandidate;

const publicPaths = [
  "/",
  "/shop",
  "/collections",
  "/collections/iphone",
  "/collections/mac",
  "/collections/ipad",
  "/collections/apple-watch",
  "/collections/airpods",
  "/collections/tv-home",
  "/collections/accessories",
  "/collections/vision",
  "/products/iphone-17-pro",
  "/products/iphone-17",
  "/products/iphone-air",
  "/products/iphone-16",
  "/products/iphone-16e",
  "/products/macbook-air",
  "/products/macbook-pro",
  "/products/mac-mini",
  "/products/mac-studio",
  "/products/imac",
  "/products/studio-display",
  "/products/ipad-pro",
  "/products/ipad-air",
  "/products/ipad",
  "/products/ipad-mini",
  "/products/apple-pencil-pro",
  "/products/apple-watch-series-11",
  "/products/apple-watch-se-3",
  "/products/apple-watch-ultra-3",
  "/products/airpods-pro-3",
  "/products/airpods-4",
  "/products/airpods-max-2",
  "/products/apple-vision-pro",
  "/products/apple-tv-4k",
  "/products/homepod",
  "/products/homepod-mini",
  "/products/airtag",
  "/products/magsafe-charger",
  "/products/magic-keyboard",
  "/products/magic-mouse",
  "/products/iphone-17-pro-clear-case",
  "/products/apple-watch-sport-band",
  "/products/beats-studio-pro",
  "/products/apple-usb-c-cable",
  "/products/iphone-16-silicone-case",
  "/products/iphone-16e-silicone-case",
  "/products/magsafe-wallet",
  "/products/35w-dual-usb-c-power-adapter",
  "/products/140w-usb-c-power-adapter",
  "/products/magic-trackpad",
  "/products/ipad-air-magic-keyboard",
  "/products/smart-folio-ipad-air",
  "/products/apple-pencil-usb-c",
  "/products/apple-watch-magnetic-charger",
  "/products/airpods-pro-ear-tips",
  "/products/usb-c-digital-av-adapter",
  "/products/thunderbolt-4-pro-cable",
  "/products/airtag-loop",
  "/compare",
  "/search",
  "/journal",
  "/journal/why-iphone",
  "/journal/choose-your-mac",
  "/journal/ipad-accessories",
  "/journal/make-it-yours",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

await mkdir(outputDir, { recursive: true });

const robotsLines = ["User-agent: *", "Allow: /"];
for (const route of ["/cart", "/checkout", "/account", "/wishlist", "/order-confirmation"]) {
  robotsLines.push(`Disallow: ${basePath}${route}`);
}
if (siteUrl) robotsLines.push("", `Sitemap: ${siteUrl}${basePath}/sitemap.xml`);
await writeFile(join(outputDir, "robots.txt"), `${robotsLines.join("\n")}\n`, "utf8");

if (siteUrl) {
  const urls = publicPaths.map((path) => `  <url><loc>${siteUrl}${basePath}${path}</loc></url>`).join("\n");
  await writeFile(join(outputDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, "utf8");
} else {
  await rm(join(outputDir, "sitemap.xml"), { force: true });
}

console.log(`Generated robots.txt${siteUrl ? " and sitemap.xml" : ""} for ${siteUrl || "relative deployment"}.`);
