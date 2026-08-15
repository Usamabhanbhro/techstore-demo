# Apple Homepage Behaviors

## Global navigation

The desktop global navigation remains visible while scrolling and measures approximately 44px high. It presents a compact set of text links and icon controls for search and the shopping bag. Search and bag are button-like anchors. The reference also exposes a mobile navigation variant that should collapse the desktop links into a menu trigger at narrow widths.

## Hero and product sections

The homepage is a long, vertically stacked sequence of large feature sections. Product sections center their headings and CTA pills above product imagery. The first viewport shows a pale gray College, sorted. hero with a centered campaign headline, copy, blue Shop pill, and a collage image. The iPhone and MacBook Air product sections follow with centered headings and large, edge-to-edge product imagery.

## Gallery interaction

Endless entertainment is a horizontally arranged gallery with selectable item triggers and a play control. The visible reference exposes tab-like controls for items 2–9 and a button labelled Play endless entertainment gallery. The implementation will provide a functional local carousel with active item state and play/pause behavior while preserving the visual rhythm of the source.

## CTA states

Primary CTA buttons use solid Apple blue with white text and pill radii. Secondary CTA buttons use white or transparent surfaces with blue text and a thin blue outline. Link CTAs are inline and visually lightweight. Hover/focus equivalents should increase contrast and retain a visible focus ring without altering the overall minimal visual language.

## Responsive behavior

At desktop widths the navigation is horizontal and the promotional grid uses paired tiles. At tablet and mobile widths, tiles stack into a single column, image height becomes proportional to the viewport width, and navigation should collapse to an accessible menu. Headline sizes and section padding reduce at narrow widths while maintaining centered alignment.

## Topology

The page order is: global navigation; College, sorted. campaign hero; iPhone full-width product hero; MacBook Air full-width product hero; paired promo grid for iPad Air, MacBook Pro, Apple Watch Series 11, iPad Pro, Apple Trade In, and Apple Card; Endless entertainment gallery; legal copy; footer.

## Clone QA findings

The locally served asset bundle renders successfully after copying the namespaced files into the scaffold's `client/public` directory. The clone's first viewport now shows the education collage and iPhone family imagery in the same broad centered, full-bleed composition as the reference. Selecting the third entertainment control changes the active slide from MLS on Apple TV to Hello Kitty Island Adventure and updates the eyebrow, title, copy, action label, and visual treatment as intended.
