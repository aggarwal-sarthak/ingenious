module.exports = {
    name: 'role+',
    aliases: ['r+'],
    usage: `Role- <Role> <User(s)>`,
    description: 'Assigns Mentioned Role To The Mentioned User(s)',
    timeout: '',
    category: 'moderation',
    userpermissions: ['MANAGE_ROLES'],
    botpermissions: ['MANAGE_ROLES'],
    async execute(client, message, args) {
        if (!args[0]) return message.reply(`${client.emotes.failed} | Invalid Arguments!`);
        switch (args[0].toLowerCase()) {
            case `bots` || `bot` || `b`:
                if (!args[1]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role+ bots <Role>\``);
                const role1 = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                let mem1 = message.guild.members.cache.filter(mem => !mem.roles.cache.has(role1.id) && mem.user.bot);
                if (!mem1) return message.reply(`${client.emotes.failed} | No Members Found!`);
                else if (mem1.size == 0) return message.reply(`${client.emotes.failed} | All Bots Have The Mentioned Role!`)

                if (message.guild.me.roles.highest.position <= role1.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Assign ${role1.name}!`)
                if (message.member.roles.highest.position <= role1.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Assign ${role1.name}!`)

                const m1 = await message.reply(`${client.emotes.success} | Adding \`${role1.name}\` To ${mem1.size} Bots!`);
                mem1.forEach(f => {
                    f.roles.add(role1, [`${message.author.username}`]);
                    setTimeout(function () {
                        m1.edit(`${client.emotes.success} | Added \`${role1.name}\` To ${mem1.size} Bots!`)
                    }, mem1.size * 1000);
                });
                break;

            case `humans` || `human` || `h`:
                if (!args[1]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role+ humans <Role>\``)
                const role2 = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                let mem2 = message.guild.members.cache.filter(mem => !mem.roles.cache.has(role2.id) && !mem.user.bot)
                if (!mem2) return message.reply(`${client.emotes.failed} | No Members Found!`);
                else if (mem2.size == 0) return message.reply(`${client.emotes.failed} | All Humans Have The Mentioned Role!`)

                if (message.guild.me.roles.highest.position <= role2.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Assign ${role2.name}!`)
                if (message.member.roles.highest.position <= role2.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Assign ${role2.name}!`)

                const m2 = await message.reply(`${client.emotes.success} | Adding \`${role2.name}\` To ${mem2.size} Humans!`);
                mem2.forEach(f => {
                    f.roles.add(role2, [`${message.author.username}`]);
                    setTimeout(function () {
                        m2.edit(`${client.emotes.success} | Added \`${role2.name}\` To ${mem2.size} Humans!`)
                    }, mem2.size * 1000);
                });
                break;

            case `all` || `a`:
                if (!args[1]) return message.reply(`${client.emotes.failed} | Usage: \`${client.prefix}role+ all <Role>\``)
                const role3 = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                let mem3 = message.guild.members.cache.filter(mem => !mem.roles.cache.has(role3.id));
                if (!mem3) return message.reply(`${client.emotes.failed} | No Members Found!`);
                else if (mem3.size == 0) return message.reply(`${client.emotes.failed} | Everyone Have The Mentioned Role!`)

                if (message.guild.me.roles.highest.position <= role3.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Assign ${role3.name}!`)
                if (message.member.roles.highest.position <= role3.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Assign ${role3.name}!`)

                const m3 = await message.reply(`${client.emotes.success} | Adding \`${role3.name}\` To ${mem3.size} Users!`);
                mem3.forEach(f => {
                    f.roles.add(role3, [`${message.author.username}`]);
                    setTimeout(function () {
                        m3.edit(`${client.emotes.success} | Added \`${role3.name}\` To ${mem3.size} Users!`)
                    }, mem3.size * 1000);
                });
                break;

            default:
                let roleassign = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
                if (!roleassign) return message.reply(`${client.emotes.failed} | Role Not Found!`)
                let mem4 = message.mentions.members.filter(m => !m.roles.cache.has(roleassign.id));
                if (!mem4) return message.reply(`${client.emotes.failed} | Mention Member(s) To Add Role!`);
                else if (mem4.size == 0) return message.reply(`${client.emotes.failed} | Mentioned Members Already Have The Role!`)

                if (message.guild.me.roles.highest.position <= roleassign.position) return message.reply(`${client.emotes.failed} | My Role Isn't High Enough To Assign ${roleassign.name}!`)
                if (message.member.roles.highest.position <= roleassign.position) return message.reply(`${client.emotes.failed} | Your Role Isn't High Enough To Assign ${roleassign.name}!`)

                const m4 = await message.reply(`${client.emotes.success} | Adding \`${roleassign.name}\` To ${mem4.size} Users!`);
                mem4.forEach(f => {
                    f.roles.add(roleassign, [`${message.author.username}`]);
                    setTimeout(function () {
                        m4.edit(`${client.emotes.success} | Added \`${roleassign.name}\` To ${mem4.size} Users!`)
                    }, mem4.size * 1000);
                });
        }
    }
}