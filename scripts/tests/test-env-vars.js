// Emergency environment variable test
console.log('🚨 EMERGENCY ENV VAR TEST');
console.log('==========================');

const videoVars = [
  'NEXT_PUBLIC_LATAM_DEMO_VIDEO',
  'NEXT_PUBLIC_USA_DEMO_VIDEO', 
  'NEXT_PUBLIC_LATAM_QUICK_TOUR',
  'NEXT_PUBLIC_USA_QUICK_TOUR',
  'NEXT_PUBLIC_GLOBAL_DEMO',
  'NEXT_PUBLIC_VIDEO_CACHE_BUST'
];

console.log('Current Environment Variables:');
videoVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`${varName}: ${value || 'NOT SET'}`);
});

console.log('\nExpected from Vercel:');
console.log('NEXT_PUBLIC_LATAM_DEMO_VIDEO: https://www.youtube.com/embed/1fW2zDQnUV0');
console.log('NEXT_PUBLIC_VIDEO_CACHE_BUST: 20251101-1');

console.log('\n🎯 DIAGNOSIS:');
if (!process.env.NEXT_PUBLIC_LATAM_DEMO_VIDEO) {
  console.log('❌ CRITICAL: Environment variables not loaded from Vercel');
  console.log('❌ This explains why videos show fallback URLs');
} else {
  console.log('✅ Environment variables are loaded correctly');
}