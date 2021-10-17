const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'embed',
    aliases: ['em'],
    usage: `embed <Text>`,
    description: 'Embeds Your Given Text',
    timeout: '',
    category: 'utility',
    userpermissions: ['EMBED_LINKS'],
    botpermissions: ['EMBED_LINKS'],
    async execute(client, message, args) {
        if (!args[0]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}embed <Text>\``)
        let msg = args.join(" ")
        let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(msg)
            .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }
}