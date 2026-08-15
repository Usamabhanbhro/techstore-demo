# Apple Route Fidelity Audit — Completion Report

**Audit date:** 2026-08-15  
**Source:** [Apple public sitemap](https://www.apple.com/sitemap/) and each same-origin route listed in the captured inventory  
**Clone:** `techstore-demo` at `/home/ubuntu/webstore-demo`  

## Scope

The audit covered all **272 normalized same-origin Apple routes** found in the sitemap inventory. For every route, the audit collector fetched the original Apple page and rendered the corresponding local clone route with Chromium. It stored the original and clone DOM snapshots, parsed page metadata/headings/links/images/text coverage, updated persistent progress tracking, and produced route-level discrepancy labels.

The final post-fix collection completed with **272/272 original routes returning HTTP 200**, **272/272 clone routes rendering successfully**, and the independent HTTP route smoke test passing **272/272**.

## Implemented corrections

The clone now has route-specific source-derived heading and paragraph data generated from the individual original DOM captures. The Apple route template consumes that data for product, comparison, editorial, utility, and store families while preserving the existing commerce routes. A route-specific image capture pass downloaded the first real Apple source image found in **144 of 272 routes** and generated a local mapping module used by the route templates. Dedicated source images now render for representative routes such as `/airpods`, `/mac`, `/iphone`, `/watch`, `/accessibility`, and several Apple service, editorial, and product-detail routes.

The shared Apple shell, deep multi-segment routing, store filters, comparison tables, editorial search form, product tabs, and accordions remain functional. Responsive QA captures were refreshed for representative Mac, iPhone comparison, store, and Newsroom routes, and additional interaction checks were performed for the store filter and AirPods information accordion.

## Final automated findings

The route-level comparator still reports structural differences because the clone intentionally uses reusable template families instead of reproducing every Apple page’s full bespoke DOM composition. It also reports link-count differences because the clone footer and page templates contain a smaller, curated link set. These are recorded as discrepancies rather than hidden.

| Metric | Result |
|---|---:|
| Normalized routes audited | 272 |
| Original routes inspected successfully | 272 |
| Clone routes inspected successfully | 272 |
| Final route smoke-test passes | 272 |
| Routes with route-specific local source image mapping | 144 |
| Routes with remaining heading-structure discrepancy | 272 |
| Routes with remaining asset-count discrepancy | 268 |
| Routes with remaining link-count discrepancy | 272 |
| Routes with H1/content mismatch | 3 |
| Routes with content-coverage discrepancy | 223 |
| Routes marked fully verified | 0 |

## Interpretation

The work satisfies the requested **individual route inspection and evidence collection** requirement and fixes the highest-leverage shared issues: route resolution, source-derived page copy, representative interaction behavior, and route-specific media loading. It does **not** claim pixel-perfect parity for all 272 pages. The remaining gap is primarily Apple’s page-specific production composition: many original routes contain multiple bespoke galleries, video tiles, product-specific comparison systems, dense navigation structures, and route-specific link architectures that cannot be represented faithfully by one generic template without implementing each family as its own bespoke page.

The persistent route tracker intentionally leaves all `Verified` fields unchecked. A route should only be marked verified after a human visual comparison at desktop, tablet, and mobile widths confirms its bespoke layout and interaction behavior.

## Evidence files

- `ROUTE_TRACKING.md` — persistent route-by-route tracking table.
- `route-evidence/route-summary.jsonl` — final structured evidence for all 272 routes.
- `AUDIT_SUMMARY.md` — aggregate discrepancy counts and route-family totals.
- `BEHAVIORS.md` — manual interaction and visual QA notes.
- `capture_route_assets.py` — repeatable per-route source-image capture script.
- `client/src/data/appleRouteAuditData.ts` — generated route-specific copy data.
- `client/src/data/appleRouteAssets.ts` — generated local source-image mapping.
