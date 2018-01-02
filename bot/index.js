const discordjs = require("discord.js");
const client = new discordjs.Client({
    disableEveryone: true
});
const fs = require("fs");

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild.available) return;

    if (message.content.startsWith(process.env.PREFIX)) {
        const command = message.content.split(" ")[0].slice(process.env.PREFIX.length + 1);
        let args = [];

        message.reply("Running command " + command); // For debugging reasons.

        for (let index = 0; index < message.content.split(" ").length; index++) {
            if (index != 0) { // Ignore the command.
                args.push(message.content.split(" ")[index]);
            };
        };

        let validCommand = fs.existsSync(`./commands/${command}.js`);
        if (validCommand) {
            try {
                const cmdModule = require(`./commands/${commands}.js`);

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
