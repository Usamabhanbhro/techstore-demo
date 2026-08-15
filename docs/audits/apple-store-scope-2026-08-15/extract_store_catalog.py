from __future__ import annotations

import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path('/home/ubuntu/webstore-demo')
ORIGINAL = ROOT / 'docs/audits/apple-route-fidelity-2026-08-15/route-evidence/original'
OUT = ROOT / 'docs/audits/apple-store-scope-2026-08-15'
OUT.mkdir(parents=True, exist_ok=True)

route_file = ROOT / 'docs/research/apple-com-7b1a/site-inventory/routes.txt'
routes = []
for line in route_file.read_text(encoding='utf-8').splitlines():
    match = re.search(r'\d+\.\s+(\S+)', line)
    if match:
        routes.append(match.group(1))

shopping = []
for index, route in enumerate(routes, start=1):
    low = route.lower()
    if not any(token in low for token in ('shop', 'buy-', 'accessor', 'iphone', 'mac', 'ipad', 'watch', 'airpods', 'vision-pro', 'tv-home', 'beats', 'airtag')):
        continue
    slug = re.sub(r'[^a-z0-9]+', '-', route.strip('/').lower()).strip('-')
    html_path = ORIGINAL / f'{index:03d}-{slug}.html'
    if not html_path.exists():
        candidates = list(ORIGINAL.glob(f'{index:03d}-*.html'))
        if not candidates:
            continue
        html_path = candidates[0]
    soup = BeautifulSoup(html_path.read_text(encoding='utf-8', errors='ignore'), 'html.parser')
    headings = []
    for tag in soup.select('main h1, main h2, main h3, h1, h2, h3'):
        text = ' '.join(tag.get_text(' ', strip=True).split())
        if text and text not in headings and len(text) < 180:
            headings.append(text)
    links = []
    for tag in soup.select('main a[href], a[href]'):
        href = tag.get('href', '')
        text = ' '.join(tag.get_text(' ', strip=True).split())
        if href.startswith('/') and text and len(text) < 120:
            item = {'text': text, 'href': href}
            if item not in links:
                links.append(item)
    images = []
    for tag in soup.select('main img, img'):
        src = tag.get('src') or tag.get('data-src') or tag.get('data-lazy-src') or ''
        alt = ' '.join((tag.get('alt') or '').split())
        if src and (src.startswith('http') or src.startswith('//')):
            item = {'src': src if src.startswith('http') else 'https:' + src, 'alt': alt}
            if item not in images:
                images.append(item)
    shopping.append({'route': route, 'headings': headings[:32], 'links': links[:80], 'images': images[:40]})

(OUT / 'store_catalog_evidence.json').write_text(json.dumps(shopping, ensure_ascii=False, indent=2), encoding='utf-8')
with (OUT / 'STORE_CATALOG_EVIDENCE.md').open('w', encoding='utf-8') as fh:
    fh.write('# Apple Store source catalog evidence\n\n')
    fh.write(f'Extracted {len(shopping)} shopping/product-related route captures from the official Apple evidence set.\n\n')
    for item in shopping:
        fh.write(f"## {item['route']}\n\n")
        if item['headings']:
            fh.write('### Headings\n\n')
            for heading in item['headings'][:18]:
                fh.write(f'- {heading}\n')
            fh.write('\n')
        if item['links']:
            fh.write('### Relevant links\n\n')
            for link in item['links'][:24]:
                fh.write(f"- [{link['text']}]({link['href']})\n")
            fh.write('\n')
        if item['images']:
            fh.write('### Image candidates\n\n')
            for image in item['images'][:10]:
                fh.write(f"- `{image['alt']}` — {image['src']}\n")
            fh.write('\n')
print(f'Wrote {len(shopping)} route records to {OUT}')
