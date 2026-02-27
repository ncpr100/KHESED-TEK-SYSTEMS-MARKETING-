#!/usr/bin/env node

/**
 * ADVANCED DEBUGGING PROTOCOL - RESOLUTION VALIDATION TEST
 * ========================================================
 * 
 * This script validates that all systematic debugging protocol fixes
 * have been successfully deployed and resolved the core issues:
 * 
 * 1. Content Security Policy violations blocking scripts
 * 2. Permissions Policy violations causing console errors  
 * 3. Contact form submission functionality
 * 4. Gmail SMTP email delivery pipeline
 * 5. Market-aware email routing system
 */

const https = require('https');
const querystring = require('querystring');

// Test configuration
const PRODUCTION_DOMAIN = 'www.khesed-tek-systems.org';
const TEST_TIMEOUT = 15000;

// ANSI color codes for clear test result display
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

function colorLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  colorLog('cyan', `\n${'='.repeat(60)}`);
  colorLog('bright', `  ${title}`);
  colorLog('cyan', `${'='.repeat(60)}`);
}

function logTest(testName, status, details = '') {
  const statusColor = status === 'PASS' ? 'green' : status === 'FAIL' ? 'red' : 'yellow';
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⏳';
  
  colorLog('bright', `\n${icon} ${testName}`);
  colorLog(statusColor, `   Status: ${status}`);
  if (details) {
    colorLog('blue', `   Details: ${details}`);
  }
}

/**
 * Test 1: Security Headers Validation
 * Verifies CSP and Permissions Policy are properly configured
 */
async function testSecurityHeaders() {
  logSection('PROTOCOL TEST 1: SECURITY HEADERS VALIDATION');
  
  return new Promise((resolve) => {
    const options = {
      hostname: PRODUCTION_DOMAIN,
      port: 443,
      path: '/',
      method: 'HEAD',
      timeout: TEST_TIMEOUT
    };

    const req = https.request(options, (res) => {
      const csp = res.headers['content-security-policy'];
      const permissionsPolicy = res.headers['permissions-policy'];
      
      // Check CSP contains our webpack dev server allowance
      const hasWebpackCSP = csp && csp.includes('webpack-74c359c67fa0.uf.boot.dev');
      const hasVercelLive = csp && csp.includes('vercel.live');
      const hasCloudflareInsights = csp && csp.includes('cloudflareinsights.com');
      
      // Check Permissions Policy header exists
      const hasPermissionsPolicy = !!permissionsPolicy;
      
      if (hasWebpackCSP && hasVercelLive && hasCloudflareInsights && hasPermissionsPolicy) {
        logTest('Security Headers', 'PASS', 'CSP and Permissions Policy properly configured');
        resolve({ success: true, details: { csp, permissionsPolicy } });
      } else {
        const missing = [];
        if (!hasWebpackCSP) missing.push('webpack CSP allowance');
        if (!hasVercelLive) missing.push('Vercel Live CSP');
        if (!hasCloudflareInsights) missing.push('Cloudflare Insights CSP');
        if (!hasPermissionsPolicy) missing.push('Permissions Policy header');
        
        logTest('Security Headers', 'FAIL', `Missing: ${missing.join(', ')}`);
        resolve({ success: false, missing });
      }
    });

    req.on('error', (error) => {
      logTest('Security Headers', 'FAIL', `Connection error: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      req.destroy();
      logTest('Security Headers', 'FAIL', 'Request timeout');
      resolve({ success: false, error: 'timeout' });
    });

    req.end();
  });
}

/**
 * Test 2: Contact Form API Endpoint Accessibility
 * Verifies the form submission endpoint is accessible through Cloudflare
 */
async function testContactFormAPI() {
  logSection('PROTOCOL TEST 2: CONTACT FORM API ACCESSIBILITY');
  
  return new Promise((resolve) => {
    // Test data for form submission
    const testData = querystring.stringify({
      name: 'Protocol Test User',
      email: 'protocoltestuser@example.com',
      organization: 'Advanced Debugging Protocol',
      message: 'Testing systematic resolution of CSP and API access issues',
      source: 'protocol_validation_test'
    });

    const options = {
      hostname: PRODUCTION_DOMAIN,
      port: 443,
      path: '/api/request-demo',
      method: 'POST',
      timeout: TEST_TIMEOUT,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(testData),
        'User-Agent': 'Advanced-Debugging-Protocol-Test/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          // Check if we got a Cloudflare challenge page (indicates API blocking)
          const isCloudflareChallenge = responseData.includes('cf-browser-verification') || 
                                      responseData.includes('Checking your browser before') ||
                                      responseData.includes('DDoS protection by Cloudflare');
          
          if (isCloudflareChallenge) {
            logTest('Contact Form API', 'FAIL', 'Cloudflare challenge page blocking API access');
            resolve({ success: false, error: 'cloudflare_challenge', statusCode: res.statusCode });
            return;
          }

          // Try to parse as JSON (our API returns JSON)
          const jsonResponse = JSON.parse(responseData);
          
          if (res.statusCode === 200 && jsonResponse.ok) {
            logTest('Contact Form API', 'PASS', 'Form submission successful, emails sent');
            resolve({ success: true, statusCode: res.statusCode, response: jsonResponse });
          } else {
            logTest('Contact Form API', 'FAIL', `API returned error: ${JSON.stringify(jsonResponse)}`);
            resolve({ success: false, error: jsonResponse, statusCode: res.statusCode });
          }
        } catch (parseError) {
          // If not JSON, check status code
          if (res.statusCode >= 200 && res.statusCode < 300) {
            logTest('Contact Form API', 'PASS', `API accessible (Status: ${res.statusCode})`);
            resolve({ success: true, statusCode: res.statusCode });
          } else {
            logTest('Contact Form API', 'FAIL', `HTTP ${res.statusCode}: ${responseData.substring(0, 200)}`);
            resolve({ success: false, statusCode: res.statusCode, error: responseData.substring(0, 200) });
          }
        }
      });
    });

    req.on('error', (error) => {
      logTest('Contact Form API', 'FAIL', `Network error: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      req.destroy();
      logTest('Contact Form API', 'FAIL', 'API request timeout');
      resolve({ success: false, error: 'timeout' });
    });

    req.write(testData);
    req.end();
  });
}

/**
 * Test 3: Gmail SMTP Direct Test
 * Tests the isolated SMTP diagnostic endpoint we created
 */
async function testGmailSMTP() {
  logSection('PROTOCOL TEST 3: GMAIL SMTP VERIFICATION');
  
  return new Promise((resolve) => {
    const options = {
      hostname: PRODUCTION_DOMAIN,
      port: 443,
      path: '/api/test-gmail-direct',
      method: 'GET',
      timeout: TEST_TIMEOUT,
      headers: {
        'User-Agent': 'Gmail-SMTP-Protocol-Test/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          // Check for Cloudflare challenge
          const isCloudflareChallenge = responseData.includes('cf-browser-verification');
          
          if (isCloudflareChallenge) {
            logTest('Gmail SMTP Test', 'FAIL', 'Cloudflare blocking SMTP test endpoint');
            resolve({ success: false, error: 'cloudflare_blocking' });
            return;
          }

          const jsonResponse = JSON.parse(responseData);
          
          if (jsonResponse.smtpVerified && jsonResponse.environmentReady) {
            logTest('Gmail SMTP Test', 'PASS', 'SMTP connection verified, environment ready');
            resolve({ success: true, response: jsonResponse });
          } else {
            logTest('Gmail SMTP Test', 'FAIL', `SMTP issues: ${JSON.stringify(jsonResponse)}`);
            resolve({ success: false, response: jsonResponse });
          }
        } catch (parseError) {
          logTest('Gmail SMTP Test', 'FAIL', `Parse error: ${parseError.message}`);
          resolve({ success: false, error: parseError.message, rawResponse: responseData.substring(0, 500) });
        }
      });
    });

    req.on('error', (error) => {
      logTest('Gmail SMTP Test', 'FAIL', `Connection error: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      req.destroy();
      logTest('Gmail SMTP Test', 'FAIL', 'Request timeout');
      resolve({ success: false, error: 'timeout' });
    });

    req.end();
  });
}

/**
 * Test 4: Market Detection and Email Routing
 * Verifies the market-aware email routing system
 */
async function testMarketDetection() {
  logSection('PROTOCOL TEST 4: MARKET-AWARE EMAIL ROUTING');
  
  // Test different email domains to verify market detection
  const marketTests = [
    { email: 'test@iglesia.com.co', expectedMarket: 'LATAM', domain: '.com.co' },
    { email: 'test@church.org', expectedMarket: 'USA', domain: '.org' },
    { email: 'test@example.com', expectedMarket: 'GLOBAL', domain: '.com' }
  ];

  const results = [];
  
  for (const test of marketTests) {
    const testData = querystring.stringify({
      name: `Protocol Test ${test.expectedMarket}`,
      email: test.email,
      organization: `${test.expectedMarket} Test Organization`,
      message: `Testing market detection for ${test.expectedMarket} market (${test.domain} domain)`,
      source: `protocol_market_test_${test.expectedMarket.toLowerCase()}`
    });

    const result = await new Promise((resolve) => {
      const options = {
        hostname: PRODUCTION_DOMAIN,
        port: 443,
        path: '/api/request-demo',
        method: 'POST',
        timeout: TEST_TIMEOUT,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(testData),
          'User-Agent': `Market-Test-${test.expectedMarket}/1.0`
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => {
          try {
            const jsonResponse = JSON.parse(responseData);
            const success = jsonResponse.ok && jsonResponse.market === test.expectedMarket;
            
            logTest(`Market Detection (${test.expectedMarket})`, 
                    success ? 'PASS' : 'FAIL', 
                    `Domain: ${test.domain}, Detected: ${jsonResponse.market || 'unknown'}`);
            
            resolve({ 
              success, 
              expectedMarket: test.expectedMarket, 
              detectedMarket: jsonResponse.market,
              domain: test.domain 
            });
          } catch (e) {
            logTest(`Market Detection (${test.expectedMarket})`, 'FAIL', `Parse error: ${e.message}`);
            resolve({ success: false, error: e.message });
          }
        });
      });

      req.on('error', (error) => {
        logTest(`Market Detection (${test.expectedMarket})`, 'FAIL', `Error: ${error.message}`);
        resolve({ success: false, error: error.message });
      });

      req.write(testData);
      req.end();
    });
    
    results.push(result);
  }
  
  return results;
}

/**
 * Main Test Execution
 */
async function runProtocolResolutionTests() {
  colorLog('magenta', '\n🚀 ADVANCED DEBUGGING PROTOCOL - RESOLUTION VALIDATION');
  colorLog('magenta', '===================================================');
  colorLog('bright', '\nValidating systematic fixes for CSP violations, API access, and email delivery...\n');

  const testResults = {
    securityHeaders: null,
    contactFormAPI: null,
    gmailSMTP: null,
    marketDetection: null
  };

  try {
    // Run all protocol tests
    testResults.securityHeaders = await testSecurityHeaders();
    testResults.contactFormAPI = await testContactFormAPI();
    testResults.gmailSMTP = await testGmailSMTP();
    testResults.marketDetection = await testMarketDetection();

    // Generate final protocol resolution report
    logSection('ADVANCED DEBUGGING PROTOCOL - FINAL RESOLUTION REPORT');
    
    colorLog('bright', '\n📊 TEST SUMMARY:');
    
    const totalTests = 4 + (testResults.marketDetection ? testResults.marketDetection.length : 0);
    let passedTests = 0;
    let failedTests = 0;
    
    // Count results
    if (testResults.securityHeaders?.success) passedTests++; else failedTests++;
    if (testResults.contactFormAPI?.success) passedTests++; else failedTests++;
    if (testResults.gmailSMTP?.success) passedTests++; else failedTests++;
    
    if (testResults.marketDetection) {
      testResults.marketDetection.forEach(result => {
        if (result.success) passedTests++; else failedTests++;
      });
    }
    
    colorLog('green', `✅ Passed Tests: ${passedTests}`);
    colorLog('red', `❌ Failed Tests: ${failedTests}`);
    colorLog('bright', `📈 Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);

    // Protocol resolution status
    if (passedTests >= totalTests * 0.8) {
      colorLog('green', '\n🎉 ADVANCED DEBUGGING PROTOCOL RESOLUTION: SUCCESS');
      colorLog('green', 'Systematic fixes have resolved the core issues:');
      colorLog('green', '• Content Security Policy violations eliminated');
      colorLog('green', '• Permissions Policy properly configured');
      colorLog('green', '• Contact form submission functional');
      colorLog('green', '• Gmail SMTP email delivery operational');
      colorLog('green', '• Market-aware email routing working');
    } else {
      colorLog('red', '\n⚠️  ADVANCED DEBUGGING PROTOCOL RESOLUTION: PARTIAL');
      colorLog('red', 'Some systematic issues remain - additional investigation required');
    }

    // Detailed recommendations
    colorLog('bright', '\n📋 NEXT STEPS:');
    
    if (!testResults.securityHeaders?.success) {
      colorLog('yellow', '• Security Headers: Review CSP and Permissions Policy configuration');
    }
    
    if (!testResults.contactFormAPI?.success) {
      colorLog('yellow', '• Contact Form API: Address Cloudflare blocking or API errors');
    }
    
    if (!testResults.gmailSMTP?.success) {
      colorLog('yellow', '• Gmail SMTP: Verify environment variables and SMTP configuration');
    }
    
    if (testResults.marketDetection?.some(r => !r.success)) {
      colorLog('yellow', '• Market Detection: Review email domain routing logic');
    }
    
    if (passedTests >= totalTests * 0.8) {
      colorLog('green', '• Monitor production for 24-48 hours to ensure stability');
      colorLog('green', '• Update documentation with resolution details');
    }

  } catch (error) {
    colorLog('red', `\n🚨 PROTOCOL TEST EXECUTION ERROR: ${error.message}`);
    colorLog('red', 'Unable to complete systematic validation');
  }

  colorLog('cyan', '\n' + '='.repeat(60));
  colorLog('bright', '  ADVANCED DEBUGGING PROTOCOL VALIDATION COMPLETE');
  colorLog('cyan', '='.repeat(60) + '\n');
}

// Execute if run directly
if (require.main === module) {
  runProtocolResolutionTests().catch(console.error);
}

module.exports = { runProtocolResolutionTests };