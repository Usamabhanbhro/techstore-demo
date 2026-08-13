/**
 * Reconstruct a GitHub Pages deep link after the static 404 document returns
 * the browser to the Vite base path. The original in-app URL is intentionally
 * carried in one query parameter rather than guessed from the deployment host.
 */
export function restorePagesDeepLink(search: string, basePath: string): string | null {
  const route = new URLSearchParams(search).get("p");
  if (!route || !route.startsWith("/") || route.startsWith("//")) return null;

  const normalizedBase = basePath === "/" ? "" : basePath.replace(/\/$/, "");
  return `${normalizedBase}${route}`;
}

/** Build a tRPC endpoint from an optional deploy-time API origin. */
export function resolveTrpcUrl(apiOrigin?: string): string {
  const normalizedOrigin = apiOrigin?.trim().replace(/\/+$/, "");
  return normalizedOrigin ? `${normalizedOrigin}/api/trpc` : "/api/trpc";
}
