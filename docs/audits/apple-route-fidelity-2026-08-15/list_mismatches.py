import json
from pathlib import Path
root = Path(__file__).resolve().parent
for row in (json.loads(line) for line in (root / 'route-evidence/route-summary.jsonl').read_text().splitlines()):
    if 'content' in row['differences']:
        original = row['original'].get('headings', [''])[0] if row['original'].get('headings') else ''
        clone = row['clone'].get('headings', [''])[0] if row['clone'].get('headings') else ''
        print(row['route'])
        print(' original=', original)
        print(' clone   =', clone)
