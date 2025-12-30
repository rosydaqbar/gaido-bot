const fc = require('fast-check');
const packageJson = require('../../package.json');

describe('Property Tests: Dependencies', () => {
  /**
   * Feature: discord-slash-bot, Property 1: Modern discord.js version requirement
   * Validates: Requirements 4.1
   */
  test('Property 1: Modern discord.js version requirement', () => {
    fc.assert(
      fc.property(fc.constant(packageJson), (pkg) => {
        // Verify discord.js is present in dependencies
        const hasDiscordJs = pkg.dependencies && 'discord.js' in pkg.dependencies;
        expect(hasDiscordJs).toBe(true);
        
        const discordVersion = pkg.dependencies['discord.js'];
        expect(discordVersion).toBeDefined();
        
        // Extract version number (remove ^ or ~ prefix if present)
        const versionMatch = discordVersion.match(/[\^~]?(\d+)\.(\d+)\.(\d+)/);
        expect(versionMatch).not.toBeNull();
        
        const [, major, minor] = versionMatch.map(Number);
        
        // Verify it's v14 or higher (modern discord.js)
        expect(major).toBeGreaterThanOrEqual(14);
        
        // If it's exactly v14, ensure it's a reasonable minor version
        if (major === 14) {
          expect(minor).toBeGreaterThanOrEqual(0);
        }
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  test('Property 1 Extended: Required dependencies are present', () => {
    fc.assert(
      fc.property(fc.constant(packageJson), (pkg) => {
        // Verify all required dependencies are present
        const requiredDeps = ['discord.js', 'dotenv'];
        const requiredDevDeps = ['jest', 'fast-check'];
        
        requiredDeps.forEach(dep => {
          const hasDep = pkg.dependencies && dep in pkg.dependencies;
          expect(hasDep).toBe(true);
        });
        
        requiredDevDeps.forEach(dep => {
          const hasDevDep = pkg.devDependencies && dep in pkg.devDependencies;
          expect(hasDevDep).toBe(true);
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});