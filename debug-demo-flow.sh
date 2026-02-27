#!/bin/bash

echo "🔍 DEBUGGING SOLICITAR DEMOSTRACIÓN FLOW"
echo "======================================="

# Check environment variables
echo "📧 Checking Email Configuration:"
echo "RESEND_API_KEY: ${RESEND_API_KEY:-❌ NOT SET}"
echo "CONTACT_EMAIL_LATAM: ${CONTACT_EMAIL_LATAM:-❌ NOT SET}" 
echo "CONTACT_EMAIL_USA: ${CONTACT_EMAIL_USA:-❌ NOT SET}"
echo "CONTACT_EMAIL_GLOBAL: ${CONTACT_EMAIL_GLOBAL:-❌ NOT SET}"

echo ""
echo "🌐 Testing Domain Resolution:"
nslookup khesed-tek-systems.org || echo "❌ Domain DNS issues detected"

echo ""
echo "🔄 Testing Form Submission Locally:"
# Simulate form submission
curl -X POST http://localhost:3000/api/request-demo \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test User&email=test@example.com&org=Test Church&whatsapp=%2B573021234567&message=Test demo request&wantsDemo=on" \
  -v

echo ""
echo "📋 Next Steps:"
echo "1. Check Vercel environment variables"
echo "2. Verify Resend API key is valid"
echo "3. Ensure domain DNS is working"
echo "4. Test email delivery"