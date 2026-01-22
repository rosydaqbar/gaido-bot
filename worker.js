/**
 * Discord Worker with simplified Components v2 and proper signature verification
 */

import { skillsData } from './src/data/skills-data.js';
import { getWeeklyPageTemplate } from './src/templates/weekly-page.js';
import { 
  verifyDiscordSignature, 
  createMaterialView, 
  createCustomMessage, 
  sendMessageToDiscord 
} from './src/utils/discord-helpers.js';

// Get the weekly materials web page
function getWeeklyPage() {
  const template = getWeeklyPageTemplate();
  // Replace the placeholder with actual skills data
  return template.replace('SKILLS_DATA_PLACEHOLDER', JSON.stringify(skillsData));
}

export default {
  // Handle HTTP requests (slash commands and web pages)
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle web page routes
    if (request.method === 'GET') {
      if (url.pathname === '/weekly') {
        return new Response(getWeeklyPage(), {
          headers: { 'Content-Type': 'text/html' },
        });
      }
      
      // Default homepage for bot info
      if (url.pathname === '/') {
        return new Response(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Discord Quest Bot</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h1>🎮 Discord Quest Bot</h1>
            <p>Ini adalah Discord bot untuk material quest mingguan.</p>
            <ul>
              <li><strong>/test</strong> - Dapatkan informasi quest mingguan</li>
              <li><strong><a href="/weekly">Material Mingguan</a></strong> - Lihat material di antarmuka web</li>
            </ul>
            <p>Status Bot: ✅ Online</p>
          </body>
          </html>
        `, {
          headers: { 'Content-Type': 'text/html' },
        });
      }
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const signature = request.headers.get('x-signature-ed25519');
      const timestamp = request.headers.get('x-signature-timestamp');
      const body = await request.text();
      
      // Verify Discord signature if we have the public key
      if (env.DISCORD_PUBLIC_KEY && signature && timestamp) {
        const isValid = await verifyDiscordSignature(
          env.DISCORD_PUBLIC_KEY,
          signature,
          timestamp,
          body
        );
        
        if (!isValid) {
          console.error('Invalid Discord signature');
          return new Response('Unauthorized', { status: 401 });
        }
      }
      
      const interaction = JSON.parse(body);
      
      // Handle Discord PING for webhook verification
      if (interaction.type === 1) {
        return new Response(JSON.stringify({ type: 1 }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // Handle slash commands
      if (interaction.type === 2) {
        const commandName = interaction.data?.name;
        
        if (commandName === 'test') {
          const response = createCustomMessage();

          return new Response(JSON.stringify({
            type: 4,
            data: response
          }), {
            headers: { 'Content-Type': 'application/json' },
          });
        }
        
        // Default response for other commands
        return new Response(JSON.stringify({
          type: 4,
          data: {
            content: `🤖 Perintah "${commandName}" diterima di Cloudflare Workers!`
          }
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // Handle button interactions
      if (interaction.type === 3) {
        const customId = interaction.data?.custom_id;
        
        let responseMessage = '';
        switch (customId) {
          case 'p_225151635284824132':
            // Show material view starting with Botany
            return new Response(JSON.stringify({
              type: 4,
              data: createMaterialView('botany')
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          
          // Navigation buttons for different life skills
          case 'material_botany':
            return new Response(JSON.stringify({
              type: 7, // Update message
              data: createMaterialView('botany')
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          
          case 'material_mineralogy':
            return new Response(JSON.stringify({
              type: 7, // Update message
              data: createMaterialView('mineralogy')
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          
          case 'material_gemology':
            return new Response(JSON.stringify({
              type: 7, // Update message
              data: createMaterialView('gemology')
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          
          case 'material_alchemy':
            return new Response(JSON.stringify({
              type: 7, // Update message
              data: createMaterialView('alchemy')
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          
          case 'material_gemcrafting':
            return new Response(JSON.stringify({
              type: 7, // Update message
              data: createMaterialView('gemcrafting')
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          
          case 'material_artisan':
            return new Response(JSON.stringify({
              type: 7, // Update message
              data: createMaterialView('artisan')
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          
          case 'material_smelting':
            return new Response(JSON.stringify({
              type: 7, // Update message
              data: createMaterialView('smelting')
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          
          case 'material_culinary':
            return new Response(JSON.stringify({
              type: 7, // Update message
              data: createMaterialView('culinary')
            }), {
              headers: { 'Content-Type': 'application/json' },
            });

          case 'p_225145722704498690':
            responseMessage = '🌿 **Botany Detail:**\n\nHay x80 - Dapat ditemukan di area grassland\nTartberry Juice x80 - Dari tartberry bush\nBase Soil x80 - Tanah dasar untuk farming\nResin x80 - Dari pohon-pohon tertentu';
            break;
          case 'p_225148799771742302':
            responseMessage = '🪨 **Mineralogy Detail:**\n\nClay x80 - Tanah liat dari area berlumpur\nFine Sand x80 - Pasir halus dari pantai\nLimp Azure Water x80 - Air biru dari sumber khusus\nFine Metal Sand x80 - Pasir logam dari area tambang';
            break;
          default:
            responseMessage = '❓ Interaksi tombol tidak dikenal.';
        }

        return new Response(JSON.stringify({
          type: 4,
          data: {
            content: responseMessage,
            flags: 64 // Ephemeral flag
          }
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({
        type: 4,
        data: {
          content: `Tipe interaksi tidak dikenal: ${interaction.type}`
        }
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
      
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  // Handle scheduled events (cron jobs)
  async scheduled(event, env) {
    console.log('Scheduled event triggered:', event.cron);
    
    try {
      // Create the quest message
      const questMessage = createCustomMessage();
      
      // You need to set these in your Cloudflare Worker environment variables:
      // DISCORD_CHANNEL_ID - The channel where you want to send the message
      const channelId = env.DISCORD_CHANNEL_ID;
      const botToken = env.DISCORD_TOKEN;
      
      if (!channelId) {
        console.error('DISCORD_CHANNEL_ID environment variable not set');
        return;
      }
      
      if (!botToken) {
        console.error('DISCORD_TOKEN environment variable not set');
        return;
      }
      
      // Send the message to Discord
      const result = await sendMessageToDiscord(channelId, questMessage, botToken);
      console.log('Pesan quest berhasil dikirim:', result.id);
      
    } catch (error) {
      console.error('Error in scheduled handler:', error);
    }
  },
};