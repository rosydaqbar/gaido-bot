const fc = require('fast-check');
const { ComponentsV2Builder } = require('../../src/utils/components');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

describe('Component Response Creation Properties', () => {
    
    // **Feature: discord-slash-bot, Property 8: Responses use Components v2 builder**
    // **Validates: Requirements 3.2, 5.1, 5.2, 5.4**
    test('Property 8: Responses use Components v2 builder', () => {
        fc.assert(fc.property(
            fc.string({ minLength: 1, maxLength: 100 }), // response text
            fc.array(fc.record({
                label: fc.string({ minLength: 1, maxLength: 20 }),
                customId: fc.string({ minLength: 1, maxLength: 50 }),
                style: fc.constantFrom('primary', 'secondary', 'success', 'danger')
            }), { minLength: 0, maxLength: 5 }), // buttons array
            fc.option(fc.integer({ min: 0x000000, max: 0xFFFFFF })), // accent color
            (text, buttons, accentColor) => {
                // Create response using Components v2 builder
                const builder = new ComponentsV2Builder();
                builder.setContent(text);
                
                if (accentColor) {
                    builder.addContainer(accentColor);
                }
                
                buttons.forEach(button => {
                    builder.addButton(button.label, button.customId, button.style);
                });
                
                const response = builder.build();
                
                // Verify response structure uses Components v2 patterns
                expect(response).toHaveProperty('content');
                expect(typeof response.content).toBe('string');
                expect(response.content.length).toBeGreaterThan(0);
                
                // Verify it's NOT using EmbedBuilder for primary content
                if (response.embeds && response.embeds.length > 0) {
                    // If embeds exist, they should only be for accent color, not primary content
                    response.embeds.forEach(embed => {
                        expect(embed.description).toBe('\u200B'); // Should be minimal
                        expect(embed.title).toBeUndefined(); // No title in accent-only embeds
                    });
                }
                
                // Verify components structure if buttons exist
                if (buttons.length > 0) {
                    expect(response).toHaveProperty('components');
                    expect(Array.isArray(response.components)).toBe(true);
                    expect(response.components.length).toBeGreaterThan(0);
                    
                    // Each component should be an ActionRow
                    response.components.forEach(component => {
                        expect(component).toBeInstanceOf(ActionRowBuilder);
                    });
                }
                
                return true;
            }
        ), { numRuns: 100 });
    });

    // **Feature: discord-slash-bot, Property 13: Interactive components are included**
    // **Validates: Requirements 5.2**
    test('Property 13: Interactive components are included', () => {
        fc.assert(fc.property(
            fc.string({ minLength: 1, maxLength: 100 }), // response text
            fc.array(fc.record({
                label: fc.string({ minLength: 1, maxLength: 20 }),
                customId: fc.string({ minLength: 1, maxLength: 50 }),
                style: fc.constantFrom('primary', 'secondary', 'success', 'danger')
            }), { minLength: 1, maxLength: 5 }), // at least one button
            (text, buttons) => {
                // Create response with interactive components
                const response = ComponentsV2Builder.createQuickResponse(text, buttons);
                
                // Verify interactive components are present
                expect(response).toHaveProperty('components');
                expect(Array.isArray(response.components)).toBe(true);
                expect(response.components.length).toBeGreaterThan(0);
                
                // Verify each ActionRow contains interactive elements
                response.components.forEach(actionRow => {
                    expect(actionRow).toBeInstanceOf(ActionRowBuilder);
                    expect(actionRow.components.length).toBeGreaterThan(0);
                    
                    // Each component should be a button (interactive)
                    actionRow.components.forEach(component => {
                        expect(component).toBeInstanceOf(ButtonBuilder);
                        expect(component.data.label).toBeDefined();
                        expect(component.data.custom_id).toBeDefined();
                        expect(component.data.style).toBeDefined();
                    });
                });
                
                // Verify the number of buttons matches input
                const totalButtons = response.components.reduce((total, row) => {
                    return total + row.components.length;
                }, 0);
                expect(totalButtons).toBe(buttons.length);
                
                return true;
            }
        ), { numRuns: 100 });
    });

    // Additional property test for component builder methods
    test('Component builder methods work correctly', () => {
        fc.assert(fc.property(
            fc.string({ minLength: 1, maxLength: 50 }),
            fc.string({ minLength: 1, maxLength: 50 }),
            fc.constantFrom('heading', 'body'),
            (text1, text2, style) => {
                const builder = new ComponentsV2Builder();
                
                // Test method chaining
                const result = builder
                    .setContent(text1)
                    .addTextDisplay(text2, style)
                    .addSeparator()
                    .addButton('Test', 'test_btn', 'primary');
                
                expect(result).toBe(builder); // Should return same instance for chaining
                
                const response = builder.build();
                expect(response.content).toContain(text1);
                expect(response.components.length).toBeGreaterThan(0);
                
                return true;
            }
        ), { numRuns: 100 });
    });
});