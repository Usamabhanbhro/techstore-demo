import json
from collections import Counter
from pathlib import Path

root = Path(__file__).resolve().parent
rows = [json.loads(line) for line in (root / 'route-evidence/route-summary.jsonl').read_text().splitlines()]
print('routes', len(rows))
print('original heading counts', Counter(row['original']['heading_count'] for row in rows).most_common(20))
print('clone heading counts', Counter(row['clone']['heading_count'] for row in rows).most_common(20))
print('original image counts', Counter(row['original']['image_count'] for row in rows).most_common(20))
print('clone image counts', Counter(row['clone']['image_count'] for row in rows).most_common(20))
print('original link counts', Counter(row['original']['link_count'] for row in rows).most_common(20))
print('clone link counts', Counter(row['clone']['link_count'] for row in rows).most_common(20))
print('\nclosest heading matches')
for row in sorted(rows, key=lambda r: abs(r['original']['heading_count'] - r['clone']['heading_count']))[:40]:
    print(row['route'], row['original']['heading_count'], row['clone']['heading_count'], row['differences'])
print('\ncontent coverage routes')
for row in [r for r in rows if 'content coverage' in r['differences']][:40]:
    print(row['route'], row['original']['text_length'], row['clone']['text_length'])
