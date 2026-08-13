# Oroton Homepage Clone — Page Topology

## Route map

| Source URL | Destination route | Page key | Notes |
|---|---|---|---|
| `https://oroton.com/` | `/` | `home-6f11` | Single-page homepage recreation |

## Section order

1. Utility announcement strip.
2. Primary header with category navigation, centered wordmark, and account/search/bag actions.
3. Full-bleed hero campaign module for the current seasonal edit.
4. Secondary campaign link rail with three editorial destination tiles.
5. “New In” product discovery row.
6. “Campaign in Motion” video-inspired editorial module.
7. Supporting editorial story grid with Everyday Spring 25, Spring Preview, and Everyday Denim.
8. Social journal / Instagram-style content rail.
9. Newsletter signup and multi-column footer.

## Layering and scroll model

The page uses a standard document scroll. The header remains visible through the opening viewport and becomes more compact after the utility strip scrolls away; no modal is required for the default state. Editorial imagery is contained within its module and should not introduce parallax that changes reading order.

## Dependencies

This recreation is static and client-only. It uses local React state for the mobile drawer, dismissal, newsletter validation, and footer disclosures. No backend, checkout, authentication, or third-party data dependency is required.

