#!/usr/bin/env bash
# Smoke tests for KHESED-TEK marketing site

set -euo pipefail

BASE_URL="${1:-}"

if [[ -z "$BASE_URL" ]]; then
  echo "❌ Usage: $0 <base-url>"
  echo "Example: $0 https://khesed-tek-marketing.up.railway.app"
  exit 1
fi

echo "🧪 Running smoke tests on: $BASE_URL"

PATHS=(
  "/"
  "/contact"
)

FAILED=0

for PATH in "${PATHS[@]}"; do
  URL="$BASE_URL$PATH"
  echo -n "Testing $URL ... "

  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

  if [[ "$STATUS" == "200" ]]; then
    echo "✅ OK ($STATUS)"
  else
    echo "❌ FAILED ($STATUS)"
    FAILED=$((FAILED + 1))
  fi
done

if [[ $FAILED -eq 0 ]]; then
  echo ""
  echo "✅ All smoke tests passed!"
  exit 0
else
  echo ""
  echo "❌ $FAILED test(s) failed"
  exit 1
fi
