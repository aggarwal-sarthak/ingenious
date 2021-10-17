const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'delete',
    aliases: [],
    usage: `delete <ScrimsCount>`,
    description: 'Deletes Scrims Configuration',
    timeout: '',
    category: 'utility',
    userpermissions: [],
    botpermissions: ['EMBED_LINKS', 'MANAGE_CHANNELS'],
    async execute(client, message, args) {
        let i = args[0];
        if (!i) return message.reply(`${client.emotes.failed} | Enter Scrims Count You Want To Delete!`);
        let chan, role, tags, slots, header, footer;
        chan = db.get("chan" + i);
        role = db.get("role" + i);
        slots = db.get("slots" + i);
        tags = db.get("tags" + i)
        header = db.get("header" + i);
        footer = db.get("footer" + i);

        if (!chan && !role && !slots && !tags && !footer && !footer) return message.reply(`${client.emotes.failed} | Invalid Scrims Count!`);

        db.delete("chan" + i) &
            db.delete("role" + i) &
            db.delete("slots" + i) &
            db.delete("tags" + i) &
            db.delete("header" + i) &
            db.delete("footer" + i);
        message.reply(`${client.emotes.success} | Configuration Deleted Successfully!`);
    }
}