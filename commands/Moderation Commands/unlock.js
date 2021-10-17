module.exports = {
    name: 'unlock',
    aliases: [],
    usage: `unlock [Channel]`,
    description: 'Unlocks the Current/Mentioned Channels for everyone',
    timeout: '',
    category: 'moderation',
    userpermissions: ['MANAGE_CHANNELS'],
    botpermissions: ['MANAGE_CHANNELS'],
    async execute(client, message, args) {
        if (message.mentions.channels.first()) {
            await message.mentions.channels.forEach(async channel => {
                await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                    SEND_MESSAGES: true
                });
                message.channel.send(`${client.emotes.success} | <#${channel.id}> Has Been Unlocked!`)
            })
        }
        else if (!args[0]) {
            message.channel.permissionOverwrites.edit(message.channel.guild.roles.everyone, {
                SEND_MESSAGES: true
            });
            message.channel.send(`${client.emotes.success} | <#${message.channel.id}> Has Been Unlocked!`)
        }
        else return;
    }
}