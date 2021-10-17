module.exports = {
    name: 'hide',
    aliases: [],
    usage: `hide [Channel]`,
    description: 'Hides The Current/Mentioned Channels for everyone',
    timeout: '',
    category: 'moderation',
    userpermissions: ['MANAGE_CHANNELS'],
    botpermissions: ['MANAGE_CHANNELS'],
    async execute(client, message, args) {
        if (message.mentions.channels.first()) {
            await message.mentions.channels.forEach(async channel => {
                await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                    VIEW_CHANNEL: false
                });
                message.channel.send(`${client.emotes.success} | <#${channel.id}> Has Been Hidden!`)
            })
        }
        else if (!args[0]) {
            message.channel.permissionOverwrites.edit(message.channel.guild.roles.everyone, {
                VIEW_CHANNEL: false
            });
            message.channel.send(`${client.emotes.success} | <#${message.channel.id}> Has Been Hidden!`)
        }
        else return;
    }
}