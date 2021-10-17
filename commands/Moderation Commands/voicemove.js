const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice')

module.exports = {
    name: 'voicemove',
    aliases: ['vm', 'vmove'],
    usage: `voicemove`,
    description: 'Moves All Members To Another VC',
    timeout: '10000',
    category: 'moderation',
    userpermissions: ['MOVE_MEMBERS'],
    botpermissions: ['MOVE_MEMBERS', 'CONNECT'],
    async execute(client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return message.reply(`${client.emotes.failed} | You Have To Be In A Voice Channel To Use This Command!`);
        if (!message.guild.me.voice.connection) {
            const connecting = joinVoiceChannel({
                channelId: channel.id,
                guildId: message.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: true,
                selfMute: true,
            })
            if (connecting) {
                message.reply(`${client.emotes.success} | Move Me To Another Vc!`)

                client.on("voiceStateUpdate", async (oldmem, newmem) => {
                    if (newmem.member.voice.channel && newmem.member.voice.channel.id !== channel.id) {
                        let newchannel = message.guild.channels.cache.get(newmem.member.voice.channel.id);
                        if (client.user.id === newmem.member.user.id) {
                            channel.members.forEach(e => {
                                e.voice.setChannel(newchannel);
                                //newchannel.leave();
                                getVoiceConnection(newchannel.guild.id).destroy();
                            })
                        }
                    }
                })
            }
        }
        else {
            message.reply(`${client.emotes.failed} | I'm Already Connected To A Voice Channel!`);
        }
    }
}