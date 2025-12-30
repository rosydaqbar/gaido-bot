const fs = require('fs');
const path = require('path');

describe('Discord Bot Integration Tests', () => {
    // Store original environment variables
    let originalEnv;

    beforeAll(() => {
        // Store original environment
        originalEnv = { ...process.env };
    });

    afterAll(() => {
        // Restore original environment
        process.env = originalEnv;
    });

    beforeEach(() => {
        // Set up test environment variables
        process.env.DISCORD_TOKEN = 'test-token';
        process.env.DISCORD_APPLICATION_ID = 'test-app-id';
        process.env.DISCORD_GUILD_ID = 'test-guild-id';
        process.env.NODE_ENV = 'test';
        
        // Clear all require caches for fresh imports
        Object.keys(require.cache).forEach(key => {
            if (key.includes('src/')) {
                delete require.cache[key];
            }
        });
    });

    describe('File Structure and Module Loading', () => {
        test('should have all required bot files present', () => {
            // Check main bot file exists
            expect(fs.existsSync(path.join(__dirname, '../../src/index.js'))).toBe(true);
            
            // Check handlers exist
            expect(fs.existsSync(path.join(__dirname, '../../src/handlers/ready.js'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '../../src/handlers/interaction.js'))).toBe(true);
            
            // Check commands exist
            expect(fs.existsSync(path.join(__dirname, '../../src/commands/test.js'))).toBe(true);
            
            // Check utilities exist
            expect(fs.existsSync(path.join(__dirname, '../../src/utils/components.js'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '../../src/utils/deploy.js'))).toBe(true);
        });

        test('should load all modules without syntax errors', () => {
            // Test that all modules can be required without throwing
            expect(() => require('../../src/handlers/ready')).not.toThrow();
            expect(() => require('../../src/handlers/interaction')).not.toThrow();
            expect(() => require('../../src/commands/test')).not.toThrow();
            expect(() => require('../../src/utils/components')).not.toThrow();
            expect(() => require('../../src/utils/deploy')).not.toThrow();
        });
    });

    describe('Ready Event Handler Integration', () => {
        test('should execute ready handler with proper logging', () => {
            const readyHandler = require('../../src/handlers/ready');
            
            // Mock console.log to capture output
            const logMessages = [];
            console.log = jest.fn((message) => logMessages.push(message));
            
            // Mock client object
            const mockClient = {
                user: { tag: 'TestBot#1234' },
                guilds: { cache: { size: 2 } }
            };
            
            // Execute the ready handler
            readyHandler.execute(mockClient);
            
            // Verify correct logging occurred
            expect(logMessages).toContain('Bot is ready! Logged in as TestBot#1234');
            expect(logMessages).toContain('Bot is connected to 2 guild(s)');
            
            // Verify handler properties
            expect(readyHandler.name).toBe('clientReady'); // Events.ClientReady resolves to 'clientReady'
            expect(readyHandler.once).toBe(true);
            expect(typeof readyHandler.execute).toBe('function');
        });
    });

    describe('Command Structure Integration', () => {
        test('should have properly structured test command', () => {
            const testCommand = require('../../src/commands/test');
            
            // Verify command structure
            expect(testCommand).toHaveProperty('data');
            expect(testCommand).toHaveProperty('execute');
            expect(typeof testCommand.execute).toBe('function');
            
            // Verify command data structure
            expect(testCommand.data).toHaveProperty('name');
            expect(testCommand.data.name).toBe('test');
        });

        test('should load commands dynamically in interaction handler', () => {
            const interactionHandler = require('../../src/handlers/interaction');
            
            // Verify handler structure
            expect(interactionHandler).toHaveProperty('name');
            expect(interactionHandler).toHaveProperty('execute');
            expect(typeof interactionHandler.execute).toBe('function');
            expect(interactionHandler.name).toBe('interactionCreate');
        });
    });

    describe('Components Integration', () => {
        test('should have functional Components v2 builder', () => {
            const { ComponentsV2Builder } = require('../../src/utils/components');
            
            // Create a new builder instance
            const builder = new ComponentsV2Builder();
            
            // Verify builder methods exist and are chainable
            expect(typeof builder.addContainer).toBe('function');
            expect(typeof builder.addSection).toBe('function');
            expect(typeof builder.addSeparator).toBe('function');
            expect(typeof builder.addTextDisplay).toBe('function');
            expect(typeof builder.addButton).toBe('function');
            expect(typeof builder.build).toBe('function');
            
            // Test method chaining
            const result = builder
                .addContainer(0x5865F2)
                .addSection('Test', 'heading')
                .addSeparator()
                .addTextDisplay('Test text', 'body')
                .addButton('Test Button', 'test_btn', 'primary');
            
            expect(result).toBe(builder); // Should return the same instance for chaining
            
            // Test build method returns an object
            const builtResponse = builder.build();
            expect(typeof builtResponse).toBe('object');
            expect(builtResponse).toHaveProperty('components');
        });
    });

    describe('Error Handling Integration', () => {
        test('should handle interaction errors gracefully', async () => {
            const interactionHandler = require('../../src/handlers/interaction');
            
            // Mock interaction that is not a chat input command
            const mockInteraction = {
                isChatInputCommand: () => false
            };
            
            // Should not throw when handling non-chat-input interactions
            await expect(interactionHandler.execute(mockInteraction)).resolves.not.toThrow();
        });

        test('should handle missing commands gracefully', async () => {
            const interactionHandler = require('../../src/handlers/interaction');
            
            // Mock console.error to capture error messages
            const originalConsoleError = console.error;
            const errorMessages = [];
            console.error = jest.fn((message) => errorMessages.push(message));
            
            // Mock interaction for non-existent command
            const mockInteraction = {
                isChatInputCommand: () => true,
                commandName: 'nonexistent',
                reply: jest.fn().mockResolvedValue()
            };
            
            // Execute handler
            await interactionHandler.execute(mockInteraction);
            
            // Verify error was logged
            expect(errorMessages.some(msg => 
                typeof msg === 'string' && msg.includes('No command matching nonexistent was found')
            )).toBe(true);
            
            // Verify error response was sent
            expect(mockInteraction.reply).toHaveBeenCalledWith({
                content: '❌ Command not found. Please try again.',
                ephemeral: true
            });
            
            // Restore console.error
            console.error = originalConsoleError;
        });
    });

    describe('Environment Configuration Integration', () => {
        test('should validate required environment variables', () => {
            // Test that the validation function works correctly
            // We'll test this by checking the main bot file structure
            const mainBotPath = path.join(__dirname, '../../src/index.js');
            const mainBotContent = fs.readFileSync(mainBotPath, 'utf8');
            
            // Verify that environment validation is present in the code
            expect(mainBotContent).toContain('validateEnvironment');
            expect(mainBotContent).toContain('DISCORD_TOKEN');
            expect(mainBotContent).toContain('DISCORD_APPLICATION_ID');
            expect(mainBotContent).toContain('DISCORD_GUILD_ID');
            
            // Verify error handling for missing variables is present
            expect(mainBotContent).toContain('Missing required environment variables');
        });

        test('should have proper error handling for authentication failures', () => {
            const mainBotPath = path.join(__dirname, '../../src/index.js');
            const mainBotContent = fs.readFileSync(mainBotPath, 'utf8');
            
            // Verify authentication error handling is present
            expect(mainBotContent).toContain('Failed to authenticate bot');
            expect(mainBotContent).toContain('TOKEN_INVALID');
            expect(mainBotContent).toContain('DISALLOWED_INTENTS');
            expect(mainBotContent).toContain('getaddrinfo ENOTFOUND');
        });
    });

    describe('End-to-End Component Flow', () => {
        test('should create complete component response', () => {
            const { ComponentsV2Builder } = require('../../src/utils/components');
            
            // Create a complete response like the test command does
            const builder = new ComponentsV2Builder();
            const response = builder
                .addContainer(0x5865F2)
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
            
            // Verify response structure
            expect(response).toHaveProperty('components');
            expect(Array.isArray(response.components)).toBe(true);
            expect(response.components.length).toBeGreaterThan(0);
            
            // Verify ActionRow structure (Discord.js uses ActionRows for buttons)
            const actionRow = response.components[0];
            expect(actionRow).toHaveProperty('components');
            expect(Array.isArray(actionRow.components)).toBe(true);
        });
    });

    describe('Deployment Utility Integration', () => {
        test('should have properly structured deploy utility', () => {
            const deployUtil = require('../../src/utils/deploy');
            
            // Verify the deploy utility can be loaded
            expect(deployUtil).toBeDefined();
            
            // The deploy utility should be a script that can be executed
            // We're just verifying it loads without syntax errors
        });
    });
});