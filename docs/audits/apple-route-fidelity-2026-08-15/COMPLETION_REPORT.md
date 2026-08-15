# Apple Route Fidelity Audit — Completion Report

**Audit date:** 2026-08-15  
**Source:** [Apple public sitemap](https://www.apple.com/sitemap/) and each same-origin route listed in the captured inventory  
**Clone:** `techstore-demo` at `/home/ubuntu/webstore-demo`

## Scope

The audit covered all **272 normalized same-origin Apple routes** found in the sitemap inventory. For every route, the collector fetched the public Apple page and rendered the corresponding local clone route with Chromium. It stored original and clone DOM snapshots, parsed page metadata, headings, links, images, and text coverage, updated persistent progress tracking, and produced route-level discrepancy labels.

The latest collection completed with **272/272 original routes returning HTTP 200**, **272/272 clone routes rendering successfully**, and the independent HTTP route smoke test passing **272/272**.

## Implemented corrections

The clone now uses route-specific source-derived headings and meaningful paragraphs generated from the individual original DOM captures, scoped to each page’s main content region rather than the global footer. The Apple route template consumes that data for product, comparison, editorial, utility, and store families while preserving the existing commerce routes.

The implementation renders captured route-specific sections and long-form copy blocks in addition to the shared hero, feature, accordion, comparison, editorial, and store compositions. The section blocks preserve heading hierarchy and associate captured paragraphs with the corresponding source-derived sections; they are not a single flattened text dump. Where available, up to five local Apple source images per route are displayed as controlled hero and gallery media. The generated route asset map currently provides source imagery for **144 of 272 routes**.

The shared Apple shell, deep multi-segment routing, store filters, comparison tables, editorial search form, product tabs, accordions, source-derived galleries, and responsive image layouts remain functional. Representative desktop and mobile QA captures were refreshed for Mac, iPhone comparison, store, Newsroom, and product routes. The Mac, iPhone comparison, deep accessories-store filter, and AirPods accordion interactions were exercised directly.

## Before-versus-after improvement

The earlier source-derived pass recorded **271 heading-structure discrepancies** and **100 content-coverage discrepancies**. After expanding the captured evidence to 64 headings and 48 meaningful paragraphs per route, then rendering those records through structured section blocks and longer detail sections, the refreshed comparator records **269 heading-structure discrepancies** and **55 content-coverage discrepancies**.

| Metric | Earlier baseline | Latest result | Improvement |
|---|---:|---:|---:|
| Heading-structure discrepancies | 271 | 269 | 2 fewer routes |
| Content-coverage discrepancies | 100 | 55 | 45 fewer routes |
| H1/content mismatches | 7 | 7 | No change |
| Asset-count discrepancies | 271 | 271 | No change |
| Link-count discrepancies | 272 | 272 | No change |
| Routes inspected | 272 | 272 | Complete |

The content-coverage improvement is the strongest measurable effect of this pass. Asset-count and link-count discrepancies remain because Apple’s production pages include route-specific art direction, navigation depth, commerce links, video/poster media, and dynamic controls that cannot be accurately represented by repeating generic cards or arbitrary links.

## Final automated findings

The route-level comparator intentionally reports discrepancies because Apple’s production pages contain bespoke DOM compositions, rich navigation systems, product-specific galleries, video and motion layers, and route-specific link architectures. The clone has stronger route-specific copy and media than the earlier generic family-only pass, but it is not represented as pixel-perfect parity for all 272 pages.

| Metric | Result |
|---|---:|
| Normalized routes audited | 272 |
| Original routes inspected successfully | 272 |
| Clone routes inspected successfully | 272 |
| Final route smoke-test passes | 272 |
| Routes with route-specific local source image mapping | 144 |
| Routes with remaining heading-structure discrepancy | 269 |
| Routes with remaining asset-count discrepancy | 271 |
| Routes with remaining link-count discrepancy | 272 |
| Routes with H1/content mismatch | 7 |
| Routes with content-coverage discrepancy | 55 |
| Routes marked fully verified | 0 |

## Regression verification

Representative existing commerce routes remained available after the Apple fidelity changes. The local HTTP regression check returned `200` for `/shop`, `/products`, `/search`, `/cart`, `/account`, `/wishlist`, `/about`, and `/journal`.

The final codebase passed:

```text
pnpm run check
pnpm run build
python3 docs/research/apple-com-7b1a/site-inventory/smoke_routes.py
```

The smoke test result was `routes=272 passed=272 failed=0`. The production build completed successfully with only the existing analytics-placeholder and bundle-size warnings.

## Interpretation and limitations

The work satisfies the requested **individual route inspection and evidence collection** requirement and demonstrates measurable improvement in source-derived content coverage. It fixes the highest-leverage shared issues: route resolution, source-derived page copy, main-content extraction, representative interaction behavior, route-specific media loading, source-derived feature sections, longer structured details, and responsive image presentation.

It does not claim pixel-perfect parity for every route. The remaining gap is primarily Apple’s page-specific production composition: many original routes contain bespoke hero art direction, multiple galleries, video tiles, product-specific comparison systems, dense navigation structures, dynamic motion, and route-specific link architectures that cannot be represented faithfully by one reusable family template without implementing each page family as its own bespoke system.

The persistent route tracker intentionally leaves all `Verified` fields unchecked. A route should only be marked verified after a human visual comparison at desktop, tablet, and mobile widths confirms its bespoke layout and interaction behavior.

## Evidence files

- `ROUTE_TRACKING.md` — persistent route-by-route tracking table.
- `route-evidence/route-summary.jsonl` — final structured evidence for all 272 routes.
- `AUDIT_SUMMARY.md` — aggregate discrepancy counts and route-family totals.
- `BEHAVIORS.md` — manual interaction and visual QA notes.
- `ROUTE_FIDELITY_PRIORITY.md` — ranked route discrepancy queue.
- `rank_fidelity.py` — route-priority ranking script.
- `capture_route_assets.py` and `capture_route_asset_sets.py` — repeatable source-image capture scripts.
- `client/src/data/appleRouteAuditData.ts` — generated route-specific copy and section data.
- `client/src/data/appleRouteAssets.ts` — generated first-source-image mapping.
- `client/src/data/appleRouteAssetSets.ts` — generated multi-image route map.
- `docs/design-references/apple-com-7b1a/site-inventory/` — representative desktop and mobile captures.
