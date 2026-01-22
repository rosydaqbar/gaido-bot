// Test script to manually test the Cloudflare Worker
const https = require('https');

const testPing = {
  type: 1 // PING
};

const options = {
  hostname: 'shrill-snowflake-32e1.aqbars1998.workers.dev',
  port: 443,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-signature-ed25519': 'test_signature',
    'x-signature-timestamp': Date.now().toString()
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(JSON.stringify(testPing));
req.end();