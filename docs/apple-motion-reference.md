# Apple Motion Reference Findings

## Sources inspected

- [Apple homepage](https://www.apple.com/)
- [Apple Shop iPhone](https://www.apple.com/shop/buy-iphone)

## Observed patterns and TechStore adaptations

| Apple pattern | Why it works | TechStore need | Adaptation |
|---|---|---|---|
| Compact global navigation with search and bag controls | Stable orientation keeps product browsing primary while search and bag remain immediately reachable | TechStore already uses a compact shell and prior accessibility work | Preserve the shell; animate only the search surface and mobile navigation entrance/exit, keeping focus immediate |
| Product-led homepage sections with quiet transitions between large content blocks | Product imagery and hierarchy do most of the work; movement does not compete with the product | TechStore’s homepage already has the same large hero/product rhythm | Avoid scroll-jacking and blanket reveal effects; add only a gallery content crossfade where the content actually changes |
| Product shopping page combines family navigation, category shelves, product cards, and explicit Buy actions | The user can scan at multiple levels without losing the next action | TechStore supports family filters, cards, product detail, and CTA surfaces | Use short result-region transitions and card-state feedback; do not introduce full-screen loaders for local filtering |
| Product cards expose Buy actions and visual selection/state cues | The selected or actionable state is visible without requiring a long explanation | TechStore product cards have hover imagery, quick details, and wishlist controls | Keep existing image hover; add restrained wishlist state feedback and never animate product rotation or large scale |
| Shopping-guide shelves use horizontal or staged discovery rather than a full-screen transition | Information is grouped into meaningful sections and remains interruptible | TechStore uses grids, tabs, and accordions for discovery | Keep native scroll and tabs; animate only local content changes with opacity/transform |
| Search and navigation controls are high-frequency, so their response is immediate | Frequent controls must never feel delayed by decoration | TechStore global search already autofocuses and routes immediately | Use a 150–200ms attached reveal while preserving immediate focus and submit behavior |

## Rejected wholesale copying

The study does not copy Apple branding, pricing, promotional claims, navigation labels, product assets, or unrelated entertainment/service surfaces. It only informs motion principles: compact orientation, product-first hierarchy, locally attached transitions, immediate purchase feedback, and restraint.

## Search surface

Apple’s search page keeps the input, Submit control, category tabs, and empty-state recovery together. The empty result state is direct and actionable rather than theatrical: “Sorry, no matches were found. Please try a different search.” TechStore should preserve instant local search, keep the input focused, and animate only the result-state handoff; the empty state itself should remain still and readable.
