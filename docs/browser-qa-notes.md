# Browser QA notes

## Desktop homepage

The local homepage loaded at `http://localhost:5173/` with the expected route-aware title, skip link, compact sticky navigation, product-led hero, product modules, gallery tabs, footer groups, and no visible load failure. The browser element map exposed the skip link, labeled Apple Store home link, search control, shopping bag control, primary navigation links, gallery tabs, and footer disclosures.

The current visual surface preserves the existing neutral system and Apple-inspired layout. The local dev wrapper command failed with an EBADF file-descriptor error in this sandbox, so Vite was started directly for browser validation instead; this is a sandbox runner issue, not an application error.

## Search flow

Opening global search exposed a labeled search input with autofocus and an explicit submit button. Submitting `Mac` navigated to `/search?q=Mac`, updated the route-aware title to `Search Apple products — Apple Store Demo`, rendered 13 matching results, exposed a clear action, category filters, and a live result count. Product cards exposed view and wishlist controls in the browser element map.

## Mobile setup

The Playwright QA browser loaded the local homepage and was resized to the required 390×844 CSS-pixel viewport for mobile interaction and overflow checks.

## 390px responsive snapshot

At 390×844, the shell exposed a 44×44 menu button, the Apple Store home link, search and bag controls, and a 52px header. The main content reflowed to single-column modules with 48px primary action targets, stable image bounds, readable headings, and no evidence of horizontal overflow in the accessibility tree. The skip link remained available off-screen until focused.

## Mobile navigation interaction

At 390px, opening the menu changed the control label to “Close navigation”, exposed `expanded`, rendered a named navigation landmark, and moved focus to the first “Store” link. Menu links used 52px rows and the body content remained below the overlay. This validates the new focus-entry behavior and accessible expanded state.

Escape closed the mobile menu and evaluation confirmed `menuOpen: false` with the active element restored to the “Open navigation” trigger. This addresses the close-and-return-focus requirement without introducing a focus trap.

## 390px product detail

The iPhone 17 Pro route loaded with the correct unique title and a product-led hierarchy: breadcrumbs, three image bounds, product name, subtitle, price, availability and delivery disclosure, storage configuration, quantity, primary add-to-bag action, wishlist action, and product-detail accordions. The native action stayed above the fold; the mobile sticky purchase bar is reserved for when the primary action scrolls out of view, preserving the brief’s non-obstruction requirement.

## Contact form at 390px

The contact route exposed visible Name, Email, and message labels with matching textbox names, 48px input heights, a 48px submit button, a clear local-demo disclosure, and a focused support FAQ region. The route title was unique: `Support — Apple Store Demo`.

Submitting the empty contact form produced field-level alerts for name, email, and message. The first invalid textbox was active and exposed its associated error in the accessibility snapshot, confirming actionable recovery rather than a generic form failure.
