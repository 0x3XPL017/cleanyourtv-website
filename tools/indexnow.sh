#!/usr/bin/env bash
# Tell IndexNow engines (Bing, Yandex, Seznam, Naver...) that cleanyour.tv's pages changed. Run after a deploy.
set -euo pipefail
KEY=f214615471ff8447fe82d68759c9309b
URLS=$(curl -s https://cleanyour.tv/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' | python3 -c 'import sys,json;print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))')
curl -s -o /dev/null -w "IndexNow: HTTP %{http_code}\n" -X POST https://api.indexnow.org/indexnow -H 'Content-Type: application/json; charset=utf-8' \
  -d "{\"host\":\"cleanyour.tv\",\"key\":\"$KEY\",\"keyLocation\":\"https://cleanyour.tv/$KEY.txt\",\"urlList\":$URLS}"
