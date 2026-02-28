#!/usr/bin/env node

const https = require('https');

console.log('🚀 QUICK DEPLOYMENT STATUS CHECK');
console.log('================================\n');

function checkDeployment() {
  const options = {
    hostname: 'www.khesed-tek-systems.org',
    path: '/',
    method: 'HEAD',
    timeout: 10000
  };

  const req = https.request(options, (res) => {
    const permissionsPolicy = res.headers['permissions-policy'];
    
    console.log(`📡 Production Status: ${res.statusCode}`);
    console.log(`🔒 Permissions-Policy: ${permissionsPolicy || 'MISSING'}\n`);
    
    if (permissionsPolicy) {
      const hasFixed = permissionsPolicy.includes('geolocation=(self)');
      const hasOldBroken = permissionsPolicy.includes('geolocation=()');
      
      if (hasFixed && !hasOldBroken) {
        console.log('✅ PROTOCOL VIOLATION RESOLVED!');
        console.log('   Emergency fix is LIVE in production');
        console.log('   Form functionality should now work');
      } else if (hasOldBroken) {
        console.log('❌ PROTOCOL VIOLATION STILL PRESENT');
        console.log('   Old blocking policy still active');
        console.log('   Deployment may be pending');
      } else {
        console.log('⚠️  UNKNOWN STATE');
        console.log('   Policy exists but format unexpected');
      }
    } else {
      console.log('❌ NO PERMISSIONS POLICY FOUND');
      console.log('   Configuration may not be applying');
    }
    
    console.log('\nNext: Check Vercel dashboard for deployment status');
  });

  req.on('error', (error) => {
    console.log(`❌ CONNECTION FAILED: ${error.message}`);
  });

  req.end();
}

checkDeployment();