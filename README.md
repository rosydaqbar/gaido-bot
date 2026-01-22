# 🎮 Gaido Bot - New World Weekly Quest Helper

A Discord bot and web interface for tracking New World weekly material quests.

## ✨ Features

- **Discord Bot**: Automated weekly quest reminders
- **Web Interface**: Interactive checklist for tracking materials
- **Mobile Friendly**: Responsive design with smooth scrolling
- **Auto Reset**: Weekly progress reset every Monday 5 AM GMT+7
- **Real-time Countdown**: Live timer showing time until next reset

## 🚀 Setup

### 1. Clone Repository
```bash
git clone https://github.com/rosydaqbar/gaido-bot.git
cd gaido-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

#### For Cloudflare Workers (Production):
```bash
# Set secrets using Wrangler CLI
wrangler secret put DISCORD_TOKEN
wrangler secret put DISCORD_PUBLIC_KEY  
wrangler secret put DISCORD_APPLICATION_ID
wrangler secret put DISCORD_CHANNEL_ID
```

#### For Local Development:
```bash
# Copy example file
cp .env.example .env

# Edit .env with your actual values
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_PUBLIC_KEY=your_discord_public_key_here
DISCORD_APPLICATION_ID=your_discord_application_id_here
DISCORD_CHANNEL_ID=your_discord_channel_id_here
```

### 4. Deploy to Cloudflare Workers
```bash
wrangler deploy
```

## 🔧 Discord Bot Setup

1. Create a Discord application at https://discord.com/developers/applications
2. Create a bot and copy the token
3. Copy the application ID and public key
4. Invite bot to your server with appropriate permissions
5. Set the channel ID where you want weekly reminders

## 📱 Web Interface

Access the web interface at: `https://your-worker-domain.workers.dev/weekly`

Features:
- Interactive material checklists
- Progress tracking with cookies
- Mobile-responsive design
- Real-time countdown timer

## 🕐 Schedule

- **Weekly Reset**: Every Monday at 5:00 AM GMT+7
- **Discord Reminder**: Sent every Sunday at 10:00 PM GMT+7
- **Cookie Reset**: Automatic checklist reset on Monday morning

## 🛠️ Development

```bash
# Run tests
npm test

# Local development
wrangler dev
```

## 📝 License

MIT License - see LICENSE file for details