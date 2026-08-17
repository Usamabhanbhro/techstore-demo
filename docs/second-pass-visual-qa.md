# Second-Pass Visual QA

## Mobile homepage setup

The updated local homepage loaded successfully at `/` with route-aware title `Apple Store Demo — Shop iPhone, Mac, iPad and more`. The Playwright visual QA browser was resized to **390 × 844** for screenshot inspection of hero height, image cropping, text placement, CTA rhythm, section density, and mobile navigation.

The 390px homepage snapshot preserved one H1, product-led section order, descriptive imagery, and live route CTAs. The mobile shell exposes compact navigation, search, and bag controls without adding a second visible purchase header. The homepage hero and feature sections are now bounded at a more deliberate mobile height instead of inheriting the previous 620px minimum, while the supporting product/promo grid remains two-column only where content can carry it.

## Breakpoint composition metrics

The updated homepage and shop were measured at the required widths. Both routes reported no horizontal overflow at **390, 430, 768, 820, 1024, 1280, or 1440px**. Homepage hero heights measured 520px at 390/430px, 560px at 768/820px, and 684px at 1024px and above. Shop grids measured two columns at 390/430/768/820px, three columns at 1024px, and four columns at 1280/1440px. The compact navigation is absolute/overlay-based through 820px and returns to static desktop layout from 1024px upward.

## Product and commerce setup

The updated `/products/macbook-air` route loaded successfully and was resized to 390 × 844 for purchase-path QA. The test will focus on the product hierarchy, add-to-bag state, cart row spacing, checkout payment option cards, and confirmation metadata.

The 390px product snapshot kept the gallery, one H1, variant controls, quantity controls, full-width Add to bag, wishlist action, and disclosure controls in a readable purchase order. Adding the item succeeded through the existing local commerce path; no new motion or layout error was emitted by the browser.

The 390px bag snapshot now separates the product category, product name, variant, availability, and Remove action. Quantity controls and price occupy a separate control region, while the order summary exposes distinct Subtotal, Delivery, and Total rows with prices aligned as separate values. No label/value collisions appear in the accessibility structure.

The populated checkout snapshot at 390px now exposes delivery choices as separate titled rows and payment providers as full-width labeled options with appropriately sized radio controls, primary provider names, secondary descriptions, and selected-state hooks. The checkout order summary remains organized as item, subtotal, delivery, total, and action regions rather than one continuous text flow.

The populated confirmation route now exposes Order, Date, Payment, Reference, Total, and Delivery as semantic term/definition pairs. The order summary no longer concatenates label and value text. The snapshot still shows the customer name and city/state within one Delivery value, which is semantically grouped but should receive a visual line break or sub-block treatment in CSS so the delivery identity is easier to scan at narrow widths.

The updated homepage baseline remained stable in the Playwright accessibility tree after the search-transition refactor: the compact header exposes labeled Open search and bag controls, and the product-led H1/section hierarchy is unchanged.

Opening search now exposes a mounted `Site search` form with `Close search` expanded state and an active Search products textbox. The surface uses the new opacity/translate transition rather than a restarting keyframe; the page content remains in place while the search surface unfolds beneath the navigation.

Closing search returned the shell to `aria-expanded="false"`; after 270ms the search form was removed from the DOM and the body width remained 390px, matching the viewport with no layout-lock or overflow regression.

A probe of `/does-not-exist` resolved to the repository’s preserved Apple-style route fallback rather than the explicit `NotFoundPage` component. The route audit confirms `NotFoundPage` is used for missing journal articles and empty confirmation state; no route-level 404 regression was introduced by this second pass. The explicit 404 component remains styled with a coordinated `not-found` entrance and recovery actions.
