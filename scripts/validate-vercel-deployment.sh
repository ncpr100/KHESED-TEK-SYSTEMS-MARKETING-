#!/bin/bash

# VERCEL MIGRATION - POST-DEPLOYMENT VALIDATION SCRIPT
# Run this script after migrating to Vercel to validate everything is working

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="khesedtek.com"
EXPECTED_TTFB=500  # milliseconds
EXPECTED_STATUS=200

echo -e "${BLUE}🚀 VERCEL MIGRATION - POST-DEPLOYMENT VALIDATION${NC}"
echo "=================================================="
echo "Domain: $DOMAIN"
echo "Started: $(date)"
echo ""

# Function to print test results
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS${NC}: $2"
    else
        echo -e "${RED}❌ FAIL${NC}: $2"
        exit 1
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  WARN${NC}: $1"
}

print_info() {
    echo -e "${BLUE}ℹ️  INFO${NC}: $1"
}

# Test 1: Basic Connectivity
echo -e "\n${BLUE}1. Testing Basic Connectivity${NC}"
echo "--------------------------------"

for path in "/" "/latam" "/usa" "/global" "/contact"; do
    response=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN$path")
    if [ "$response" = "200" ]; then
        print_result 0 "https://$DOMAIN$path returns $response"
    else
        print_result 1 "https://$DOMAIN$path returns $response (expected 200)"
    fi
done

# Test 2: API Endpoints
echo -e "\n${BLUE}2. Testing API Endpoints${NC}"
echo "-----------------------------"

# Health check
health_response=$(curl -s "https://$DOMAIN/api/health")
if echo "$health_response" | grep -q "ok"; then
    print_result 0 "/api/health endpoint working"
else
    print_result 1 "/api/health endpoint failed: $health_response"
fi

# Geo detection API
geo_response=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/api/geo-detect")
if [ "$geo_response" = "200" ]; then
    print_result 0 "/api/geo-detect endpoint working"
else
    print_result 1 "/api/geo-detect endpoint failed: $geo_response"
fi

# Analytics API (POST test)
analytics_response=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d '{"name":"test","value":100,"url":"test"}' "https://$DOMAIN/api/analytics")
if [ "$analytics_response" = "200" ]; then
    print_result 0 "/api/analytics endpoint accepting POST requests"
else
    print_result 1 "/api/analytics endpoint failed: $analytics_response"
fi

# Test 3: Performance Validation
echo -e "\n${BLUE}3. Testing Performance${NC}"
echo "---------------------------"

for path in "/" "/latam" "/usa"; do
    ttfb=$(curl -w "%{time_starttransfer}" -o /dev/null -s "https://$DOMAIN$path")
    ttfb_ms=$(echo "$ttfb * 1000" | bc)
    ttfb_rounded=$(printf "%.0f" "$ttfb_ms")
    
    if [ "$ttfb_rounded" -lt "$EXPECTED_TTFB" ]; then
        print_result 0 "https://$DOMAIN$path TTFB: ${ttfb_rounded}ms (< ${EXPECTED_TTFB}ms)"
    else
        print_warning "https://$DOMAIN$path TTFB: ${ttfb_rounded}ms (target: < ${EXPECTED_TTFB}ms)"
    fi
done

# Test 4: Security Headers
echo -e "\n${BLUE}4. Testing Security Headers${NC}"
echo "-------------------------------"

headers_response=$(curl -s -I "https://$DOMAIN/")

# Check for required security headers
declare -A required_headers=(
    ["X-Content-Type-Options"]="nosniff"
    ["X-Frame-Options"]="DENY"
    ["Referrer-Policy"]="strict-origin-when-cross-origin"
    ["Strict-Transport-Security"]="max-age"
)

for header in "${!required_headers[@]}"; do
    if echo "$headers_response" | grep -i "$header" | grep -q "${required_headers[$header]}"; then
        print_result 0 "$header header present and correct"
    else
        print_result 1 "$header header missing or incorrect"
    fi
done

# Check Content-Security-Policy
if echo "$headers_response" | grep -i "Content-Security-Policy" | grep -q "default-src"; then
    print_result 0 "Content-Security-Policy header present"
else
    print_warning "Content-Security-Policy header missing (check next.config.js)"
fi

# Test 5: SSL Certificate Validation
echo -e "\n${BLUE}5. Testing SSL Certificate${NC}"
echo "------------------------------"

ssl_info=$(echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
if [ $? -eq 0 ]; then
    print_result 0 "SSL certificate is valid"
    echo "$ssl_info" | while read line; do
        print_info "$line"
    done
else
    print_result 1 "SSL certificate validation failed"
fi

# Test 6: Contact Form Functionality (GET request)
echo -e "\n${BLUE}6. Testing Contact Form Availability${NC}"
echo "--------------------------------------"

contact_response=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/contact")
if [ "$contact_response" = "200" ]; then
    print_result 0 "Contact form page loads successfully"
else
    print_result 1 "Contact form page failed to load: $contact_response"
fi

# Test 7: Email API Endpoint (without sending actual email)
echo -e "\n${BLUE}7. Testing Email API Structure${NC}"
echo "-----------------------------------"

# Test with invalid data to check API structure (should return 400, not 500)
email_test=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d '{}' "https://$DOMAIN/api/request-demo")
if [ "$email_test" = "400" ] || [ "$email_test" = "422" ]; then
    print_result 0 "Email API validates input correctly (returns $email_test for empty data)"
else
    print_result 1 "Email API validation issue (returns $email_test, expected 400 or 422)"
fi

# Test 8: Static Assets
echo -e "\n${BLUE}8. Testing Static Assets${NC}"
echo "----------------------------"

# Test favicon
favicon_response=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/favicon.ico")
if [ "$favicon_response" = "200" ]; then
    print_result 0 "Favicon loads successfully"
else
    print_warning "Favicon not found (returns $favicon_response)"
fi

# Test robots.txt
robots_response=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/robots.txt")
if [ "$robots_response" = "200" ]; then
    print_result 0 "robots.txt loads successfully"
else
    print_warning "robots.txt not found (returns $robots_response)"
fi

# Test sitemap.xml
sitemap_response=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/sitemap.xml")
if [ "$sitemap_response" = "200" ]; then
    print_result 0 "sitemap.xml loads successfully"
else
    print_warning "sitemap.xml not found (returns $sitemap_response)"
fi

# Test 9: Vercel-specific Features
echo -e "\n${BLUE}9. Testing Vercel-specific Features${NC}"
echo "------------------------------------"

# Check for Vercel headers
vercel_headers=$(curl -s -I "https://$DOMAIN/" | grep -i "server\|x-vercel\|x-matched-path")
if [ -n "$vercel_headers" ]; then
    print_result 0 "Vercel deployment headers detected"
    echo "$vercel_headers" | while read line; do
        if [ -n "$line" ]; then
            print_info "$line"
        fi
    done
else
    print_warning "Vercel deployment headers not detected"
fi

# Test 10: Market-specific Routing
echo -e "\n${BLUE}10. Testing Market-specific Content${NC}"
echo "------------------------------------"

# Test LATAM market content (Spanish)
latam_content=$(curl -s "https://$DOMAIN/latam" | head -20)
if echo "$latam_content" | grep -q "Iglesia" || echo "$latam_content" | grep -q "KHESED"; then
    print_result 0 "LATAM market page contains expected Spanish content"
else
    print_result 1 "LATAM market page missing expected content"
fi

# Test USA market content (English)
usa_content=$(curl -s "https://$DOMAIN/usa" | head -20)
if echo "$usa_content" | grep -q "Church" || echo "$usa_content" | grep -q "KHESED"; then
    print_result 0 "USA market page contains expected English content"
else
    print_result 1 "USA market page missing expected content"
fi

# Final Summary
echo -e "\n${BLUE}VALIDATION COMPLETE${NC}"
echo "==================="
echo "Validation completed at: $(date)"
echo ""
echo -e "${GREEN}✅ All critical tests passed!${NC}"
echo ""
echo "Next Steps:"
echo "1. Monitor performance for 24 hours"
echo "2. Check error logs in Vercel dashboard"
echo "3. Validate analytics are tracking correctly"
echo "4. Test email delivery with actual form submission"
echo "5. Monitor user feedback channels"
echo ""
echo "Vercel Dashboard: https://vercel.com/dashboard"
echo "Performance Monitoring: https://vercel.com/dashboard/analytics"
echo ""
echo -e "${YELLOW}Migration Status: SUCCESSFUL ✨${NC}"