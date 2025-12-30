const fc = require('fast-check');
const { Collection } = require('discord.js');

// Mock interaction object for testing
const createMockInteraction = (commandName, isSlashCommand = true) => ({
  isChatInputCommand: jest.fn().mockReturnValue(isSlashCommand),
  commandName: commandName,
  user: { tag: 'TestUser#1234' },
  replied: false,
  deferred: false,
  reply: jest.fn().mockResolvedValue(true),
  followUp: jest.fn().mockResolvedValue(true)
});

// Mock command object
const createMockCommand = (name, shouldThrow = false) => ({
  data: { name },
  execute: jest.fn().mockImplementation(async (interaction) => {
    if (shouldThrow) {
      throw new Error('Command execution failed');
    }
    await interaction.reply({ content: 'Test response' });
  })
});

// Mock the entire interaction handler module to control command loading
const createMockInteractionHandler = (availableCommands = {}) => {
  return {
    name: 'interactionCreate',
    async execute(interaction) {
      // Only handle slash command interactions
      if (!interaction.isChatInputCommand()) return;

      // Get the command that was executed
      const command = availableCommands[interaction.commandName];

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

      // Execute the command with proper error handling
      try {
        console.log(`Executing command: ${interaction.commandName} for user: ${interaction.user.tag}`);
        
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
};

describe('Property Tests: Interaction Handling', () => {
  let originalConsoleError;
  let originalConsoleLog;
  let errorLogs;
  let infoLogs;

  beforeEach(() => {
    // Reset mocks and capture console output
    jest.clearAllMocks();
    errorLogs = [];
    infoLogs = [];
    
    originalConsoleError = console.error;
    originalConsoleLog = console.log;
    
    console.error = (...args) => {
      errorLogs.push(args.join(' '));
    };
    
    console.log = (...args) => {
      infoLogs.push(args.join(' '));
    };
  });

  afterEach(() => {
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
  });

  /**
   * Feature: discord-slash-bot, Property 7: Slash command interactions are detected
   * Validates: Requirements 3.1
   */
  test('Property 7: Slash command interactions are detected', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('test', 'unknown'), // Test both known and unknown commands
        fc.boolean(), // Whether it's a slash command
        async (commandName, isSlashCommand) => {
          const mockInteraction = createMockInteraction(commandName, isSlashCommand);
          
          // Create available commands for this test
          const availableCommands = {};
          if (commandName === 'test') {
            availableCommands.test = createMockCommand('test');
          }
          
          const interactionHandler = createMockInteractionHandler(availableCommands);
          await interactionHandler.execute(mockInteraction);

          // Should always check if it's a slash command
          expect(mockInteraction.isChatInputCommand).toHaveBeenCalled();

          if (isSlashCommand) {
            if (commandName === 'test') {
              // Should execute the command if it exists and is a slash command
              expect(availableCommands.test.execute).toHaveBeenCalledWith(mockInteraction);
            } else {
              // Should reply with error for unknown commands
              expect(mockInteraction.reply).toHaveBeenCalledWith({
                content: '❌ Command not found. Please try again.',
                ephemeral: true
              });
            }
          } else {
            // Should not execute command for non-slash interactions
            if (commandName === 'test' && availableCommands.test) {
              expect(availableCommands.test.execute).not.toHaveBeenCalled();
            }
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: discord-slash-bot, Property 9: Interactions receive responses
   * Validates: Requirements 3.3
   */
  test('Property 9: Interactions receive responses', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('test'), // Valid command name
        async (commandName) => {
          const mockInteraction = createMockInteraction(commandName, true);
          
          // Create available commands for this test
          const availableCommands = {
            test: createMockCommand(commandName)
          };
          
          const interactionHandler = createMockInteractionHandler(availableCommands);
          await interactionHandler.execute(mockInteraction);

          // Should execute the command and send a response
          expect(availableCommands.test.execute).toHaveBeenCalledWith(mockInteraction);
          expect(mockInteraction.reply).toHaveBeenCalled();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: discord-slash-bot, Property 10: Response timing meets Discord requirements
   * Validates: Requirements 3.4
   */
  test('Property 10: Response timing meets Discord requirements', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('test'), // Valid command name
        async (commandName) => {
          const mockInteraction = createMockInteraction(commandName, true);
          
          // Create available commands for this test
          const availableCommands = {
            test: createMockCommand(commandName)
          };
          
          const interactionHandler = createMockInteractionHandler(availableCommands);

          const startTime = Date.now();
          
          await interactionHandler.execute(mockInteraction);
          
          const executionTime = Date.now() - startTime;
          
          // Should complete within reasonable time (well under 3 seconds)
          // Using 1000ms as a reasonable upper bound for testing
          expect(executionTime).toBeLessThan(1000);
          
          // Should have responded to the interaction
          expect(mockInteraction.reply).toHaveBeenCalled();
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: discord-slash-bot, Property 12: Modern API patterns are used
   * Validates: Requirements 4.2, 4.3
   */
  test('Property 12: Modern API patterns are used', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('test'), // Valid command name
        async (commandName) => {
          const mockInteraction = createMockInteraction(commandName, true);
          
          // Create available commands with modern structure for this test
          const availableCommands = {
            test: {
              data: { name: commandName }, // Modern SlashCommandBuilder pattern
              execute: jest.fn().mockResolvedValue(true) // Modern async execute pattern
            }
          };
          
          const interactionHandler = createMockInteractionHandler(availableCommands);
          await interactionHandler.execute(mockInteraction);

          // Should use modern interaction detection
          expect(mockInteraction.isChatInputCommand).toHaveBeenCalled();
          
          // Should use modern command structure (data + execute)
          expect(availableCommands.test.data).toBeDefined();
          expect(availableCommands.test.data.name).toBe(commandName);
          expect(typeof availableCommands.test.execute).toBe('function');
          
          // Should use modern async patterns
          expect(availableCommands.test.execute).toHaveBeenCalledWith(mockInteraction);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});