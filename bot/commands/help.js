const fs = require("fs");
const discordjs = require("discord.js");

exports.run = function(client, message, args) {
    const embed = new discordjs.RichEmbed();
    embed.setTitle("Command list & usages");
    embed.setColor(0xCC3E44);
    embed.setFooter("© The Gaming Squad, 2018");

    const commands = fs.readdirSync("./bot/commands");
    for (let index = 0; index < commands.length; index++) {
        try {
            const command = require(`./${commands[index]}`);

            embed.addField(command.help["name"], "Usage: **" + process.env.PREFIX + command.help["name"] + " " + command.help["usage"] + "**");
        } catch (err) {
            console.log("Error while loading command at help.js:\n" + err);
            embed.addField("Cannot load command", ":x: An error occured while trying to load this command.");
        };
    };

    return message.author.send({embed: embed});
};

exports.help = {
    "permission_level": 1,
    "name": "Help",
    "usage": ""
};
