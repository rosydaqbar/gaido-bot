const { REST, Routes } = require('discord.js');
require('dotenv').config();

/**
 * Deploy slash commands to Discord
 * @param {Array} commands - Array of command data objects
 * @returns {Promise<void>}
 */
async function deployCommands(commands = []) {
    const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID } = process.env;

    // Validate required environment variables
    if (!DISCORD_TOKEN) {
        console.error('Error: DISCORD_TOKEN is required in environment variables');
        process.exit(1);
    }
    
    if (!DISCORD_CLIENT_ID) {
        console.error('Error: DISCORD_CLIENT_ID is required in environment variables');
        process.exit(1);
    }
    
    if (!DISCORD_GUILD_ID) {
        console.error('Error: DISCORD_GUILD_ID is required in environment variables');
        process.exit(1);
    }

    // Create REST instance
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // Register commands with Discord API using provided identifiers
        const data = await rest.put(
            Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),
            { body: commands }
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error('Error registering commands:', error.message);
        if (error.code) {
            console.error('Discord API Error Code:', error.code);
        }
        throw error;
    }
}

module.exports = { deployCommands };

// Main execution when script is run directly
if (require.main === module) {
    const fs = require('fs');
    const path = require('path');

    async function main() {
        try {
            const commands = [];
            const commandsPath = path.join(__dirname, '..', 'commands');
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            // Load all command files
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                
                if ('data' in command && 'execute' in command) {
                    commands.push(command.data.toJSON());
                    console.log(`Loaded command: ${command.data.name}`);
                } else {
                    console.warn(`Warning: Command at ${filePath} is missing required "data" or "execute" property.`);
                }
            }

            // Deploy the commands
            await deployCommands(commands);
            console.log('Command deployment completed successfully!');
        } catch (error) {
            console.error('Failed to deploy commands:', error);
            process.exit(1);
        }
    }

    main();
}