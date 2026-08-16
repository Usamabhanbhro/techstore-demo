# TechStore design-system QA

## Homepage live audit

- Browser route: `/`
- Viewport: 1280px wide
- Horizontal overflow: none (`scrollWidth` 1265px)
- Heading hierarchy: one `h1`, followed by product section `h2`/`h3` headings
- Empty image alt attributes: none
- Unlabeled empty controls: none
- Navigation position: sticky
- Active design tokens: white background `#ffffff`, light-gray surface `#f5f5f7`, blue accent `#0071e3`, medium radius `12px`
- Existing title remains route-accurate: `Apple Store Demo — Shop iPhone, Mac, iPad and more`

The homepage rendered with the revised compact navigation, white-first surfaces, blue purchase actions, restrained rounded product panels, and accessible gallery play control. Continue with route-level checks for catalog, product detail, bag, checkout, confirmation, and a narrow responsive viewport.

## Catalog and product routes

The `/shop` route rendered all 48 catalog products in a four-column desktop grid with readable filters, labeled availability states, wishlist controls, and visible prices. The live DOM reported no horizontal overflow and no unlabeled controls. The empty `alt` count came only from intentionally decorative hover/secondary product images; primary product images retained descriptive alt text.

The `/products/iphone-17-pro` route rendered a two-column product dossier with a one-heading hierarchy, three storage options, quantity controls, a blue primary add-to-bag action, an outlined wishlist action, visible delivery state, accordions for details and compatibility, and related accessories. The live DOM reported no horizontal overflow and no unlabeled controls.

## Bag route

The `/cart` route rendered a compact line-item layout with the product image, family label, name, selected configuration, availability, quantity control, removal action, order summary, promo input, free-delivery line, total, and the checkout handoff. The redesigned order summary remains visually separated on a soft-gray surface and explicitly identifies the demo as non-financial.

## Discovery and comparison routes

The `/search?q=iPhone` route rendered the query input with an accessible label, a clear action, family filters, 11 matching results, and the same four-column product grid used by the shop. The search experience retained the calm white hierarchy and blue interactive states.

The `/compare` route rendered family tabs with an obvious selected state, a restrained comparison table with product imagery, price and availability in each header, specification rows, horizontal-scroll containment for narrow layouts, and a visible `Shop iPhone` CTA.

## Account and wishlist routes

The `/account` route rendered a coherent demo dashboard with a dark profile card, order count and confirmation link, saved-product count, transparent checkout messaging, and a continue-shopping path. The `/wishlist` route rendered a clearly labeled saved-for-later empty state with an explanation and `Explore the shop` CTA; both routes inherited the compact header, white-first surfaces, restrained radius, and grouped footer.

## Content surfaces

The `/about` route inherited the white-first page intro and used a full-bleed dark manifesto panel for contrast while retaining descriptive image alt text, a support CTA, and an explicit no-real-transaction disclosure. The `/journal` route rendered guide cards in a consistent two-column editorial grid with system-sans typography, readable copy, image alt text, and `Read guide` links; it remained visually connected to the ecommerce shell rather than introducing a separate luxury/editorial theme.

## Responsive and accessibility smoke

A Playwright audit covered `/`, `/shop`, `/collections/iphone`, `/products/iphone-17-pro`, `/search?q=iPhone`, `/compare`, `/cart`, `/checkout`, `/order-confirmation`, `/account`, and `/wishlist` at **390px, 768px, 1024px, and 1440px**. All 44 route/viewport combinations reported no horizontal overflow, exactly one `h1`, zero unlabeled buttons, zero unlabeled form controls, and no page errors.

## End-to-end commerce flow

A synthetic browser journey completed after the redesign: `/collections/iphone` → `/products/iphone-17-pro` → configure default 256GB variant → Add to bag → `/cart` → `/checkout` → required contact fields and JazzCash demo selection → local successful demo payment → `/order-confirmation`. The confirmation displayed order `APPLE-79033001`, `JazzCash · successful`, a demo reference, `$2,198` total, customer delivery details, and `iPhone 17 Pro · 256GB × 2`. No real payment or credential was used.
