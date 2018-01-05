exports.run = function(client, message, args) {
    const user = message.mentions.users.array()[0];
    let reason = []
    for (let index = 0; index < args.length; index++) {
        if (index != 0) {
            reason.push(args[index]);
        };
    };
    reason = reason.join(" ");
    if (reason.length == 0) {
        reason = "No reason provided.";
    };

    const member = message.guild.members.find("id", user.id);

    if (member) { // To be on the safe side.
        if (typeof(reason) == "string") {
            let banRole = message.guild.roles.find("name", "Banned");
            if (banRole) {
                let memberRoles = member.roles.array();
                const channel = message.channel

                for (index = 0; index < member.roles.array().length; index++) {
                    const role = member.roles.array()[index];

                    member.removeRole(role, "This user is banned.");
                };
                member.addRole(banRole, reason);

                channel.send(`**${member.displayName}** has been banned for 2 hours.`);
                message.delete();
                
                client.setTimeout(function() {
                    member.addRoles(memberRoles, "The 2 hours have passed. Unbanning user.");
                    member.removeRole(banRole);
                    member.send("You have been unbanned in **The Gaming Squad**. You can now chat again.");
                    channel.send(`Unbanning user **${member.displayName}**.`);
                }, 7200000);

                return member.send(`You have been banned in **The Gaming Squad**.\n\nFor reason: **${reason}**\nAdministrator: **${message.author.username}**`);
            } else {
                return message.reply(":x: Unable to find the **Banned** role. The user has not been banned.");
            };
        } else {
            return message.reply("Please provide a valid reason.");
        };
    };
};

exports.help = {
    "permission_level": 1,
    "name": "Ban",
    "usage": "<@User> <Reason>"
};
