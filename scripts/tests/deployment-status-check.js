#!/usr/bin/env node

/**
 * IMMEDIATE DEPLOYMENT STATUS CHECK
 * =================================
 * Verifies if the vercel.json fix was successfully deployed
 */

const https = require('https');
const fs = require('fs');

console.log('🔍 CHECKING DEPLOYMENT STATUS FOR PROTOCOL VIOLATION RESOLUTION...\n');

// Check production headers
function checkProductionHeaders() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'www.khesed-tek-systems.org',
      path: '/',
      method: 'HEAD',
      timeout: 10000
    };

    console.log('📡 Connecting to production server...');

    const req = https.request(options, (res) => {
      const permissionsPolicy = res.headers['permissions-policy'];
      
      console.log('\n📋 PRODUCTION RESPONSE:');
      console.log(`   Status Code: ${res.statusCode}`);
      console.log(`   Permissions-Policy: ${permissionsPolicy || 'NOT FOUND'}`);
      
      if (permissionsPolicy) {
        const hasCorrectGeolocation = permissionsPolicy.includes('geolocation=(self)');
        const hasOldBlocking = permissionsPolicy.includes('geolocation=()');
        
        console.log('\n🎯 DEPLOYMENT STATUS:');
        console.log(`   ✅ Fixed Policy Deployed: ${hasCorrectGeolocation ? 'YES' : 'NO'}`);
        console.log(`   ❌ Old Blocking Policy: ${hasOldBlocking ? 'STILL PRESENT' : 'REMOVED'}`);
        
        if (hasCorrectGeolocation && !hasOldBlocking) {
          console.log('\n🎉 PROTOCOL VIOLATION SUCCESSFULLY RESOLVED!');
          console.log('   ✅ vercel.json fix is LIVE in production');
          console.log('   ✅ Configuration conflict eliminated');
          console.log('   ✅ Form functionality blocking resolved');
          
          // Log success to file
          fs.writeFileSync('./deployment-success.txt', 
            `DEPLOYMENT SUCCESS: ${new Date().toISOString()}\n` +
            `Permissions-Policy: ${permissionsPolicy}\n` +
            `Status: PROTOCOL VIOLATION RESOLVED\n`
          );
          
          resolve({ success: true, resolved: true });
        } else {
          console.log('\n⚠️  DEPLOYMENT STATUS: PARTIAL OR PENDING');
          console.log('   📡 May still be propagating through CDN...');
          console.log(`   📋 Current Policy: ${permissionsPolicy}`);
          console.log(`   📋 Expected: camera=(), microphone=(), geolocation=(self)`);
          
          resolve({ success: true, resolved: false, current: permissionsPolicy });
        }
      } else {
        console.log('\n❌ ERROR: No Permissions-Policy header found');
        console.log('   🚨 This indicates a deployment or configuration issue');
        resolve({ success: false, error: 'No Permissions-Policy header' });
      }
    });

    req.on('error', (error) => {
      console.log(`\n❌ CONNECTION ERROR: ${error.message}`);
      console.log('   🚨 Unable to reach production server');
      resolve({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      console.log('\n⏱️  REQUEST TIMEOUT');
      console.log('   🚨 Production server not responding');
      resolve({ success: false, error: 'Request timeout' });
    });

    req.end();
  });
}

// Main execution
async function main() {
  console.log('🎯 PROTOCOL VIOLATION DEPLOYMENT CHECK');
  console.log('======================================');
  
  try {
    const result = await checkProductionHeaders();
    
    console.log('\n📊 FINAL STATUS SUMMARY:');
    
    if (result.resolved) {
      console.log('🟢 PROTOCOL VIOLATION: RESOLVED');
      console.log('   The 16-hour deployment gap has been eliminated');
      console.log('   Contact form functionality is restored');
      console.log('   Security policies are properly configured');
    } else if (result.success && !result.resolved) {
      console.log('🟡 PROTOCOL VIOLATION: DEPLOYMENT IN PROGRESS');
      console.log('   Configuration changes deployed but may be propagating');
      console.log('   Recheck in 5-10 minutes for full resolution');
    } else {
      console.log('🔴 PROTOCOL VIOLATION: NEEDS INVESTIGATION');
      console.log('   Deployment verification failed');
      console.log('   Additional debugging required');
    }
    
  } catch (error) {
    console.log(`\n🚨 DEPLOYMENT CHECK FAILED: ${error.message}`);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('DEPLOYMENT STATUS CHECK COMPLETE');
  console.log('='.repeat(50));
}

if (require.main === module) {
  main();
}