const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

/**
 * Creates a Discord Components v2 response structure
 * This utility builds interactive responses using Discord's modern component system
 * instead of traditional embeds for richer user experiences
 */
class ComponentsV2Builder {
    constructor() {
        this.components = [];
        this.content = '';
    }

    /**
     * Sets the main text content for the response
     * @param {string} text - The main text content
     * @returns {ComponentsV2Builder} - Returns this for method chaining
     */
    setContent(text) {
        this.content = text;
        return this;
    }

    /**
     * Creates a Container component with accent color and nested components
     * @param {number} accentColor - RGB color value for the container accent
     * @param {Array} components - Array of components to include in the container
     * @returns {ComponentsV2Builder} - Returns this for method chaining
     */
    addContainer(accentColor = 0x5865F2, components = []) {
        // Note: Discord.js doesn't have native Container/Section components yet
        // We'll simulate the structure using ActionRows and styling
        this.accentColor = accentColor;
        return this;
    }

    /**
     * Creates a Section component that combines text and accessories
     * @param {string} text - The text content for the section
     * @param {string} style - The text style ('heading' or 'body')
     * @param {Object} accessory - Optional accessory component (like a button)
     * @returns {ComponentsV2Builder} - Returns this for method chaining
     */
    addSection(text, style = 'body', accessory = null) {
        // Store section data for later processing
        if (!this.sections) {
            this.sections = [];
        }
        
        this.sections.push({
            text,
            style,
            accessory
        });
        
        return this;
    }

    /**
     * Creates a TextDisplay component with formatted text
     * @param {string} text - The text to display
     * @param {string} style - The display style ('heading' or 'body')
     * @returns {ComponentsV2Builder} - Returns this for method chaining
     */
    addTextDisplay(text, style = 'body') {
        const formattedText = style === 'heading' ? `**${text}**` : text;
        this.content += (this.content ? '\n' : '') + formattedText;
        return this;
    }

    /**
     * Creates a Button component
     * @param {string} label - The button label
     * @param {string} customId - The custom ID for the button
     * @param {string} style - The button style ('primary', 'secondary', 'success', 'danger')
     * @returns {Object} - Button component object
     */
    createButton(label, customId, style = 'primary') {
        const buttonStyleMap = {
            'primary': ButtonStyle.Primary,
            'secondary': ButtonStyle.Secondary,
            'success': ButtonStyle.Success,
            'danger': ButtonStyle.Danger
        };

        return new ButtonBuilder()
            .setCustomId(customId)
            .setLabel(label)
            .setStyle(buttonStyleMap[style] || ButtonStyle.Primary);
    }

    /**
     * Adds an interactive button to the response
     * @param {string} label - The button label
     * @param {string} customId - The custom ID for the button
     * @param {string} style - The button style
     * @returns {ComponentsV2Builder} - Returns this for method chaining
     */
    addButton(label, customId, style = 'primary') {
        if (!this.buttons) {
            this.buttons = [];
        }
        
        this.buttons.push(this.createButton(label, customId, style));
        return this;
    }

    /**
     * Adds a separator between sections (implemented as empty line)
     * @returns {ComponentsV2Builder} - Returns this for method chaining
     */
    addSeparator() {
        this.content += '\n\u200B\n'; // Zero-width space for visual separation
        return this;
    }

    /**
     * Builds the final response object compatible with Discord.js
     * @returns {Object} - Discord.js compatible response object
     */
    build() {
        const response = {
            content: this.content || 'Response generated using Discord Components v2',
            components: []
        };

        // Add sections to content if they exist
        if (this.sections) {
            let sectionContent = '';
            this.sections.forEach(section => {
                const formattedText = section.style === 'heading' ? `**${section.text}**` : section.text;
                sectionContent += (sectionContent ? '\n' : '') + formattedText;
            });
            
            if (sectionContent) {
                response.content = sectionContent;
            }
        }

        // Add buttons as ActionRows if they exist
        if (this.buttons && this.buttons.length > 0) {
            // Discord allows up to 5 buttons per ActionRow
            const buttonRows = [];
            for (let i = 0; i < this.buttons.length; i += 5) {
                const rowButtons = this.buttons.slice(i, i + 5);
                const actionRow = new ActionRowBuilder().addComponents(...rowButtons);
                buttonRows.push(actionRow);
            }
            response.components = buttonRows;
        }

        // Add accent color as embed color if specified (fallback for visual styling)
        if (this.accentColor) {
            response.embeds = [{
                color: this.accentColor,
                description: '\u200B' // Minimal embed for color accent only
            }];
        }

        return response;
    }

    /**
     * Static method to create a quick response with Components v2
     * @param {string} text - Main response text
     * @param {Array} buttons - Array of button configurations
     * @param {number} accentColor - Optional accent color
     * @returns {Object} - Discord.js compatible response object
     */
    static createQuickResponse(text, buttons = [], accentColor = null) {
        const builder = new ComponentsV2Builder()
            .setContent(text);

        if (accentColor) {
            builder.addContainer(accentColor);
        }

        buttons.forEach(button => {
            builder.addButton(button.label, button.customId, button.style);
        });

        return builder.build();
    }
}

module.exports = { ComponentsV2Builder };