const Discord = require('discord.js');

module.exports = {
    name: 'info',
    aliases: ['botinfo'],
    usage: `info`,
    description: 'Returns Bot Information',
    timeout: '10000',
    category: 'info',
    userpermissions: ['SEND_MESSAGES'],
    botpermissions: ['EMBED_LINKS'],
    async execute(client, message, args) {
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let uptime = (`${hours}hr ${minutes}min ${seconds}sec.`);
        const info = new Discord.MessageEmbed()
            .setColor('#8bffd1')
            .setTitle('INGENIOUS ESPORTS MANAGER')
            .addField('Version', `v${require('../../package.json').version}`, true)
            .addField('Discordjs', `v${Discord.version}`, true)
            //.addField('Bot Owner', `<@479987197844652042>`, true)
            //.addField('Bot Team', `<@501340325797691392>`)
            //.addField(`Total Servers`, `${client.guilds.cache.size}`, true)
            //.addField(`Total Users`, `${client.guilds.cache.reduce((p, n) => p + n.memberCount, 0)}`, true)
            .addField(`Uptime`, `**${uptime}**`, true)
            .addField('Join Support Server', "[Support Server](https://discord.gg/5UqVvZj)", true)
            //.addField('Invite Bot', "[Invite](https://discord.com/oauth2/authorize?client_id=756052319417925633&scope=bot&permissions=2147483647)", true)
            //.addField('Vote Us', `[Vote](https://top.gg/bot/756052319417925633/vote)`, true)
            .setThumbnail(client.user.displayAvatarURL())
        message.reply({ embeds: [info] });

        // var response = [Math.floor(Math.random() * 3)];
        // if (response == 1) {
        //     const extra = new Discord.MessageEmbed()
        //         .setColor("#8bffd1")
        //         .setTitle(`Thank You For Using TYPHON BOT`)
        //         .setDescription(`**The Maintenance and Development of This Bot Depends on your Support!**\n<@${message.author.id}> Please Consider Helping our Bot to Grow. All features of the Bot are Free. Simply Join our [Support Server](https://discord.gg/5UqVvZj) & [Vote](https://top.gg/bot/756052319417925633/vote) Our Bot to Get Special Role in Our Support Server. Thank You!`)
        //         .setThumbnail(client.user.displayAvatarURL())
        //     message.reply({ embeds: [extra] });
        // } else return;
    }
}