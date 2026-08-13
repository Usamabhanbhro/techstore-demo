# GitHub Pages static demo

The repository includes a manual-only GitHub Actions workflow at `.github/workflows/github-pages.yml`. It builds `dist/public` with the `/e-commerce/` base path and uploads a reviewable static artifact. The workflow does **not** run on push. A repository administrator must enable GitHub Pages and intentionally start the workflow with **publish** selected after reviewing the artifact.

> GitHub Pages can host the static React storefront, catalog, original visual assets, local cart, and anonymous wishlist state. It cannot run the Express, tRPC, OAuth, database, or server-side payment layers included in this project.

For full-stack production deployment, publish the managed project through the platform’s normal release controls or use a Node-compatible host with environment-managed database and OAuth configuration. Do not place credentials in GitHub Actions variables, client bundles, or the repository.
