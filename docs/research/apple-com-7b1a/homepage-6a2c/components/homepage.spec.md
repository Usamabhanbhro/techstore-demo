# Apple Homepage Specification

## Overview

- Target file: `client/src/pages/Home.tsx`
- Shared shell: `client/src/components/Storefront.tsx`
- Styles: `client/src/index.css`
- Section screenshot: `docs/design-references/apple-com-7b1a/homepage-6a2c/`
- Interaction model: responsive, click-driven mobile navigation, click-driven entertainment carousel, hover/focus-driven link and card states, scroll-driven sticky navigation.

## DOM structure

The page contains a sticky global navigation header, a main element, a full-width campaign hero, two full-width product hero sections, a responsive two-column promo grid, an entertainment gallery with tabs and play control, legal notes, and a footer with grouped navigation.

## Exact visual direction

The page uses a white base, Apple-style near-black text (`#1d1d1f`), soft gray hero surfaces, blue CTA pills (`#0071e3`), a dark entertainment section, centered marketing typography, generous vertical spacing, edge-to-edge product imagery, 44px desktop navigation, and a 1024px-centered content max-width within promo tiles.

## States and behaviors

The mobile menu trigger toggles an overlay drawer. The entertainment gallery tab buttons swap the active slide and selected indicator. The play button toggles a local autoplay interval. Navigation controls remain keyboard reachable and retain visible focus styles. Promo cards use subtle image scale on hover.

## Per-state content

The gallery includes MLS on Apple TV, Sabrina Carpenter: The Zane Lowe Interview, Hello Kitty Island Adventure, F1 on Apple TV, Programs, and additional represented entertainment cards. The default active slide is MLS on Apple TV.

## Assets

All product imagery is stored under `public/sites/apple-com-7b1a/homepage-6a2c/`. The primary assets are `education-hero.jpg`, `iphone-family.jpg`, `macbook-air.jpg`, `ipad-air.jpg`, `macbook-pro.jpg`, `apple-watch.jpg`, and `ipad-pro.jpg`.

## Text content

Use the visible reference copy verbatim for the education campaign, iPhone, MacBook Air, iPad Air, MacBook Pro, Apple Watch Series 11, iPad Pro, Apple Trade In, Apple Card, and Endless entertainment sections.

## Responsive behavior

At widths below 860px, desktop nav links collapse behind the menu trigger, hero type scales down, promo tiles become a single column, and footer groups become accordions. At widths below 560px, side padding reduces to 18px, product imagery height follows the image aspect ratio, and gallery controls remain horizontally scrollable without wrapping.
