# Quality-pass visual findings

## Homepage browser pass — 2026-08-16

The homepage rendered successfully at `http://localhost:3000/` in the live browser. The header, hero, feature sections, promo grid, entertainment gallery, and footer are present.

Observed functional defects:

- The homepage's primary shopping CTAs are hash anchors (`#macbook-air`, `#iphone`, `#promos`, `#ipad`, `#mac`, `#watch`, `#ipad-pro`, `#trade-in`, `#apple-card`, and `#entertainment`) rather than live commerce routes. This prevents direct discovery from landing modules and makes several buttons scroll to their own sections instead of opening products or collections.
- The entertainment gallery action also points back to `#entertainment`, so it is not a meaningful destination.
- The homepage title and metadata still describe the older Usamabhanbhro fashion/object showcase rather than the rendered Apple Store demo.
- The page currently contains a live bag count of 1 from persisted browser state, confirming local commerce persistence is active.

Observed visual/accessibility baseline:

- The viewport rendered with a light paper surface, serif editorial headings, and restrained dark navigation consistent with the incumbent design.
- The screenshot tooling showed a dense header at the top of the narrow viewport; mobile navigation and footer need a dedicated narrow-width pass.
- Icon-only search and bag controls expose accessible names in the browser element list.
- Homepage product imagery in the feature and promo sections uses empty alt text, which is acceptable only if treated as decorative; product-discovery imagery should receive useful alt text when it conveys product identity.

Next audit targets: product/collection routes, comparison overflow, cart/checkout semantics, footer dead links, and 390/768/1024/1440 responsive behavior.

## Shop browser pass — 2026-08-16

The shop route rendered 48 products with category filters, availability, price, and sorting controls. Product cards expose named view and wishlist controls, and the live page reported zero horizontal overflow at a 1280px viewport.

The browser DOM measurement found 96 images, all marked lazy-loading, but 48 images have empty alt text. Each product card renders two images for hover imagery; both should carry meaningful alt text or the secondary image should be explicitly treated as decorative while the primary image identifies the product. The listing uses one H1 and product names as H3 headings, which is structurally acceptable, but the repeated card presentation is visually dense at the current desktop scale and should be checked at narrow widths.

The global document title remains the older generic title on `/shop`, confirming the need for route-aware title and description metadata.

## Homepage browser pass — 2026-08-16

After the quality edits, the live homepage reports the route-specific title `Apple Store Demo — Shop iPhone, Mac, iPad and more`, a matching description, a canonical URL, zero hash-only links, zero horizontal overflow at a 1280px viewport, and zero non-decorative images with empty alt text. The primary and promotional CTAs now route to real shop, collection, product, support, about, and guide pages. The browser also confirms the mobile/search/bag controls and expanded footer destinations are present in the rendered DOM.

## Product detail browser pass — 2026-08-16

The `/products/iphone-17-pro` route now reports `iPhone 17 Pro — Apple Store Demo`, exposes product breadcrumbs, variant buttons, quantity controls, add-to-bag, wishlist, accordions, compatibility, and related products. The browser click added the product successfully and updated the persistent live bag count from 1 to 2. Product-gallery images have descriptive alt text, while the secondary hover images are explicitly decorative.

## Cart and checkout browser pass — 2026-08-16

The `/cart` route preserves the product and quantity state, calculates the $2,198 subtotal and free delivery, presents a transparent local-demo note, and hands off to `/checkout`. Checkout renders route-specific metadata, required contact and delivery fields, six simulated payment methods, delivery choices, demo outcome controls, promo input, and a non-financial disclosure. Submitting with blank/invalid fields does not create an order; it visibly reports full name, email, address, city, state, ZIP, and payment-method errors while keeping the user on checkout.

## Successful order browser pass — 2026-08-16

Using non-sensitive demo data, checkout accepted the required fields and JazzCash simulation, created a local successful order, cleared the bag to zero, and navigated to `/order-confirmation`. The confirmation page exposes an order number, date, successful provider status, demo reference, total, delivery summary, line items, continue-shopping link, and account link. No card number or real financial credential was used.

## Final quality verification — 2026-08-16

The successful confirmation route reports zero horizontal overflow, a single meaningful H1, zero unlabeled interactive elements, and zero non-decorative images with empty alt text at the live browser viewport. The production build initially exposed a root-relative static canonical link being treated as a directory asset by Vite; removing that duplicate static link (while retaining route-aware runtime canonical metadata) resolved the build failure. Final typecheck, tests, and production build pass.
