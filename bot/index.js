const discordjs = require("discord.js");
const client = new discordjs.Client({
    disableEveryone: true
});
const fs = require("fs");

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild.available) return;

    if (message.content.startsWith(process.env.PREFIX)) {
        const command = message.content.split(" ")[0].slice(process.env.PREFIX.length).toLowerCase();
        let args = [];

        for (let index = 0; index < message.content.split(" ").length; index++) {
            if (index != 0) { // Ignore the command.
                args.push(message.content.split(" ")[index]);
            };
        };

        // Since fs.existsSync() doesn't seem to work on Heroku...
        let validCommand = false;
        try {
            require(`./commands/${command}.js`);
            validCommand = true;
        } catch (err) {
            validCommand = false;
        };

        if (validCommand) {
            const cmd = require(`./commands/${command}.js`);
            cmd.run(client, message, args);
        } else {
            return message.reply(":x: This command is invalid. Please use " + process.env.PREFIX + "help for a valid list of commands.");
        };
    };
});

client.login(process.env.TOKEN);

// Prevent the bot from sleeping.
const http = require('http');

setInterval(() => {
    http.get("https://tgs-administration.herokuapp.com");
}, 900000);
