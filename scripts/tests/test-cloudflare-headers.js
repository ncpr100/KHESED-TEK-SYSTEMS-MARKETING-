#!/usr/bin/env node

/**
 * CLOUDFLARE HEADER VALIDATION
 * ===========================
 * Quick test to check if Cloudflare headers changed
 */

const https = require('https');

console.log('🔍 TESTING CLOUDFLARE HEADERS...');
console.log('================================');

function testHeaders() {
  const req = https.request({
    hostname: 'www.khesed-tek-systems.org',
    method: 'HEAD',
    timeout: 10000
  }, (res) => {
    console.log('📡 Connection Status:', res.statusCode);
    console.log('');
    
    // All headers for debugging
    console.log('📋 ALL RESPONSE HEADERS:');
    Object.keys(res.headers).forEach(header => {
      console.log(`   ${header}: ${res.headers[header]}`);
    });
    
    console.log('');
    console.log('🎯 CRITICAL HEADER ANALYSIS:');
    
    const permissionsPolicy = res.headers['permissions-policy'];
    const server = res.headers.server;
    const cfRay = res.headers['cf-ray'];
    
    console.log(`   Server: ${server || 'Unknown'}`);
    console.log(`   CF-Ray: ${cfRay || 'Not Cloudflare'}`);
    console.log(`   Permissions-Policy: ${permissionsPolicy || 'MISSING'}`);
    
    if (permissionsPolicy) {
      const hasCorrectGeo = permissionsPolicy.includes('geolocation=(self)');
      const hasOldBlocking = permissionsPolicy.includes('geolocation=()');
      
      console.log('');
      console.log('🔍 PERMISSIONS POLICY ANALYSIS:');
      console.log(`   ✅ Correct geolocation=(self): ${hasCorrectGeo ? 'YES' : 'NO'}`);
      console.log(`   ❌ Old blocking geolocation=(): ${hasOldBlocking ? 'YES' : 'NO'}`);
      
      if (hasCorrectGeo && !hasOldBlocking) {
        console.log('');
        console.log('🎉 SUCCESS: PROTOCOL VIOLATION RESOLVED!');
        console.log('   Cloudflare headers have been fixed');
      } else if (hasOldBlocking) {
        console.log('');
        console.log('❌ STILL BLOCKED: Old policy still active');
        console.log('   Need to find correct Cloudflare setting');
      }
    } else {
      console.log('');
      console.log('❌ NO PERMISSIONS POLICY FOUND');
      console.log('   Cloudflare may not be setting this header');
    }
  });

  req.on('error', (error) => {
    console.log('❌ Connection failed:', error.message);
  });

  req.end();
}

console.log('⏱️  Testing in 3 seconds...');
setTimeout(testHeaders, 3000);