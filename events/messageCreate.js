const client = require('../index');
const ms = require('ms');
const config = require('../config.json');
const Timeout = new Map();

client.on('messageCreate', async message => {
    client.prefix = config.prefix;
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(client.prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0 || !cmd) return;
    let command = client.commands.get(cmd) || client.commands.find(cm => cm.aliases && cm.aliases.includes(cmd));
    if (!command) return;

    try {
        if (!message.guild.me.permissions.has(command.botpermissions || []) | !message.guild.me.permissionsIn(message.channel)) {
            let permname = command.botpermissions.toString();
            return message.reply(`${client.emotes.failed} | I Don't Have ${permname.charAt(0).toUpperCase() + permname.toLowerCase().slice(1).replace('_', ' ') || []} Permission!`)
        }
        if (!message.member.permissions.has(command.userpermissions || [])) {
            let permname = command.userpermissions.toString();
            return message.reply(`${client.emotes.failed} | You Don't Have ${permname.charAt(0).toUpperCase() + permname.toLowerCase().slice(1).replace('_', ' ') || []} Permission!`)
        }

        const timeout = command.timeout;
        const key = message.author.id + command.name;
        const found = Timeout.get(key);

        if (found) {
            const timePassed = Date.now() - found;
            const timeLeft = timeout - timePassed;
            return message.reply(`${client.emotes.failed} | You Can Use This Command Again In **${ms(timeLeft)}**!`);
        }
        else {
            command.execute(client, message, args)
            Timeout.set(key, Date.now());
            setTimeout(() => {
                Timeout.delete(key);
            }, timeout);
        }
    }
    catch (error) {
        client.channels.cache.get('767037578855055360').send({ content: `${client.emotes.failed} | ERROR IN ${cmd} \n${error}` });
    }
})