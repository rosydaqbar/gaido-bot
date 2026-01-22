/**
 * Deploy Discord slash commands for Cloudflare Worker
 * This script registers commands with Discord's API for HTTP interactions
 */

const { REST, Routes } = require('discord.js');
require('dotenv').config();

async function deployCommands() {
    const { DISCORD_TOKEN, DISCORD_APPLICATION_ID } = process.env;

    // Validate required environment variables
    if (!DISCORD_TOKEN) {
        console.error('Error: DISCORD_TOKEN is required in environment variables');
        process.exit(1);
    }
    
    if (!DISCORD_APPLICATION_ID) {
        console.error('Error: DISCORD_APPLICATION_ID is required in environment variables');
        process.exit(1);
    }

    // Define commands for the worker
    const commands = [
        {
            name: 'test',
            description: 'Test command that responds with Discord Components v2 (Cloudflare Worker)',
        }
    ];

    // Create REST instance
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands for Cloudflare Worker.`);

        // Register commands globally (not guild-specific for production)
        const data = await rest.put(
            Routes.applicationCommands(DISCORD_APPLICATION_ID),
            { body: commands }
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands globally.`);
        console.log('Commands are now available in all servers where the bot is installed.');
        console.log('Note: Global commands may take up to 1 hour to propagate.');
        
    } catch (error) {
        console.error('Error registering commands:', error.message);
        if (error.code) {
            console.error('Discord API Error Code:', error.code);
        }
        throw error;
    }
}

// Run the deployment
deployCommands()
    .then(() => {
        console.log('Command deployment completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Failed to deploy commands:', error);
        process.exit(1);
    });