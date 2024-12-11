module.exports = {
    name: "unmute",
    description: "unmute a member",
    options: [
        {
            name: "user",
            description: "user you want to unmute him/her",
            type: "USER",
            required: true
        }
    ],
    run: async (client, interaction) => {

        await interaction.deferReply()

        if (!interaction.member.permissions.has("MUTE_MEMBERS")) return interaction.reply({ content: `You should have "Mute Members" permission to use this command.`, ephemeral: true });
        let target = interaction.options.getMember("user");
        let role = interaction.guild.roles.cache.find(r => r.name == 'Muted');
        if (!role) return interaction.editReply({ content: `Make a role called ${role.name}`, ephemeral: true });
        if (!target.roles.cache.has(role.id)) {
            return interaction.editReply({ content: `**${target.user.username} hasn't been muted**` });
        }
        if (target.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== target.id
            && interaction.guild.ownerId !== interaction.member.id || interaction.guild.ownerId == target.id) {
            return interaction.editReply({ content: `** You can't unmute @${target.user.username}. **` })
        }

        if (interaction.guild.me.roles.highest.position <= role.position) {
            return interaction.editReply({
                content: `I couldn't change the roles for that user. Please check my permissions and role position.`
            })
        }

        target.roles.remove(role)
        interaction.editReply(`**✅ ${target.user.username} has been unmuted!**`)
    }
}