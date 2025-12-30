const { SlashCommandBuilder } = require('discord.js');
const { ComponentsV2Builder } = require('../utils/components');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test command that responds with Discord Components v2'),
    
    async execute(interaction) {
        try {
            // Create response using Components v2 builder with interactive components
            const response = new ComponentsV2Builder()
                .addContainer(0x5865F2) // Discord blurple accent color
                .addSection('🎉 Test Command Response', 'heading')
                .addSeparator()
                .addSection('This response was generated using Discord Components v2!', 'body')
                .addTextDisplay('✅ Components v2 builder is working correctly', 'body')
                .addSeparator()
                .addTextDisplay('Interactive elements:', 'heading')
                .addButton('Primary Action', 'test_primary', 'primary')
                .addButton('Secondary Action', 'test_secondary', 'secondary')
                .addButton('Success Action', 'test_success', 'success')
                .build();

            // Send the Components v2 response with error handling
            try {
                await interaction.reply(response);
                console.log(`Successfully sent Components v2 response to user: ${interaction.user.tag}`);
            } catch (replyError) {
                console.error('Error sending Components v2 response:', replyError);
                
                // Try to send a fallback response if the original reply failed
                try {
                    if (!interaction.replied && !interaction.deferred) {
                        await interaction.reply({
                            content: '❌ Error sending response. Please try again.',
                            ephemeral: true
                        });
                    } else {
                        await interaction.followUp({
                            content: '❌ Error sending response. Please try again.',
                            ephemeral: true
                        });
                    }
                } catch (fallbackError) {
                    console.error('Error sending fallback response:', fallbackError);
                }
            }
            
        } catch (componentError) {
            console.error('Error creating Components v2 response:', componentError);
            
            // Send user-friendly error message when component creation fails
            try {
                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        content: '❌ Error creating Components v2 response. Please try again.',
                        ephemeral: true
                    });
                } else {
                    await interaction.followUp({
                        content: '❌ Error creating Components v2 response. Please try again.',
                        ephemeral: true
                    });
                }
            } catch (errorResponseError) {
                console.error('Error sending error response:', errorResponseError);
                
                // Last resort: try to acknowledge the interaction to prevent timeout
                try {
                    if (!interaction.replied && !interaction.deferred) {
                        await interaction.reply({
                            content: '❌ An unexpected error occurred.',
                            ephemeral: true
                        });
                    }
                } catch (finalError) {
                    console.error('Critical error: Unable to respond to interaction:', finalError);
                }
            }
        }
    }
};