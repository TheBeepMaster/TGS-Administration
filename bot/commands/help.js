const fs = require("fs");
const discordjs = require("discord.js");

exports.run = function(client, message, args) {
    const embed = new discordjs.RichEmbed();
    embed.setTitle("Command list & usages");
    embed.setColor(0xCC3E44);
    embed.setFooter("© The Gaming Squad, 2018");

    const commands = fs.readdirSync(".");
    for (let index = 0; index < commands.length; index++) {
        const command = require(`./${commands[index]}.js`);

        embed.addField(command.name, "Usage: **" + process.env.PREFIX + command.name + " " + command.usage);
    };

    return message.author.send({embed: embed});
};

exports.help = {
    "permission_level": 1,
    "name": "Help",
    "usage": ""
};
