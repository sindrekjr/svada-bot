'use strict';

const {CommandoClient} = require('discord.js-commando');
const translate = require('translate'); 

module.exports = (config) => {
    const bot = new CommandoClient({
        owners: config.BOT._OWNERS,
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

    if(config.TRANSLATE) {
        bot.translate = initializeTranslate(config.TRANSLATE);
    }
    
    bot.login(config.BOT._TOKEN);
}

function initializeTranslate(config) {
    translate.engine = config._ENGINE;
    translate.key = config._KEY; 
    translate.from = 'no'; 
    translate.to = config._TO || 'en'; 
    return translate; 
}
