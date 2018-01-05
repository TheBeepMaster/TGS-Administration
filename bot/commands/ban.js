exports.run = function(client, message, args) {
    const user = message.mentions.users.array()[0];
    let reason = []
    for (let index = 0; index < args.length; index++) {
        if (index != 0) {
            reason.push(args[index]);
        };
    };
    reason = reason.join(" ");

    const member = message.guild.members.find("id", user.id);

    if (member) { // To be on the safe side.
        if (typeof(reason) == "string") {
            let banRole = message.guild.roles.find("name", "Banned");
            if (banRole) {
                for (role in member.roles) {
                    console.log(role);
                    member.removeRole(role, "This user is banned.");
                };
                member.addRole(banRole, reason);

                message.channel.send(`**${member.displayName}** has been banned for 2 hours.`);
                message.delete();

                return member.send(`You have been banned in **The Gaming Squad**.\n\nFor reason: **${reason}**`);
            } else {
                return message.reply(":x: Unable to find the **Banned** role. The user has not been banned.");
            };
        }
    };
};

exports.help = {
    "permission_level": 1,
    "name": "Ban",
    "usage": `<@User> <Reason>`
};
