/**
 * Discord-related helper functions
 */

// Convert hex string to Uint8Array
export function hexToUint8Array(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

// Verify Discord signature using Web Crypto API
export async function verifyDiscordSignature(publicKeyHex, signatureHex, timestamp, body) {
  try {
    const publicKeyBytes = hexToUint8Array(publicKeyHex);
    const signatureBytes = hexToUint8Array(signatureHex);
    
    // Create the message that was signed (timestamp + body)
    const encoder = new TextEncoder();
    const timestampBytes = encoder.encode(timestamp);
    const bodyBytes = encoder.encode(body);
    const message = new Uint8Array(timestampBytes.length + bodyBytes.length);
    message.set(timestampBytes);
    message.set(bodyBytes, timestampBytes.length);
    
    // Import the Ed25519 public key
    const publicKey = await crypto.subtle.importKey(
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
    return await crypto.subtle.verify('Ed25519', publicKey, signatureBytes, message);
  } catch (error) {
    console.error('Signature verification failed:', error);
    return false;
  }
}

// Create material view for specific life skill
export function createMaterialView(skillType = 'botany') {
  const skills = {
    botany: {
      title: '🌿 Botany',
      materials: 'Hay x80, Tartberry Juice x80, Base Soil x80, Resin x80',
      image: 'https://i.imgur.com/WQqjVFO.png',
      description: 'Mengumpulkan material dari tanaman dan alam'
    },
    mineralogy: {
      title: '🪨 Mineralogy', 
      materials: 'Clay x80, Fine Sand x80, Limp Azure Water x80, Fine Metal Sand x80',
      image: 'https://i.imgur.com/lyELVua.png',
      description: 'Menambang dan mengekstrak sumber daya mineral'
    },
    gemology: {
      title: '💎 Gemology',
      materials: 'Clay x80, Fine Sand x80, Limp Azure Water x80, Rock Salt x80',
      image: 'https://i.imgur.com/mfqX9aX.png',
      description: 'Mencari dan memproses permata berharga'
    },
    alchemy: {
      title: '⚗️ Alchemy',
      materials: 'Enigmatic Powder x40',
      image: 'https://i.imgur.com/bp9E9Qh.png',
      description: 'Membuat ramuan ajaib dan eliksir'
    },
    gemcrafting: {
      title: '💍 Gemcrafting',
      materials: 'Sandstone Polisher x40',
      image: 'https://i.imgur.com/XZZ0iXO.png',
      description: 'Membuat perhiasan dan aksesoris'
    },
    artisan: {
      title: '🪵 Artisan',
      materials: 'Pine Lumber x40',
      image: 'https://i.imgur.com/RJ4XlnM.png',
      description: 'Pengerjaan kayu dan pembuatan furnitur'
    },
    smelting: {
      title: '🔥 Smelting',
      materials: 'Pig Iron Ingot x40',
      image: 'https://i.imgur.com/GWI93WX.png',
      description: 'Memproses logam dan paduan'
    },
    culinary: {
      title: '🍜 Culinary',
      materials: 'Flour x45',
      image: 'https://i.imgur.com/3Dma4K0.png',
      description: 'Memasak dan persiapan makanan'
    }
  };

  const skill = skills[skillType];
  const skillKeys = Object.keys(skills);

  return {
    flags: 32768 | 64, // Components V2 + Ephemeral
    components: [
      {
        type: 17,
        accent_color: 5704741,
        components: [
          {
            type: 10,
            content: `## Material-material yang dibutuhkan:\n### ${skill.title}\n\n**Material:** ${skill.materials}\n\n*${skill.description}*`
          },
          {
            type: 12,
            items: [
              {
                media: {
                  url: skill.image
                }
              }
            ]
          }
        ]
      },
      {
        type: 1, // Action Row for navigation
        components: skillKeys.slice(0, 4).map(key => ({
          style: key === skillType ? 1 : 2, // Primary if active, Secondary if not
          type: 2,
          label: skills[key].title.split(' ')[1], // Just the name without emoji
          emoji: {
            name: skills[key].title.split(' ')[0] // Just the emoji
          },
          custom_id: `material_${key}`,
          disabled: key === skillType // Disable current selection
        }))
      },
      {
        type: 1, // Second Action Row for remaining skills
        components: skillKeys.slice(4).map(key => ({
          style: key === skillType ? 1 : 2,
          type: 2,
          label: skills[key].title.split(' ')[1],
          emoji: {
            name: skills[key].title.split(' ')[0]
          },
          custom_id: `material_${key}`,
          disabled: key === skillType
        }))
      }
    ]
  };
}

// Create the custom message from discohook
export function createCustomMessage() {
  return {
    flags: 32768,
    components: [
                {
      "type": 10,
      "content": "<@&1435652435514495176>"
    },
      {
        type: 17, // Container
        accent_color: 5704741, // Custom color from discohook
        components: [
          {
            type: 9, // Section
            components: [
              {
                type: 10, // Text Display
                content: "# Selamat Pagi! Sudahkah Anda macul minggu ini?\n### Quest life skill mingguan sudah tersedia!\nQuest ini memberi xp sebesar **7200** ke setiap life skill kamu, sangat membantu percepatan leveling pada early game.\n\nKamu bisa menemukan Gaido disini:"
              }
            ],
            accessory: {
              type: 11, // Media
              media: {
                url: "https://i.imgur.com/Mkr1InL.png"
              },
              spoiler: false
            }
          },
          {
            type: 12, // Media Gallery
            items: [
              {
                media: {
                  url: "https://i.imgur.com/nx4idzB.png"
                }
              }
            ]
          }
        ]
      },
      {
        type: 1, // Action Row
        components: [
          {
            style: 1, // Primary button
            type: 2, // Button
            label: "Lihat Kebutuhan Material",
            emoji: {
              name: "🗒️"
            },
            custom_id: "p_225151635284824132"
          },
          {
            style: 5, // Link button (opens in new tab)
            type: 2, // Button
            label: "Buka di Web ↗️",
            emoji: {
              name: "🌐"
            },
            url: "https://shrill-snowflake-32e1.aqbars1998.workers.dev/weekly"
          }
        ]
      }
    ]
  };
}

// Function to send message to Discord channel
export async function sendMessageToDiscord(channelId, message, botToken) {
  const discordApiUrl = `https://discord.com/api/v10/channels/${channelId}/messages`;
  
  const response = await fetch(discordApiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bot ${botToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to send Discord message:', error);
    throw new Error(`Discord API error: ${response.status}`);
  }
  
  return await response.json();
}