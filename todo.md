# Usamabhanbhro E-commerce Showcase Checklist

- [x] Read the complete instruction attachment, including the Pakistani payment-rails extension.
- [x] Audit the existing repository, source tree, metadata, assets, documentation, and dependencies.
- [x] Define the original Usamabhanbhro visual identity, copy system, catalog model, route map, and demo-mode boundaries.
- [x] Remove every intentional predecessor-brand reference from source, docs, metadata, filenames, routes, constants, and assets.
- [x] Implement the homepage, shop, collection index/detail, product detail, search, cart, checkout, confirmation, account, wishlist, journal index/article, about, contact, and 404 routes.
- [x] Add reusable mock commerce contracts and localStorage-backed cart and wishlist state.
- [x] Add functional demo search, filters, sorting, quick view, quantity controls, newsletter validation, contact success states, and navigation targets.
- [x] Add a provider-agnostic Pakistani payment abstraction with demo adapters for JazzCash, Easypaisa, bank transfer, and COD.
- [x] Add safe demo checkout and confirmation flows that never collect or transmit real payment information.
- [x] Update metadata, favicon references, README, project naming, and client-facing documentation for Usamabhanbhro.
- [x] Remove obsolete files, generated artifacts, screenshots, secrets, temporary files, and unused dependencies where safe.
- [x] Run type check, lint, tests, production build, route smoke tests, responsive verification, and repository-wide legacy brand search.
- [x] Initialize a clean Git history and create/push the private `e-commerce` GitHub repository.
- [x] Save the final project checkpoint and report the repository URL, route list, verification results, commit summary, and limitations.

## Full-stack extension

- [x] Read the complete extension attachment and audit the current static project architecture.
- [x] Upgrade the project with backend, database, authentication, and file-storage capabilities where required.
- [x] Expand the catalog to 30–50 original products across 6–8 collections and multiple premium categories.
- [x] Add structured catalog fields, related-product links, featured/new-arrival/best-seller/editorial flags, stock, variants, and PKR pricing.
- [ ] Generate and wire multiple verified original product and editorial assets so the catalog and homepage do not rely on a single fallback image.
- [x] Centralize product, collection, editorial, and image data behind service abstractions.
- [x] Populate the homepage, shop, collections, product pages, search, and related/recently-viewed content from the expanded catalog.
- [x] Add persistence-ready ProductService, CollectionService, CartService, WishlistService, OrderService, AccountService, and PaymentService boundaries.
- [x] Implement server APIs for products, collections, cart, orders, payments, authentication, account data, and wishlist data; catalog procedures support typed search and discovery filters.
- [x] Replace the remaining in-memory CartService with a durable saved-cart repository and add server-side product validation to durable wishlist operations; retain the safe local fallback during transient database unavailability.
- [x] Add hybrid anonymous-local and authenticated-server wishlist synchronization with safe merge behavior.
- [x] Persist authenticated order history through the managed database repository, with a documented safe fallback if the managed endpoint experiences a temporary DNS outage.
- [x] Add SadaPay and NayaPay providers while preserving JazzCash, Easypaisa, bank transfer, and COD through the common interface.
- [x] Add server-side mock payment boundaries, total recalculation, idempotency, duplicate prevention, and safe provider webhook placeholders.
- [x] Add `PAYMENT_MODE=mock` or an equivalent sandbox configuration and keep payment credentials out of the frontend and repository.
- [x] Prepare README, safe environment-boundary documentation, tests, security scans, and GitHub Pages-ready deployment configuration without auto-publishing.
- [x] Run full-stack checks, route journeys, responsive QA, production builds, and deployment-readiness validation.
- [ ] Save the final full-stack checkpoint and report implementation status, deployment guidance, and limitations.
- [ ] Generate a cohesive Higgsfield image set for bags, small leather goods, accessories, jewellery, travel, home, eyewear, and editorial modules; upload and wire the assets into catalog and homepage media references.
- [x] Re-verify the managed-storage/media recovery at a true mobile viewport on homepage, collection, and product-gallery routes, with fresh image requests succeeding.
- [ ] Validate and document the recovered DNS-dependent paths individually: Higgsfield connector, Forge presign/upload, managed media proxy delivery, and managed database connectivity. The first four paths are verified; the managed database runner remains externally unavailable and is documented in `docs/verification/dns-recovery.md`.
