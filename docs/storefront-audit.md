# TechStore storefront audit

## Public homepage evidence

URL: https://usamabhanbhro.github.io/techstore-demo/

The deployed homepage loads successfully at the repository base path. The global header exposes product-family links plus labeled search and bag controls. The hero has a strong visual and a single Shop CTA. The page includes a useful Apple-inspired section rhythm: iPhone family, MacBook Air, iPad Air, MacBook Pro, Apple Watch, iPad Pro, trade-in, Apple Card, and entertainment media gallery. The footer is grouped into Shop and Learn, Services, Apple Store, For Business, For Education, Apple Values, and Legal.

Observed opportunities to test in code and across routes: add stronger persistent trust and demo-state clarity near commerce actions; ensure “Site Map” is a live route rather than a dead fallback; verify that the hero and product blocks reserve image space and lazy-load below-fold media; validate media gallery controls and mobile navigation at required widths; complete metadata with social image, robots, and structured product/breadcrumb data; confirm external asset behavior and static Pages constraints; and check that account/sign-in language is honest when backend auth is unavailable.

## Public shop-route evidence

URL: https://usamabhanbhro.github.io/techstore-demo/shop

The shop page loads with a compact Apple Store eyebrow, an “Shop Apple” heading, concise supporting copy, category filter buttons, availability and price selects, and a sort select. The grid reports 48 products and exposes each product with a view link, wishlist button, family/category label, name, short descriptor, price, and availability. The public DOM exposes accessible names for view and wishlist controls. The visual audit screenshot shows a dense four-column desktop grid with consistent image stages and compact cards. Further QA should verify the card media’s reserved layout, mobile two-column behavior, control wrapping at 390px, and whether “free delivery” or similar merchandising copy is clearly labeled as demo/illustrative where it is not backed by a live service.

