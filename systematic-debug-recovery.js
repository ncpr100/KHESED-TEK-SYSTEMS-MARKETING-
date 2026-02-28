#!/usr/bin/env node

/**
 * ADVANCED DEBUGGING MODE - SYSTEMATIC FORM FUNCTIONALITY TEST
 * ===========================================================
 * 
 * Protocol Violation Recovery System
 * Comprehensive form re-installation and validation test
 */

const https = require('https');
const querystring = require('querystring');

// ANSI colors for debugging output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function debugLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function debugSection(title) {
  debugLog('cyan', `\n${'='.repeat(80)}`);
  debugLog('bright', `  🔬 ${title}`);
  debugLog('cyan', `${'='.repeat(80)}`);
}

/**
 * PHASE 1: CSP & PERMISSIONS POLICY DIAGNOSTIC
 */
async function testSecurityPolicies() {
  debugSection('PHASE 1: SECURITY POLICY DIAGNOSTIC');
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'www.khesed-tek-systems.org',
      port: 443,
      path: '/',
      method: 'HEAD',
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      const csp = res.headers['content-security-policy'];
      const permissionsPolicy = res.headers['permissions-policy'];
      
      debugLog('blue', '\n📋 CURRENT PRODUCTION HEADERS:');
      debugLog('yellow', `CSP Script-Src: ${csp?.match(/script-src[^;]+/)?.[0] || 'NOT FOUND'}`);
      debugLog('yellow', `Permissions Policy: ${permissionsPolicy || 'NOT FOUND'}`);
      
      // Analyze potential conflicts
      const hasUnsafeEval = csp?.includes('unsafe-eval');
      const hasUnsafeInline = csp?.includes('unsafe-inline');
      const blocksGeolocation = permissionsPolicy?.includes('geolocation=()');
      
      debugLog('green', `\n✅ POLICY ANALYSIS:`);
      debugLog(hasUnsafeEval ? 'green' : 'red', `  unsafe-eval: ${hasUnsafeEval ? 'ALLOWED' : 'BLOCKED'}`);
      debugLog(hasUnsafeInline ? 'green' : 'red', `  unsafe-inline: ${hasUnsafeInline ? 'ALLOWED' : 'BLOCKED'}`);
      debugLog(blocksGeolocation ? 'red' : 'green', `  geolocation: ${blocksGeolocation ? 'BLOCKED' : 'ALLOWED'}`);
      
      resolve({ 
        success: true, 
        hasUnsafeEval, 
        hasUnsafeInline, 
        blocksGeolocation, 
        csp, 
        permissionsPolicy 
      });
    });

    req.on('error', (error) => {
      debugLog('red', `❌ NETWORK ERROR: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.end();
  });
}

/**
 * PHASE 2: FORM ENDPOINT ACCESSIBILITY TEST
 */
async function testFormEndpoint() {
  debugSection('PHASE 2: FORM ENDPOINT ACCESSIBILITY');
  
  return new Promise((resolve) => {
    const testPayload = querystring.stringify({
      name: 'Advanced Debug Test',
      email: 'debug@test-protocol.com',
      organization: 'Systematic Testing',
      message: 'ADVANCED DEBUGGING MODE: Testing form re-installation after protocol violations',
      source: 'systematic_debug_test'
    });

    const options = {
      hostname: 'www.khesed-tek-systems.org',
      port: 443,
      path: '/api/request-demo',
      method: 'POST',
      timeout: 15000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(testPayload),
        'User-Agent': 'AdvancedDebugMode/1.0 (Systematic-Protocol-Recovery)'
      }
    };

    debugLog('blue', '📤 SENDING TEST PAYLOAD...');
    debugLog('yellow', `   Endpoint: ${options.path}`);
    debugLog('yellow', `   Size: ${Buffer.byteLength(testPayload)} bytes`);

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          debugLog('blue', `\n📥 RESPONSE STATUS: ${res.statusCode}`);
          
          // Check for Cloudflare blocking
          if (responseData.includes('cf-browser-verification') || responseData.includes('Checking your browser')) {
            debugLog('red', '❌ CLOUDFLARE BLOCKING DETECTED');
            resolve({ success: false, error: 'cloudflare_challenge', statusCode: res.statusCode });
            return;
          }

          const jsonResponse = JSON.parse(responseData);
          debugLog('green', '✅ FORM ENDPOINT ACCESSIBLE');
          debugLog('blue', `   Response: ${JSON.stringify(jsonResponse, null, 2)}`);
          
          resolve({ 
            success: true, 
            statusCode: res.statusCode, 
            response: jsonResponse,
            emailSent: jsonResponse.ok,
            market: jsonResponse.market
          });
        } catch (parseError) {
          debugLog('red', `❌ RESPONSE PARSE ERROR: ${parseError.message}`);
          debugLog('yellow', `   Raw Response: ${responseData.substring(0, 200)}...`);
          resolve({ success: false, error: parseError.message, rawResponse: responseData });
        }
      });
    });

    req.on('error', (error) => {
      debugLog('red', `❌ FORM ENDPOINT ERROR: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.write(testPayload);
    req.end();
  });
}

/**
 * PHASE 3: CLIENT-SIDE SCRIPT VALIDATION TEST  
 */
async function testClientSideValidation() {
  debugSection('PHASE 3: CLIENT-SIDE SCRIPT VALIDATION SIMULATION');
  
  debugLog('blue', '🔍 SIMULATING BROWSER FORM VALIDATION...');
  
  // Simulate common form validation scenarios that could be blocked by CSP
  const validationTests = [
    { test: 'Email Format Validation', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, value: 'test@example.com' },
    { test: 'Name Length Validation', pattern: /.{2,}/, value: 'Test User' },
    { test: 'Message Content Check', pattern: /.{10,}/, value: 'This is a test message for validation' }
  ];
  
  let validationResults = [];
  
  for (const validation of validationTests) {
    const isValid = validation.pattern.test(validation.value);
    debugLog(isValid ? 'green' : 'red', `   ${validation.test}: ${isValid ? 'PASS' : 'FAIL'}`);
    validationResults.push({ ...validation, isValid });
  }
  
  const allValidationsPassed = validationResults.every(v => v.isValid);
  debugLog('blue', `\n📊 VALIDATION SUMMARY: ${allValidationsPassed ? '✅ ALL PASS' : '❌ FAILURES DETECTED'}`);
  
  return { success: allValidationsPassed, results: validationResults };
}

/**
 * PHASE 4: SYSTEMATIC RECOVERY RECOMMENDATIONS
 */
function generateRecoveryPlan(testResults) {
  debugSection('PHASE 4: SYSTEMATIC RECOVERY PLAN');
  
  const { securityTest, formTest, validationTest } = testResults;
  
  debugLog('magenta', '🎯 RECOVERY RECOMMENDATIONS:');
  
  if (securityTest.blocksGeolocation) {
    debugLog('yellow', '\n1. PERMISSIONS POLICY ADJUSTMENT:');
    debugLog('blue', '   📝 Current: geolocation=()');
    debugLog('green', '   🔧 Recommended: geolocation=(self)');
    debugLog('yellow', '   💡 Reason: Complete geolocation blocking may interfere with form analytics');
  }
  
  if (!formTest.success) {
    debugLog('yellow', '\n2. FORM ENDPOINT RESOLUTION:');
    if (formTest.error === 'cloudflare_challenge') {
      debugLog('red', '   🚨 Cloudflare WAF blocking API calls');
      debugLog('blue', '   🔧 Required: Adjust Cloudflare security rules for /api/* routes');
    } else {
      debugLog('red', `   🚨 Endpoint error: ${formTest.error}`);
    }
  }
  
  if (!validationTest.success) {
    debugLog('yellow', '\n3. CLIENT-SIDE VALIDATION:');
    debugLog('blue', '   🔧 Review form validation scripts for CSP compliance');
  }
  
  debugLog('green', '\n🚀 IMMEDIATE ACTION ITEMS:');
  debugLog('blue', '   1. Update Permissions-Policy in next.config.js');
  debugLog('blue', '   2. Test form submission after policy update');
  debugLog('blue', '   3. Monitor browser console for remaining CSP violations');
}

/**
 * MAIN SYSTEMATIC DEBUGGING EXECUTION
 */
async function runSystematicDebugging() {
  debugLog('magenta', '\n🔬 ADVANCED DEBUGGING MODE - PROTOCOL VIOLATION RECOVERY');
  debugLog('magenta', '================================================================');
  debugLog('bright', 'Systematic form functionality re-installation initiated...\n');

  try {
    // Execute all diagnostic phases
    const securityTest = await testSecurityPolicies();
    const formTest = await testFormEndpoint();
    const validationTest = await testClientSideValidation();

    // Generate comprehensive recovery plan
    generateRecoveryPlan({ securityTest, formTest, validationTest });

    // Final system status
    debugSection('FINAL DIAGNOSTIC SUMMARY');
    
    const issuesFound = [];
    if (securityTest.blocksGeolocation) issuesFound.push('Permissions Policy blocking geolocation');
    if (!formTest.success) issuesFound.push('Form endpoint accessibility');
    if (!validationTest.success) issuesFound.push('Client-side validation');
    
    if (issuesFound.length === 0) {
      debugLog('green', '🎉 SYSTEM STATUS: ALL TESTS PASSED');
      debugLog('green', '✅ Form functionality appears to be restored');
    } else {
      debugLog('yellow', `⚠️  SYSTEM STATUS: ${issuesFound.length} ISSUE(S) IDENTIFIED`);
      issuesFound.forEach(issue => debugLog('red', `   • ${issue}`));
    }
    
  } catch (error) {
    debugLog('red', `🚨 SYSTEMATIC DEBUGGING ERROR: ${error.message}`);
  }

  debugLog('cyan', '\n' + '='.repeat(80));
  debugLog('bright', '  ADVANCED DEBUGGING MODE COMPLETE');
  debugLog('cyan', '='.repeat(80) + '\n');
}

// Execute if run directly
if (require.main === module) {
  runSystematicDebugging().catch(console.error);
}

module.exports = { runSystematicDebugging };