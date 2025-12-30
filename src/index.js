const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create Discord client with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

// Global error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing, or other logic here
});

// Global error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    console.error('Bot will exit to prevent unstable state');
    process.exit(1);
});

// Register ready event handler with error handling
try {
    const readyHandler = require('./handlers/ready');
    client.once(readyHandler.name, (...args) => {
        try {
            readyHandler.execute(...args);
        } catch (error) {
            console.error('Error in ready handler:', error);
        }
    });
    console.log('Ready event handler registered successfully');
} catch (error) {
    console.error('Failed to register ready event handler:', error);
    process.exit(1);
}

// Register interaction event handler with error handling
try {
    const interactionHandler = require('./handlers/interaction');
    client.on(interactionHandler.name, (...args) => {
        try {
            interactionHandler.execute(...args);
        } catch (error) {
            console.error('Error in interaction handler:', error);
        }
    });
    console.log('Interaction event handler registered successfully');
} catch (error) {
    console.error('Failed to register interaction event handler:', error);
    process.exit(1);
}

// Register error event handler for Discord client errors
client.on('error', (error) => {
    console.error('Discord client error:', error);
});

// Register warning event handler for Discord client warnings
client.on('warn', (warning) => {
    console.warn('Discord client warning:', warning);
});

// Register debug event handler for Discord client debug info (optional, can be disabled in production)
if (process.env.NODE_ENV === 'development') {
    client.on('debug', (info) => {
        console.debug('Discord client debug:', info);
    });
}

// Validate required environment variables
function validateEnvironment() {
    const requiredVars = ['DISCORD_TOKEN', 'DISCORD_APPLICATION_ID', 'DISCORD_GUILD_ID'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        console.error('Missing required environment variables:', missing.join(', '));
        console.error('Please check your .env file and ensure all required variables are set');
        return false;
    }
    
    console.log('Environment variables validated successfully');
    return true;
}

// Bot login with token from environment variables
async function startBot() {
    try {
        console.log('Discord bot starting...');
        console.log('Node.js version:', process.version);
        console.log('Discord.js version:', require('discord.js').version);
        
        // Validate environment variables before attempting to start
        if (!validateEnvironment()) {
            process.exit(1);
        }
        
        // Attempt to login with proper error handling
        console.log('Attempting to authenticate with Discord...');
        await client.login(process.env.DISCORD_TOKEN);
        
        console.log('Bot authentication successful');
        
    } catch (error) {
        console.error('Failed to authenticate bot:', error.message);
        
        // Provide more specific error messages based on error type
        if (error.code === 'TOKEN_INVALID') {
            console.error('The provided bot token is invalid. Please check your DISCORD_TOKEN environment variable.');
        } else if (error.code === 'DISALLOWED_INTENTS') {
            console.error('The bot is missing required intents. Please check your bot settings in the Discord Developer Portal.');
        } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
            console.error('Network connection error. Please check your internet connection.');
        } else {
            console.error('Authentication error details:', error);
        }
        
        console.error('Bot will exit due to authentication failure');
        process.exit(1);
    }
}

// Graceful shutdown handling
process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

// Start the bot
startBot();