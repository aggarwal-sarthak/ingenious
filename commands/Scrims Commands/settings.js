const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'settings',
    aliases: [],
    usage: `settings`,
    description: 'Displays Scrims Configuration',
    timeout: '',
    category: 'utility',
    userpermissions: ['ADMINISTRATOR'],
    botpermissions: ['EMBED_LINKS'],
    async execute(client, message, args) {
        let sid = db.get("scrimscount");
        let chan, role, tags, slots, modrole = db.get("modrole"), header, footer;

        for (let i = 1; i <= sid; i++) {
            chan = db.get("chan" + i);
            role = db.get("role" + i);
            slots = db.get("slots" + i);
            tags = db.get("tags" + i);
            header = db.get("header" + i);
            footer = db.get("footer" + i);

            let embed = new MessageEmbed()
                .setColor('#8bffd1')
                .setTitle(`SCRIMS CONFIGURATION`)
                .addField(`SCRIMS COUNT`, `${i}/${sid}`)
                .addField(`MOD ROLE`, `<@&${modrole}>`)
                .addField(`REGISTRATION CHANNEL`, `<#${chan}>`)
                .addField(`ID PASS ROLE`, `<@&${role}>`)
                .addField(`TOTAL SLOTS`, `${slots}`)
                .addField(`TAGS REQUIRED`, `${tags}`)
                .addField("SLOTLIST HEADER", `${header}`)
                .addField(`SLOTLIST FOOTER`, `${footer}`)
                //.setDescription(`SCRIMS COUNT : **${i}/${sid}**\nMOD ROLE : **<@&${modrole}>**\nREGISTRATION CHANNEL : **<#${chan}>**\nID PASS ROLE : **<@&${role}>**\nTOTAL SLOTS : **${slots}**\nTAGS REQUIRED : **${tags}**`);
            message.reply({ embeds: [embed] });
        }
    }
}