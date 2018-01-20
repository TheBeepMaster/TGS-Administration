const discordjs = require("discord.js");
const webhook = new discordjs.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

exports.log = function(message) {
    const member = message.guild.members.find("id", message.author.id);

    console.log(member);

    if (member) {
        const embed = new discordjs.RichEmbed();
        embed.setColor(0xff0000);
        embed.addField(member, message.content);
        embed.setFooter("© The Gaming Squad, 2018");

        webhook.send({embed: embed});
    };
};
