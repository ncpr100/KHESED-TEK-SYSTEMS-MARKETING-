#!/usr/bin/env bash
# Healthcheck script for KHESED-TEK marketing site

set -euo pipefail

URL="${1:-}"

if [[ -z "$URL" ]]; then
  echo "❌ Usage: $0 <url>"
  echo "Example: $0 https://khesed-tek-marketing.up.railway.app"
  exit 1
fi

echo "🔍 Checking health of: $URL"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

if [[ "$STATUS" == "200" ]]; then
  echo "✅ Healthcheck PASSED: $URL returned $STATUS"
  exit 0
else
  echo "❌ Healthcheck FAILED: $URL returned $STATUS"
  exit 1
fi
