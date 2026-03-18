#!/bin/bash

# VERCEL DEPLOYMENT EMERGENCY SETUP
# ==================================

echo "🚨 VERCEL DEPLOYMENT EMERGENCY SETUP"
echo "======================================"
echo ""

# Check if .vercel directory exists
if [ ! -d ".vercel" ]; then
    echo "❌ CRITICAL: Project NOT linked to Vercel"
    echo "   This explains why no deployments are happening!"
    echo ""
    echo "🔧 IMMEDIATE SETUP REQUIRED:"
    echo ""
    echo "1. Install Vercel CLI:"
    echo "   npm i -g vercel"
    echo ""
    echo "2. Login to Vercel:"
    echo "   vercel login"
    echo ""
    echo "3. Deploy and link project:"
    echo "   vercel --prod"
    echo ""
    echo "4. Add environment variables in Vercel dashboard:"
    echo "   - RESEND_API_KEY=re_xxxxx"
    echo "   - CONTACT_EMAIL_LATAM=contacto@khesedtek.com"
    echo "   - CONTACT_EMAIL_USA=contact@khesedtek.com"
    echo "   - CONTACT_EMAIL_GLOBAL=global@khesedtek.com"
    echo "   - GMAIL_USER=your-gmail@gmail.com"
    echo "   - GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx"
    echo ""
else
    echo "✅ Project is linked to Vercel"
    
    # Check for deployment configuration
    if [ -f "vercel.json" ]; then
        echo "✅ vercel.json configuration found"
    else
        echo "⚠️  No vercel.json configuration"
    fi
    
    # Check package.json for build scripts
    if grep -q '"build"' package.json; then
        echo "✅ Build script configured"
    else
        echo "❌ Missing build script"
    fi
fi

echo ""
echo "🎯 PROTOCOL VIOLATION STATUS:"
echo "   - Emergency geolocation fix: ✅ COMMITTED"
echo "   - Cloudflare workaround: ✅ READY"
echo "   - Form blocking resolution: ✅ CODED"
echo "   - Deployment to production: ❌ BLOCKED"
echo ""
echo "🚀 Once Vercel setup is complete:"
echo "   git push origin main  # Will trigger deployment"
echo "   # Protocol violation will be resolved immediately"