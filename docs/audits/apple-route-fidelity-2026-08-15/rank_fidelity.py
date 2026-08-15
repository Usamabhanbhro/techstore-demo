from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SUMMARY = ROOT / "route-evidence/route-summary.jsonl"
OUT_MD = ROOT / "ROUTE_FIDELITY_PRIORITY.md"
OUT_JSON = ROOT / "route-fidelity-priority.json"


def family(route: str) -> str:
    if route == "/":
        return "homepage"
    if route.startswith("/us/shop") or route.startswith("/us_epp"):
        return "store"
    if "compare" in route or route.endswith("/specs"):
        return "comparison/specs"
    if route.startswith("/newsroom") or route.startswith("/apple-events") or route.startswith("/tv-pr"):
        return "news/events"
    if any(x in route for x in ("/legal", "/privacy", "/accessibility", "/sitemap", "/feedback", "/choose-country", "/rss")):
        return "legal/utility"
    if any(x in route for x in ("/retail", "/today", "/support", "/repair", "/trade-in")):
        return "support/store-services"
    if any(x in route for x in ("/apple-music", "/apple-tv", "/apple-arcade", "/apple-books", "/apple-podcasts", "/apple-fitness", "/icloud", "/apple-one", "/apple-pay", "/apple-card", "/apple-cash", "/wallet")):
        return "services"
    if any(x in route for x in ("/business", "/education", "/government", "/health", "/environment", "/diversity", "/leadership", "/careers")):
        return "corporate/values"
    if any(x in route for x in ("/mac", "/iphone", "/ipad", "/watch", "/airpods", "/airtag", "/homepod", "/apple-vision", "/imac", "/displays", "/apple-pencil")):
        return "products"
    return "other"


def template_for(fam: str) -> str:
    return {
        "homepage": "AppleHomepage",
        "products": "AppleProductPage",
        "comparison/specs": "AppleComparisonPage",
        "store": "AppleStorePage",
        "services": "AppleServicePage",
        "news/events": "AppleEditorialPage",
        "corporate/values": "AppleCorporatePage",
        "legal/utility": "AppleLegalPage",
        "support/store-services": "AppleSupportPage",
        "other": "AppleUtilityPage",
    }[fam]

rows = []
for line in SUMMARY.read_text().splitlines():
    if not line.strip():
        continue
    row = json.loads(line)
    route = row["route"]
    fam = family(route)
    original = row.get("original", {})
    clone = row.get("clone", {})
    original_text = len(original.get("text", ""))
    clone_text = len(clone.get("text", ""))
    content_gap = max(0, original_text - clone_text)
    asset_gap = abs(original.get("image_count", 0) - clone.get("image_count", 0))
    link_gap = abs(original.get("link_count", 0) - clone.get("link_count", 0))
    structure_gap = abs(original.get("heading_count", 0) - clone.get("heading_count", 0))
    flags = set(row.get("differences", []))
    importance = 15 if route == "/" else 10 if fam in {"products", "comparison/specs", "store"} else 6
    score = importance + min(content_gap / 100, 35) + min(asset_gap * 0.35, 35) + min(link_gap * 0.12, 25) + min(structure_gap * 0.8, 30)
    rows.append({
        "route": route,
        "family": fam,
        "template": template_for(fam),
        "content_gap": content_gap,
        "asset_gap": asset_gap,
        "link_gap": link_gap,
        "structure_gap": structure_gap,
        "flags": sorted(flags),
        "priority": round(score, 2),
    })
rows.sort(key=lambda item: (-item["priority"], item["route"]))
for index, item in enumerate(rows, 1):
    item["rank"] = index
OUT_JSON.write_text(json.dumps(rows, indent=2) + "\n")

lines = [
    "# Route Fidelity Priority",
    "",
    "The ranking uses the persisted original-versus-clone evidence and weights content shortfall, image-count gap, link-count gap, heading-count gap, route family importance, and the homepage/product/store/comparison business impact. It is a triage tool, not a claim of visual verification.",
    "",
    "| Rank | Route | Template | Content Gap | Asset Gap | Link Gap | Structure Gap | Priority |",
    "|---:|---|---|---:|---:|---:|---:|---:|",
]
for item in rows:
    lines.append(f"| {item['rank']} | `{item['route']}` | {item['template']} | {item['content_gap']} | {item['asset_gap']} | {item['link_gap']} | {item['structure_gap']} | {item['priority']} |")
OUT_MD.write_text("\n".join(lines) + "\n")
print(f"ranked={len(rows)} markdown={OUT_MD} json={OUT_JSON}")
print("top10")
for item in rows[:10]:
    print(item["rank"], item["route"], item["template"], item["priority"])
