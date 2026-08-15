#!/usr/bin/env bash
set -e
chromium --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=390,844 --screenshot=/home/ubuntu/webstore-demo/docs/design-references/apple-com-7b1a/homepage-6a2c/clone-mobile-top.png http://localhost:3000/
