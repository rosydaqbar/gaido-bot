// Test what Discord sends during verification
const https = require('https');

// Simulate what Discord sends for verification
const discordPing = {
  type: 1,
  id: "test-id",
  application_id: "1120821103682650203",
  token: "test-token"
};

const postData = JSON.stringify(discordPing);

const options = {
  hostname: 'shrill-snowflake-32e1.aqbars1998.workers.dev',
  port: 443,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'Discord-Interactions/1.0',
    'x-signature-ed25519': 'fake_signature_for_testing',
    'x-signature-timestamp': Math.floor(Date.now() / 1000).toString()
  }
};

console.log('Testing Discord-like request to worker...');
console.log('URL:', `https://${options.hostname}${options.path}`);
console.log('Payload:', postData);

const req = https.request(options, (res) => {
  console.log(`\n✅ Response Status: ${res.statusCode}`);
  console.log('Response Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Body:', data);
    
    try {
      const parsed = JSON.parse(data);
      if (parsed.type === 1) {
        console.log('\n🎉 SUCCESS: Worker correctly responded to PING with PONG');
      } else {
        console.log('\n❌ ERROR: Worker did not respond with correct PONG');
      }
    } catch (e) {
      console.log('\n❌ ERROR: Response is not valid JSON');
    }
  });
});

req.on('error', (error) => {
  console.error('\n❌ Request Error:', error.message);
});

req.write(postData);
req.end();