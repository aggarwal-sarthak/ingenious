const { readdirSync, read } = require('fs');

const client = require('../index');

// Event handler
readdirSync('./events/').forEach(file => require('../events/' + file));


// Command handler
readdirSync('./commands/').forEach(dir => {
    const commands = readdirSync(`./commands/${dir}/`);

    commands.forEach(file => {
        const pull = require(`../commands/${dir}/${file}`);

        if(pull.name) {
            client.commands.set(pull.name, pull);
            
        } else {
            console.log(`${file} thiếu pull.name`);
        }
    });
});

let cmd = [];

// Slash command handler
// readdirSync('./slashs/').forEach(dir => {
//     const slash = readdirSync(`./slashs/${dir}/`);

//     slash.forEach(file => {
//         const pull = require(`../slashs/${dir}/${file}`);

//         if(pull.name) {
//             client.slashCmds.set(pull.name, pull);
//             cmd.push(pull);
//         } else {
//             console.log(file + " -> Thiếu pull.name");
//         }
//     });
// });

// client.on('ready', async() => {
//     client.application.commands.set(cmd);
// });
