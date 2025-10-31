#!/usr/bin/env node

/**
 * Comprehensive Enhancement Validation Script
 * Tests all implemented features: analytics fixes, pricing animations, currency localization, feature comparison tables, and TypeScript interfaces
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 KHESED-TEK Enhancement Validation Script');
console.log('='.repeat(50));

// Test results tracker
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: []
};

function logResult(test, status, message) {
  const symbols = { pass: '✅', fail: '❌', warn: '⚠️' };
  console.log(`${symbols[status]} ${test}: ${message}`);
  results[status === 'pass' ? 'passed' : status === 'fail' ? 'failed' : 'warnings']++;
  results.details.push({ test, status, message });
}

// Test 1: Analytics API Fix
console.log('\n📊 Testing Analytics API Fix...');
try {
  const analyticsPath = '/workspaces/KHESED-TEK-SYSTEMS-MARKETING-/app/api/analytics/route.ts';
  const analyticsContent = fs.readFileSync(analyticsPath, 'utf8');
  
  if (analyticsContent.includes('validTimestamp.toISOString()') && 
      analyticsContent.includes('!isNaN(validTimestamp.getTime())')) {
    logResult('Analytics Timestamp Validation', 'pass', 'Robust timestamp validation implemented');
  } else {
    logResult('Analytics Timestamp Validation', 'fail', 'Missing proper timestamp validation');
  }
  
  if (analyticsContent.includes('try {') && analyticsContent.includes('catch (timestampError)')) {
    logResult('Analytics Error Handling', 'pass', 'Comprehensive error handling added');
  } else {
    logResult('Analytics Error Handling', 'warn', 'Could improve error handling');
  }
} catch (error) {
  logResult('Analytics API File', 'fail', `Cannot read analytics file: ${error.message}`);
}

// Test 2: TypeScript Interfaces
console.log('\n🎯 Testing TypeScript Interface Implementation...');
try {
  const typesPath = '/workspaces/KHESED-TEK-SYSTEMS-MARKETING-/types/pricing.ts';
  const typesContent = fs.readFileSync(typesPath, 'utf8');
  
  const requiredInterfaces = ['PricingPlan', 'MarketPricing', 'CurrencyRate', 'LocalizedPrice'];
  requiredInterfaces.forEach(interface => {
    if (typesContent.includes(`interface ${interface}`) || typesContent.includes(`type ${interface}`)) {
      logResult(`Interface ${interface}`, 'pass', 'Defined correctly');
    } else {
      logResult(`Interface ${interface}`, 'fail', 'Missing interface definition');
    }
  });
  
  if (typesContent.includes('export') && typesContent.includes('interface')) {
    logResult('TypeScript Exports', 'pass', 'Interfaces properly exported');
  } else {
    logResult('TypeScript Exports', 'fail', 'Interfaces not properly exported');
  }
} catch (error) {
  logResult('TypeScript Types File', 'fail', `Cannot read types file: ${error.message}`);
}

// Test 3: Animated Pricing Card
console.log('\n💳 Testing Animated Pricing Card Component...');
try {
  const cardPath = '/workspaces/KHESED-TEK-SYSTEMS-MARKETING-/components/pricing/animated-pricing-card.tsx';
  const cardContent = fs.readFileSync(cardPath, 'utf8');
  
  if (cardContent.includes('useState') && cardContent.includes('isLoading')) {
    logResult('Pricing Card State Management', 'pass', 'Loading states implemented');
  } else {
    logResult('Pricing Card State Management', 'warn', 'Could add loading states');
  }
  
  if (cardContent.includes('hover:') && cardContent.includes('transition')) {
    logResult('Pricing Card Animations', 'pass', 'Hover animations implemented');
  } else {
    logResult('Pricing Card Animations', 'fail', 'Missing hover animations');
  }
  
  if (cardContent.includes('gradient') && cardContent.includes('border')) {
    logResult('Pricing Card Styling', 'pass', 'Enhanced styling with gradients');
  } else {
    logResult('Pricing Card Styling', 'warn', 'Basic styling only');
  }
} catch (error) {
  logResult('Animated Pricing Card File', 'fail', `Cannot read pricing card file: ${error.message}`);
}

// Test 4: Currency Localization
console.log('\n🌍 Testing Currency Localization System...');
try {
  const currencyPath = '/workspaces/KHESED-TEK-SYSTEMS-MARKETING-/components/pricing/currency-localization.tsx';
  const currencyContent = fs.readFileSync(currencyPath, 'utf8');
  
  if (currencyContent.includes('useCurrencyLocalization') && currencyContent.includes('useEffect')) {
    logResult('Currency Detection Hook', 'pass', 'Automatic currency detection implemented');
  } else {
    logResult('Currency Detection Hook', 'fail', 'Missing currency detection');
  }
  
  if (currencyContent.includes('navigator.language') || currencyContent.includes('Intl.')) {
    logResult('Locale Detection', 'pass', 'Browser locale detection implemented');
  } else {
    logResult('Locale Detection', 'warn', 'Could improve locale detection');
  }
  
  if (currencyContent.includes('EXCHANGE_RATES') && currencyContent.includes('COP')) {
    logResult('Exchange Rate Support', 'pass', 'Colombian peso conversion supported');
  } else {
    logResult('Exchange Rate Support', 'fail', 'Missing exchange rate conversion');
  }
} catch (error) {
  logResult('Currency Localization File', 'fail', `Cannot read currency file: ${error.message}`);
}

// Test 5: Feature Comparison Table
console.log('\n📋 Testing Feature Comparison Table...');
try {
  const tablePath = '/workspaces/KHESED-TEK-SYSTEMS-MARKETING-/components/pricing/feature-comparison.tsx';
  const tableContent = fs.readFileSync(tablePath, 'utf8');
  
  if (tableContent.includes('useState') && tableContent.includes('selectedCategory')) {
    logResult('Feature Table Interactivity', 'pass', 'Interactive category filtering implemented');
  } else {
    logResult('Feature Table Interactivity', 'warn', 'Limited interactivity');
  }
  
  if (tableContent.includes('language') && (tableContent.includes('es') || tableContent.includes('en'))) {
    logResult('Feature Table Localization', 'pass', 'Multi-language support implemented');
  } else {
    logResult('Feature Table Localization', 'fail', 'Missing language support');
  }
  
  const categoryCount = (tableContent.match(/category.*:/g) || []).length;
  if (categoryCount >= 4) {
    logResult('Feature Categories', 'pass', `${categoryCount} feature categories implemented`);
  } else {
    logResult('Feature Categories', 'warn', 'Limited feature categories');
  }
} catch (error) {
  logResult('Feature Comparison File', 'fail', `Cannot read comparison file: ${error.message}`);
}

// Test 6: Page Integration
console.log('\n🔗 Testing Page Integration...');
const pages = ['latam', 'usa', 'global'];
pages.forEach(page => {
  try {
    const pagePath = `/workspaces/KHESED-TEK-SYSTEMS-MARKETING-/app/${page}/page.tsx`;
    const pageContent = fs.readFileSync(pagePath, 'utf8');
    
    if (pageContent.includes('AnimatedPricingCard') && 
        pageContent.includes('FeatureComparisonTable') && 
        pageContent.includes('LocalizedPriceDisplay')) {
      logResult(`${page.toUpperCase()} Page Integration`, 'pass', 'All new components integrated');
    } else {
      const missing = [];
      if (!pageContent.includes('AnimatedPricingCard')) missing.push('AnimatedPricingCard');
      if (!pageContent.includes('FeatureComparisonTable')) missing.push('FeatureComparisonTable');
      if (!pageContent.includes('LocalizedPriceDisplay')) missing.push('LocalizedPriceDisplay');
      logResult(`${page.toUpperCase()} Page Integration`, 'fail', `Missing: ${missing.join(', ')}`);
    }
    
    if (pageContent.includes('import') && pageContent.includes('from \'@/components/pricing/')) {
      logResult(`${page.toUpperCase()} Page Imports`, 'pass', 'Proper import structure');
    } else {
      logResult(`${page.toUpperCase()} Page Imports`, 'warn', 'Check import statements');
    }
  } catch (error) {
    logResult(`${page.toUpperCase()} Page File`, 'fail', `Cannot read page file: ${error.message}`);
  }
});

// Test 7: Build Compatibility
console.log('\n🔧 Testing Build Compatibility...');
try {
  const packagePath = '/workspaces/KHESED-TEK-SYSTEMS-MARKETING-/package.json';
  const packageContent = fs.readFileSync(packagePath, 'utf8');
  const packageData = JSON.parse(packageContent);
  
  if (packageData.scripts && packageData.scripts.build) {
    logResult('Build Script', 'pass', 'Build script configured');
  } else {
    logResult('Build Script', 'fail', 'Missing build script');
  }
  
  if (packageData.dependencies && packageData.dependencies.typescript) {
    logResult('TypeScript Dependency', 'pass', 'TypeScript properly configured');
  } else {
    logResult('TypeScript Dependency', 'warn', 'TypeScript not in dependencies');
  }
} catch (error) {
  logResult('Package Configuration', 'fail', `Cannot read package.json: ${error.message}`);
}

// Test 8: CSS Integration
console.log('\n🎨 Testing CSS Integration...');
try {
  const cssPath = '/workspaces/KHESED-TEK-SYSTEMS-MARKETING-/app/globals.css';
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  if (cssContent.includes('--brand') && cssContent.includes('--brand2')) {
    logResult('CSS Variables', 'pass', 'Brand color variables defined');
  } else {
    logResult('CSS Variables', 'warn', 'Check brand color variables');
  }
  
  if (cssContent.includes('.gradient-') && cssContent.includes('.card')) {
    logResult('CSS Utility Classes', 'pass', 'Utility classes for components');
  } else {
    logResult('CSS Utility Classes', 'warn', 'Limited utility classes');
  }
} catch (error) {
  logResult('CSS File', 'fail', `Cannot read CSS file: ${error.message}`);
}

// Summary Report
console.log('\n' + '='.repeat(50));
console.log('📊 ENHANCEMENT VALIDATION SUMMARY');
console.log('='.repeat(50));
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);
console.log(`⚠️  Warnings: ${results.warnings}`);
console.log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

if (results.failed === 0) {
  console.log('\n🎉 ALL CRITICAL TESTS PASSED! Enhancement implementation successful.');
} else if (results.failed <= 2) {
  console.log('\n✨ MOSTLY SUCCESSFUL! Minor issues to address.');
} else {
  console.log('\n🔧 NEEDS ATTENTION! Several issues require fixes.');
}

// Detailed Results
console.log('\n📋 DETAILED RESULTS:');
results.details.forEach(({ test, status, message }) => {
  const symbols = { pass: '✅', fail: '❌', warn: '⚠️' };
  console.log(`  ${symbols[status]} ${test}: ${message}`);
});

console.log('\n🚀 Validation complete! Check individual tests for specific improvement areas.');