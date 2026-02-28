#!/usr/bin/env node

const https = require('https');

console.log('CRITICAL DIAGNOSTIC - PRODUCTION HEADERS');
console.log('========================================');

https.request({
  hostname: 'www.khesed-tek-systems.org',
  method: 'HEAD',
  timeout: 10000
}, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Permissions-Policy: ${res.headers['permissions-policy'] || 'MISSING'}`);
  console.log(`Content-Security-Policy: ${res.headers['content-security-policy'] ? 'Present' : 'Missing'}`);
  console.log(`Server: ${res.headers.server || 'Unknown'}`);
  console.log(`CF-Ray: ${res.headers['cf-ray'] || 'Not Cloudflare'}`);
  
  const policy = res.headers['permissions-policy'];
  if (policy) {
    const hasFixed = policy.includes('geolocation=(self)');
    const hasOldBroken = policy.includes('geolocation=()');
    console.log(`\nFIX STATUS: ${hasFixed ? 'DEPLOYED' : 'NOT DEPLOYED'}`);
    console.log(`OLD POLICY: ${hasOldBroken ? 'STILL PRESENT' : 'REMOVED'}`);
  }
}).on('error', (err) => {
  console.log(`ERROR: ${err.message}`);
}).end();