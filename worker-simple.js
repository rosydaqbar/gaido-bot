/**
 * Simplified Cloudflare Worker for Discord Bot - Just for webhook verification
 */

export default {
  async fetch(request, env, ctx) {
    console.log('Received request:', request.method, request.url);
    
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.json();
      console.log('Request body:', JSON.stringify(body));
      
      // Handle Discord PING for webhook verification
      if (body.type === 1) {
        console.log('Responding to Discord PING');
        return new Response(JSON.stringify({ type: 1 }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // Handle slash commands
      if (body.type === 2 && body.data?.name === 'test') {
        console.log('Handling test command');
        return new Response(JSON.stringify({
          type: 4,
          data: {
            content: '🎉 Hello from Cloudflare Workers! The bot is working!'
          }
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // Default response
      return new Response(JSON.stringify({
        type: 4,
        data: {
          content: 'Unknown interaction'
        }
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
      
    } catch (error) {
      console.error('Error:', error);
      return new Response('Error processing request', { status: 500 });
    }
  },
};