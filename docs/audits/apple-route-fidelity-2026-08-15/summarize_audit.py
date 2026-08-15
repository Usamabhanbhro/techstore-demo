from __future__ import annotations

import json
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SUMMARY = ROOT / "route-evidence/route-summary.jsonl"
REPORT = ROOT / "AUDIT_SUMMARY.md"
rows = [json.loads(line) for line in SUMMARY.read_text().splitlines() if line.strip()]

diff_counts = Counter()
route_rows = []
for row in rows:
    for diff in row["differences"]:
        diff_counts[diff] += 1
    route_rows.append(row)

family = defaultdict(list)
for row in rows:
    route = row["route"]
    if route == "/":
        key = "homepage"
    elif route.startswith("/us/shop") or "/shop/" in route:
        key = "store"
    elif "/compare" in route or "/spec" in route:
        key = "comparison/specs"
    elif route.startswith("/legal") or route in {"/privacy", "/feedback", "/sitemap", "/choose-country-region", "/us/search"}:
        key = "legal/utility"
    elif route in {"/newsroom", "/apple-events", "/tv-pr", "/rss"} or route.startswith("/news"):
        key = "news/events"
    elif route.startswith("/retail") or route.startswith("/today") or route in {"/financing", "/us/shop/goto/trade_in"}:
        key = "support/store-services"
    elif route in {"/apple-music", "/apple-tv", "/apple-arcade", "/apple-one", "/apple-pay", "/wallet", "/icloud", "/services"}:
        key = "services"
    elif route in {"/leadership", "/careers/us", "/environment", "/diversity", "/accessibility", "/contact", "/education", "/education-initiative"}:
        key = "corporate/values"
    elif route.startswith(("/mac", "/ipad", "/iphone", "/watch", "/airpods", "/apple-vision-pro", "/apple-watch", "/apple-pencil", "/airtag")):
        key = "products"
    else:
        key = "other"
    family[key].append(row)

lines = [
    "# Apple Clone Fidelity Audit — Automated Comparison Summary", "",
    f"**Routes collected:** {len(rows)} / 272", "",
    "> This report records individual original and clone evidence for every route. The automated pass identifies discrepancies; it does not mark routes as visually verified until responsive and interaction checks are completed.", "",
    "## Collection status", "",
    "| Measure | Result |", "|---|---:|",
    f"| Original pages with HTTP 200 | {sum(r['original_status'] == 200 for r in rows)} |",
    f"| Clone pages with rendered root | {sum(r['clone_status'] == 200 and r['clone'].get('has_root') for r in rows)} |",
    f"| Routes with original fetch errors | {sum(r['original_status'] != 200 for r in rows)} |",
    f"| Routes with clone render errors | {sum(not (r['clone_status'] == 200 and r['clone'].get('has_root')) for r in rows)} |", "",
    "## Discrepancy counts", "",
    "| Detected difference | Routes |", "|---|---:|",
]
for name, count in diff_counts.most_common():
    lines.append(f"| {name} | {count} |")

lines += ["", "## Route-family coverage", "", "| Family | Routes collected | Routes with content or structural differences |", "|---|---:|---:|"]
for key, members in sorted(family.items()):
    changed = sum(r["differences"] != ["none detected"] for r in members)
    lines.append(f"| {key} | {len(members)} | {changed} |")

lines += ["", "## Highest-priority discrepancy examples", "", "| Route | Original H1 | Clone H1 | Differences |", "|---|---|---|---|"]
for row in route_rows[:60]:
    original_h1 = row["original"].get("headings", [""])[0] if row["original"].get("headings") else ""
    clone_h1 = row["clone"].get("headings", [""])[0] if row["clone"].get("headings") else ""
    lines.append(f"| `{row['route']}` | {original_h1 or '—'} | {clone_h1 or '—'} | {', '.join(row['differences'])} |")

lines += ["", "## Per-route evidence", "", "The complete machine-readable evidence is stored in `route-evidence/route-summary.jsonl`. Original and rendered clone DOM snapshots are stored one file per route under `route-evidence/original/` and `route-evidence/clone/`. The persistent completion table is `ROUTE_TRACKING.md`.", ""]
REPORT.write_text("\n".join(lines))
print(f"routes={len(rows)}")
print("discrepancies=" + json.dumps(diff_counts, ensure_ascii=False))
for key, members in sorted(family.items()):
    print(f"family={key} routes={len(members)}")
