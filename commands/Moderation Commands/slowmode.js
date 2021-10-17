module.exports = {
    name: 'slowmode',
    aliases: ['slow', 'sm'],
    usage: `slowmode <Time(s/min/hr)>`,
    description: 'Enables Mentioned Slowmode',
    timeout: '',
    category: 'moderation',
    userpermissions: ['MANAGE_CHANNELS'],
    botpermissions: ['MANAGE_CHANNELS'],
    async execute(client, message, args) {
        if (!args[0]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}slowmode <Time(s/min/hr)>\``);
        const amount = parseInt(args[0]);
        if (isNaN(amount)) return message.reply(`${client.emotes.failed} | Enter Valid Number!`);
        if (args[0] === amount + "s" || args[0] === amount + "sec") {
            message.channel.setRateLimitPerUser(amount);
            if (amount > 1) {
                return message.reply(`${client.emotes.success} | Slowmode Is Now ` + amount + ` Seconds!`);
            } else {
                return message.reply(`${client.emotes.success} | Slowmode Is Now ` + amount + " Second!");
            }
        }
        if (args[0] === amount + "min") {
            message.channel.setRateLimitPerUser(amount * 60);
            if (amount > 1) {
                return message.reply(`${client.emotes.success} | Slowmode Is Now ` + amount + " Minutes!");
            } else {
                return message.reply(`${client.emotes.success} | Slowmode Is Now ` + amount + " Minute!");
            }
        }
        if (args[0] === amount + "hr") {
            message.channel.setRateLimitPerUser(amount * 60 * 60);
            if (amount > 1) {
                return message.reply(`${client.emotes.success} | Slowmode Is Now ` + amount + " Hours!");
            } else {
                return message.reply(`${client.emotes.success} | Slowmode Is Now ` + amount + " Hour!");
            }
        } else {
            message.reply(`${client.emotes.failed} | You Can Only Set Seconds(s), Minutes(min) and Hours(h)!`);
        }
    }
}