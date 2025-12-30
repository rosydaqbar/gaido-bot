const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Bot is ready! Logged in as ${client.user.tag}`);
        console.log(`Bot is connected to ${client.guilds.cache.size} guild(s)`);
    },
};