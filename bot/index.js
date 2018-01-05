const discordjs = require("discord.js");
const client = new discordjs.Client({
    disableEveryone: true
});
const fs = require("fs");

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild.available) return;

    if (message.content.startsWith(process.env.PREFIX)) {
        const command = message.content.split(" ")[0].slice(process.env.PREFIX.length);
        let args = [];

        for (let index = 0; index < message.content.split(" ").length; index++) {
            if (index != 0) { // Ignore the command.
                args.push(message.content.split(" ")[index]);
            };
        };

        let validCommand = fs.existsSync(`./commands/${command}.js`);

        console.log(command, validCommand);

        if (validCommand) {
            try {
                const cmdModule = require(validCommand);

                cmdModule.run(client, message, args);
            } catch (err) {
                return message.reply(":x: An error occured ```fix\n" + err + "```");
            };
        } else {
            return message.reply(":x: That command doesn't exists. Please use " + process.env.PREFIX + "help for a valid list of commands.");
        };
    };
});

client.login(process.env.TOKEN);

// Prevent the bot from sleeping.
const http = require("http");

setInterval(() => {
    http.get("https://tgs-administration.herokuapp.com");
}, 900000);
