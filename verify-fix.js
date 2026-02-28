#!/usr/bin/env node

const https = require('https');

console.log('🔍 PROTOCOL VIOLATION VERIFICATION');
console.log('==================================');

const options = {
  hostname: 'www.khesed-tek-systems.org',
  method: 'HEAD',
  timeout: 10000
};

console.log('📡 Testing headers...');

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  
  const permissionsPolicy = res.headers['permissions-policy'];
  console.log('Permissions-Policy:', permissionsPolicy || 'MISSING');
  
  if (permissionsPolicy) {
    const hasCorrectGeo = permissionsPolicy.includes('geolocation=(self)');
    const hasOldBlocking = permissionsPolicy.includes('geolocation=()');
    
    console.log('\nANALYSIS:');
    console.log('- Has geolocation=(self):', hasCorrectGeo);
    console.log('- Has old geolocation=():', hasOldBlocking);
    
    if (hasCorrectGeo && !hasOldBlocking) {
      console.log('\n🎉 SUCCESS! PROTOCOL VIOLATION RESOLVED!');
      console.log('✅ Cloudflare security headers are working');
      console.log('✅ Form functionality should now work');
    } else if (hasOldBlocking) {
      console.log('\n⏳ PARTIAL: Still has blocking policy');
      console.log('💭 May need a few minutes for CDN propagation');
    } else {
      console.log('\n❓ UNKNOWN: Different policy format');
    }
  } else {
    console.log('\n⚠️  NO PERMISSIONS POLICY HEADER');
    console.log('May need more time for changes to propagate');
  }
});

req.on('error', (error) => {
  console.log('❌ ERROR:', error.message);
});

req.setTimeout(10000, () => {
  console.log('⏱️  Request timed out');
  req.destroy();
});

req.end();