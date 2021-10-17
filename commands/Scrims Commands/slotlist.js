const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'slotlist',
    aliases: [],
    usage: `slotlist`,
    description: 'Returns Slotlist',
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

        for (let i = 1; i < slots; i++) {
            if (db.get("sno" + sid + i) == null) {
                db.set("sno" + sid + i, " ");
            }
            teamtext = teamtext + "Slot " + sc + " - " + db.get("sno" + sid + i) + "\n";
            sc++;
            db.delete("sno" + sid + i);
        }
        teamtext = "Slot 1 - 🔒\nSlot 2 - 🔒\n" + teamtext + "Slot 23 - 🔒\nSlot 24 - 🔒\nSlot 25 - 🔒";
        const em2 = new MessageEmbed()
            .setTitle(`${message.guild.name} T3 SCRIMS`)
            .setDescription(`${header}\`\`\`${teamtext}\`\`\`${footer}`)
            //.setThumbnail(`${message.guild.iconURL()}`)
            //.setFooter(`Registration Took : ${ms(r2.createdAt - r1.createdAt)}`)
            .setColor(`#8bffd1`)
        channel.send({ content: `**REGISTRATION CLOSED!**`, embeds: [em2] });
    }
}