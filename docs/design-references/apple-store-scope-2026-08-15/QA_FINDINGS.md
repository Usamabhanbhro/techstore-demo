# Apple Store commerce responsive QA findings

Date: 2026-08-15

## 390px mobile pass

The Shop mobile screenshot shows the Apple Store header collapsed to a hamburger/search/bag shell, a readable single-column intro, wrapped category chips, stacked filter controls, and a two-column product grid with no obvious page-level horizontal overflow. Product cards are intentionally dense and continue below the viewport.

The Compare mobile screenshot confirms the same compact header and readable intro, but the comparison table is wider than the viewport and is presented in a horizontally scrollable wrapper; the first four product columns remain visible in a dense table presentation. Family tabs are visually compressed and should be treated as a known mobile tradeoff rather than a failing route.

Further screenshots for the product detail and cart routes remain to be reviewed. The browser QA evidence confirms that the primary commerce routes render at the requested mobile viewport size.

The 390px product-detail screenshot shows the gallery reflowing into a compact multi-column image area, followed by readable breadcrumbs and product title/price content; the purchase controls continue below the captured viewport as expected for a long product page.

The 390px cart screenshot was captured in a fresh headless browser context, so localStorage contains no cart line item. It verifies the responsive empty-bag state, wrapped heading/body copy, and full-width shop CTA. The populated cart state was separately verified interactively at desktop in the browser, including the MacBook Air line item, free delivery, $999 total, and checkout link.
