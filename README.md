# Svada Bot
Simple Discord bot that creates Norwegian "svada" (political gibberish) by calling upon http://svadagenerator.no/.

### Installation
The bot is built with [discord.js-commando](https://github.com/discordjs/Commando) on [Node.js](https://nodejs.org/). After making sure you have Node installed, run the following command in the project root. 
```
npm install
```

### Configuration (config.json)
To configure and run this code with an actual bot you need to create a file config.json in the project root. It should look more or less like the following. 
```
{
  "BOT": {
    "_TOKEN": "", // Secret bot token granted by Discord
    "_OWNERS": [] // Discord User IDs (18-digit integers)
  }
}
```
