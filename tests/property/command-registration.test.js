const fc = require('fast-check');
const { deployCommands } = require('../../src/utils/deploy');
const { REST, Routes } = require('discord.js');

// Mock discord.js REST and Routes
jest.mock('discord.js', () => ({
  REST: jest.fn(),
  Routes: {
    applicationGuildCommands: jest.fn()
  }
}));

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

describe('Property Tests: Command Registration', () => {
  let originalEnv;
  let mockRest;
  let mockPut;

  beforeEach(() => {
    // Save original environment
    originalEnv = process.env;
    
    // Mock REST instance
    mockPut = jest.fn();
    mockRest = {
      setToken: jest.fn().mockReturnThis(),
      put: mockPut
    };
    REST.mockImplementation(() => mockRest);
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  /**
   * Feature: discord-slash-bot, Property 4: Command registration uses correct identifiers
   * Validates: Requirements 2.1, 2.2
   */
  test('Property 4: Command registration uses correct identifiers', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          token: fc.string({ minLength: 50, maxLength: 100 }),
          clientId: fc.string({ minLength: 15, maxLength: 25 }),
          guildId: fc.string({ minLength: 15, maxLength: 25 }),
          commands: fc.array(fc.record({
            name: fc.string({ minLength: 1, maxLength: 32 }),
            description: fc.string({ minLength: 1, maxLength: 100 })
          }), { minLength: 0, maxLength: 5 })
        }),
        async ({ token, clientId, guildId, commands }) => {
          // Set up environment variables
          process.env = {
            ...originalEnv,
            DISCORD_TOKEN: token,
            DISCORD_CLIENT_ID: clientId,
            DISCORD_GUILD_ID: guildId
          };

          // Mock successful API response
          mockPut.mockResolvedValue(commands);

          try {
            await deployCommands(commands);

            // Verify REST was initialized with correct version
            expect(REST).toHaveBeenCalledWith({ version: '10' });
            
            // Verify token was set correctly
            expect(mockRest.setToken).toHaveBeenCalledWith(token);
            
            // Verify Routes.applicationGuildCommands was called with correct identifiers
            expect(Routes.applicationGuildCommands).toHaveBeenCalledWith(clientId, guildId);
            
            // Verify put was called with correct route and body
            expect(mockPut).toHaveBeenCalledWith(
              Routes.applicationGuildCommands(clientId, guildId),
              { body: commands }
            );

            return true;
          } catch (error) {
            // Should not throw with valid inputs
            return false;
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: discord-slash-bot, Property 5: Successful registration triggers confirmation logging
   * Validates: Requirements 2.3
   */
  test('Property 5: Successful registration triggers confirmation logging', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          token: fc.string({ minLength: 50, maxLength: 100 }),
          clientId: fc.string({ minLength: 15, maxLength: 25 }),
          guildId: fc.string({ minLength: 15, maxLength: 25 }),
          commands: fc.array(fc.record({
            name: fc.string({ minLength: 1, maxLength: 32 }),
            description: fc.string({ minLength: 1, maxLength: 100 })
          }), { minLength: 1, maxLength: 5 })
        }),
        async ({ token, clientId, guildId, commands }) => {
          // Set up environment variables
          process.env = {
            ...originalEnv,
            DISCORD_TOKEN: token,
            DISCORD_CLIENT_ID: clientId,
            DISCORD_GUILD_ID: guildId
          };

          // Mock console.log to capture logging
          const originalConsoleLog = console.log;
          const logMessages = [];
          console.log = (...args) => {
            logMessages.push(args.join(' '));
          };

          // Mock successful API response
          mockPut.mockResolvedValue(commands);

          try {
            await deployCommands(commands);

            // Restore original console.log
            console.log = originalConsoleLog;

            // Verify confirmation messages were logged
            const startMessage = logMessages.find(msg => 
              msg.includes('Started refreshing') && 
              msg.includes(commands.length.toString()) &&
              msg.includes('application (/) commands')
            );
            expect(startMessage).toBeDefined();

            const successMessage = logMessages.find(msg => 
              msg.includes('Successfully reloaded') && 
              msg.includes(commands.length.toString()) &&
              msg.includes('application (/) commands')
            );
            expect(successMessage).toBeDefined();

            return true;
          } catch (error) {
            console.log = originalConsoleLog;
            return false;
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: discord-slash-bot, Property 6: Registration failure triggers error logging
   * Validates: Requirements 2.4
   */
  test('Property 6: Registration failure triggers error logging', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          token: fc.string({ minLength: 50, maxLength: 100 }),
          clientId: fc.string({ minLength: 15, maxLength: 25 }),
          guildId: fc.string({ minLength: 15, maxLength: 25 }),
          commands: fc.array(fc.record({
            name: fc.string({ minLength: 1, maxLength: 32 }),
            description: fc.string({ minLength: 1, maxLength: 100 })
          }), { minLength: 1, maxLength: 5 }),
          errorMessage: fc.string({ minLength: 10, maxLength: 100 }),
          errorCode: fc.option(fc.integer({ min: 10000, max: 99999 }))
        }),
        async ({ token, clientId, guildId, commands, errorMessage, errorCode }) => {
          // Set up environment variables
          process.env = {
            ...originalEnv,
            DISCORD_TOKEN: token,
            DISCORD_CLIENT_ID: clientId,
            DISCORD_GUILD_ID: guildId
          };

          // Mock console.error to capture error logging
          const originalConsoleError = console.error;
          const errorMessages = [];
          console.error = (...args) => {
            errorMessages.push(args.join(' '));
          };

          // Mock API error
          const apiError = new Error(errorMessage);
          if (errorCode) {
            apiError.code = errorCode;
          }
          mockPut.mockRejectedValue(apiError);

          try {
            await deployCommands(commands);
            
            // Should not reach here if error is thrown
            console.error = originalConsoleError;
            return false;
          } catch (error) {
            // Restore original console.error
            console.error = originalConsoleError;

            // Verify error messages were logged
            const mainErrorMessage = errorMessages.find(msg => 
              msg.includes('Error registering commands:') && 
              msg.includes(errorMessage)
            );
            expect(mainErrorMessage).toBeDefined();

            // If error code was provided, verify it was logged
            if (errorCode) {
              const codeErrorMessage = errorMessages.find(msg => 
                msg.includes('Discord API Error Code:') && 
                msg.includes(errorCode.toString())
              );
              expect(codeErrorMessage).toBeDefined();
            }

            return true;
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test environment variable validation
   */
  test('Property 6 Extended: Missing environment variables trigger error logging', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.oneof(
          fc.record({ DISCORD_TOKEN: fc.constant(undefined), DISCORD_CLIENT_ID: fc.string(), DISCORD_GUILD_ID: fc.string() }),
          fc.record({ DISCORD_TOKEN: fc.string(), DISCORD_CLIENT_ID: fc.constant(undefined), DISCORD_GUILD_ID: fc.string() }),
          fc.record({ DISCORD_TOKEN: fc.string(), DISCORD_CLIENT_ID: fc.string(), DISCORD_GUILD_ID: fc.constant(undefined) })
        ),
        async (envVars) => {
          // Set up environment variables (some missing)
          process.env = { ...originalEnv, ...envVars };

          // Mock console.error to capture error logging
          const originalConsoleError = console.error;
          const errorMessages = [];
          console.error = (...args) => {
            errorMessages.push(args.join(' '));
          };

          // Mock process.exit to prevent actual exit
          const originalProcessExit = process.exit;
          let exitCalled = false;
          process.exit = (code) => {
            exitCalled = true;
            expect(code).toBe(1);
          };

          try {
            await deployCommands([]);
            
            // Restore functions
            console.error = originalConsoleError;
            process.exit = originalProcessExit;
            
            return false; // Should not reach here
          } catch (error) {
            // Restore functions
            console.error = originalConsoleError;
            process.exit = originalProcessExit;

            // Verify error was logged and exit was called
            expect(errorMessages.length).toBeGreaterThan(0);
            expect(exitCalled).toBe(true);

            const errorMessage = errorMessages.find(msg => 
              msg.includes('Error:') && 
              (msg.includes('DISCORD_TOKEN') || msg.includes('DISCORD_CLIENT_ID') || msg.includes('DISCORD_GUILD_ID')) &&
              msg.includes('is required')
            );
            expect(errorMessage).toBeDefined();

            return true;
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});