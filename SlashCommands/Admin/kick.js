
module.exports = {
    name: "kick",
    description: "kick a member",
    options: [
        {
            name: "user",
            description: "user you want to kick him/her",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            type: "STRING",
            description: "Reason for the kick",
            required: false
        }
    ],

    run: async (client, interaction) => {

        let target = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason") || "No Reason";

        if (!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({ content: `You should have "Kick Members" permission to use this command.`, ephemeral: true });

        if (target.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== target.id
            && interaction.guild.ownerId !== interaction.member.id
            || interaction.guild.ownerId == target.id) {
            return interaction.reply({ content: `** You can't kick @${target.user.username}. **` })
        }

        if (!target.kickable) {
            return interaction.reply({ content: `I couldn't kick that user. Please check my permissions and role position.` })
        }
        target.kick({ reason: `${reason ? reason : 'no reason'}` }).then(c => {
            return interaction.reply({ content: `✅| **@${target.user.username} kicked from the server! **` })
        }).catch(err => console.log(err))

    }
}