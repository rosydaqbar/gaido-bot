# Scheduled Discord Messages Setup

## 🎯 What This Does

Your Cloudflare Worker now has **two functions**:

1. **🤖 Slash Command Handler**: Responds to `/test` commands
2. **⏰ Scheduled Message Sender**: Automatically sends quest messages on schedule

## ⚙️ Setup Steps

### 1. Get Your Discord Channel ID

1. **Enable Developer Mode** in Discord:
   - User Settings → Advanced → Developer Mode (ON)

2. **Get Channel ID**:
   - Right-click the channel where you want quest messages
   - Click "Copy Channel ID"
   - Example: `702716733005365248`

### 2. Update Environment Variable

Replace `YOUR_CHANNEL_ID_HERE` in `wrangler.toml` with your actual channel ID:

```toml
DISCORD_CHANNEL_ID = "702716733005365248"
```

### 3. Deploy the Updated Worker

```bash
wrangler deploy
```

## 📅 Schedule Configuration

**Current Schedule**: Every Monday at 10:00 PM
```
Cron: "0 22 * * mon"
```

### Change the Schedule

Edit the cron expression in `wrangler.toml`:

```toml
[[triggers]]
crons = ["0 22 * * mon"]  # Monday 10 PM
```

**Common Schedules**:
- `"0 9 * * mon"` - Every Monday at 9 AM
- `"0 18 * * fri"` - Every Friday at 6 PM  
- `"0 12 * * 1,3,5"` - Mon/Wed/Fri at 12 PM
- `"0 20 * * *"` - Every day at 8 PM

## 🔧 How It Works

### Manual Command
- User types `/test` → Bot responds immediately

### Scheduled Message
- Cron triggers → Worker sends message to specified channel
- Same message content as `/test` command
- Runs automatically without user interaction

## 🧪 Testing

### Test the Schedule Handler Manually

You can trigger the scheduled function manually for testing:

```bash
wrangler dev --test-scheduled
```

### Check Logs

Monitor what happens when the cron runs:

```bash
wrangler tail --format pretty
```

## 📋 Checklist

- [ ] ✅ Channel ID added to `wrangler.toml`
- [ ] ✅ Cron schedule configured
- [ ] ✅ Worker deployed with `wrangler deploy`
- [ ] ✅ Bot has permission to send messages in target channel
- [ ] ✅ Schedule tested (optional)

## 🎉 Result

**Every Monday at 10 PM**, your bot will automatically send the Indonesian quest message with:

- 📝 Quest information and XP details
- 🖼️ Images from Imgur
- 🔘 "Lihat Kebutuhan Material" button
- 🎨 Custom Components v2 styling

**No user interaction needed** - it's fully automated! 🚀

## 🔍 Troubleshooting

**Message not sending?**
1. Check channel ID is correct
2. Verify bot has "Send Messages" permission in that channel
3. Check worker logs with `wrangler tail`
4. Ensure `DISCORD_TOKEN` has proper bot permissions

**Wrong schedule?**
1. Update cron expression in `wrangler.toml`
2. Redeploy with `wrangler deploy`
3. Use [crontab.guru](https://crontab.guru) to verify cron syntax