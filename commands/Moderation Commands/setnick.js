module.exports = {
    name: 'setnick',
    aliases: ['nick'],
    usage: `setnick <User> <Nickname>`,
    description: 'Sets Mentioned Nickname To Mentioned User',
    timeout: '',
    category: 'moderation',
    userpermissions: ['MANAGE_NICKNAMES'],
    botpermissions: ['MANAGE_NICKNAMES'],
    async execute(client, message, args) {
        let member;
        if (message.mentions.members.first()) {
            member = message.mentions.members.first();
        }
        else {
            member = message.guild.members.cache.get(args[0])
        }
        if (!member) return;
        if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Change ${member} Nickname!`)
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Change ${member} Nickname!`)
        if (member.id === message.guild.ownerID) return message.reply(`${client.emotes.failed} | Server Owner's Nickname Cannot Be Changed!`)
        if (!member) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}setnick <User> <Nickname>\``)
        if (!args[1]) {
            member.setNickname(member.user.username);
            message.reply(`${client.emotes.success} | Reset Nickname to ${member.user.username}!`);
        }
        else {
            const nick = args.join(" ").slice(22);
            if (nick > 32) message.reply(`${client.emotes.failed} | Nickname Character Limit!`)
            member.setNickname(nick);
            message.reply(`${client.emotes.success} | Changed Nickname to ${nick}!`);
        }
    }
}