const https = require('https');

const formData = new URLSearchParams({
  name: 'Test User Production',
  email: 'test@example.com',
  org: 'Test Church',
  whatsapp: '+1234567890',
  message: 'Testing production endpoint',
  wantsDemo: 'true'
});

const options = {
  hostname: 'www.khesed-tek-systems.org',
  port: 443,
  path: '/api/request-demo',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': formData.toString().length
  }
};

console.log('Testing production form endpoint...\n');

const req = https.request(options, (res) => {
  let data = '';
  
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  console.log('\n---Response Body---');
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', (error) => {
  console.error('Request Error:', error);
});

req.write(formData.toString());
req.end();
