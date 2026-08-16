# TechStore Design System

## 1. Design Direction

TechStore is a premium Apple-inspired ecommerce storefront.

The design should communicate:

- Premium technology
- Simplicity
- Precision
- Trust
- Product quality
- Calm confidence
- Strong visual hierarchy

The interface should feel restrained rather than decorative. Every visual element must have a purpose.

**Core principle:**
> Let the product, typography, whitespace, and hierarchy do the work.

Do not introduce visual noise merely to make a page feel "designed."

---

# 2. Design Philosophy

## 2.1 Minimal, Not Empty

Whitespace is an intentional design element.

Use generous spacing around:

- Hero sections
- Product imagery
- Major headings
- Product grids
- Checkout sections
- Footer groups

Avoid excessive cards, borders, shadows, gradients, and decorative elements.

## 2.2 Product First

Product imagery is the primary visual focus.

The UI should support the product rather than compete with it.

Product cards should prioritize:

1. Image
2. Product name
3. Short description
4. Price
5. Availability
6. Primary action

## 2.3 Editorial Hierarchy

Large typography and strong whitespace should create the hierarchy.

Use short, confident headings.

Avoid oversized text when it damages readability or mobile layouts.

## 2.4 Consistency Over Novelty

Shared components must look and behave consistently.

Do not create page-specific button styles, card styles, or typography systems unless there is a genuine UX reason.

---

# 3. Color System

The default visual direction is a **white-first neutral system** inspired by premium technology retail.

## 3.1 Core Colors

| Token | Value | Usage |
|---|---|---|
| `--color-background` | `#FFFFFF` | Primary page background |
| `--color-surface` | `#F5F5F7` | Secondary sections, cards, grouped content |
| `--color-surface-elevated` | `#FFFFFF` | Elevated content on neutral backgrounds |
| `--color-text-primary` | `#1D1D1F` | Main headings and important text |
| `--color-text-secondary` | `#6E6E73` | Supporting text and descriptions |
| `--color-text-tertiary` | `#86868B` | Metadata and low-priority information |
| `--color-border` | `#D2D2D7` | Dividers, inputs, subtle borders |
| `--color-border-subtle` | `#E8E8ED` | Very light separation |
| `--color-accent` | `#0071E3` | Primary interactive accent |
| `--color-accent-hover` | `#0077ED` | Hover state |
| `--color-accent-pressed` | `#006EDB` | Pressed state |
| `--color-success` | `#248A3D` | Successful actions and availability |
| `--color-warning` | `#9A6700` | Warnings |
| `--color-error` | `#D70015` | Errors and destructive actions |

## 3.2 Color Rules

### Primary background

Use white for:

- Main storefront pages
- Product detail pages
- Checkout
- Account
- Search

### Secondary surface

Use `#F5F5F7` for:

- Product grouping
- Feature sections
- Comparison areas
- Supporting content
- Empty states

Do not place every component inside a gray card.

### Text

Primary text should be near-black rather than pure black.

Use:

`#1D1D1F`

Secondary information should use:

`#6E6E73`

Do not use light gray text for important content.

### Accent

Use blue sparingly for:

- Links
- Primary CTAs
- Interactive controls
- Selected states
- Important navigation actions

Blue should communicate interaction, not decoration.

---

# 4. Dark Mode

Dark mode is optional unless already implemented.

If implemented, it must use a dedicated semantic palette rather than simply inverting colors.

Suggested foundation:

| Token | Value |
|---|---|
| Background | `#000000` |
| Surface | `#1D1D1F` |
| Elevated surface | `#2C2C2E` |
| Primary text | `#F5F5F7` |
| Secondary text | `#A1A1A6` |
| Border | `#424245` |
| Accent | `#2997FF` |

Dark mode must preserve contrast and hierarchy.

Do not make dark mode a simple filter or inversion.

---

# 5. Typography

## 5.1 Primary Typeface

Use a modern system sans-serif stack.

Preferred:

```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "SF Pro Display",
  "SF Pro Text",
  "Helvetica Neue",
  Arial,
  sans-serif;
```

If SF Pro is unavailable, the system stack should gracefully fall back.

Do not introduce a decorative web font without a clear reason.

---

# 6. Type Scale

Use a restrained responsive type scale.

## Display

Large hero statements.

Desktop:

```text
56px–72px
Line-height: 1.05–1.1
Weight: 600
Letter-spacing: -0.03em
```

Mobile:

```text
36px–48px
Line-height: 1.08
Weight: 600
```

## H1

```text
40px–56px
Line-height: 1.08–1.12
Weight: 600
Letter-spacing: -0.025em
```

## H2

```text
32px–40px
Line-height: 1.12
Weight: 600
Letter-spacing: -0.02em
```

## H3

```text
24px–28px
Line-height: 1.2
Weight: 600
```

## Product title

```text
20px–28px
Line-height: 1.2
Weight: 600
```

## Body

```text
16px
Line-height: 1.5
Weight: 400
```

## Small

```text
14px
Line-height: 1.4
Weight: 400
```

## Caption

```text
12px–13px
Line-height: 1.35
Weight: 400
```

---

# 7. Typography Rules

Avoid excessive font weights.

Preferred hierarchy:

```text
600 = headings
500 = important labels
400 = body
```

Use bold text selectively.

Never make entire sections bold.

Avoid all-caps except for tiny metadata or deliberate labels.

Keep paragraph widths constrained for readability.

Recommended maximum body width:

```text
60–72 characters
```

---

# 8. Spacing System

Use a consistent spacing scale based primarily on multiples of 4.

```text
4px
8px
12px
16px
24px
32px
40px
48px
64px
80px
96px
120px
```

Suggested usage:

| Size | Usage |
|---|---|
| 4 | Icon/text micro spacing |
| 8 | Tight internal spacing |
| 12 | Form/control spacing |
| 16 | Standard component spacing |
| 24 | Card/content spacing |
| 32 | Section internals |
| 48 | Major component separation |
| 64 | Section spacing |
| 80 | Large section spacing |
| 96 | Hero spacing |
| 120 | Major editorial separation |

Do not use arbitrary spacing values when an existing token is appropriate.

---

# 9. Layout

## Container

Use a centered responsive container.

Recommended:

```text
max-width: 1200px–1280px
```

with responsive horizontal padding.

Suggested:

```text
Mobile: 20px
Tablet: 32px
Desktop: 40px
Large desktop: 48px
```

## Grid

Product grids should adapt naturally.

Recommended:

```text
Mobile: 2 columns where appropriate
Tablet: 2–3 columns
Desktop: 3–4 columns
```

Do not force four columns when product cards become too narrow.

---

# 10. Product Imagery

Product imagery is one of the most important parts of the system.

Use:

- High-resolution images
- Consistent aspect ratios
- Neutral backgrounds
- Predictable cropping
- Appropriate object-fit behavior

Preferred:

```css
object-fit: contain;
```

for isolated product imagery.

Do not crop products aggressively.

Gallery images should maintain visual consistency.

---

# 11. Product Cards

Product cards should be visually quiet.

Structure:

```text
Image
Product family/category
Product name
Short description
Price
Availability
Action
```

Avoid excessive decoration.

Cards should not require heavy shadows.

Preferred visual treatment:

- Clean background
- Subtle border when necessary
- Minimal radius
- Strong image
- Clear typography

Hover states should be subtle.

---

# 12. Buttons

## Primary button

Use the accent color.

Characteristics:

- Strong contrast
- Medium-to-high emphasis
- Rounded but not excessively pill-shaped
- Clear label
- Comfortable touch target

Example:

```text
Add to Bag
Buy
Continue to Checkout
```

## Secondary button

Use neutral styling.

Examples:

```text
Learn More
Compare
View Details
```

## Tertiary action

Use a text link where appropriate.

Examples:

```text
View all
Learn more
See details
```

Do not make every action a filled button.

---

# 13. Border Radius

Use restrained rounding.

Suggested:

```text
Small controls: 8px
Cards: 12px
Large surfaces: 16px
Images/hero panels: 16px–24px
```

Avoid excessive "bubble UI."

---

# 14. Shadows

Shadows should be subtle and rare.

Prefer borders and tonal contrast over heavy elevation.

Avoid:

- Large dark shadows
- Neon glows
- Excessive glassmorphism
- Floating cards everywhere

The storefront should feel refined, not like a gaming dashboard designed during a caffeine incident.

---

# 15. Navigation

The header should be compact and calm.

Desktop:

```text
Logo
Products
Collections
Search
Account
Bag
```

Mobile:

```text
Logo
Search
Bag
Menu
```

The mobile menu should use the same typography and spacing system as the rest of the site.

---

# 16. Footer

The footer should be information-dense but visually quiet.

Use grouped columns:

```text
Shop & Learn
Services
Apple Store
For Business
Values
Support
```

Use:

- Small readable typography
- Generous vertical spacing
- Subtle dividers
- Clear hierarchy

On mobile, groups may collapse into accordions.

---

# 17. Forms

Forms must be extremely clear.

Inputs should have:

- Visible labels
- Clear focus states
- Comfortable height
- Sufficient contrast
- Helpful error messages

Recommended control height:

```text
44px–52px
```

Touch targets should generally be at least:

```text
44px × 44px
```

---

# 18. Checkout Design

Checkout should reduce cognitive load.

Use a clear structure:

```text
Contact
Delivery
Payment
Order Summary
Confirmation
```

Keep the order summary visually persistent where practical on desktop.

On mobile, place the summary in an intuitive expandable or stacked position.

Avoid unnecessary distractions.

---

# 19. States

Every interactive component should define:

```text
Default
Hover
Focus
Pressed
Disabled
Loading
Success
Error
Empty
```

Focus must always be visible.

Do not use color alone to communicate state.

---

# 20. Motion

Motion should be subtle and functional.

Recommended:

```text
150ms–250ms
```

Use motion for:

- Hover
- Menu transitions
- Cart feedback
- Gallery changes
- Accordions
- Toasts

Respect:

```css
prefers-reduced-motion
```

Reduced-motion users should receive an equally usable interface.

---

# 21. Accessibility

Minimum expectations:

- WCAG-conscious contrast
- Semantic HTML
- Proper labels
- Keyboard navigation
- Visible focus
- Correct heading hierarchy
- Meaningful alt text
- Accessible buttons
- Accessible navigation
- Accessible forms
- Accessible errors

Do not rely on visual styling alone to communicate meaning.

---

# 22. Responsive Design

Design mobile-first.

Breakpoints should be determined by layout needs rather than arbitrary device names.

Primary QA widths:

```text
390px
768px
1024px
1440px
```

The design must not depend on a specific viewport.

---

# 23. Content Design

Product copy should be concise and informative.

Prioritize:

1. Product name
2. Core benefit
3. Key specification
4. Price
5. Availability
6. Compatibility
7. CTA

Avoid:

- Marketing fluff
- Repeated adjectives
- Huge paragraphs
- Fake technical claims
- Unnecessary jargon

---

# 24. Iconography

Use one coherent icon system.

Icons should:

- Have consistent stroke weight
- Have consistent dimensions
- Align with text
- Be accessible
- Never replace meaningful labels when the action would otherwise be unclear

For icon-only controls, provide accessible names.

---

# 25. Visual Priority

Every page should follow approximately:

```text
Primary:
Product / task

Secondary:
Supporting information

Tertiary:
Navigation / metadata
```

If everything is visually loud, nothing is important.

---

# 26. Design Rules

### DO

- Use whitespace
- Use strong typography
- Use high-quality imagery
- Keep interactions obvious
- Keep layouts calm
- Keep components consistent
- Prioritize readability
- Make mobile excellent
- Use color intentionally

### DON'T

- Add gradients without purpose
- Add excessive shadows
- Overuse rounded cards
- Use tiny text
- Use decorative animations
- Use inconsistent spacing
- Use arbitrary colors
- Overload pages with UI
- Sacrifice accessibility for visual similarity

---

# 27. Design Tokens

The implementation should centralize the design system into reusable tokens.

At minimum:

```text
Colors
Typography
Spacing
Radius
Shadows
Breakpoints
Container widths
Control heights
Motion durations
```

Do not scatter hard-coded design values throughout components when a shared token is appropriate.

---

# 28. Definition of Visual Quality

A page passes visual review when:

- The hierarchy is immediately understandable.
- Product imagery dominates appropriately.
- Typography is readable.
- Spacing feels intentional.
- CTAs are obvious.
- Navigation is predictable.
- Components are consistent.
- Mobile layout is equally polished.
- Accessibility is not compromised.
- Nothing looks decorative merely for decoration's sake.

The desired impression is:

**Premium. Calm. Precise. Useful.**

Not:

**Busy. Glossy. Over-designed.**
