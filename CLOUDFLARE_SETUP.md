# Discord Bot on Cloudflare Workers Setup Guide

This guide will help you deploy your Discord bot to Cloudflare Workers using HTTP interactions instead of WebSocket connections.

## Prerequisites

1. **Cloudflare Account** - Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI** - Install globally: `npm install -g wrangler`
3. **Discord Application** - Your existing Discord application

## Step 1: Install Wrangler and Login

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

## Step 2: Get Your Discord Public Key

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Copy the **Public Key** from the General Information section
4. You'll need this for signature verification

## Step 3: Set Environment Variables

Set your secrets in Cloudflare Workers:

```bash
# Set Discord bot token (keep this secret!)
wrangler secret put DISCORD_TOKEN

# Set Discord public key (for signature verification)
wrangler secret put DISCORD_PUBLIC_KEY

# Set Discord application ID
wrangler secret put DISCORD_APPLICATION_ID
```

When prompted, paste the respective values:
- `DISCORD_TOKEN`: Your bot token (starts with MTI...)
- `DISCORD_PUBLIC_KEY`: Your application's public key (64-character hex string)
- `DISCORD_APPLICATION_ID`: Your application ID (e.g., 1120821103682650203)

## Step 4: Deploy the Worker

```bash
# Deploy to Cloudflare Workers
wrangler deploy
```

This will give you a URL like: `https://discord-slash-bot.your-subdomain.workers.dev`

## Step 5: Configure Discord Webhook

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Go to **General Information**
4. Set **Interactions Endpoint URL** to your Worker URL:
   ```
   https://discord-slash-bot.your-subdomain.workers.dev
   ```
5. Click **Save Changes**

Discord will send a verification request to test the endpoint.

## Step 6: Deploy Commands

Run the command deployment script:

```bash
node deploy-worker.js
```

This registers the `/test` command globally with Discord.

## Step 7: Test Your Bot

1. Invite your bot to a Discord server (if not already done)
2. Use the `/test` command in any channel
3. The bot should respond with Components v2 interface

## Architecture Differences

### Traditional Bot (WebSocket)
- Persistent connection to Discord Gateway
- Real-time events (messages, reactions, etc.)
- Always running, consuming resources
- Handles events as they happen

### Cloudflare Worker Bot (HTTP)
- No persistent connection
- Only handles interactions (slash commands, buttons)
- Serverless - only runs when needed
- More cost-effective for command-only bots

## File Structure

```
├── worker.js                 # Main Cloudflare Worker code
├── src/utils/components-worker.js  # Components v2 builder (ES modules)
├── wrangler.toml            # Cloudflare Worker configuration
├── deploy-worker.js         # Command deployment script
└── CLOUDFLARE_SETUP.md      # This setup guide
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DISCORD_TOKEN` | Bot token from Discord Developer Portal | `MTI...` |
| `DISCORD_PUBLIC_KEY` | Public key for signature verification | `abc123...` |
| `DISCORD_APPLICATION_ID` | Application ID from Discord | `1120821103682650203` |

## Troubleshooting

### "Invalid signature" errors
- Verify your `DISCORD_PUBLIC_KEY` is correct
- Ensure the public key is the 64-character hex string from Discord Developer Portal

### Commands not appearing
- Global commands take up to 1 hour to propagate
- Check Discord Developer Portal for any errors
- Verify your `DISCORD_APPLICATION_ID` is correct

### Worker deployment fails
- Ensure you're logged into Wrangler: `wrangler whoami`
- Check your wrangler.toml configuration
- Verify all secrets are set: `wrangler secret list`

## Benefits of Cloudflare Workers

1. **Cost-effective** - Only pay for actual usage
2. **Global edge network** - Low latency worldwide
3. **Automatic scaling** - Handles traffic spikes
4. **No server maintenance** - Fully managed
5. **Fast cold starts** - Quick response times

## Limitations

1. **No persistent state** - Each request is independent
2. **No real-time events** - Only interactions (commands, buttons)
3. **15-second timeout** - Responses must be quick
4. **Limited to HTTP interactions** - No gateway events

## Next Steps

- Add more slash commands by updating `worker.js`
- Implement button interactions and modals
- Add database integration (Cloudflare D1, KV, or external)
- Set up custom domain for your worker
- Monitor usage in Cloudflare dashboard