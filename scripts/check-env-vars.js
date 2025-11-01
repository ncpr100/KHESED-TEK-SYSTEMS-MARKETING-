#!/usr/bin/env node

/**
 * Environment Variable Checker for KHESED-TEK Marketing Site
 * 
 * This script helps debug why videos aren't updating when Railway
 * environment variables are changed.
 */

const VIDEO_ENV_VARS = [
  'NEXT_PUBLIC_LATAM_DEMO_VIDEO',
  'NEXT_PUBLIC_USA_DEMO_VIDEO', 
  'NEXT_PUBLIC_LATAM_QUICK_TOUR',
  'NEXT_PUBLIC_USA_QUICK_TOUR',
  'NEXT_PUBLIC_GLOBAL_DEMO'
];

console.log('🔍 KHESED-TEK Environment Variable Checker\n');

console.log('📋 Current Environment Variables:');
console.log('================================');

VIDEO_ENV_VARS.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value}`);
  } else {
    console.log(`❌ ${varName}: NOT SET (will use fallback)`);
  }
});

console.log('\n🎯 Expected New Video URL:');
console.log('https://www.youtube.com/embed/qk-Baf42lBo');

console.log('\n📝 Current Fallback URLs (if env vars not set):');
console.log('LATAM_MAIN_DEMO: https://www.youtube.com/embed/V_MXGdSBbAI');
console.log('USA_MAIN_DEMO: https://www.youtube.com/embed/9bZkp7q19f0');
console.log('LATAM_QUICK_TOUR: https://www.youtube.com/embed/3JZ_D3ELwOQ');
console.log('USA_QUICK_TOUR: https://www.youtube.com/embed/JNDFGgdUNMo');
console.log('GLOBAL_OVERVIEW: https://www.youtube.com/embed/F-0L1xTOGn8');

console.log('\n🚀 Railway Setup Instructions:');
console.log('==============================');
console.log('1. Go to: https://railway.app');
console.log('2. Select: KHESED-TEK-SYSTEMS-MARKETING project');
console.log('3. Click: Variables tab');
console.log('4. Add/Update these variables:');

VIDEO_ENV_VARS.forEach(varName => {
  console.log(`   ${varName}=https://www.youtube.com/embed/qk-Baf42lBo`);
});

console.log('5. Save changes');
console.log('6. Wait for automatic redeploy');
console.log('7. Clear browser cache (Ctrl+F5)');

console.log('\n🐛 Troubleshooting:');
console.log('==================');
console.log('• If videos still show old content after Railway update:');
console.log('  - Check Railway deployment logs');
console.log('  - Verify variable names match exactly (case sensitive)');
console.log('  - Clear browser cache completely');
console.log('  - Try incognito/private browsing mode');
console.log('• If deployment fails:');
console.log('  - Check Railway build logs for errors');
console.log('  - Verify YouTube video is public/unlisted');
console.log('  - Test video URL in browser directly');