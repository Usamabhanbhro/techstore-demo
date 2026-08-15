from __future__ import annotations

import json
import re
import subprocess
import time
from pathlib import Path
from urllib.parse import urljoin

from bs4 import BeautifulSoup
import requests

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parents[2]
INVENTORY = PROJECT / "docs/research/apple-com-7b1a/site-inventory/routes.txt"
TRACKING = ROOT / "ROUTE_TRACKING.md"
EVIDENCE = ROOT / "route-evidence"
ORIGINAL_DIR = EVIDENCE / "original"
CLONE_DIR = EVIDENCE / "clone"
SUMMARY_JSONL = EVIDENCE / "route-summary.jsonl"
BASE_ORIGINAL = "https://www.apple.com"
BASE_CLONE = "http://localhost:3000"
USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131 Safari/537.36"

for directory in (ORIGINAL_DIR, CLONE_DIR):
    directory.mkdir(parents=True, exist_ok=True)


def load_routes() -> list[tuple[int, str, str]]:
    routes = []
    for line in INVENTORY.read_text().splitlines():
        match = re.match(r"^\s*(\d+)\.\s+(\S+)\s*(.*)$", line)
        if match:
            number, route, label = match.groups()
            routes.append((int(number), route, label.strip()))
    return routes


def normalized_text(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def parse_dom(html: str, url: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    title = normalized_text(soup.title.get_text(" ") if soup.title else "")
    headings = [normalized_text(node.get_text(" ")) for node in soup.select("h1, h2, h3")]
    links = []
    for node in soup.select("a[href]"):
        links.append(urljoin(url, node.get("href", "")))
    images = []
    for node in soup.select("img[src], source[srcset]"):
        src = node.get("src") or node.get("srcset") or ""
        images.append(urljoin(url, src.split(",")[0].strip().split(" ")[0]))
    body_text = normalized_text(soup.body.get_text(" ") if soup.body else soup.get_text(" "))
    return {
        "title": title,
        "headings": headings[:80],
        "heading_count": len(headings),
        "link_count": len(links),
        "image_count": len(images),
        "images": images[:120],
        "text": body_text[:12000],
        "text_length": len(body_text),
        "has_root": bool(soup.select_one("#root")),
    }


def fetch_original(session: requests.Session, url: str) -> tuple[int, str, str]:
    try:
        response = session.get(url, headers={"User-Agent": USER_AGENT}, timeout=30)
        return response.status_code, response.text, ""
    except Exception as exc:  # noqa: BLE001
        return 0, "", repr(exc)


def fetch_clone(url: str) -> tuple[int, str, str]:
    command = [
        "chromium", "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
        "--virtual-time-budget=1200", "--dump-dom", url,
    ]
    try:
        result = subprocess.run(command, capture_output=True, text=True, timeout=35, check=False)
        html = result.stdout
        # Chromium emits no HTTP status in dump-dom; a rendered root is the clone success signal.
        status = 200 if html and "<html" in html.lower() else 0
        error = normalized_text(result.stderr[-1000:]) if status == 0 else ""
        return status, html, error
    except Exception as exc:  # noqa: BLE001
        return 0, "", repr(exc)


def differences(original: dict, clone: dict) -> list[str]:
    found = []
    if not original.get("title") or not clone.get("title"):
        found.append("metadata")
    if original.get("heading_count", 0) != clone.get("heading_count", 0):
        found.append("heading structure")
    if original.get("image_count", 0) != clone.get("image_count", 0):
        found.append("assets")
    if original.get("link_count", 0) != clone.get("link_count", 0):
        found.append("links")
    original_h1 = original.get("headings", [""])[0] if original.get("headings") else ""
    clone_h1 = clone.get("headings", [""])[0] if clone.get("headings") else ""
    if original_h1 and clone_h1 and original_h1.lower() != clone_h1.lower():
        found.append("content")
    if original.get("text_length", 0) and clone.get("text_length", 0) < original.get("text_length", 0) * 0.35:
        found.append("content coverage")
    if not found:
        found.append("none detected")
    return found


def write_tracking(results: list[dict]) -> None:
    lines = [
        "# Apple Clone Route Fidelity Audit", "", 
        "**Audit date:** 2026-08-15  ",
        "**Source of truth:** [Apple sitemap](https://www.apple.com/sitemap/) and each corresponding public Apple route  ",
        "**Clone baseline:** `techstore-demo` at `/home/ubuntu/webstore-demo`  ",
        "**Current baseline commit:** `6bdfa1f`  ", "",
        "> Every route begins as **NOT VERIFIED**. A route may only be marked verified after its original and clone are individually inspected, compared, corrected where necessary, and checked across desktop, tablet, and mobile behavior.", "",
        "| # | Route | Original inspected | Clone inspected | Differences found | Fixed | Verified |",
        "|---:|---|---|---|---|---|---|",
    ]
    for item in results:
        original_status = "✅" if item["original_status"] == 200 else "⚠️ ERROR"
        clone_status = "✅" if item["clone_status"] == 200 and item["clone"].get("has_root") else "⚠️ ERROR"
        difference_text = ", ".join(item["differences"])
        lines.append(f"| {item['number']:03d} | `{item['route']}` | {original_status} | {clone_status} | {difference_text} | [ ] | [ ] NOT VERIFIED |")
    TRACKING.write_text("\n".join(lines) + "\n")


def main() -> None:
    routes = load_routes()
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})
    results: list[dict] = []
    if SUMMARY_JSONL.exists():
        SUMMARY_JSONL.unlink()
    for number, route, label in routes:
        slug = f"{number:03d}-{re.sub(r'[^a-z0-9]+', '-', route.strip('/').lower()).strip('-') or 'home'}"
        original_url = BASE_ORIGINAL + route
        clone_url = BASE_CLONE + route
        original_status, original_html, original_error = fetch_original(session, original_url)
        clone_status, clone_html, clone_error = fetch_clone(clone_url)
        (ORIGINAL_DIR / f"{slug}.html").write_text(original_html)
        (CLONE_DIR / f"{slug}.html").write_text(clone_html)
        original_data = parse_dom(original_html, original_url)
        clone_data = parse_dom(clone_html, clone_url)
        item = {
            "number": number, "route": route, "label": label,
            "original_url": original_url, "clone_url": clone_url,
            "original_status": original_status, "clone_status": clone_status,
            "original_error": original_error, "clone_error": clone_error,
            "original": original_data, "clone": clone_data,
            "differences": differences(original_data, clone_data),
        }
        results.append(item)
        with SUMMARY_JSONL.open("a") as handle:
            handle.write(json.dumps(item, ensure_ascii=False) + "\n")
        write_tracking(results)
        print(f"{number:03d}/{len(routes):03d} {route} original={original_status} clone={clone_status} differences={','.join(item['differences'])}", flush=True)
        time.sleep(0.08)
    print(f"completed={len(results)}")


if __name__ == "__main__":
    main()
