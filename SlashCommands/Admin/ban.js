const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "ban",
    description: "ban a member",
    options: [
        {
            name: "user",
            description: "user you want to ban him/her",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            type: "STRING",
            description: "Reason for the ban",
            required: false
        }
    ],
    run: async (client, interaction) => {

        let target = interaction.options.getMember("user")
        let reason = interaction.options.getString("reason")

        if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({ content: `You should have "Ban Members" permission to use this command.`, ephemeral: true });

        if (target.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== target.id
            && interaction.guild.ownerId !== interaction.member.id || interaction.guild.ownerId == target.id) {
            return interaction.reply({ content: `** You can't ban @${target.user.username}. **`, ephemeral: true })
        }
        if (!target.bannable) {
            return interaction.reply({ content: `I couldn't ban that user. Please check my permissions and role position.` })
        }
        target.ban({ reason: `${reason ? reason : 'no reason'}` }).then(c => {
            return interaction.reply({ content: `✅| **${target.user.username} banned from the server!** ` })
        }).catch(err => console.log(err));
    }

}