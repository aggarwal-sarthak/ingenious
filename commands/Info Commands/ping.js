module.exports = {
    name: 'ping',
    aliases: [],
    usage: `ping`,
    description: 'Returns Latency and API ping',
    timeout: `10000`,
    category: 'info',
    userpermissions: ['SEND_MESSAGES'],
    botpermissions: ['SEND_MESSAGES'],
    async execute(client, message, args) {
        const msg = await message.reply(`${client.emotes.success} | Looking For Ping!`);
        msg.edit(`${client.emotes.success} | API Latency Is \`${client.ws.ping}Ms\`! | Latency Is \`${Math.floor(msg.createdAt - message.createdAt)}Ms\`!`)
    }
}