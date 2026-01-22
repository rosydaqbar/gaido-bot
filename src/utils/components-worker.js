/**
 * Discord Components v2 Builder for Cloudflare Workers
 * ES Module compatible version
 */

/**
 * Discord Components v2 Builder Class
 * Creates interactive Discord messages using the Components v2 system
 */
export class ComponentsV2Builder {
    constructor() {
        this.components = [];
        this.currentContainer = null;
    }

    /**
     * Add a container with accent color
     * @param {number} accentColor - RGB color value (e.g., 0x5865F2 for Discord blurple)
     * @returns {ComponentsV2Builder}
     */
    addContainer(accentColor = 0x5865F2) {
        this.currentContainer = {
            type: 1, // Container type
            components: [],
            accent_color: accentColor
        };
        this.components.push(this.currentContainer);
        return this;
    }

    /**
     * Add a section with text and optional accessory
     * @param {string} text - The text content
     * @param {string} style - Text style: 'heading' or 'body'
     * @param {Object} accessory - Optional accessory component (button, etc.)
     * @returns {ComponentsV2Builder}
     */
    addSection(text, style = 'body', accessory = null) {
        if (!this.currentContainer) {
            this.addContainer(); // Create default container if none exists
        }

        const section = {
            type: 2, // Section type
            components: [
                {
                    type: 3, // TextDisplay type
                    text: text,
                    style: style
                }
            ]
        };

        if (accessory) {
            section.accessory = accessory;
        }

        this.currentContainer.components.push(section);
        return this;
    }

    /**
     * Add a text display component
     * @param {string} text - The text to display
     * @param {string} style - Text style: 'heading' or 'body'
     * @returns {ComponentsV2Builder}
     */
    addTextDisplay(text, style = 'body') {
        if (!this.currentContainer) {
            this.addContainer(); // Create default container if none exists
        }

        this.currentContainer.components.push({
            type: 3, // TextDisplay type
            text: text,
            style: style
        });
        return this;
    }

    /**
     * Add a separator component
     * @returns {ComponentsV2Builder}
     */
    addSeparator() {
        if (!this.currentContainer) {
            this.addContainer(); // Create default container if none exists
        }

        this.currentContainer.components.push({
            type: 4 // Separator type
        });
        return this;
    }

    /**
     * Add a button component
     * @param {string} label - Button label text
     * @param {string} customId - Custom ID for the button
     * @param {string} style - Button style: 'primary', 'secondary', 'success', 'danger'
     * @param {boolean} disabled - Whether the button is disabled
     * @returns {ComponentsV2Builder}
     */
    addButton(label, customId, style = 'secondary', disabled = false) {
        if (!this.currentContainer) {
            this.addContainer(); // Create default container if none exists
        }

        // Map style names to Discord button styles
        const styleMap = {
            'primary': 1,
            'secondary': 2,
            'success': 3,
            'danger': 4,
            'link': 5
        };

        const button = {
            type: 2, // Button component type
            style: styleMap[style] || styleMap['secondary'],
            label: label,
            custom_id: customId,
            disabled: disabled
        };

        // Find or create an action row for the button
        let actionRow = this.currentContainer.components.find(comp => comp.type === 1);
        if (!actionRow) {
            actionRow = {
                type: 1, // Action Row type
                components: []
            };
            this.currentContainer.components.push(actionRow);
        }

        // Add button to action row (max 5 buttons per row)
        if (actionRow.components.length < 5) {
            actionRow.components.push(button);
        } else {
            // Create new action row if current one is full
            const newActionRow = {
                type: 1,
                components: [button]
            };
            this.currentContainer.components.push(newActionRow);
        }

        return this;
    }

    /**
     * Add a select menu component
     * @param {string} customId - Custom ID for the select menu
     * @param {string} placeholder - Placeholder text
     * @param {Array} options - Array of select options
     * @param {number} minValues - Minimum number of values to select
     * @param {number} maxValues - Maximum number of values to select
     * @returns {ComponentsV2Builder}
     */
    addSelectMenu(customId, placeholder, options, minValues = 1, maxValues = 1) {
        if (!this.currentContainer) {
            this.addContainer(); // Create default container if none exists
        }

        const selectMenu = {
            type: 3, // Select Menu component type
            custom_id: customId,
            placeholder: placeholder,
            min_values: minValues,
            max_values: maxValues,
            options: options.map(option => ({
                label: option.label,
                value: option.value,
                description: option.description || undefined,
                emoji: option.emoji || undefined,
                default: option.default || false
            }))
        };

        // Find or create an action row for the select menu
        let actionRow = this.currentContainer.components.find(comp => comp.type === 1);
        if (!actionRow) {
            actionRow = {
                type: 1, // Action Row type
                components: []
            };
            this.currentContainer.components.push(actionRow);
        }

        // Select menus take up the entire action row
        if (actionRow.components.length === 0) {
            actionRow.components.push(selectMenu);
        } else {
            // Create new action row for the select menu
            const newActionRow = {
                type: 1,
                components: [selectMenu]
            };
            this.currentContainer.components.push(newActionRow);
        }

        return this;
    }

    /**
     * Build and return the final components structure
     * @returns {Object} The complete components structure for Discord
     */
    build() {
        if (this.components.length === 0) {
            // Return empty structure if no components were added
            return {
                content: 'No components to display',
                components: []
            };
        }

        return {
            components: this.components
        };
    }

    /**
     * Reset the builder to start fresh
     * @returns {ComponentsV2Builder}
     */
    reset() {
        this.components = [];
        this.currentContainer = null;
        return this;
    }

    /**
     * Get the current component count
     * @returns {number}
     */
    getComponentCount() {
        return this.components.length;
    }

    /**
     * Validate the current structure
     * @returns {Object} Validation result with isValid boolean and errors array
     */
    validate() {
        const errors = [];
        
        if (this.components.length === 0) {
            errors.push('No components have been added');
        }

        // Validate each container
        this.components.forEach((container, containerIndex) => {
            if (!container.components || container.components.length === 0) {
                errors.push(`Container ${containerIndex} has no components`);
            }

            // Validate action rows don't exceed button limits
            container.components.forEach((component, componentIndex) => {
                if (component.type === 1 && component.components) { // Action Row
                    if (component.components.length > 5) {
                        errors.push(`Action row ${componentIndex} in container ${containerIndex} has too many components (max 5)`);
                    }
                }
            });
        });

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}