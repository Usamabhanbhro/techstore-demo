# Usamabhanbhro commerce domain

## Purpose and scope

The application is an **original, demo-mode premium ecommerce showcase**. It uses a complete presentation catalog while retaining explicitly mock commerce operations. Product and collection content is centralized so the storefront, database boundary, tests, and future CMS can share one vocabulary.

| Domain | Source of truth now | Persistence-ready target | Demo boundary |
| --- | --- | --- | --- |
| Catalog | `client/src/lib/catalog.ts` | Product/collection records and a future CMS connector | Public read data remains available without login |
| Cart | Browser state | `CartService` plus server-cart procedures | Local cart continues for anonymous visitors |
| Wishlist | Browser state | Authenticated `WishlistService` records | Local favourites merge only after an authenticated session begins |
| Orders | Confirmation snapshot | `OrderService` and order-line records | Orders are labelled demo orders and never cause fulfilment |
| Payments | Provider registry | Server-authoritative `PaymentService` | `PAYMENT_MODE=mock`; no real money, credentials, or payment details |
| Account | Manus OAuth identity | User profile, address, and order-history records | Authentication uses the managed session, not locally stored passwords |

## Catalog contract

`shared/commerce.ts` describes every product as a `ProductRecord`. The model supports PKR pricing, optional compare-at pricing, multiple collection assignments, materials, variants, stock, ratings, image roles, merchandising flags, and explicit related-product IDs. A product image is a `ProductMedia` object, allowing centrally managed alt text and a stable separation of product, detail, and editorial frames.

## Service boundaries

| Service | Public operations | Protected operations | Security rule |
| --- | --- | --- | --- |
| ProductService | list, detail, search, related | catalogue management later | Do not expose inventory internals beyond display stock state |
| CollectionService | list, detail, featured items | collection management later | Resolve product assignments on the server |
| CartService | price preview | saved-cart synchronization | Recalculate all prices from trusted product records |
| WishlistService | local preview | list, add, remove, merge | Scope records to the authenticated owner only |
| OrderService | confirmation lookup | create, list owned, detail owned | Reject client-supplied prices and isolate orders by user ID |
| AccountService | session state | profile and address CRUD | OAuth identity is authoritative; never expose credentials or internal IDs unnecessarily |
| PaymentService | provider metadata | create, verify, cancel mock intents | Server validates total, stores idempotency keys, and never accepts raw payment data |

## Payment architecture

Each provider implements the same lifecycle: `initialize`, `verify`, `cancel`, and `refund`. The showcase exposes JazzCash, Easypaisa, SadaPay, NayaPay, bank transfer, and cash on delivery. `mock` mode creates only simulated references and test outcomes; it does not redirect externally, move funds, or collect any payment credential.

> Production payment enablement is intentionally outside this implementation. A live rollout requires official provider documentation, server-side secrets, signed callback validation, reconciliation, idempotent order settlement, and an audited operational review.

## Delivery boundary

The managed full-stack deployment is the runnable demonstration environment. A separate GitHub Pages workflow will be included for the **static catalog preview only**; authenticated API calls and server-side mock payment operations require a backend host and will display clear fallback guidance when unavailable.
