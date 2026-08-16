# Deployment verification

## Public GitHub Pages smoke

- Public root: https://usamabhanbhro.github.io/techstore-demo/
- Root page loaded successfully with the TechStore shell, navigation, hero content, product sections, footer, and repository-scoped links.
- Rendered local image URLs use `/techstore-demo/sites/...`, confirming the Vite base path is applied to public assets.
- Direct nested route: https://usamabhanbhro.github.io/techstore-demo/products/iphone-17-pro
- The nested product route loaded successfully through the committed `404.html` SPA fallback. Product imagery, breadcrumbs, variant controls, add-to-bag action, wishlist action, and related products rendered with `/techstore-demo/`-prefixed URLs.

The first Pages workflow failed during pnpm setup because the workflow declared a version that duplicated the repository `packageManager` field. That was corrected in commit `f64ab80`, after which the workflow completed successfully.

