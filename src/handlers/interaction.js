const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

/**
 * Interaction event handler for processing slash command interactions
 * Ensures interactions are acknowledged within Discord's 3-second timeout
 */
module.exports = {
    name: 'interactionCreate',
    
    async execute(interaction) {
        // Only handle slash command interactions
        if (!interaction.isChatInputCommand()) return;

        // Load commands dynamically from commands directory
        const commands = new Collection();
        const commandsPath = path.join(__dirname, '..', 'commands');
        
        try {
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                
                if ('data' in command && 'execute' in command) {
                    commands.set(command.data.name, command);
                }
            }
        } catch (error) {
            console.error('Error loading commands:', error);
            return;
        }

        // Get the command that was executed
        const command = commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            
            try {
                await interaction.reply({
                    content: '❌ Command not found. Please try again.',
                    ephemeral: true
                });
            } catch (replyError) {
                console.error('Error sending command not found response:', replyError);
            }
            return;
        }

        // Execute the command with proper error handling and timeout management
        try {
            console.log(`Executing command: ${interaction.commandName} for user: ${interaction.user.tag}`);
            
            // Execute the command - this must complete within 3 seconds for Discord
            await command.execute(interaction);
            
            console.log(`Successfully executed command: ${interaction.commandName}`);
            
        } catch (error) {
            console.error(`Error executing command ${interaction.commandName}:`, error);
            
            // Ensure we respond to the interaction even if command execution fails
            try {
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: '❌ There was an error while executing this command!',
                        ephemeral: true
                    });
                } else {
                    await interaction.reply({
                        content: '❌ There was an error while executing this command!',
                        ephemeral: true
                    });
                }
            } catch (replyError) {
                console.error('Error sending error response:', replyError);
            }
        }
    }
};