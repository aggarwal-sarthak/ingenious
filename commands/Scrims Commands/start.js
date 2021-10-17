const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'start',
    aliases: [],
    usage: `start`,
    description: 'Starts Scrims',
    timeout: '',
    category: 'utility',
    userpermissions: [],
    botpermissions: ['EMBED_LINKS', 'MANAGE_CHANNELS'],
    async execute(client, message, args) {
        let modrole = db.get("modrole");
        if (!message.member.roles.cache.has(modrole)) return message.reply(`${client.emotes.failed} | You Need ScrimsMod Role To Run This Command!`);
        let sid = db.get("scrimscount");
        if (sid == null) message.reply(`${client.emotes.failed} | This Channel Is Not Set For Scrims Registration!`)
        let chan, role, tags, slots, tname, name, sno = 1, sc = 3, header, footer;
        var teamtext = "";

        for (let i = 1; i <= sid; i++) {
            chan = db.get("chan" + i);
            role = db.get("role" + i);
            slots = db.get("slots" + i);
            tags = db.get("tags" + i)
            header = db.get("header" + i);
            footer = db.get("footer" + i);

            if (message.channel.id != chan) {
                message.reply(`${client.emotes.failed} | This Channel Is Not Set For Scrims Registration!`);
                break;
            }
        }

        let channel = message.guild.channels.cache.get(chan);
        await channel.permissionOverwrites.edit(message.channel.guild.roles.everyone, {
            //VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })
        const filter = m => m.mentions.members.size >= tags && m.mentions.members.some(mem => !mem.user.bot) && !m.author.bot
        //&& !m.member.roles.cache.has(role);
        const em = new MessageEmbed()
            .setTitle(`REGISTRATION STARTED!`)
            .setDescription(`\`\`\`TOTAL SLOTS : ${slots}\nTAGS REQUIRED : ${tags}\`\`\``)
            .setThumbnail(`${message.guild.iconURL()}`)
            .setColor(`#8bffd1`)
        await channel.send({ embeds: [em] });

        const regcol = new Discord.MessageCollector(channel, { filter, max: slots });

        regcol.on('collect', async m => {
            m.member.roles.add(role);
            m.react(client.emotes.success);
            function removeFromString(words, tname) {
                return words.reduce((result, word) => result.replace(word, ''), tname)
            }
            tname = m.content.toLowerCase().split('\n')[0];
            if (tname.includes(`<@`)) {
                name = m.author.username + "'s Slot";
            } else {
                name = removeFromString(["team ", "name ", ": ", "- "], tname).split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');;
            }

            db.set("sno" + sid + sno, name);
            sno++;
        });

        regcol.on('end', async collected => {
            for (let i = 1; i < sno; i++) {
                teamtext = teamtext + "Slot " + sc + " - " + db.get("sno" + sid + i) + "\n";
                sc++;
                db.delete("sno" + sid + i);
            }
            await channel.permissionOverwrites.edit(message.channel.guild.roles.everyone, {
                SEND_MESSAGES: false
            })
            teamtext = "Slot 1 - 🔒\nSlot 2 - 🔒\n" + teamtext + "Slot 23 - 🔒\nSlot 24 - 🔒\nSlot 25 - 🔒";
            const em2 = new MessageEmbed()
                .setTitle(`${message.guild.name} T3 SCRIMS`)
                .setDescription(`${header}\`\`\`${teamtext}\`\`\`${footer}`)
                //.setThumbnail(`${message.guild.iconURL()}`)
                //.setFooter(`Registration Took : ${ms(r2.createdAt - r1.createdAt)}`)
                .setColor(`#8bffd1`)
            channel.send({ content: `**REGISTRATION CLOSED!**`, embeds: [em2] });
        })
    }
}