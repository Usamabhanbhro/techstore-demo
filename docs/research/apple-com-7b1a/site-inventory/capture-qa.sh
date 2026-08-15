#!/usr/bin/env bash
set -euo pipefail
cd /home/ubuntu/webstore-demo
mkdir -p docs/design-references/apple-com-7b1a/site-inventory
for route in mac us/shop/goto/accessories iphone/compare newsroom; do
  safe=$(printf '%s' "$route" | tr '/' '-')
  chromium --headless --disable-gpu --no-sandbox --hide-scrollbars --window-size=1440,900 --screenshot="docs/design-references/apple-com-7b1a/site-inventory/${safe}-desktop.png" "http://localhost:3000/${route}" >/dev/null 2>&1
  chromium --headless --disable-gpu --no-sandbox --hide-scrollbars --window-size=390,844 --screenshot="docs/design-references/apple-com-7b1a/site-inventory/${safe}-mobile.png" "http://localhost:3000/${route}" >/dev/null 2>&1
done
printf 'captured=%s\n' "$(find docs/design-references/apple-com-7b1a/site-inventory -name '*.png' | wc -l)"
