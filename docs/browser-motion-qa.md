# Motion QA Notes

## Homepage and global search

The local homepage loaded successfully with the existing skip link, compact navigation, product-led hero sections, gallery controls, and mobile-ready footer disclosures. Opening global search exposed the animated search surface and preserved the existing immediate input focus. Submitting `Mac` routed to `/search?q=Mac` without delay and rendered the 13-result catalog state with the new result-region transition class.

The search result surface remained readable and interactive: the query input, clear action, category filters, product links, and wishlist controls were all present in the accessibility element map. No console or routing error was observed during this interaction.

## Product detail

`/products/macbook-air` loaded with its gallery, sticky purchase path, variant buttons, quantity controls, add-to-bag action, wishlist action, and four disclosure triggers. Switching from 13-inch to 15-inch preserved the page and updated the selected-state treatment without disrupting the purchase flow. The product details disclosure was open by default and the remaining panels were exposed as buttons with `aria-expanded` and `aria-controls` relationships, confirming the native-details replacement retained keyboard-oriented semantics.

## Mobile setup

The Playwright QA browser loaded `/products/macbook-air` successfully and was resized to **390 × 844** for the required mobile interaction pass. The next checks cover touch-target spacing, menu/disclosure behavior, sticky CTA continuity, reduced-motion behavior, and console output.

The 390px accessibility snapshot showed the compact mobile navigation trigger, search and bag controls, product gallery, configuration buttons, quantity controls, add-to-bag/wishlist actions, and animated disclosure buttons. The first disclosure retained its expanded state and the other panels remained represented as accessible regions. The product purchase actions remained reachable in the mobile reading order; no horizontal-overflow signal appeared in the snapshot.

The 390px mobile navigation opened successfully through its labeled trigger. The drawer remained keyboard-addressable while its entrance used the new opacity/transform treatment; the existing focus-transfer behavior was preserved. The Playwright console emitted no application error during the interaction.

Escape closed the mobile navigation and restored focus to the `Open navigation` trigger. The evaluated state reported `menuOpen: false` and an empty `body.style.overflow`, confirming the drawer does not leave the page locked after closing.

Reduced-motion QA was run at 390 × 844 with Playwright media emulation. `matchMedia('(prefers-reduced-motion: reduce)').matches` returned `true`; computed transition and animation durations for the navigation, disclosure panel, and product-gallery imagery were all reduced to `0.00001s`, confirming the existing accessibility override covers the new motion hooks.

With reduced motion emulated, the Product details disclosure collapsed cleanly while its trigger remained present and keyboard-addressable. The interaction stayed functional without movement-dependent feedback, as intended.

Adding the product at 390px changed the primary action to **Added to bag** and updated the global control to **Shopping bag with 1 item**. The snapshot showed the success state as the active accessible button, confirming the motion feedback does not replace or hide the commerce action.

The 390px checkout snapshot exposed the demo-only payment methods, contact and delivery groups, bag count, and accessible radio controls without requiring real financial data. The order form remained structurally intact at mobile width and preserved the local-demo disclosure copy.

Submitting the empty mobile checkout form returned the existing inline validation path instead of starting a fake processing animation. The submit control remained labeled **Choose payment method**, so the user was not misled into believing a payment attempt had started.

For processing-state QA only, the checkout was filled with fictional values (`demo@example.test`, `1 Demo Way`, `95014`) and the JazzCash demo provider was selected. No real payment credentials or personal account data were entered. The provider selection returned `payment: true` in Playwright.

The local demo checkout resolved to `/order-confirmation` with a confirmed order, updated bag count `0`, payment status `JazzCash · successful`, and the existing confirmation mark. The confirmation copy explicitly states that no payment was processed and no fulfillment was initiated; the automated probe timeout was caused by the page navigating before the post-click locator read, not by an application error.

Responsive Playwright checks on `/products/macbook-air` reported no horizontal overflow at any required width:

| Viewport | Scroll width | Horizontal overflow | Mobile nav | Sticky CTA |
|---|---:|---|---|---|
| 390px | 390px | No | Visible | Visible |
| 768px | 768px | No | Visible | Hidden |
| 1024px | 1024px | No | Hidden | Hidden |
| 1440px | 1440px | No | Hidden | Hidden |
