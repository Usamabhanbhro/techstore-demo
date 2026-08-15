import json
from collections import Counter
from pathlib import Path
root = Path(__file__).resolve().parent
rows=[json.loads(line) for line in (root/'route-evidence/route-summary.jsonl').read_text().splitlines()]
for key in ('heading_count','image_count','link_count'):
    matches=[r for r in rows if r['original'][key]==r['clone'][key]]
    print(key, 'matches', len(matches), 'discrepancies', len(rows)-len(matches))
    print('examples', [r['route'] for r in matches[:20]])
print('content mismatch', sum('content' in r['differences'] for r in rows))
print('coverage mismatch', sum('content coverage' in r['differences'] for r in rows))
