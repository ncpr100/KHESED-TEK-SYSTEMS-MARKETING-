#!/usr/bin/env node

const https = require('https');

console.log('🔍 CHECKING PROTOCOL VIOLATION STATUS...\n');

const req = https.request({
  hostname: 'www.khesed-tek-systems.org', 
  method: 'HEAD',
  timeout: 10000
}, (res) => {
  const policy = res.headers['permissions-policy'];
  console.log(`Status: ${res.statusCode}`);
  console.log(`Policy: ${policy || 'MISSING'}\n`);
  
  if (policy?.includes('geolocation=(self)')) {
    console.log('✅ PROTOCOL VIOLATION RESOLVED!');
    console.log('   Form functionality restored');
  } else {
    console.log('⏳ Still deploying or needs investigation');
    console.log('   Check Vercel dashboard for deployment status');
  }
});

req.on('error', (err) => console.log('❌ Connection error:', err.message));
req.end();