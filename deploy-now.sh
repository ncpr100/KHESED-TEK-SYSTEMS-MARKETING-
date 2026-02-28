#!/bin/bash
cd /workspaces/KHESED-TEK-SYSTEMS-MARKETING-
echo "Adding files..."
git add app/api/email-test-detailed/route.ts lib/gmail-service.ts
echo "Files staged:"
git status --short
echo "Committing..."
git commit -m "Add detailed email diagnostic endpoint with SMTP debugging"
echo "Pushing to GitHub..."
git push origin main
echo "Done! Check Vercel for deployment."
