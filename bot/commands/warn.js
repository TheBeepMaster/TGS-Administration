const database = require("../util/database.js");

exports.run = function(client, message, args) {
    const member = message.mentions.users.array()[0];
    let reason = [];

    for (let index = 1; index < args.length; args++) {
        reason.push(args[index]);
    };
    reason = reason.join(" ");

    if (reason.length == 0)
        reason = "No reason provided.";

    if (member) {
        const moderator = message.member.displayName;
        member.send(`You have been warned in **The Gaming Squad**.\n\nReason: **${reason}**\nModerator: **${message.member.displayName}**\nDate: **${new Date()}**`);

        const warned = database.query(`INSERT INTO warnings (${member.id}, ${reason}, ${moderator})`);
        if (warned) {
            message.channel.send(`**${member.displayName}** has been succesfully warned.`);
        } else {
            message.channel.send(`An error occured while trying to warn user **${member.displayName}**`);
        };
    };
};

exports.help = {
    "permission_level": 1,
    "name": "Warn",
    "usage": "<@User> <Reason>"
};