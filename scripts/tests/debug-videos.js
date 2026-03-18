// Debug script to check video URL generation
const fs = require('fs');

console.log('🎬 VIDEO DEBUG REPORT');
console.log('====================');

// Read .env.local file manually
try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  console.log('\n� .env.local content:');
  
  const lines = envContent.split('\n').filter(line => 
    line.includes('NEXT_PUBLIC') && line.includes('VIDEO')
  );
  
  lines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      console.log(`   ${line.trim()}`);
    }
  });
  
  // Extract CACHE_BUST value
  const cacheBustLine = envContent.split('\n').find(line => 
    line.includes('NEXT_PUBLIC_VIDEO_CACHE_BUST')
  );
  
  const cacheBust = cacheBustLine ? cacheBustLine.split('=')[1] : null;
  console.log(`\n🔧 Cache bust value: ${cacheBust || 'NOT SET'}`);
  
  // Test URL generation
  console.log('\n🔗 Generated Video URLs:');
  const baseUrl = 'https://www.youtube.com/embed/qk-Baf42lBo';
  
  function addCacheBust(url) {
    if (!cacheBust) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}cb=${cacheBust}`;
  }
  
  const finalUrl = addCacheBust(baseUrl);
  console.log(`   Base URL: ${baseUrl}`);
  console.log(`   With cache-bust: ${finalUrl}`);
  
  // Test with existing parameters  
  const urlWithParams = 'https://www.youtube.com/embed/qk-Baf42lBo?autoplay=1&rel=0';
  const finalUrlWithParams = addCacheBust(urlWithParams);
  console.log(`   With existing params: ${urlWithParams}`);
  console.log(`   With cache-bust added: ${finalUrlWithParams}`);
  
} catch (error) {
  console.error('❌ Error reading .env.local:', error.message);
}

console.log('\n✅ Debug complete!');