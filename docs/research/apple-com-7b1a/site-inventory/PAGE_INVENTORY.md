# Apple.com Page Inventory and Clone Scope

## Source and destination

| Source | Destination | Site key | Page key | Status |
|---|---|---|---|---|
| `https://www.apple.com/` | `/` | `apple-com-7b1a` | `homepage-6a2c` | Existing Apple homepage clone; retain and refine |
| `https://www.apple.com/sitemap/` | `/sitemap` | `apple-com-7b1a` | `sitemap-4f13` | Apple sitemap template |
| `https://www.apple.com/<path>` | `/<path>` | `apple-com-7b1a` | normalized path slug | Route-driven template coverage |

The public Apple sitemap yielded **272 unique same-origin paths** after normalizing trailing slashes and deduplicating links. External domains such as support.apple.com, account.apple.com, investor.apple.com, locate.apple.com, iCloud.com, and the App Store are recorded as external dependencies and are not cloned as internal routes.

## Page taxonomy

| Template family | Representative routes | Implementation approach |
|---|---|---|
| Homepage and campaign landing | `/`, `/mac`, `/ipad`, `/iphone`, `/watch`, `/apple-vision-pro`, `/airpods`, `/tv-home`, `/entertainment` | Dedicated hero-and-section compositions with shared Apple navigation/footer |
| Product detail | `/macbook-air`, `/macbook-pro`, `/iphone-17-pro`, `/ipad-pro`, `/apple-watch-series-11`, `/airpods-pro` | Data-driven product template with hero, feature sections, CTA, and related links |
| Product comparison/specs | `/mac/compare`, `/ipad/compare`, `/iphone/compare`, `/watch/compare`, `/airpods/compare`, `/apple-vision-pro/specs` | Comparison/specification template with tables or feature rows |
| Product/accessory category | `/us/shop/goto/accessories`, `/us/shop/goto/buy_iphone`, `/us/shop/goto/mac/accessories`, `/us/shop/goto/watch/accessories` | Store/category template with filters, product cards, and category chips |
| Service/product experience | `/apple-music`, `/apple-tv`, `/apple-arcade`, `/apple-one`, `/apple-pay`, `/wallet`, `/icloud`, `/services` | Service landing template with branded hero, benefit sections, and CTA |
| Corporate and values | `/leadership`, `/careers/us`, `/environment`, `/privacy`, `/diversity`, `/accessibility`, `/contact` | Editorial/informational template with structured content blocks |
| Support/store service | `/retail`, `/retail/geniusbar`, `/today`, `/today/calendar`, `/today/camp`, `/financing`, `/us/shop/goto/trade_in` | Service template with cards, location/date controls, and CTA states |
| News and events | `/newsroom`, `/apple-events`, `/tv-pr`, `/rss` | Editorial listing/detail template with filters or article cards |
| Legal and utility | `/legal`, `/legal/privacy`, `/legal/internet-services/terms/site.html`, `/choose-country-region`, `/feedback`, `/sitemap`, `/us/search` | Utility template with headings, lists, search, or locale selectors |

## Complete normalized route list

The full machine-generated normalized route list is stored beside this file at `routes.txt`. The source evidence is the captured Apple sitemap DOM and extracted sitemap text. Each route must be inspected before it is marked complete; template reuse does not replace route-level verification.

## Priority order

The first implementation wave should cover the global Apple foundation and the nine top-level product/service pages linked from the global navigation. The second wave should cover product details and comparison/spec routes. The third wave should cover store/category, service, corporate, news, legal, and utility paths. Each wave requires route checks, responsive screenshots at 1440px, 768px, and 390px, and interaction verification before the next wave begins.

## Preserved project behavior

The existing techstore-demo routes under the commerce application remain preserved. Apple routes are added through a separate route-driven layer and namespaced Apple research/assets so the existing storefront is not overwritten or silently mixed with Apple-specific data.
