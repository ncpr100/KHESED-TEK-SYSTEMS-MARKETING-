#!/usr/bin/env node

/**
 * ENTERPRISE COMPLIANCE AUDIT - SYSTEMATIC VERIFICATION
 * ====================================================
 * 
 * Collecting critical diagnostic data for gap analysis
 */

const https = require('https');

console.log('🔍 ENTERPRISE AUDIT - SYSTEMATIC VERIFICATION');
console.log('='.repeat(50));
console.log('🕐 Timestamp:', new Date().toISOString());
console.log('='.repeat(50));

// Test 1: Production Headers Analysis
function auditProductionHeaders() {
  return new Promise((resolve) => {
    console.log('\n📋 AUDIT 1: PRODUCTION HEADERS ANALYSIS');
    console.log('-'.repeat(50));
    
    const req = https.request({
      hostname: 'www.khesed-tek-systems.org',
      path: '/',
      method: 'HEAD',
      timeout: 15000
    }, (res) => {
      const headers = res.headers;
      
      console.log(`✅ Connection Status: ${res.statusCode}`);
      console.log(`🖥️  Server: ${headers.server || 'Not specified'}`);
      console.log(`🔒 Permissions-Policy: ${headers['permissions-policy'] || 'MISSING'}`);
      console.log(`🛡️  CSP: ${headers['content-security-policy'] ? 'Present' : 'MISSING'}`);
      console.log(`🌐 Via: ${headers.via || 'Not specified'}`);
      console.log(`☁️  CF-Ray: ${headers['cf-ray'] || 'Not specified'}`);
      
      // CRITICAL: Check if our fix is live
      const permissionsPolicy = headers['permissions-policy'];
      const hasCorrectGeolocation = permissionsPolicy?.includes('geolocation=(self)');
      const hasOldBlockingPolicy = permissionsPolicy?.includes('geolocation=()');
      
      console.log('\n🎯 PERMISSIONS POLICY VALIDATION:');
      console.log(`   Expected Fix Present: ${hasCorrectGeolocation ? 'YES' : 'NO'}`);
      console.log(`   Old Blocking Policy: ${hasOldBlockingPolicy ? 'STILL PRESENT' : 'REMOVED'}`);
      
      resolve({
        headers,
        fixDeployed: hasCorrectGeolocation && !hasOldBlockingPolicy,
        permissionsPolicy,
        statusCode: res.statusCode
      });
    });

    req.on('error', (error) => {
      console.log(`❌ AUDIT 1 FAILED: ${error.message}`);
      resolve({ error: error.message, success: false });
    });

    req.end();
  });
}

// Test 2: Form API Endpoint Accessibility
function auditFormAPI() {
  return new Promise((resolve) => {
    console.log('\n📋 AUDIT 2: FORM API ACCESSIBILITY');
    console.log('-'.repeat(50));
    
    const testData = JSON.stringify({
      name: 'Enterprise Audit Test',
      email: 'audit@compliance.test',
      organization: 'Systematic Verification Protocol',
      message: 'ENTERPRISE AUDIT: Testing form endpoint accessibility post-deployment',
      source: 'enterprise_compliance_audit'
    });

    const req = https.request({
      hostname: 'www.khesed-tek-systems.org',
      path: '/api/request-demo',
      method: 'POST',
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(testData),
        'User-Agent': 'Enterprise-Audit/1.0'
      }
    }, (res) => {
      let responseData = '';
      
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        console.log(`📡 API Response: ${res.statusCode}`);
        console.log(`📦 Content-Type: ${res.headers['content-type'] || 'Not specified'}`);
        
        // Check for blocking scenarios
        if (responseData.includes('cf-browser-verification') || responseData.includes('Checking your browser')) {
          console.log('🚨 CLOUDFLARE BLOCKING DETECTED');
          console.log('   API calls are being intercepted by Cloudflare WAF');
          resolve({ 
            blocked: true, 
            cause: 'cloudflare_waf', 
            statusCode: res.statusCode,
            response: responseData.substring(0, 200) + '...'
          });
          return;
        }

        try {
          const jsonResponse = JSON.parse(responseData);
          console.log(`✅ API Response: ${JSON.stringify(jsonResponse, null, 2)}`);
          resolve({ 
            success: res.statusCode === 200, 
            statusCode: res.statusCode, 
            response: jsonResponse 
          });
        } catch (parseError) {
          console.log(`⚠️  Response Parse Error: ${parseError.message}`);
          console.log(`📄 Raw Response (first 300 chars): ${responseData.substring(0, 300)}...`);
          resolve({ 
            parseError: parseError.message, 
            statusCode: res.statusCode, 
            rawResponse: responseData.substring(0, 300) 
          });
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ AUDIT 2 FAILED: ${error.message}`);
      resolve({ error: error.message, success: false });
    });

    req.write(testData);
    req.end();
  });
}

// Test 3: Browser Console Simulation
function auditBrowserCompliance() {
  console.log('\n📋 AUDIT 3: BROWSER COMPLIANCE SIMULATION');
  console.log('-'.repeat(50));
  
  // Simulate browser geolocation API calls that might be blocked
  console.log('🌍 Simulating geolocation API access patterns...');
  console.log('   navigator.geolocation.getCurrentPosition() - Would this be blocked?');
  console.log('   Based on Permissions-Policy header analysis above');
  
  return Promise.resolve({ simulated: true });
}

// Main audit execution
async function runEnterpriseAudit() {
  try {
    const headerAudit = await auditProductionHeaders();
    const apiAudit = await auditFormAPI();
    const browserAudit = await auditBrowserCompliance();
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 ENTERPRISE AUDIT SUMMARY');
    console.log('='.repeat(50));
    
    console.log('\n🔍 CRITICAL FINDINGS:');
    
    if (headerAudit.fixDeployed) {
      console.log('✅ PERMISSIONS POLICY FIX: DEPLOYED SUCCESSFULLY');
      console.log(`   Current Policy: ${headerAudit.permissionsPolicy}`);
    } else {
      console.log('❌ PERMISSIONS POLICY FIX: NOT EFFECTIVE');
      console.log(`   Current Policy: ${headerAudit.permissionsPolicy || 'MISSING'}`);
      console.log('   🚨 CRITICAL: Our Vercel configuration may be overridden');
    }
    
    if (apiAudit.success) {
      console.log('✅ FORM API: ACCESSIBLE');
    } else if (apiAudit.blocked) {
      console.log('❌ FORM API: BLOCKED BY CLOUDFLARE WAF');
      console.log('   🚨 CRITICAL: Security rules preventing API access');
    } else {
      console.log('❌ FORM API: ENDPOINT ERROR');
      console.log(`   Status: ${apiAudit.statusCode || 'Unknown'}`);
      console.log(`   Error: ${apiAudit.error || apiAudit.parseError || 'Unknown error'}`);
    }
    
    console.log('\n🎯 ROOT CAUSE ANALYSIS:');
    
    if (!headerAudit.fixDeployed) {
      console.log('🔴 PRIMARY ISSUE: Permissions Policy fix not effective');
      console.log('   Possible causes:');
      console.log('   • Cloudflare overriding Vercel headers');
      console.log('   • CDN cache not updated');  
      console.log('   • Additional configuration conflicts');
    }
    
    if (apiAudit.blocked) {
      console.log('🔴 SECONDARY ISSUE: Cloudflare WAF blocking API calls');
      console.log('   Required: Cloudflare WAF rule adjustment for /api/* routes');
    }
    
    return {
      headerAudit,
      apiAudit,
      browserAudit
    };
    
  } catch (error) {
    console.log(`🚨 AUDIT FAILED: ${error.message}`);
    return { error: error.message };
  }
}

runEnterpriseAudit().then(results => {
  console.log('\n' + '='.repeat(50));
  console.log('🏁 ENTERPRISE AUDIT COMPLETE');
  console.log('='.repeat(50));
  process.exit(0);
}).catch(error => {
  console.log(`🚨 FATAL AUDIT ERROR: ${error.message}`);
  process.exit(1);
});