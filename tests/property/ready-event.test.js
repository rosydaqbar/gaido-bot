const fc = require('fast-check');
const { Events } = require('discord.js');
const readyHandler = require('../../src/handlers/ready');

describe('Property Tests: Ready Event', () => {
  /**
   * Feature: discord-slash-bot, Property 2: Bot ready state triggers confirmation logging
   * Validates: Requirements 1.3
   */
  test('Property 2: Bot ready state triggers confirmation logging', () => {
    fc.assert(
      fc.property(
        fc.record({
          user: fc.record({
            tag: fc.string({ minLength: 5, maxLength: 20 })
          }),
          guilds: fc.record({
            cache: fc.record({
              size: fc.integer({ min: 0, max: 100 })
            })
          })
        }),
        (mockClient) => {
          // Mock console.log to capture logging
          const originalConsoleLog = console.log;
          const logMessages = [];
          console.log = (...args) => {
            logMessages.push(args.join(' '));
          };

          // Execute the ready handler
          readyHandler.execute(mockClient);

          // Restore original console.log
          console.log = originalConsoleLog;

          // Verify that confirmation messages were logged
          expect(logMessages.length).toBeGreaterThan(0);
          
          // Check for ready confirmation message
          const readyMessage = logMessages.find(msg => 
            msg.includes('Bot is ready!') && msg.includes(mockClient.user.tag)
          );
          expect(readyMessage).toBeDefined();

          // Check for guild count message
          const guildMessage = logMessages.find(msg => 
            msg.includes('Bot is connected to') && 
            msg.includes(mockClient.guilds.cache.size.toString()) &&
            msg.includes('guild(s)')
          );
          expect(guildMessage).toBeDefined();

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 2 Extended: Ready handler has correct event configuration', () => {
    fc.assert(
      fc.property(fc.constant(readyHandler), (handler) => {
        // Verify handler has correct event name
        expect(handler.name).toBe(Events.ClientReady);
        
        // Verify handler is configured to run once
        expect(handler.once).toBe(true);
        
        // Verify handler has execute function
        expect(typeof handler.execute).toBe('function');
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});