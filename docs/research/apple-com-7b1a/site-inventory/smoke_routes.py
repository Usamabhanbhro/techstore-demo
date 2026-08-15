from pathlib import Path
import re
import subprocess

base = "http://localhost:3000"
routes_file = Path(__file__).with_name("routes.txt")
routes = []
for line in routes_file.read_text().splitlines():
    match = re.match(r"^\s*\d+\.\s+(\S+)", line)
    if match:
        routes.append(match.group(1))
results = []
for route in routes:
    url = base + route
    response = subprocess.run(["curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}", "--max-time", "8", url], capture_output=True, text=True, check=False)
    status = response.stdout.strip()
    results.append((route, status == "200", status))

passed = sum(1 for _, ok, _ in results if ok)
failed = [(route, status) for route, ok, _ in results if not ok]
print(f"routes={len(results)} passed={passed} failed={len(failed)}")
for route, status in failed[:40]:
    print(f"FAIL {route} status={status}")
if failed:
    raise SystemExit(1)
