# Apple Homepage Reconnaissance

## Source and destination

- Source URL: https://www.apple.com/
- Destination route: `/`
- Site key: `apple-com-7b1a`
- Page key: `homepage-6a2c`
- Existing project: `/home/ubuntu/webstore-demo`

## Observed topology

The homepage uses a 44px global navigation bar followed by three major content regions: a hero section with the College, sorted. campaign and product-family feature blocks; a two-column promotional grid containing iPad Air, MacBook Pro, Apple Watch Series 11, iPad Pro, Apple Trade In, and Apple Card; and an Endless entertainment carousel/gallery. The page ends with legal notes and a multi-column Apple footer.

## Verbatim visible homepage content

- College, sorted.
- Get a gift card from $100 to $150* when you buy Mac or iPad with education savings.
- Shop
- iPhone — Meet the latest iPhone lineup. — Learn more — Shop iPhone
- MacBook Air — Now supercharged by M5. — Learn more — Buy
- iPad Air — Now supercharged by M4. — Learn more — Buy
- MacBook Pro — Now with M5, M5 Pro, and M5 Max. — Learn more — Buy
- Apple Watch Series 11 — The ultimate way to watch your health. — Learn more — Buy
- iPad Pro — Advanced AI performance and game-changing capabilities. — Learn more — Buy
- Apple Trade In — Get up to $205–$720 in credit when you trade in iPhone 13 or higher. — Get your estimate
- Apple Card — Get up to 3% Daily Cash back with every purchase. — Learn more — Apply now
- Endless entertainment.

## Global design evidence

- Body font stack: `SF Pro Text`, `SF Pro Icons`, `Helvetica Neue`, Helvetica, Arial, sans-serif.
- Body color: `rgb(29, 29, 31)`.
- Body background: white.
- Global nav height: 44px.
- Browser reconnaissance viewport: 1280 x 1100 CSS pixels, DPR 1.
- Primary surfaces observed: white, soft gray promo backgrounds, black/dark entertainment media tiles, and blue Apple-style CTA buttons.
- Navigation labels: Apple, Store, Mac, iPad, iPhone, Watch, Vision, AirPods, TV & Home, Entertainment, Accessories, Support, Search, Shopping Bag.

## Asset evidence

The reference exposes localable public assets under `/v/home/images/...`, including:

- `back-to-school-2026/a/hero_back_to_school_startframe__cd4vg5frm39e_largetall.png`
- `back-to-school-2026/a/hero_back_to_school_2026__cz07tzsg14sy_largetall.jpg`
- `iphone-family/a/hero_iphone_family__be5jkzxszb1e_largetall.jpg`
- `macbook-air-m5/a/hero_macbook_air_m5__eb1idggd120y_largetall.jpg`
- `ipad-air-m4/a/promo_ipad_air_m4__bgcv7t286k8y_large.jpg`
- `macbook-pro/a/promo_macbook_pro__c9td9w1mc8ia_large.jpg`
- additional lazy-loaded promo and entertainment assets discovered during page traversal.

## Responsive and interaction observations

- The global nav is compact and horizontally distributed on desktop.
- The homepage has a horizontally arranged media/gallery interaction for Endless entertainment, including selectable gallery items and a play control.
- CTAs are rounded pill buttons with blue primary and outlined secondary variants.
- The page is vertically stacked on narrow layouts, with product feature imagery filling the width and typography centered in hero/promo regions.
- The homepage is long and uses multiple full-bleed sections with deliberate section spacing and image-led storytelling.

## Scope decision

Because the supplied origin is a large public commerce/marketing site with many distinct product and support destinations, this implementation targets the supplied homepage as the primary destination and preserves the existing project's other routes. The homepage clone will use real public reference assets where technically practical and will implement the visible nav, promo tiles, entertainment gallery, responsive layout, and footer behavior.

## Output map

| Source URL | Destination | Research | Screenshots | Assets | Components |
|---|---|---|---|---|---|
| `https://www.apple.com/` | `/` | `docs/research/apple-com-7b1a/homepage-6a2c/` | `docs/design-references/apple-com-7b1a/homepage-6a2c/` | `public/sites/apple-com-7b1a/homepage-6a2c/` | `client/src/components/sites/apple-com-7b1a/homepage-6a2c/` |

## Captured public asset URLs

The current reference exposes the following high-value product assets for local download:

| Purpose | Public asset URL |
|---|---|
| Education campaign start frame | `https://www.apple.com/v/home/images/back-to-school-2026/a/hero_back_to_school_startframe__cd4vg5frm39e_largetall.png` |
| Education campaign hero | `https://www.apple.com/v/home/images/back-to-school-2026/a/hero_back_to_school_2026__cz07tzsg14sy_largetall.jpg` |
| iPhone family | `https://www.apple.com/v/home/images/iphone-family/a/hero_iphone_family__be5jkzxszb1e_largetall.jpg` |
| MacBook Air | `https://www.apple.com/v/home/images/macbook-air-m5/a/hero_macbook_air_m5__eb1idggd120y_largetall.jpg` |
| iPad Air logo | `https://www.apple.com/v/home/images/logos/ipad-air-m4/a/promo_logo_ipad_air__dqdj4ni03quu_large.png` |
| iPad Air promo | `https://www.apple.com/v/home/images/ipad-air-m4/a/promo_ipad_air_m4__bgcv7t286k8y_large.jpg` |
| MacBook Pro promo | `https://www.apple.com/v/home/images/macbook-pro/a/promo_macbook_pro__c9td9w1mc8ia_large.jpg` |
| Apple Watch logo | `https://www.apple.com/v/home/images/logos/apple-watch-series-11/a/promo_logo_apple_watch_series_11__5r9c4l119tuy_large.png` |
| Apple Watch promo | `https://www.apple.com/v/home/images/apple-watch-series-11/a/promo_apple_watch_series_11__gnlwqxe1jlu2_large.jpg` |
| iPad Pro promo | `https://www.apple.com/v/home/images/ipad-pro/a/promo_ipad_pro__emtduc920o02_large.jpg` |
