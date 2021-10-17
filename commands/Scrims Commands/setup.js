const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'setup',
    aliases: [],
    usage: `setup`,
    description: 'Setups The Scrims Configuration',
    timeout: '',
    category: 'utility',
    userpermissions: ['ADMINISTRATOR'],
    botpermissions: ['EMBED_LINKS'],
    async execute(client, message, args) {
        let modrole = db.get("modrole");
        if (modrole) {
            let r1 = message.guild.roles.cache.get(modrole);
            if (!r1) {
                modrole = await message.guild.roles.create({
                    name: 'ScrimsMod',
                    color: '#8bffd1',
                    reason: 'Setup Command Executed',
                })
                message.member.roles.add(modrole);
                db.set("modrole", modrole.id);
            }
        }
        else {
            modrole = await message.guild.roles.create({
                name: 'ScrimsMod',
                color: '#8bffd1',
                reason: 'Setup Command Executed',
            })
            db.set("modrole", modrole.id);
        }

        let sid = db.get("scrimscount");
        let edit, chan, role, tags, slots, header;
        let advanced = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The Registration Channel!")
        let m = await message.channel.send({ embeds: [advanced] })
        const filter1 = res => res.author.id === message.author.id;

        let collected1 = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
        if (collected1) {
            chan = collected1.first().mentions.channels.first() || message.guild.channels.cache.get(collected1.first().content);
            if (!chan) return;
        }

        edit = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The Id Pass Role!")
        m.edit({ embeds: [edit] })

        let collected2 = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
        if (collected2) {
            role = collected2.first().mentions.roles.first() || message.guild.roles.cache.get(collected2.first().content);
            if (!role) return;
        }

        edit = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The Total Number Of Slots!")
        m.edit({ embeds: [edit] })

        let collected3 = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
        if (collected3) {
            if (!isNaN(collected3.first().content)) {
                slots = collected3.first().content;
            }
        }

        edit = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The Tags Required!")
        m.edit({ embeds: [edit] })

        let collected4 = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
        if (collected4) {
            if (!isNaN(collected4.first().content)) {
                tags = collected4.first().content;
            }
        }

        edit = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The SlotList Header! Type `None` For No Header!")
        m.edit({ embeds: [edit] })

        let collected5 = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
        if (collected5) {
            if (collected5.first().content.toLowerCase() != 'none') {
                header = collected5.first().content;
            }
        }

        edit = new MessageEmbed()
            .setColor('#8bffd1')
            .setTitle("Enter The SlotList Footer! Type `None` For No Footer!")
        m.edit({ embeds: [edit] })

        let collected6 = await message.channel.awaitMessages({ filter1, max: 1, time: 30000 })
        if (collected6) {
            if (collected5.first().content.toLowerCase() != 'none') {
                footer = collected6.first().content;
            }
        }

        m.delete();
        message.channel.send(`${client.emotes.success} | Configuration Set!`);

        if (sid > 0) {
            sid = db.add("scrimscount", sid++);
        }
        else if (sid == null) {
            sid = db.set("scrimscount", 1);
        }

        db.set("chan" + sid, chan.id) &
            db.set("role" + sid, role.id) &
            db.set("slots" + sid, slots) &
            db.set("tags" + sid, tags) &
            db.set("header" + sid, header) &
            db.set("footer" + sid, footer);
    }
}