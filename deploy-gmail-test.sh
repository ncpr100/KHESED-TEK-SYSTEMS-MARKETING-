#!/bin/bash
cd /workspaces/KHESED-TEK-SYSTEMS-MARKETING-
git add app/api/test-gmail/route.ts
git commit -m "Add Gmail debug endpoint - diagnose email failures"
git push origin main
echo "✅ Pushed to GitHub. Vercel will deploy in 1-2 minutes."
