# Deployment verification

## Public GitHub Pages smoke

- Public root: https://usamabhanbhro.github.io/techstore-demo/
- Root page loaded successfully with the TechStore shell, navigation, hero content, product sections, footer, and repository-scoped links.
- Rendered local image URLs use `/techstore-demo/sites/...`, confirming the Vite base path is applied to public assets.
- Direct nested route: https://usamabhanbhro.github.io/techstore-demo/products/iphone-17-pro
- The nested product route loaded successfully through the committed `404.html` SPA fallback. Product imagery, breadcrumbs, variant controls, add-to-bag action, wishlist action, and related products rendered with `/techstore-demo/`-prefixed URLs.

The first Pages workflow failed during pnpm setup because the workflow declared a version that duplicated the repository `packageManager` field. That was corrected in commit `f64ab80`, after which the workflow completed successfully.


## 2026-08-16 audit release verification

Commit `bb0c25b` was pushed to `master`. GitHub Actions run `31946514976` completed successfully: the static storefront build, type-check, tests, Pages artifact upload, and Pages deployment all passed. The only workflow annotation was the repository’s existing Node.js 20 action deprecation notice.

The public homepage at https://usamabhanbhro.github.io/techstore-demo/ loaded with the updated Skip to content link, navigation, Privacy/Terms footer destinations, and sitemap asset link. The public Terms route rendered with the last-updated date and transparent demo limitations. Public `robots.txt` returned the expected allow/disallow directives and sitemap URL. Public `sitemap.xml` returned the truthful public route inventory, including `/privacy` and `/terms` and excluding cart, checkout, account, wishlist, and order-confirmation routes.
