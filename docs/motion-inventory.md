# TechStore Motion Inventory

**Scope:** Existing storefront motion audit before the 2026 motion refinement pass.

**Authority:** `docs/design.md` remains the visual source of truth; motion must stay functional, calm, and within the existing white-first system.

## Existing motion surface

| Component | Existing motion | Quality | Missing motion | Recommendation |
|---|---|---|---|---|
| Global tokens | `--ease-standard`, `--ease-out`, `--duration-fast`, and `--duration-standard` in `client/src/index.css:38-41` | Good starting point, but incomplete | No named instant/emphasis/slow tiers or documented motion language | Extend the existing tokens rather than introducing a second system |
| Buttons | Color/border transitions plus `scale(.98)` press feedback in `index.css:72-79` | Good restraint and short timing | Loading and success states are mostly text swaps | Keep the press response; add localized success/loading treatment only where a wait or state change exists |
| Header | Sticky blur shell and scroll shadow in `index.css:87-93`; mobile/search open state is structural in `Storefront.tsx:21-76` | Calm, but menu/search surfaces appear instantly | Attached entrance/exit, search surface transition, and mobile link reveal | Animate opacity/transform with `ease-out`; preserve immediate focus and interaction |
| Footer | Mobile disclosure state in `Storefront.tsx:79-91`; `display:none/block` in `index.css:512-517` | Semantically correct but visually abrupt | Short disclosure reveal and chevron rotation | Use a bounded opacity/clip reveal; do not delay link access |
| Product cards | Image hover scale, image crossfade, quick-action reveal, material-label fade in `index.css:174-187` | Strongest existing card motion; restrained | Wishlist state feedback and filter result transitions | Preserve card hover; add tap/state feedback only to wishlist and result swaps |
| Product detail | Variant state, add-to-bag label, sticky CTA visibility, accordions in `CommercePages.tsx:63-84`; chevron rotation only in `index.css:246-250` | Functionally clear, but state changes are mostly instantaneous | Gallery crossfade, selected variant emphasis, add-to-bag confirmation, accordion content transition, sticky CTA entrance | Prioritize gallery and CTA feedback; use transform/opacity where possible and keep details usable when motion is reduced |
| Homepage gallery | Time-driven slide index every 4200ms in `Home.tsx:30-43`; content changes instantly | Timing is acceptable; content swap is abrupt | Short crossfade for gallery content/tone; preserve play/pause control | Animate only the gallery panel, not every homepage section |
| Search | Global search autofocus and URL form state in `Storefront.tsx:66-75`; results update immediately in `CommercePages.tsx:95-112` | Fast and accessible | Search-surface entrance and subtle result transition | Use a quick attached search reveal; avoid delayed filtering |
| Filters/sort | Local `useMemo` result changes in `CommercePages.tsx:31-59` | Correctly instant for local data | Result-count and grid change have no continuity | Add short opacity/translate transition around result region only if it does not obscure fast filtering |
| Cart | Quantity, remove, promo, total updates happen synchronously in `CommercePages.tsx:114-117` | Clear but visually jumpy | Local row removal/collapse and total emphasis | Add localized row exit and subtle total change indication; do not count numbers for seconds |
| Wishlist | Card/button state toggles in `ProductCard.tsx:13-35`; empty/filled pages in commerce/account modules | Immediate state is understandable | No restrained heart/state feedback or save status | Add a short scale/color transition and accessible status text; reject large celebrations |
| Checkout | `processing` state and payment result panel in `CommercePages.tsx:150-160` | Honest and actionable; transitions absent | Submit loading state, payment result entrance, localized error focus | Add button loading indicator/state and panel fade/slide; never fake a wait |
| Forms/errors | Field errors appear inline in contact/checkout; generic error fallback in `ErrorBoundary.tsx:25-55` | Semantically improved in prior pass | Error appearance is abrupt; crash fallback is visually disconnected | Add a restrained error panel entrance and preserve readable recovery controls |
| Success | Contact, add-to-bag, payment, confirmation, copy-reference use text/icon state changes | Copy is clear, motion missing | Localized success indication | Add icon/color transition where it improves confirmation; avoid modal interruption |
| 404/empty states | Custom 404 in `NotFound.tsx:4-14` and commerce empty states | Intentional copy and recovery paths | No authored entrance or recovery emphasis | Add one subtle state entrance; keep recovery actions immediately available |
| Reduced motion | Blanket near-zero durations and no transform in `index.css:520-523` | Safe and functional baseline | No gentler opacity/color alternative; every new motion must be covered | Refine with an explicit `--motion-reduce` approach that removes movement but preserves state legibility |

## Prioritized implementation order

1. Establish documented motion tokens and shared transition primitives.
2. Animate mobile navigation, global search, and footer disclosures because their current structural swaps are the most noticeable shared abruptness.
3. Add product-detail gallery, variant, add-to-bag, accordion, and sticky-CTA continuity because this is the highest-value commerce surface.
4. Add localized wishlist, cart, promo, checkout, success, and error feedback without creating delays.
5. Add a restrained homepage gallery crossfade and 404/error entrance, then validate at the required responsive widths.

## Deliberate rejections

The audit rejects scroll-jacking, parallax, particle effects, animated gradients, product rotation, giant heart explosions, fake loading delays, full-screen spinners for local state, and animation on every page section. These would increase visual noise, compete with product imagery, or make fast local interactions feel slower without adding understanding.

## Second-pass audit — 2026-08-17

The first pass made the storefront functional and motion-aware, but the screenshot-driven review found two classes of remaining defects: **hierarchy was too compressed** and several commerce surfaces were structurally too flat. The second pass therefore changed static markup before timing.

| Priority | Surface | Finding | Second-pass decision |
|---|---|---|---|
| High | Confirmation | Bare `div/span/strong` metadata allowed label/value collisions and a large empty composition | Use a semantic `dl` grid, tighten the hero-to-card rhythm, and sequence the success surface without blocking use |
| High | Payment | Provider names and descriptions read as one string; radio controls inherited oversized input treatment | Use full-row option cards with 18px controls, primary/secondary type, and selected-state border/background |
| High | Cart | Product metadata, Remove, quantity, and price compressed into adjacent regions | Split info/actions/controls and use explicit summary rows with tabular price alignment |
| High | Responsive | 768–820px could remain too desktop-oriented for the available width | Use a two-column catalog, overlay navigation, stacked filter bar, and single-column commerce layout at the intermediate breakpoint |
| Medium | Search | Keyframe-style open behavior was too immediate and had no real exit phase | Keep the form mounted for a 300ms open / 240ms close transition and remove it after the exit settles |
| Medium | Navigation/disclosures | Shared timings made surfaces feel mechanically identical | Use 400ms drawer, 340ms disclosure, 450ms gallery, and 600ms major-state tiers |
| Medium | Cart removal | JavaScript removed the row before the 340ms visual exit completed | Align the state lifetime to the transition duration |

Rejected in this pass: fake provider delays, full-screen loaders for local state, per-card page-load choreography, scroll-jacking, parallax, animated gradients, giant wishlist celebrations, product rotation, layout-heavy animation, and any motion intended to disguise a static layout defect.
