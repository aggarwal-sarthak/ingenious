module.exports = {
    name: 'role-',
    aliases: ['r-'],
    usage: `Role+ <Role> <User(s)>`,
    description: 'Removes Mentioned Role To The Mentioned User(s)',
    timeout: '',
    category: 'moderation',
    userpermissions: ['MANAGE_ROLES'],
    botpermissions: ['MANAGE_ROLES'],
    async execute(client, message, args) {
        if (!args[0]) return message.reply(`${client.emotes.failed} | Invalid Arguments!`);
        switch (args[0].toLowerCase()) {
            case `bots` || `bot` || `b`:
                if (!args[1]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role- bots <Role>\``);
                const role1 = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                let mem1 = role1.members.filter(member => member.roles.cache.has(role1.id) && member.user.bot);
                if (!mem1 || mem1.size == 0) return message.reply(`${client.emotes.failed} | No Members Found!`);

                if (message.guild.me.roles.highest.position <= role1.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Remove ${role1.name}!`)
                if (message.member.roles.highest.position <= role1.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Remove ${role1.name}!`)

                const m1 = await message.reply(`${client.emotes.success} | Removing \`${role1.name}\` From ${mem1.size} Bots!`);
                mem1.forEach(f => {
                    f.roles.remove(role1, [`${message.author.username}`]);
                    setTimeout(function () {
                        m1.edit(`${client.emotes.success} | Removed \`${role1.name}\` From ${mem1.size} Bots!`)
                    }, mem1.size * 1000);
                });
                break;

            case `humans` || `human` || `h`:
                if (!args[1]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role- humans <Role>\``)
                const role2 = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                let mem2 = role2.members.filter(member => member.roles.cache.has(role2.id) && !member.user.bot);
                if (!mem2 || mem2.size == 0) return message.reply(`${client.emotes.failed} | No Members Found!`);

                if (message.guild.me.roles.highest.position <= role2.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Remove ${role2.name}!`)
                if (message.member.roles.highest.position <= role2.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Remove ${role2.name}!`)

                const m2 = await message.reply(`${client.emotes.success} | Removing \`${role2.name}\` From ${mem2.size} Humans!`);
                mem2.forEach(f => {
                    f.roles.remove(role2, [`${message.author.username}`]);
                    setTimeout(function () {
                        m2.edit(`${client.emotes.success} | Removed \`${role2.name}\` From ${mem2.size} Humans!`)
                    }, mem2.size * 1000);
                });
                break;

            case `all` || `a`:
                if (!args[1]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role+ all <Role>\``)
                const role3 = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                let mem3 = role3.members.filter(member => member.roles.cache.has(role3.id));
                if (!mem3 || mem3.size == 0) return message.reply(`${client.emotes.failed} | No Members Found!`);

                if (message.guild.me.roles.highest.position <= role3.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Remove ${role3.name}!`)
                if (message.member.roles.highest.position <= role3.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Remove ${role3.name}!`)

                const m3 = await message.reply(`${client.emotes.success} | Removing \`${role3.name}\` From ${mem3.size} Users!`);
                mem3.forEach(f => {
                    f.roles.remove(role3, [`${message.author.username}`]);
                    setTimeout(function () {
                        m3.edit(`${client.emotes.success} | Removed \`${role3.name}\` From ${mem3.size} Users!`)
                    }, mem3.size * 1000);
                });
                break;

            default:
                let roleassign = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
                if (!roleassign) return message.reply(`${client.emotes.failed} | Role Not Found!`)
                let mem4 = message.mentions.members.filter(member => member.roles.cache.has(roleassign.id));
                if (!mem4) return message.reply(`${client.emotes.failed} | Mention Member To Remove Role!`);
                else if (mem4.size == 0) return message.reply(`${client.emotes.failed} | Mentioned Members Don't Have The Role!`)

                if (message.guild.me.roles.highest.position <= roleassign.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Remove ${roleassign.name}!`)
                if (message.member.roles.highest.position <= roleassign.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Remove ${roleassign.name}!`)

                const m4 = await message.reply(`${client.emotes.success} | Removing \`${roleassign.name}\` From ${mem4.size} Users!`);
                mem4.forEach(f => {
                    f.roles.remove(roleassign, [`${message.author.username}`]);
                    setTimeout(function () {
                        m4.edit(`${client.emotes.success} | Removed \`${roleassign.name}\` From ${mem4.size} Users!`)
                    }, mem4.size * 1000);
                });
        }
    }
}