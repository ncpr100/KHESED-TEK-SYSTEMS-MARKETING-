const https = require('https');

console.log('Testing email diagnostic endpoint...\n');

https.get('https://www.khesed-tek-systems.org/api/email-test-detailed', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response Body:');
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log(data);
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
