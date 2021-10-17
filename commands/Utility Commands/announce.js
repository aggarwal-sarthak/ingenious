const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'announce',
    aliases: ['ann'],
    usage: `announce <Channel>`,
    description: 'Announces Your Given Message',
    timeout: '',
    category: 'utility',
    userpermissions: ['ADMINISTRATOR'],
    botpermissions: ['EMBED_LINKS'],
    async execute(client, message, args) {
        let edit;
        let chan = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!chan) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}announce <Channel>\``)

        let embed = new MessageEmbed();
        let advanced = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The Title Of The Announcement! Type `None` If You Don't Need Title!")
        let m = await message.channel.send({ embeds: [advanced] })
        const filter1 = res => res.author.id === message.author.id

        let title = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
            .then((collected) => {
                if (collected.first().content.toLowerCase() !== "none") {
                    if (collected.first().length > 256)
                        return message.reply(`${client.emotes.failed} | Title Cannot Exceed 2048 Characters!`)
                    embed.setTitle(collected.first().content);
                }
            });

        edit = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The Description Of The Announcement! Type `None` If You Don't Need Description!")
        m.edit({ embeds: [edit] })

        let description = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
            .then((collected) => {
                if (collected.first().content.toLowerCase() !== "none") {
                    if (collected.first().length > 2048)
                        return message.reply(`${client.emotes.failed} | Description Cannot Exceed 2048 Characters!`)
                    embed.setDescription(collected.first().content);
                }
            })

        edit = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The Image Url Of The Announcement! Type `None` If You Don't Need Image!")
        m.edit({ embeds: [edit] })

        let image = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
            .then((collected) => {
                if (collected.first().content.toLowerCase() !== "none") {
                    if (!/\.(jpe?g|png|gif)$/i.test(collected.first().content)) {
                        return message.reply(`${client.emotes.failed} | Invalid URL!`)
                    }
                    embed.setImage(collected.first().content);
                }
            })

        edit = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The Color Of The Announcement!")
        m.edit({ embeds: [edit] })

        let color = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
            .then((collected) => {
                embed.setColor(collected.first().content);
            })

        edit = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The Footer Of The Announcement! Type `None` If You Don't Need Footer!")
        m.edit({ embeds: [edit] })

        let footer = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
            .then((collected) => {
                if (collected.first().content.toLowerCase() !== "none") {
                    if (collected.first().length > 2048)
                        return message.reply(`${client.emotes.failed} | Footer Cannot Exceed 2048 Characters!`)
                            .then(m => m.delete({ timeout: 5000 }));
                    embed.setFooter(collected.first().content);
                }
            })

        let rea = await message.reply({ embeds: [embed] })
        rea.react('✅').then(() => rea.react('❌'));
        let filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        rea.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '✅') {
                    chan.send({ embeds: [embed] });
                    rea.delete()
                    return message.reply(`${client.emotes.success} | Message Announced Successfully!`)
                }
                else {
                    message.reply(`${client.emotes.failed} | Command Cancelled!`);
                }
            })
            .catch(collected => {
                message.reply(`${client.emotes.failed} | Command Timed Out!`);
            });
    }
}