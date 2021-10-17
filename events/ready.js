const client = require('../index');

client.on('ready', () => {
    console.log(client.user.tag + ' Has Logged In! ✅');

    //function pickStatus() {
        //let status = [`With ${client.guilds.cache.size} Servers`, `With ${client.guilds.cache.reduce((p, n) => p + n.memberCount, 0)} Users`];
        //let Status = Math.floor(Math.random() * status.length);
        client.user.setActivity(
            "Ingenious Esports",
            //status[Status],
            {
                type: "WATCHING"
            });
    //};
    //setInterval(pickStatus, 10000);
});