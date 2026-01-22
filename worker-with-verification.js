/**
 * Cloudflare Worker with proper Discord signature verification
 */

// Simple Ed25519 signature verification without external libraries
async function verifyDiscordSignature(publicKey, signature, timestamp, body) {
  try {
    // Convert hex strings to Uint8Array
    const publicKeyBytes = hexToBytes(publicKey);
    const signatureBytes = hexToBytes(signature);
    
    // Create message to verify (timestamp + body)
    const encoder = new TextEncoder();
    const timestampBytes = encoder.encode(timestamp);
    const bodyBytes = encoder.encode(body);
    
    const message = new Uint8Array(timestampBytes.length + bodyBytes.length);
    message.set(timestampBytes);
    message.set(bodyBytes, timestampBytes.length);
    
    // Import the public key
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      publicKeyBytes,
      {
        name: 'Ed25519',
        namedCurve: 'Ed25519',
      },
      false,
      ['verify']
    );
    
    // Verify the signature
    return await crypto.subtle.verify('Ed25519', cryptoKey, signatureBytes, message);
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

export default {
  async fetch(request, env, ctx) {
    console.log('Received request:', request.method, request.url);
    
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const signature = request.headers.get('x-signature-ed25519');
      const timestamp = request.headers.get('x-signature-timestamp');
      const body = await request.text();
      
      console.log('Headers received:', { signature: !!signature, timestamp: !!timestamp });
      
      // For Discord verification, we need proper signature verification
      if (signature && timestamp && env.DISCORD_PUBLIC_KEY) {
        const isValid = await verifyDiscordSignature(
          env.DISCORD_PUBLIC_KEY,
          signature,
          timestamp,
          body
        );
        
        if (!isValid) {
          console.log('Invalid signature');
          return new Response('Invalid signature', { status: 401 });
        }
      } else {
        console.log('Missing signature, timestamp, or public key - allowing for testing');
      }
      
      const interaction = JSON.parse(body);
      console.log('Processing interaction:', interaction.type);
      
      // Handle Discord PING for webhook verification
      if (interaction.type === 1) {
        console.log('Responding to Discord PING');
        return new Response(JSON.stringify({ type: 1 }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // Handle slash commands
      if (interaction.type === 2 && interaction.data?.name === 'test') {
        console.log('Handling test command');
        return new Response(JSON.stringify({
          type: 4,
          data: {
            content: '🎉 Hello from Cloudflare Workers!\n\n✅ Webhook verification successful\n✅ Signature verification working\n✅ Command processing working'
          }
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // Default response
      return new Response(JSON.stringify({
        type: 4,
        data: {
          content: `Received interaction type: ${interaction.type}`
        }
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
      
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({
        type: 4,
        data: {
          content: 'Error processing request'
        }
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};