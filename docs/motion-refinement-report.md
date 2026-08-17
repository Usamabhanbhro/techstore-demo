# TechStore Motion Refinement Report

**Author:** Manus AI

**Scope:** Motion, micro-interactions, loading feedback, transitions, error/success states, reduced-motion behavior, responsive QA, and performance-aware polish.

**Design constraint:** Preserve the existing TechStore / Apple-inspired visual contract, commerce behavior, route structure, copy, assets, and white-first visual system. This was a focused motion pass, not a redesign or wholesale Apple clone.

## Executive summary

The storefront now has a centralized, restrained motion language that gives state changes a clear visual handoff without slowing down local commerce interactions. The pass focuses on shared shell surfaces, product detail, catalog filtering, cart removal, checkout processing, confirmation, error recovery, and mobile disclosure behavior. Existing accessibility semantics and immediate actions were preserved; new movement is limited to opacity, small transforms, color, and grid-row interpolation. No scroll-jacking, parallax, animated gradients, product rotation, fake delays, particle effects, or oversized celebration effects were introduced.

The motion direction was informed by observation of Apple’s current compact global navigation, product-family shopping shelves, search recovery surface, and product-led hierarchy.[1] [2] TechStore adopts only interaction principles—compact orientation, local continuity, clear purchase feedback, and restraint—not Apple branding, claims, or implementation wholesale.

## Implemented motion system

| Area | Implementation | User value |
|---|---|---|
| Timing and easing | Added `--duration-instant`, `--duration-emphasis`, `--duration-gallery`, and `--ease-drawer`; retained the existing fast and standard tiers | Makes timing consistent across surfaces instead of introducing ad hoc animation values |
| Global search | Search surface now enters with a short attached opacity/translate treatment while retaining immediate autofocus and submit behavior | Makes the control feel attached to the navigation without delaying search |
| Mobile navigation | Replaced mobile `display: none/block` swapping with visibility, opacity, transform, and staggered link entrances; Escape still closes the menu and focus returns to its trigger | Gives the drawer a calm, spatial entrance while preserving keyboard recovery |
| Footer disclosures | Added semantic link wrappers and grid-row interpolation for mobile footer groups; chevrons rotate with the open state | Avoids abrupt disclosure swaps and avoids height/padding transition thrash |
| Product cards | Added restrained wishlist confirmation feedback and an opt-in grid result entrance; existing hover image crossfade and quick-action reveal remain intact | Confirms save/filter state without competing with product imagery |
| Product detail | Added gallery image entrances, price-state continuity, variant button transitions, add-to-bag success feedback, sticky CTA entrance, and disclosure panels | Makes configuration and purchase state changes legible at the moment they occur |
| Disclosure panels | Added a reusable `AnimatedDisclosure` primitive with `aria-expanded`, `aria-controls`, region semantics, and grid-row interpolation | Adds continuity to Product details, Compatibility, What’s included, Delivery, and support FAQs without sacrificing access to content |
| Homepage gallery | Keyed the changing gallery content so the active panel uses a short crossfade/translate entrance; play/pause remains explicit | Smooths content replacement only where content actually changes |
| Cart and summary | Added a short cart-row exit and tabular-number state emphasis for subtotal/total updates | Prevents a remove action from producing an abrupt layout jump |
| Checkout and payment | Added an actual loading icon, `aria-busy`, disabled submit state, and localized payment-result entrance; no artificial wait was introduced | Communicates real provider work without making local form interactions feel slow |
| Confirmation and errors | Preserved the confirmation mark animation and added the shared entrance hook to the application crash fallback | Gives success and recovery states a clear, quiet arrival |
| Reduced motion | Extended the existing reduced-motion override to the new hooks; emulated QA reduced transitions and animations to `0.00001s` while keeping state changes readable | Honors motion preferences without removing functional feedback |

## Files changed

The implementation is concentrated in the existing UI surface:

| File | Purpose |
|---|---|
| `client/src/index.css` | Motion tokens, navigation/footer/disclosure transitions, gallery and state keyframes, reduced-motion handling, cart/product/payment feedback styling |
| `client/src/components/Storefront.tsx` | Footer link wrapper required for grid-row disclosure animation |
| `client/src/components/ProductCard.tsx` | Optional result-region class on `ProductGrid` |
| `client/src/pages/Home.tsx` | Keyed entertainment-gallery content for crossfade continuity |
| `client/src/pages/CommercePages.tsx` | Product, search, cart, checkout, payment, disclosure, and loading-state motion hooks |
| `client/src/components/ErrorBoundary.tsx` | Shared recovery-surface entrance hook |

## Accessibility and performance decisions

The motion pass intentionally does not use `transition: all`, `ease-in`, long cinematic timings, or zero-scale entrances. Hover-only behavior remains gated under `(hover: hover) and (pointer: fine)`, and touch users retain the existing direct controls. New interactive disclosures use actual buttons, stable IDs, `aria-expanded`, `aria-controls`, `role="region"`, and `aria-hidden` state. The mobile menu continues to lock body scroll only while open and restores focus to the trigger on Escape.

The mechanical detector returned an empty findings array after replacing the initial `max-height` and `padding-bottom` transitions with `grid-template-rows` interpolation. The only deliberate layout interpolation left in the system uses grid rows for bounded disclosures, which matches the detector’s recommended alternative and avoids animating width, height, margin, or padding.

## Validation results

| Check | Result | Evidence |
|---|---|---|
| TypeScript | Passed | `pnpm run check` |
| Automated tests | Passed | 4 test files, 14 tests |
| Production build | Passed | `pnpm run build` |
| Diff validation | Passed | `git diff --check` |
| Impeccable mechanical detector | Passed | `docs/impeccable-motion-detector.json` contains `[]` |
| Search flow | Passed | `/search?q=Mac` rendered 13 results and retained accessible controls |
| Product detail | Passed | Gallery, variant selection, disclosures, add-to-bag, and bag count validated |
| Mobile navigation | Passed | 390px open, Escape close, focus restoration, and body-scroll cleanup validated |
| Checkout | Passed | Fictional-data validation, demo provider selection, processing-to-confirmation flow validated |
| Reduced motion | Passed | 390 × 844 Playwright emulation; new transitions/animations computed to `0.00001s` |
| Responsive overflow | Passed | No horizontal overflow at 390px, 768px, 1024px, or 1440px |
| Console | Passed | 0 errors and 0 warnings reported in the final Playwright console check |

The complete interaction evidence is recorded in [`docs/browser-motion-qa.md`](./browser-motion-qa.md). The initial audit is recorded in [`docs/motion-inventory.md`](./motion-inventory.md), and the Apple interaction study is recorded in [`docs/apple-motion-reference.md`](./apple-motion-reference.md).

## Deliberate omissions

This pass does not introduce animated gradients, parallax, scroll-triggered section choreography, product rotation, full-screen loaders for local filtering, fake network delays, confetti, giant heart bursts, modal toast stacks, or changes to commerce architecture. Those effects would add spectacle without improving comprehension and would work against the existing calm product-first hierarchy.

## References

[1]: https://www.apple.com/ "Apple homepage"

[2]: https://www.apple.com/us/search "Apple Store search"
