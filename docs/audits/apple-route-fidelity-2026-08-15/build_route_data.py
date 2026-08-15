from __future__ import annotations

import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
EVIDENCE = ROOT / "route-evidence/original"
SUMMARY = EVIDENCE / "../route-summary.jsonl"
OUT = ROOT.parents[2] / "client/src/data/appleRouteAuditData.ts"
OUT.parent.mkdir(parents=True, exist_ok=True)

def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()

def quote(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)

rows = []
for line in SUMMARY.read_text().splitlines():
    row = json.loads(line)
    slug = f"{row['number']:03d}-{re.sub(r'[^a-z0-9]+', '-', row['route'].strip('/').lower()).strip('-') or 'home'}"
    html_path = EVIDENCE / f"{slug}.html"
    html = html_path.read_text(errors="ignore") if html_path.exists() else ""
    soup = BeautifulSoup(html, "html.parser")
    headings = [clean(node.get_text(" ")) for node in soup.select("h1, h2, h3") if clean(node.get_text(" "))]
    paragraphs = []
    for node in soup.select("main p, article p, section p, p"):
        text = clean(node.get_text(" "))
        if len(text) >= 24 and text not in paragraphs and not text.startswith("Copyright"):
            paragraphs.append(text)
    h1 = headings[0] if headings else row["route"].strip("/").replace("/", " ") or "Apple"
    rows.append((row["route"], h1, headings[:8], paragraphs[:3]))

lines = [
    "// Generated from individually captured Apple.com route DOM evidence.",
    "// Keep route-specific content here; shared layout remains in AppleRoutePage.",
    "export type AppleRouteAuditData = { h1: string; headings: string[]; paragraphs: string[] };",
    "export const appleRouteAuditData: Record<string, AppleRouteAuditData> = {",
]
for route, h1, headings, paragraphs in rows:
    lines.append(f"  {quote(route)}: {{ h1: {quote(h1)}, headings: {json.dumps(headings, ensure_ascii=False)}, paragraphs: {json.dumps(paragraphs, ensure_ascii=False)} }},")
lines += ["};", ""]
OUT.write_text("\n".join(lines))
print(f"routes={len(rows)} output={OUT}")
