#!/bin/bash
cd /workspaces/KHESED-TEK-SYSTEMS-MARKETING-

echo "Checking git status..."
git status

echo ""
echo "Adding analytics fix..."
git add lib/analytics.ts

echo ""
echo "Committing fix..."
git commit -m "FIX: Remove orphaned ) at lib/analytics.ts:198 - unblocking Vercel deployments" || echo "Already committed"

echo ""
echo "Pushing to GitHub..."
git push origin main

echo ""
echo "Done! Check Vercel dashboard for new deployment."
