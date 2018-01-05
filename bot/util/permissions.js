exports.calculate = function(member) {
    if (member.roles.find("name", "Founders")) {
        return 2
    };
    if (member.roles.find("name", "Staff")) {
        return 1
    };
    return 0
};