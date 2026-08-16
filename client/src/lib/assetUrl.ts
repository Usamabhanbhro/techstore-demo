/**
 * Resolve a local public asset for both the full-stack root and the
 * repository-scoped GitHub Pages deployment.
 */
export function assetUrl(path: string): string {
  if (/^(?:https?:|data:|blob:)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL === "/"
    ? ""
    : import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
