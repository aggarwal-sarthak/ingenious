const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    aliases: ['h'],
    usage: `help [Name]`,
    description: "Shows All Available Bot Commands.",
    timeout: `1000`,
    category: 'info',
    userpermissions: ['SEND_MESSAGES'],
    botpermissions: ['EMBED_LINKS'],
    async execute(client, message, args) {
        if (!args[0]) {
            let categories = [];
            readdirSync("./commands/").forEach((dir) => {
                if(dir === 'Bot Owner') return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);
                    if (!file.name) return "No command name.";
                    let name = file.name.replace(".js", "");
                    return `\`${name}\``;
                });

                let data = new Object();
                data = {
                    name: dir,
                    value: cmds.length === 0 ? "In progress." : cmds.join(" "),
                };
                categories.push(data);
            });

            const embed = new MessageEmbed()
                .setTitle("TYPHON BOT COMMANDS")
                .addFields(categories)
                .setDescription(`Use \`${client.prefix}help\` followed by a command name to get more additional information on a command. For example: \`${client.prefix}help ban\`!`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setColor(`#8bffd1`);
            return message.reply({ embeds: [embed] });
        }
        else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
            if (!command) return message.reply(`${client.emotes.failed} | Invalid Command! Use \`${client.prefix}help\` For All Commands!`)

            const embed = new MessageEmbed()
                .setTitle("Command Details")
                .setDescription(`
                **Command Name:** \`${command.name ? `${command.name}` : "No Name For This Command!"}\`
                **Command Aliases:** \`${command.aliases ? `${command.aliases.join(" ") || `No Aliases For This Command!`}` : " "}\`
                **Command Usage:** \`${command.usage ? `${client.prefix}${command.usage}` : `${client.prefix}${command.name}`}\`
                **Command Description:** \`${command.description ? command.description : "No Description For This Command!"}\`
                **Command CoolDown:** \`${command.cooldown ? command.cooldown : "No Cooldown For This Command!"}\`
                    `)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`Optional Fields[] | Required Fields<>`)
                .setTimestamp()
                .setColor(`#8bffd1`);
            return message.reply({ embeds: [embed] });
        }
    },
};