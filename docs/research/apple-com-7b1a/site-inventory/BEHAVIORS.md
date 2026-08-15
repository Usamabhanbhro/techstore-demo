
## Route-template QA — `/mac`

The new `/mac` route renders the Apple global navigation with real internal route links, a two-column Mac hero using the captured MacBook Air asset, a centered intro section, a sticky-looking tab bar, feature cards, accordion controls, related product links, and the Apple footer. Clicking the `Why Apple` tab is recognized by the browser interaction sweep and updates the active tab state/content in the route template. The route’s visible viewport at desktop is split approximately evenly between copy and product imagery; below the fold, the layout transitions to centered editorial content and a three-column feature row.

The route is generated through the shared Apple route layer rather than the existing commerce pages. The existing commerce routes remain on their original shell, while Apple inventory paths use the Apple shell. Further responsive captures are required at 768px and 390px.

## Deep route QA — `/us/shop/goto/accessories`

The deep sitemap-derived store path currently falls through to the existing 404 page instead of the new Apple store template. The shared Apple shell still renders correctly, which indicates the failure is in the router’s catch-all matching for multi-segment paths rather than the shell. The route matcher must be corrected and re-tested for `/us/shop/goto/*` and other multi-segment Apple paths before completion.

## Deep route and filter verification

After changing the router wildcard from `/:rest*` to the supported `/*` form, `/us/shop/goto/accessories` resolves to the Apple Store template instead of the 404 state. The route displays the Accessories heading, category filter controls, four product cards, buy links, shopping-help content, and the shared Apple footer. Clicking `Mac` filters the grid from four product cards to the MacBook Air card only, confirming the category state is functional.

Source evidence: Apple sitemap route `/us/shop/goto/accessories` from `https://www.apple.com/sitemap/`; local verification at `http://localhost:3000/us/shop/goto/accessories`.

## Comparison and editorial verification

The `/iphone/compare` route resolves to a dedicated comparison family with an Apple-style heading, a six-row feature matrix, three comparison columns, and a Store-help CTA. The `/newsroom` route resolves to a dedicated editorial family with image-led story cards and linked Apple values/support destinations. Both routes use the shared Apple navigation and footer and render the captured local assets without broken-image placeholders.

## Responsive screenshot QA

The 390px Mac capture preserves the Apple-style compact navigation, stacks the hero copy above the product image, keeps the primary and secondary CTAs readable, and avoids image distortion. The 390px comparison capture keeps the feature label column visible while allowing the wider comparison matrix to overflow horizontally, which is the intended mobile table behavior for preserving readable comparison values.

Representative captures are stored under `docs/design-references/apple-com-7b1a/site-inventory/` for Mac, accessories, iPhone comparison, and newsroom at desktop and mobile widths.

The mobile accessories capture keeps filters readable in a horizontally scrollable row and changes the four-card desktop grid into a two-column card layout with visible buy actions. The desktop newsroom capture maintains generous Apple-like whitespace, a centered editorial title, and a three-card story rhythm with consistent image and copy alignment.
