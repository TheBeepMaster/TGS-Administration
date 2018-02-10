const discordjs = require("discord.js");
const client = new discordjs.Client({
    disableEveryone: true
});
const permissions = require("./util/permissions.js");
const logMessage = require("./logMessage.js");

client.on("ready", () => {
    client.user.setPresence({
        status: "dnd",
        game: {
            name: "with the ban hammer"
        }
    });
});

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild.available) return;

    logMessage.log(message, "CREATE");

    if (message.content.startsWith(process.env.PREFIX)) {
        const member = message.guild.members.find("id", message.author.id);
        const permission_level = permissions.calculate(member);

        if (permission_level == 0) return message.reply("You are not authorized to execute commands.");

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
            console.log(err);
            validCommand = false;
        };

        if (validCommand) {
            const cmd = require(`./commands/${command}.js`);
            
            if (permission_level >= cmd.help["permission_level"]) {
                cmd.run(client, message, args);
            } else {
                return message.reply("You are not allowed to execute this command. Your permission level is too low.");
            };
        } else {
            return message.reply(":x: This command is invalid. Please use " + process.env.PREFIX + "help for a valid list of commands.");
        };
    } else {
        if (message.content.toLowerCase().includes("ban")) {
            return message.reply("Did I just hear the word ban? ;)");
        };
    };
});

client.on("messageDelete", message => {
    logMessage.log(message, "DELETE");
});

client.login(process.env.TOKEN);

// Prevent the bot from sleeping.
const http = require('http');

setInterval(() => {
    http.get("http://tgs-administration.herokuapp.com");
}, 900000);
