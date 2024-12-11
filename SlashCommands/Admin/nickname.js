
module.exports = {
    name: "nickname",
    description: "Change a nickname to user",
    options: [
        {
            name: "new-name",
            description: "new nickname",
            required: true,
            type: "STRING",
        },
        {
            name: "user",
            description: "user you want to kick him/her",
            type: "USER",
            required: false
        }
    ],

    run: async (client, interaction) => {
        let user = interaction.options.getMember("user") || interaction.member
        let nickname = interaction.options.getString("new-name")
        if (!interaction.member.permissions.has("MANAGE_NICKNAME")) return interaction.reply({
            content: `You should have "Manage Nickname" permission to use this command.`, ephemeral: true
        });
        if (user.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== user.id
            && interaction.guild.ownerId !== interaction.member.id || interaction.guild.ownerId == user.id) {
            return interaction.reply({ content: `** You can't change nickname for @${user.user.username}. **`, ephemeral: true });
        }
        try {
            user.setNickname(nickname)
            interaction.reply({
                content: `Done changing nickname to ${user}`
            })
        } catch (err) {
            return interaction.reply({
                content: `${err.message}`,
                ephemeral: true
            })
        }

    }
}