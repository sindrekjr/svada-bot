'use strict';

const { CommandoClient } = require('discord.js-commando');

module.exports = (config) => {
    const bot = new CommandoClient({
        owners: config._BOT_OWNERS,
        commandPrefix: '/',
        disableEveryone: true,
        unknownCommandResponse: false
    });

    bot.registry
        .registerDefaultTypes()
        .registerGroups([
            ['standard', '']
        ])
        .registerDefaultGroups()
        .registerDefaultCommands()
        .registerCommandsIn(__dirname + '/commands');

    bot.login(config._BOT_TOKEN);
}
