const { Client, Intents, Collection } = require('discord.js');
const client = new Client({
    intents:
        [Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING]
});
const config = require('./config.json');
module.exports = client;

client.dev = ['479987197844652042', '700413010535251969'];
client.commands = new Collection();
client.slashCmds = new Collection();
client.aliases = new Collection();
client.emotes = require('./emoji.json')
client.prefix = require('./config.json')


require('./handlers/baseHandler');

client.login(config.token)