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
OUT = PROJECT / "client/src/data/appleRouteAssetSets.ts"
BASE = "https://www.apple.com"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131 Safari/537.36"
MAX_ASSETS = 5
ASSET_DIR.mkdir(parents=True, exist_ok=True)


def slug(route: str, number: int) -> str:
    return f"{number:03d}-{re.sub(r'[^a-z0-9]+', '-', route.strip('/').lower()).strip('-') or 'home'}"


def candidates(html: str, url: str):
    soup = BeautifulSoup(html, "html.parser")
    seen = set()
    nodes = list(soup.select("img[src], img[data-src], img[data-image-src], source[srcset], source[data-srcset], video[poster]"))
    for node in nodes:
        raw = node.get("src") or node.get("data-src") or node.get("data-image-src") or node.get("srcset") or node.get("data-srcset") or node.get("poster") or ""
        for part in raw.split(","):
            value = part.strip().split(" ")[0]
            if not value or value.startswith("data:"):
                continue
            absolute = urljoin(url, value)
            parsed = urlparse(absolute)
            path = parsed.path.lower()
            if parsed.netloc and not parsed.netloc.endswith("apple.com"):
                continue
            if any(token in path for token in ("logo", "icon", "favicon", "spinner", "loading", "social")):
                continue
            if absolute not in seen:
                seen.add(absolute)
                yield absolute


def ext(response: requests.Response, url: str) -> str:
    content_type = response.headers.get("content-type", "").split(";")[0].strip()
    guessed = mimetypes.guess_extension(content_type) if content_type else None
    if guessed in {".jpe", ".jpeg"}:
        return ".jpg"
    if guessed in {".jpg", ".png", ".webp", ".avif", ".gif"}:
        return guessed
    suffix = Path(urlparse(url).path).suffix.lower()
    return suffix if suffix in {".jpg", ".png", ".webp", ".avif", ".gif"} else ".bin"


session = requests.Session()
session.headers.update({"User-Agent": UA})
summary_rows = [json.loads(line) for line in SUMMARY.read_text().splitlines() if line.strip()]
output: dict[str, list[str]] = {}
for index, row in enumerate(summary_rows, 1):
    route = row["route"]
    route_slug = slug(route, row["number"])
    html_path = ORIGINAL_DIR / f"{route_slug}.html"
    html = html_path.read_text(errors="ignore") if html_path.exists() else ""
    mapped: list[str] = []
    used_digests: set[str] = set()
    for asset_index, candidate in enumerate(candidates(html, row["original_url"]), 1):
        if len(mapped) >= MAX_ASSETS:
            break
        try:
            response = session.get(candidate, timeout=25)
            content_type = response.headers.get("content-type", "")
            if response.status_code != 200 or not content_type.startswith("image/") or len(response.content) <= 2000:
                continue
            digest = hashlib.sha1(response.content).hexdigest()[:10]
            if digest in used_digests:
                continue
            used_digests.add(digest)
            filename = f"{route_slug}-{asset_index}-{digest}{ext(response, candidate)}"
            target = ASSET_DIR / filename
            if not target.exists():
                target.write_bytes(response.content)
            mapped.append(f"/sites/apple-com-7b1a/route-assets/{filename}")
        except requests.RequestException:
            continue
    output[route] = mapped
    print(f"{index}/{len(summary_rows)} {route} assets={len(mapped)}")

lines = [
    "// Generated from the first five distinct source images in each captured Apple route.",
    "export const appleRouteAssetSets: Record<string, string[]> = ",
    json.dumps(output, ensure_ascii=False, indent=2),
    ";",
    "",
]
OUT.write_text("\n".join(lines))
print(f"routes={len(output)} mapped={sum(bool(v) for v in output.values())} assets={sum(len(v) for v in output.values())} output={OUT}")
