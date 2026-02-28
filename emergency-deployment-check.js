#!/usr/bin/env node

/**
 * EMERGENCY DEPLOYMENT VERIFICATION
 * ==================================
 * Direct production check with extended timeouts
 */

const https = require('https');

console.log('🚨 EMERGENCY DEPLOYMENT VERIFICATION');
console.log('====================================\n');

// Extended timeout verification
function emergencyCheck() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'www.khesed-tek-systems.org',
      port: 443,
      path: '/',
      method: 'HEAD',
      timeout: 30000, // Extended 30 second timeout
      headers: {
        'User-Agent': 'Emergency-Protocol-Verification/1.0',
        'Accept': '*/*'
      }
    };

    console.log('🌐 Attempting extended timeout connection (30s)...');
    console.log(`   Target: ${options.hostname}`);
    console.log(`   Method: ${options.method}`);
    console.log(`   Timeout: ${options.timeout}ms\n`);

    const startTime = Date.now();

    const req = https.request(options, (res) => {
      const responseTime = Date.now() - startTime;
      
      console.log('✅ CONNECTION SUCCESSFUL');
      console.log(`   Response Time: ${responseTime}ms`);
      console.log(`   Status Code: ${res.statusCode}\n`);
      
      // Get all security headers
      const permissionsPolicy = res.headers['permissions-policy'];
      const csp = res.headers['content-security-policy'];
      const serverHeader = res.headers['server'];
      
      console.log('📋 PRODUCTION HEADERS ANALYSIS:');
      console.log(`   Server: ${serverHeader || 'Not specified'}`);
      console.log(`   Permissions-Policy: ${permissionsPolicy || 'MISSING'}`);
      console.log(`   CSP Present: ${csp ? 'YES' : 'NO'}\n`);
      
      if (permissionsPolicy) {
        console.log('🔍 PERMISSIONS POLICY ANALYSIS:');
        
        // Check exact policy components
        const hasCamera = permissionsPolicy.includes('camera=()');
        const hasMicrophone = permissionsPolicy.includes('microphone=()');
        const hasGeolocationSelf = permissionsPolicy.includes('geolocation=(self)');
        const hasGeolocationBlocked = permissionsPolicy.includes('geolocation=()');
        
        console.log(`   Camera Blocked: ${hasCamera ? 'YES' : 'NO'}`);
        console.log(`   Microphone Blocked: ${hasMicrophone ? 'YES' : 'NO'}`);
        console.log(`   Geolocation (self): ${hasGeolocationSelf ? 'YES' : 'NO'}`);
        console.log(`   Geolocation Blocked: ${hasGeolocationBlocked ? 'YES' : 'NO'}\n`);
        
        // Determine deployment status
        if (hasGeolocationSelf && !hasGeolocationBlocked) {
          console.log('🎉 PROTOCOL VIOLATION RESOLUTION: SUCCESSFUL');
          console.log('   ✅ vercel.json fix has been deployed');
          console.log('   ✅ Geolocation policy allows same-origin');
          console.log('   ✅ Form functionality blocking eliminated\n');
          
          console.log('📈 SYSTEM STATUS: OPERATIONAL');
          resolve({ success: true, resolved: true, policy: permissionsPolicy });
          
        } else if (hasGeolocationBlocked) {
          console.log('❌ PROTOCOL VIOLATION: STILL PRESENT');
          console.log('   🚨 Geolocation is still completely blocked');
          console.log('   🚨 vercel.json fix not yet deployed or effective');
          console.log('   🚨 Form functionality may still be blocked\n');
          
          console.log('💡 POSSIBLE CAUSES:');
          console.log('   • Deployment pipeline delay or failure');
          console.log('   • CDN cache not yet updated');
          console.log('   • Additional configuration file conflicts');
          console.log('   • Build/deployment process errors\n');
          
          resolve({ success: true, resolved: false, policy: permissionsPolicy });
          
        } else {
          console.log('⚠️  UNKNOWN POLICY STATE');
          console.log(`   Current Policy: ${permissionsPolicy}`);
          console.log('   Unable to determine exact deployment status\n');
          
          resolve({ success: true, resolved: 'unknown', policy: permissionsPolicy });
        }
        
      } else {
        console.log('❌ CRITICAL: NO PERMISSIONS POLICY FOUND');
        console.log('   This indicates a severe configuration issue');
        console.log('   Security headers may not be applying correctly\n');
        
        resolve({ success: false, error: 'No Permissions-Policy header' });
      }
    });

    req.on('error', (error) => {
      const responseTime = Date.now() - startTime;
      
      console.log(`❌ CONNECTION FAILED after ${responseTime}ms`);
      console.log(`   Error: ${error.message}`);
      console.log('   This could indicate:\n');
      console.log('   • Network connectivity issues');
      console.log('   • Production server problems');
      console.log('   • DNS resolution failures');
      console.log('   • Firewall/security blocking\n');
      
      resolve({ success: false, error: error.message, responseTime });
    });

    req.on('timeout', () => {
      console.log('⏱️  EXTENDED TIMEOUT (30s) EXCEEDED');
      console.log('   This indicates severe production server issues\n');
      req.destroy();
      resolve({ success: false, error: 'Extended timeout', responseTime: 30000 });
    });

    req.end();
  });
}

// Main execution
async function main() {
  try {
    const result = await emergencyCheck();
    
    console.log('📊 EMERGENCY VERIFICATION SUMMARY:');
    console.log('=====================================');
    
    if (result.resolved === true) {
      console.log('🟢 STATUS: PROTOCOL VIOLATION RESOLVED');
      console.log('   The deployment was successful');
    } else if (result.resolved === false) {
      console.log('🔴 STATUS: PROTOCOL VIOLATION PERSISTS');
      console.log('   Additional action required');
    } else if (result.success === false) {
      console.log('🟠 STATUS: VERIFICATION FAILED');
      console.log('   Cannot determine deployment status');
    } else {
      console.log('🟡 STATUS: INCONCLUSIVE');
      console.log('   Manual inspection required');
    }
    
    return result;
    
  } catch (error) {
    console.log(`🚨 EMERGENCY CHECK FAILED: ${error.message}`);
    return { success: false, error: error.message };
  }
}

if (require.main === module) {
  main().then(result => {
    process.exit(result.success && result.resolved ? 0 : 1);
  });
}