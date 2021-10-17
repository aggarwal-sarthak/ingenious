module.exports = {
    name: 'voicekick',
    aliases: ['vkick', 'vk'],
    usage: `voicekick <User>`,
    description: 'Kicks Mentioned User From Voice Channel',
    timeout: '',
    category: 'moderation',
    userpermissions: ['MOVE_MEMBERS'],
    botpermissions: ['MOVE_MEMBERS'],
    async execute(client, message, args) {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}voicekick <User>\``);

        let { channel } = target.voice;
        if (!channel) return message.reply(`${client.emotes.failed} | User Is Not In Any Voice Channel!`);
        if (client.dev.includes(target.id)) return message.reply(`${client.emotes.failed} | I Cannot Voicekick My Owner!`);
        target.voice.kick();

        message.reply(`${client.emotes.success} | User Has Been Kicked From Voice Channel!`)
    }
}