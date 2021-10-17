module.exports = {
    name: 'ban',
    aliases: [],
    usage: `ban <user> <Reason>`,
    description: 'Bans The Mentioned User from the Server',
    timeout: '',
    category: 'moderation',
    userpermissions: ['BAN_MEMBERS'],
    botpermissions: ['BAN_MEMBERS'],
    async execute(client, message, args) {
        let target;
        let reason = args.slice(1).join(' ');
        if (message.mentions.members.first()) {
            target = message.mentions.members.first();
        }
        else {
            target = message.guild.members.cache.get(args[0])
        }
        if (!target) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}ban <user> <Reason>\``);
        if (message.guild.me.roles.highest.position <= target.roles.highest.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Ban The Member!`);
        if (message.member.roles.highest.position <= target.roles.highest.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Ban The Member!`);
        if (target.id === message.guild.ownerID) return message.reply(`${client.emotes.failed} | Server Owner Cannot Be Banned!`)
        if (target.id === message.author.id) return message.reply(`${client.emotes.failed} | You Cannot Ban Yourself!`);
        if (client.dev.includes(target.id)) return message.reply(`${client.emotes.failed} | I Cannot Ban My Owner!`);
        await target.ban({ reason: `[${message.author.username}] : ${reason || `No Reason Provided!`}` });

        message.reply(`${client.emotes.success} | ${target.user.tag}(${target.id}) Has Been Banned By \`${message.author.tag}\` For \`${reason || `No Reason Provided`}\`!`);
    }
}