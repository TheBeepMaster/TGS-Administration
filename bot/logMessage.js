const discordjs = require("discord.js");
const webhook = new discordjs.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

exports.log = function(message, type) {
    const member = message.guild.members.find("id", message.author.id);

    if (member) {
        const embed = new discordjs.RichEmbed();

        if (type == "CREATE") {
            embed.setTitle("Message Created");
            embed.setColor(0xff0000);
        } else if (type == "DELETE") {
            embed.setTitle("Message Deleted");
            embed.setColor(0xe82727);
        };
        
        embed.addField("Author: " + member.displayName, "Message: **"+ message.content + "**");
        embed.setFooter("© The Gaming Squad, 2018");
        embed.setTimestamp();

        webhook.send({embed: embed});
    };
};
