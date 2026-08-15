## Visual comparison: `/accessibility`

The local clone now uses the captured Apple heading and introductory paragraph: `Apple Accessibility` and the original accessibility statement. It resolves the route and preserves the shared Apple shell, but it remains materially less faithful than the source: the source uses a full-bleed animated hero, a feature gallery, resource tiles, accessibility impact stories, and values/news sections, while the clone uses a generic three-card editorial layout with homepage assets. This comparison confirms that the route-specific content wiring improves copy fidelity but does not substitute for route-specific media composition.

The original page visual evidence was captured at `https://www.apple.com/accessibility/` on 2026-08-15 and the local evidence at `http://localhost:3000/accessibility`. The original hero and current local clone should be retained as paired QA references.
## Responsive QA after content wiring

The refreshed `/mac` mobile capture preserves the Apple shell, responsive hero hierarchy, readable controls, and image separation at 390px. The `/iphone/compare` mobile capture preserves a usable horizontally scrolling comparison table with the feature column and product columns visible; the original route-specific comparison copy now appears in the hero and table rows. The comparison still differs from Apple’s exact table styling and product density, but there is no destructive viewport overflow in the captured state.
## Interaction QA: `/us/shop/goto/accessories`

The deep multi-segment route resolves to the Apple Store template and preserves the source-specific heading and introductory copy. The Mac filter removes the iPad, iPhone, and Watch cards and leaves only MacBook Air, confirming that the client-side filter state is functional and visible in the route capture. The store template remains a simplified approximation of Apple’s category experience, but the principal route, product grouping, CTA, and filter behavior are operational.
## Interaction QA: `/airpods`

The product route now exposes source-derived AirPods copy and headings, including AirPods Max 2, AirPods Pro 3, AirPods 4, and the comparison heading. The route’s tab controls and accordion disclosures render in the expected responsive structure; the first information accordion was targeted successfully and the page retained its layout while scrolled to the disclosure section. The hero image remains a known fidelity gap because the current local bundle does not yet include the source route’s dedicated AirPods hero asset.
