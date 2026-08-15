from __future__ import annotations

import hashlib
import json
import mimetypes
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
EVIDENCE = ROOT / "route-evidence"
ORIGINAL_DIR = EVIDENCE / "original"
SUMMARY = EVIDENCE / "route-summary.jsonl"
PROJECT = ROOT.parents[2]
ASSET_DIR = PROJECT / "client/public/sites/apple-com-7b1a/route-assets"
OUT = PROJECT / "client/src/data/appleRouteAssets.ts"
BASE = "https://www.apple.com"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131 Safari/537.36"
ASSET_DIR.mkdir(parents=True, exist_ok=True)


def slug(route: str, number: int) -> str:
    return f"{number:03d}-{re.sub(r'[^a-z0-9]+', '-', route.strip('/').lower()).strip('-') or 'home'}"


def candidates(html: str, url: str):
    soup = BeautifulSoup(html, "html.parser")
    seen = set()
    nodes = list(soup.select("img[src], img[data-src], img[data-image-src], source[srcset], source[data-srcset]"))
    for node in nodes:
        raw = node.get("src") or node.get("data-src") or node.get("data-image-src") or node.get("srcset") or node.get("data-srcset") or ""
        raw = raw.split(",")[0].strip().split(" ")[0]
        if not raw or raw.startswith("data:"):
            continue
        absolute = urljoin(url, raw)
        parsed = urlparse(absolute)
        path = parsed.path.lower()
        if parsed.netloc and not parsed.netloc.endswith("apple.com"):
            continue
        if any(token in path for token in ("logo", "icon", "favicon", "spinner", "loading", "social")):
            continue
        if absolute not in seen:
            seen.add(absolute)
            yield absolute


def ext_from_response(response: requests.Response, url: str) -> str:
    content_type = response.headers.get("content-type", "").split(";")[0].strip()
    ext = mimetypes.guess_extension(content_type) if content_type else None
    if ext in {".jpe", ".jpeg"}:
        return ".jpg"
    if ext in {".jpg", ".png", ".webp", ".avif", ".gif"}:
        return ext
    suffix = Path(urlparse(url).path).suffix.lower()
    return suffix if suffix in {".jpg", ".png", ".webp", ".avif", ".gif"} else ".bin"

session = requests.Session()
session.headers.update({"User-Agent": UA})
rows = []
summary_rows = [json.loads(line) for line in SUMMARY.read_text().splitlines() if line.strip()]
for index, row in enumerate(summary_rows, 1):
    route_slug = slug(row["route"], row["number"])
    html_path = ORIGINAL_DIR / f"{route_slug}.html"
    html = html_path.read_text(errors="ignore") if html_path.exists() else ""
    local_path = None
    source_url = None
    for candidate in candidates(html, row["original_url"]):
        try:
            response = session.get(candidate, timeout=30)
            content_type = response.headers.get("content-type", "")
            if response.status_code == 200 and content_type.startswith("image/") and len(response.content) > 2000:
                digest = hashlib.sha1(response.content).hexdigest()[:10]
                ext = ext_from_response(response, candidate)
                filename = f"{route_slug}-{digest}{ext}"
                (ASSET_DIR / filename).write_bytes(response.content)
                local_path = f"/sites/apple-com-7b1a/route-assets/{filename}"
                source_url = candidate
                break
        except requests.RequestException:
            continue
    rows.append((row["route"], local_path, source_url))
    print(f"{index}/{len(summary_rows)} {row['route']} asset={'yes' if local_path else 'no'}", flush=True)

lines = [
    "// Generated from the first real image found in each captured Apple route DOM.",
    "export const appleRouteAssets: Record<string, string> = {",
]
for route, local_path, source_url in rows:
    if local_path:
        lines.append(f"  {json.dumps(route)}: {json.dumps(local_path)},")
lines += ["};", ""]
OUT.write_text("\n".join(lines))
print(f"routes={len(rows)} mapped={sum(bool(path) for _, path, _ in rows)} output={OUT}")
