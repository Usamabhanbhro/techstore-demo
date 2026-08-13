# Header Specification

## Overview

- Target file: `client/src/components/sites/oroton-com-8a42/home-6f11/OrotonHeader.tsx`
- Section screenshot: source screenshot unavailable; evidence recovered from public HTML and rendered text.
- Interaction model: scroll-aware, click-driven mobile drawer, hover-driven link emphasis.

## DOM structure

`header.site-header` contains the utility strip, a main row with mobile menu button, left nav, centered wordmark, and right utility links, followed by a mobile drawer.

## Exact style direction

White or near-white background, charcoal `#161616` text, 1px bottom rule, uppercase labels at 10–11px with 0.14em letter spacing. The wordmark is centered and uses a tracked serif treatment. Desktop main row is 74px tall; the utility strip is 31px.

## States and behaviors

The header begins in its full-height state. On scroll past 20px, it adds a compact state with a subtle shadow and reduced vertical padding. On mobile, the menu button toggles a top drawer; Escape and the close button return it to the hidden state.

## Assets and text

Wordmark text: `OROTON`. Primary labels: `WOMEN`, `MEN`, `BAGS`, `ACCESSORIES`, `NEW`, `JOURNAL`. Utilities: `SEARCH`, `ACCOUNT`, `BAG (0)`.

## Responsive behavior

Desktop shows category and utility links. Tablet trims the nav. Mobile hides desktop links, shows a hamburger, and displays the drawer as a single-column list.

