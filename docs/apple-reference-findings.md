# Apple reference findings

Observed on https://www.apple.com/ on August 17, 2026.

## Global navigation

Apple uses a compact sticky global navigation with a product-family sequence: Apple, Store, Mac, iPad, iPhone, Watch, Vision, AirPods, TV & Home, Entertainment, Accessories, and Support. Search and shopping bag are icon-oriented controls with accessible labels and visible counts. The navigation stays visually quiet and the homepage hierarchy begins immediately below it.

## Homepage hierarchy

The homepage uses strong product/editorial modules with concise headings and short supporting copy. Primary actions are paired as a filled “Learn more” or shopping action plus a quieter secondary action. Product imagery is allowed to dominate the surface; supporting copy stays constrained and centered or anchored to the image depending on the module.

## Adaptation decision for TechStore

TechStore already follows the useful underlying pattern: compact sticky navigation, visible search and bag controls, product-family links, restrained CTA pairing, and product-led editorial sections. Do not copy Apple branding or content. Keep the existing TechStore design tokens and local demo disclosure, while improving semantics, focus behavior, route-aware metadata, and commerce recovery where the audit identifies gaps.

## Source

[Apple homepage](https://www.apple.com/)

## Product shopping surface

Observed on https://www.apple.com/shop/buy-iphone/.

Apple presents a clear “Shop iPhone” heading, quick section navigation (models, shopping guides, savings, accessories, setup/support), product-family cards, a “Take a closer look” affordance, visible variant/color cues, starting price, financing language, and a direct buy action. The hierarchy answers what the product family is, what options exist, what it costs, and how to continue. It also exposes specialist/store support without letting support controls dominate the purchase path.

## Adaptation decision for TechStore

TechStore’s existing product pages already expose product name, configuration, price, availability, delivery estimate, details, compatibility, included items, and add-to-bag. Preserve that structure. The highest-value remaining adaptations are semantic and state-related: associate errors with inputs, expose selected comparison tabs, keep search query state synchronized with the URL, and ensure menu close restores focus. Avoid adding financing, store inventory, or specialist claims that the local demo cannot truthfully support.

## Search surface

Observed on https://www.apple.com/us/search.

Apple presents a dedicated search result surface with a focused text input exposed as a combobox, an explicit Submit control, and category tabs for Explore, Accessories, Support, and Find a Store. The empty state is specific (“Sorry, no matches were found. Please try a different search.”) and the footer remains available for recovery and orientation.

## Adaptation decision for TechStore

TechStore’s search route already provides a focused input, result count, category filters, clear action, and empty-state recovery. Keep the local catalog model, but synchronize submitted query state with the URL and use an explicit form/submit interaction so shared navigation and direct links behave consistently. Do not add Apple-only categories such as store locator or support search unless the local data can support them truthfully.
