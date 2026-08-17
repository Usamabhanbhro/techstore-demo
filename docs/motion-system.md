# TechStore Motion System — Second Pass

This document extends the existing TechStore motion language for the second refinement pass. It is intentionally hierarchical: frequent controls respond quickly, component surfaces take enough time to establish spatial continuity, and major product/success compositions receive the most presence.

| Tier | Surfaces | Target timing | Purpose |
|---|---|---:|---|
| Micro | Press, wishlist, bag badge, price emphasis, filter selection | 150–180ms | Feedback and state indication |
| Control | Button color, selected variant, search/filter controls | 200–240ms | Acknowledge the user without slowing the task |
| Surface | Search opening, dropdown-like surfaces, payment option selection | 280–320ms | Make the surface feel attached to its trigger |
| Disclosure | Accordions, footer groups, support panels | 320–380ms | Show content physically expanding from its heading |
| Drawer | Mobile navigation | 380–420ms | Establish navigation presence and link hierarchy |
| Gallery | Product imagery and homepage gallery content | 420–480ms | Preserve product continuity while imagery changes |
| Major | Hero/confirmation composition | 500–700ms | Give a rare, meaningful visual sequence enough time to register |

## Easing

Entering and exiting surfaces use `--ease-out` or `--ease-drawer`. On-screen movement uses `--ease-in-out` when needed. Hover and color feedback use `--ease-standard`. No UI uses `ease-in`, and no transition uses `transition: all`.

## Component timing map

| Component | Duration | Implementation note |
|---|---:|---|
| Search opening | 300ms | Opacity plus `translateY(-8px)` to `0`, transform origin at the navigation surface |
| Search closing | 240ms | Same path, shorter exit |
| Mobile navigation | 400ms | Drawer transition with 20–35ms link stagger |
| Footer/disclosure | 340ms | Grid-row expansion, opacity, and chevron rotation |
| Payment option | 240ms | Only the selected row changes border/background/indicator |
| Product gallery | 450ms | Image opacity and tiny scale settle; no aggressive directional movement |
| Add to bag success | 280ms | Immediate state acknowledgement; no artificial loading delay |
| Wishlist | 190ms | Small tactile scale/color response, no large celebration |
| Cart removal | 340ms | Row opacity/transform exit with a reserved local exit state |
| Price values | 240ms | Subtle opacity emphasis; no number-counting animation |
| Product-grid result change | 360ms | One result-region transition, no per-card entrance cascade |
| Confirmation | 650ms total | Surface, checkmark, heading, then order details; page remains usable immediately |
| Error/empty/404 | 420ms | One coordinated entrance, calm recovery hierarchy |

## Reduced motion

`prefers-reduced-motion: reduce` removes movement and compresses timing while preserving opacity, color, and state clarity. Hover-only motion remains gated behind fine-pointer media queries.

## Rejected animations

The second pass rejects scroll-jacking, parallax, animated gradients, continuous JavaScript loops, fake network delays, full-screen spinners for local state, per-card page-load cascades, giant wishlist celebrations, product rotation, and any animation that hides a static layout defect.
