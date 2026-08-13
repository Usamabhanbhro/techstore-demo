# Usamabhanbhro e-commerce showcase

Usamabhanbhro is an original premium fashion-and-objects storefront demonstration. It combines a 36-piece catalog, eight editorial collections, original generated visual assets, a polished client commerce journey, and a full-stack service boundary for future persistence and payments.

> **Demo boundary.** All checkout results, order references, account data, payment outcomes, and stock behavior are simulated. The project does not accept card numbers, merchant credentials, or provider tokens, and it must not be used to collect real payment information.

## Experience and routes

| Route | Experience |
| --- | --- |
| `/` | Editorial landing page with featured pieces, new arrivals, collections, and journal modules |
| `/shop`, `/collections`, `/collections/:slug` | Expanded catalog discovery, collection browsing, category/stock controls, and sorting |
| `/products/:slug`, `/search` | Product dossier, variants, availability, related items, recently viewed, and search states |
| `/cart`, `/checkout`, `/order-confirmation` | Local bag, transparent totals, shipping, provider selection, mock payment result, and confirmation |
| `/account`, `/wishlist` | Managed-session account shell and hybrid local/server wishlist boundary |
| `/journal`, `/about`, `/contact` | Editorial articles and brand content with accessible form states |

## Architecture

The project keeps UI and commerce responsibilities separate. `shared/commerce.ts` defines shared contracts; `client/src/lib/catalog.ts` owns the structured 36-piece inventory and media references; `client/src/lib/commerce.tsx` retains anonymous browser state; `server/services/catalogService.ts`, `server/services/demoCommerce.ts`, and `server/services/commerceServiceBoundaries.ts` establish named Product, Collection, Cart, Wishlist, Account, Order, and Payment façades over the current validated demo adapter. tRPC procedures in `server/routers.ts` provide the application API surface.

| Layer | Role |
| --- | --- |
| React and Wouter | Responsive storefront, route composition, local discovery, and explicit loading/empty/error states |
| tRPC and Express | Typed public catalog APIs plus protected cart, account, address, wishlist, order, and payment procedures |
| Drizzle schema | Products, collections, variants, customers, addresses, wishlists, orders, payment records, and idempotency keys |
| Mock payment service | Server-calculated totals, duplicate-attempt protection, safe provider outcomes, and no real payment rails |
| S3-backed project assets | Original generated product and editorial visuals referenced through centralized catalog data |

## Payment providers

The checkout registry uses a common `PaymentProvider` shape for **JazzCash**, **Easypaisa**, **SadaPay**, **NayaPay**, **manual bank transfer**, and **Cash on Delivery**. Every adapter remains in mock mode. The server-side demo service recalculates the order total from product data, retains an idempotency key for each attempt, and returns clear pending, successful, failed, or cancelled states without contacting a provider.

Production adapters require provider-approved technical documentation, server-side credentials, signature verification, audited webhook handlers, fraud controls, and monitoring. No undocumented endpoint has been invented in this repository.

## Local development

```bash
pnpm install
pnpm dev
```

Run the verification suite with:

```bash
pnpm check
pnpm lint
pnpm test
pnpm build
```

The database schema is ready for migration through the managed database connection:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

Use the platform migration process only after reviewing the generated SQL. Never place `DATABASE_URL`, OAuth credentials, merchant keys, or webhook secrets in source control. See [`docs/configuration/environment.md`](docs/configuration/environment.md) for the safe configuration boundary.

## GitHub Pages static demo

Run `pnpm build:pages` to create a static artifact rooted at `/e-commerce/`. The manual-only GitHub Actions workflow in `.github/workflows/github-pages.yml` uploads this artifact for review and deploys it only when an administrator explicitly selects the **publish** option. See [`docs/deployment/github-pages.md`](docs/deployment/github-pages.md) for the compatibility boundary.

GitHub Pages cannot run the Node server, tRPC APIs, database, OAuth session, or secure payment code. Use it for the visual/catalog demo only; use a Node-compatible environment for the full-stack build.

## Current limitations

The initial managed commerce schema has been applied. Protected address, wishlist, order, and mock-payment services now use durable database repositories when the managed connection is available; the application deliberately falls back to its isolated in-memory demo adapter during a transient database DNS outage, so the showcase remains safe to browse. The browser cart remains local by design, and catalog content is centrally managed in source pending a production catalog-admin workflow.

The payments remain **mock-only**: no provider credential, live collection, signature verification, settlement, or live webhook processing has been activated. A production launch still requires provider-approved server-side adapters, monitoring, fraud controls, stock operations, and an availability-tested managed database connection.
