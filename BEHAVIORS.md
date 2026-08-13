# Oroton Homepage Clone — Behavior Record

## Observed source evidence

The public page exposes editorial collection links for **New Everyday Collection**, **Father's Day Gift Guide**, **New Bags**, **Shop Frank Green x Oroton**, **New Spring Collection**, and **New Mini Bags**. It also exposes a “Campaign in Motion” module for “Spring 25 Campaign, Uncharted Beauty,” plus editorial story blocks for the Everyday Spring 25 Collection, Spring Preview, and Everyday Denim.

## Recreated behavior

| Element | State A | State B | Trigger | Faithful implementation |
|---|---|---|---|---|
| Header | Full desktop navigation with centered wordmark | Compact mobile bar with menu button | Viewport breakpoint | CSS breakpoint at 760px; mobile drawer toggles via React state |
| Mobile menu | Hidden | White drawer from top with category links | Menu button click | 200ms opacity/translate transition; Escape closes |
| Product tiles | Image, name, color, price | Image lifts slightly and CTA becomes more opaque | Hover/focus | `transform` and opacity only, 180ms ease-out |
| Editorial tiles | Static image and caption | Caption underline/opacity shift | Hover/focus | Underline and opacity transition |
| Announcement strip | Visible and scroll-stable | Dismissed | Close button click | React state hides the strip for the current session |
| Newsletter form | Empty email field | Validated success or inline error | Submit | Client-side validation only; no email is transmitted |
| Footer accordions | Expanded on desktop | Collapsed on mobile | Disclosure click | Native button controls with `aria-expanded` |

## Responsive notes

- **Desktop (1440px):** three-column global navigation around a centered wordmark; full-bleed campaign and editorial imagery; four-up new-in product row.
- **Tablet (768px):** reduced navigation labels, two-up imagery/product composition, and tighter section padding.
- **Mobile (390px):** hamburger navigation, one-column editorial sections, two-up product strip that can horizontally scroll, smaller headline scale, and stacked newsletter/footer content.

