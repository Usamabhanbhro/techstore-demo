# Responsive and accessibility QA

## 2026-08-16 local QA

At 390 × 844 CSS pixels, the storefront rendered without horizontal overflow in the accessibility snapshot. The skip link targets `#main-content`, the shell exposes a banner and a `main` landmark, and the compact navigation exposes an expanded `Close navigation` state with ten primary links. The mobile menu stays within the viewport and uses 52px link targets. The homepage heading hierarchy begins with one level-one heading followed by level-two and level-three sections. The desktop browser pass also showed visible outline treatment around interactive elements.

The first mobile-navigation click attempt using a snapshot reference failed because the automation backend expects a CSS selector; the same interaction succeeded with `button[aria-label="Open navigation"]`. This was a test-harness selector issue, not an application defect.

The first trust-route check used `/techstore-demo/privacy` against an unconfigured local dev server, whose router base is `/`; it correctly fell through because that local path is not the configured development route. Rechecking at `/privacy` on the current server rendered the dedicated Privacy page with a last-updated date, transparent local-storage disclosure, no-fabricated-claims language, the main landmark, and footer Privacy/Terms destinations. The hydrated document title was `Privacy — Apple Store Demo`.

At 390 × 844 on `/products/iphone-17-pro`, the product page reserves 175 × 175 image tiles, shows a single level-one product heading, 44px storage and quantity controls, a full-width native Add to bag action, and a clear `Demo delivery estimate` disclaimer. The accessible snapshot showed the native purchase control in the initial viewport; the sticky mobile CTA therefore remains correctly context-aware rather than duplicating a visible control.

The product sticky CTA was also verified behaviorally. At the lower page position where the native Add to bag button was far above the viewport, `.product-sticky-cta` was fixed at the bottom of the 390 × 844 viewport. After smooth scrolling settled with the native Add to bag button at y≈409–457 within the viewport, the sticky CTA was removed from the DOM/state (`stickyDisplay: null`). This confirms the bar does not duplicate the native purchase action when it is visible.

At 768 × 900 on `/shop`, the shell remained within the viewport, the compact navigation was used, the page exposed one level-one heading, category buttons, labeled availability/price/sort comboboxes, and 224 × 224 reserved product-card images. The accessibility snapshot showed no missing primary controls or obvious horizontal overflow.

At 1024 × 900 on `/shop`, the full Apple Store primary navigation appeared with the logo, search, and bag controls inside the viewport. Category controls wrapped intentionally while the availability and price controls remained aligned beside them; sorting moved to the next row without overflow. The page retained a single level-one heading and labeled controls.

At 1440 × 900 on `/shop`, the full navigation and search/bag controls were centered inside a 1280px shell. The shop page used a 1280px content frame, kept the category controls and filter controls inside that frame, preserved labeled selects, and retained the one level-one heading and square product-card image geometry. No overflow was visible in the accessibility bounding boxes.

The responsive browser session reported 190 total console messages across navigation and interaction checks, with **0 errors and 0 warnings**.

The local commerce smoke reached `/shop`, opened the iPhone 17 Pro product, added it to the bag, opened `/cart`, increased quantity to 2, applied `APPLE10`, and reached `/checkout`. The cart snapshot exposed Remove, Increase/Decrease quantity, promo textbox, subtotal/total, and Continue to checkout. Submitting checkout empty produced `aria-invalid` textboxes with field-level `role="alert"` messages for name, email, address, city, state, ZIP, and payment selection. The browser accessibility tree showed these error messages associated with the invalid controls.

The valid local checkout smoke used fictional details, selected JazzCash’s demo connector, submitted a successful demo outcome, and reached `/order-confirmation`. The confirmation exposed the local-only/no-money-moved disclosure, order reference, Copy order reference control, Continue shopping, and View account actions. The copy action completed without changing order data, and `/account` showed one persisted local order with the expected reference. The cart returned to zero after order creation.
