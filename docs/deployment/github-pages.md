# GitHub Pages static demo

The repository validates every push and pull request to `main` through `.github/workflows/ci.yml`. That workflow installs the lockfile-pinned dependencies, runs type checking, linting, unit tests, the full-stack build, and the Pages-target build. The Pages workflow in `.github/workflows/github-pages.yml` repeats the validation gates before it uploads `dist/public` and permits a deliberate GitHub Pages deployment.

The static build uses the `/e-commerce/` Vite base path. Its `404.html` returns a direct nested URL to the application shell, and the client restores the requested product, collection, account, journal, or checkout route before Wouter resolves it. This preserves local development routing while allowing Pages deep links such as `/e-commerce/products/atelier-tote`.

> GitHub Pages can host the static React storefront, catalog, original visual assets, local cart, and anonymous wishlist state. It cannot run the Express, tRPC, OAuth, database, or server-side payment layers included in this project.

If a separately deployed API is available, set the public build variable `VITE_API_URL=https://api.example.com` during the Pages build. The browser will call `${VITE_API_URL}/api/trpc`; no secret or payment key belongs in that value. Leave it unset for the managed full-stack runtime, which uses the relative `/api/trpc` endpoint.

For full-stack production deployment, publish the managed project through the platform’s normal release controls or use a Node-compatible host with environment-managed database and OAuth configuration. Do not place credentials in GitHub Actions variables, client bundles, or the repository.

## Verification record

The final release suite completed after the route-restoration addition: TypeScript check, lint, the **14-test** Vitest suite, the full-stack build, and the Pages-target build all passed. The generated Pages artifact includes the `404.html` redirect bridge. The live development shell was also visually checked at the homepage and at `/products/meridian-frame-tote`, a real catalog route. Both resolved with the editorial layout, shared navigation, and managed product imagery. The intentionally nonexistent `/products/atelier-tote` correctly resolved to the styled in-app 404 state and was not used as release evidence.
