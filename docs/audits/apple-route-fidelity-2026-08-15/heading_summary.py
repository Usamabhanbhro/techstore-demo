import json
from collections import Counter
from pathlib import Path
root=Path(__file__).resolve().parent
rows=[json.loads(line) for line in (root/'route-evidence/route-summary.jsonl').read_text().splitlines()]
for side in ('original','clone'):
    counts=Counter(r[side]['heading_count'] for r in rows)
    print(side, 'min', min(counts), 'max', max(counts), 'median', sorted(r[side]['heading_count'] for r in rows)[len(rows)//2])
    print('common', counts.most_common(12))
print('sample mismatches')
for r in rows:
    if r['original']['heading_count'] != r['clone']['heading_count']:
        print(r['route'], r['original']['heading_count'], r['clone']['heading_count'])
        if sum(1 for x in rows if x['original']['heading_count'] != x['clone']['heading_count']) > 25: break
