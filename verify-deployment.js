#!/usr/bin/env node

/**
 * PRODUCTION DEPLOYMENT VERIFICATION
 * ==================================
 * Confirms our Advanced Debugging Protocol fix is live
 */

const https = require('https');

function verifyProductionDeployment() {
  console.log('🔍 VERIFYING PRODUCTION DEPLOYMENT...\n');
  
  const options = {
    hostname: 'www.khesed-tek-systems.org',
    path: '/',
    method: 'HEAD',
    timeout: 10000
  };

  const req = https.request(options, (res) => {
    const permissionsPolicy = res.headers['permissions-policy'];
    
    console.log('📋 PRODUCTION HEADERS CHECK:');
    console.log(`   Permissions-Policy: ${permissionsPolicy || 'NOT FOUND'}\n`);
    
    if (permissionsPolicy) {
      const hasUpdatedGeolocation = permissionsPolicy.includes('geolocation=(self)');
      const hasOldBlocking = permissionsPolicy.includes('geolocation=()');
      
      console.log('🎯 SYSTEMATIC FIX STATUS:');
      console.log(`   ✅ Updated Policy Deployed: ${hasUpdatedGeolocation ? 'YES' : 'NO'}`);
      console.log(`   ❌ Old Blocking Removed: ${!hasOldBlocking ? 'YES' : 'NO'}`);
      
      if (hasUpdatedGeolocation && !hasOldBlocking) {
        console.log('\n🎉 SUCCESS: Advanced Debugging Protocol fix IS LIVE in production!');
        console.log('   Form functionality blocking has been systematically resolved.');
      } else {
        console.log('\n⚠️  PENDING: Deployment may still be propagating...');
        console.log('   Expected: geolocation=(self)');
        console.log(`   Current:  ${permissionsPolicy}`);
      }
    } else {
      console.log('❌ ERROR: Unable to retrieve Permissions-Policy header');
    }
  });

  req.on('error', (error) => {
    console.log(`❌ DEPLOYMENT CHECK FAILED: ${error.message}`);
  });

  req.end();
}

verifyProductionDeployment();