# TechStore final capability matrix

This matrix records the audited storefront’s final state. It distinguishes retained functionality from bounded improvements and deliberate omissions. The implementation preserves `docs/design.md`, the local commerce model, and GitHub Pages routing. Evidence is recorded in [`storefront-audit.md`](./storefront-audit.md), [`apple-pattern-research.md`](./apple-pattern-research.md), [`responsive-qa.md`](./responsive-qa.md), and the existing commerce/deployment QA records.

| Capability | Existing | Improved | Added | Deliberately Not Added | Reason |
|---|---|---|---|---|---|
| Search | Yes | Yes — preserved route/query behavior and empty-state recovery | No | No | Search is a core catalog task; the pass keeps it visible and recoverable without analytics. |
| Sticky header | Partial | Yes — compact scroll-aware shell behavior and restrained border/shadow treatment | No | No | Retains Apple-inspired orientation without creating a large floating header. |
| Skip link | No | No | Yes — `Skip to content` targets `#main-content` | No | Required for keyboard users to bypass repeated navigation. |
| Keyboard navigation | Partial | Yes — visible focus treatment, mobile menu focus entry, Escape close, focus restoration, disclosure semantics, and landmark target | No | No | Reduces navigation friction without changing the information architecture. |
| Product CTA | Yes | Yes — honest demo copy and mobile continuity | Yes — context-aware mobile sticky purchase bar | No | Keeps purchase action available on long product pages while hiding it when the native action is visible. |
| Metadata | Partial | Yes — route-aware title, description, canonical, Open Graph, robots, and schema | Yes — OG image and JSON-LD | No | Improves discoverability and sharing using only catalog-backed data. |
| Sitemap | Partial | Yes — footer now points to the real asset | Yes — truthful `sitemap.xml` | No | Gives crawlers a valid public route inventory without exposing internal demo states. |
| Structured data | No | No | Yes — WebSite/Organization, BreadcrumbList, Product, and Offer where truthful | No | Supports search understanding while avoiding unsupported claims. |
| Analytics | No | No | No | Yes | No tracking backend exists or is needed; privacy is clearer without analytics. |
| Cookie banner | No | No | No | Yes | No cookies or tracking consent flow is required for this local demo. |
| Product detail UX | Yes | Yes — delivery wording, image loading semantics, mobile purchase continuity, and support reassurance | No | No | Product configuration and accessory/related-product flows remain intact. |
| Search navigation | Yes | Yes — accessible global search, explicit submit behavior, URL-synchronized query state, clear recovery, and live result count | No | No | Search remains available from the shared shell without adding a new visual system. |
| Mobile menu | Yes | Yes — labeled expanded state, Escape handling, body-scroll restoration, and focus-visible controls | No | No | Improves small-screen navigation while preserving the compact Apple-inspired pattern. |
| Loading states | Limited | No functional loading state was necessary | No | Yes — no decorative loader | The local catalog renders synchronously; decorative motion would add noise. |
| Hover states | Yes | Yes — existing restrained transitions remain token-based | No | No | Preserves tactile feedback without gradients or decorative animation. |
| Empty cart | Yes | Yes — existing shop recovery path retained and validated | No | No | Empty-cart recovery is already clear and commerce-safe. |
| Empty wishlist | Yes | Yes — existing local/account relationship remains explicit | No | No | No new account system is fabricated for the static demo. |
| Empty filtered collection | Yes | Yes — result context and reset behavior retained | No | No | Helps users recover from filters without losing catalog orientation. |
| Missing product / 404 | Yes | Yes — recovery actions include search, home, shop, and category paths | No | No | A bounded recovery surface is more useful than a dead end. |
| Error states | Yes | Yes — checkout validation and payment failures expose actionable inline messages and alerts | No | No | Errors remain recoverable and accessible without modal interruption. |
| Success states | Yes | Yes — confirmation disclosure, next actions, and copy-reference affordance | Yes — order-reference copy action | No | Copying a reference is the only copy task with a clear user benefit. |
| Forms | Yes | Yes — labels, groups, autocomplete, field-level validation, associated invalid states, focus recovery, success/error messaging, and contact feedback | No | No | Maintains commerce flow while improving form comprehension. |
| Password visibility | No password form exists | Not applicable | No | Yes | There are no password fields in the local demo. |
| UTM tracking | No | No | No | Yes | No campaign-attribution requirement or analytics service exists. |
| Trust pages | Partial | Yes — transparent demo limitations are separated from policy content | Yes — `/privacy` and `/terms` with last-updated dates | No | Users can inspect what is stored and what the demonstration does not promise. |
| FAQ | Product accordions exist | No | Yes — focused support FAQ for shipping, returns, compatibility, payment, and delivery | No | These are recurring support questions; a site-wide FAQ would be unnecessary duplication. |
| Contact | Yes | Yes — no invented address, clearer support channel, validation, and success/error state | No | No | Keeps support actionable while avoiding fabricated business details. |
| Above-fold CTA | Yes | Yes — preserved and clarified | No | No | Existing prominent calls to action already serve the primary tasks. |
| Open Graph image | No | No | Yes — safe local shared fallback/product image reference | No | Improves social previews without introducing an unsupported brand asset. |
| Favicon | Yes | No | No | No | Existing document icon is preserved because it is functional and in scope. |
| Alt text | Partial | Yes — key catalog, hero, article, and commerce images retain meaningful alt text | No | No | Text alternatives describe user-relevant imagery without inventing details. |
| Mobile breakpoints | Yes | Yes — verified at 390, 768, 1024, and 1440px | No | No | Responsive changes were limited to observed layout and interaction needs. |
| Sticky mobile CTA | No | No | Yes — product detail only, safe-area aware, reduced-motion compatible | No | Provides purchase continuity on long pages without obstructing the shell or other routes. |
| Confirmation | Yes | Yes — local-only wording and copy-reference state validated | Yes — copy-reference control | No | Keeps the confirmation route useful while making its simulated nature unmistakable. |
| Privacy | Partial | No | Yes — dedicated transparent privacy page | No | Explains local storage, no tracking, and no real payment handling without legal invention. |
| Terms | Partial | No | Yes — dedicated transparent demo terms page | No | States illustrative pricing/availability and demo limitations without fabricated jurisdiction or business claims. |
| Compressed images | Mixed | Yes — stable dimensions, `loading`, and decoding priorities added to key surfaces | No bulk conversion | Yes — no speculative mass re-encoding | Layout stability and request priority had measurable value; broad conversion required asset-level measurement not available in scope. |
| Canonical URLs | Yes | Yes — base-aware, query-stripped runtime canonical values retained | Yes — build-time robots/sitemap generation accepts `PUBLIC_SITE_URL` and GitHub Pages base configuration | No | Keeps preview output correct without baking the preview domain into application source. |
| Breadcrumbs | Product only | Yes — exact collection slugs used in product schema | Yes — BreadcrumbList JSON-LD on product/collection routes | No | Makes structured navigation truthful against the catalog definitions. |
| Error recovery | Partial | Yes — support, checkout, search, and missing-route next actions | No | No | Each tested error state offers a clear retry or continuation path. |
| Back-to-top | No | No | No | Yes | Normal storefront pages do not require another persistent control. |
| Scroll progress | No | No | No | Yes | It adds visual noise without improving catalog or purchase completion. |
| Copy buttons | No | No | Yes — confirmation reference only | No | Limited to the identifier users may reasonably need to transfer elsewhere. |
| Print stylesheet | No | No | No | Yes | There is no invoice or print workflow. |
| Floating contact widget | No | No | No | Yes | It would compete with navigation and the mobile purchase CTA. |
| Confirmation modal | No | No | No | Yes | The dedicated confirmation route already provides sufficient feedback. |
| Last-updated dates | No | No | Yes — privacy and terms documentation | No | Dates clarify the status of policy-like demo documentation without overstating legal authority. |

## Validation summary

`pnpm run check`, `pnpm run build`, `pnpm run build:pages`, the 272-route smoke test, and all 14 Vitest tests passed after the final changes. Responsive browser QA covered the required 390px mobile surface plus desktop shell and product/search/contact flows; the browser session reported zero console errors and zero warnings. The 390px snapshot verified 44px navigation controls, 48px primary actions, product purchase continuity, menu focus entry and Escape restoration, URL-synchronized search, and actionable contact-form errors.

The implementation deliberately does **not** add analytics, cookie consent, UTM persistence, payment processing, fabricated physical-business claims, a password system, decorative loaders, scroll progress, a floating contact widget, a print stylesheet, or a confirmation modal. These omissions preserve the local-demo trust model, avoid unnecessary obstruction, and remain faithful to the canonical design system.
