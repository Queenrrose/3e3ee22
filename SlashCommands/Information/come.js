const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "come",
    description: "mention user to let hem come",
    options: [
        {
            name: "user",
            type: "USER",
            description: "Displays someone's avatar.",
            required: true
        },
        {
            name: "message",
            type: "STRING",
            description: "The message to send to the user",
            required: true
        }
    ],

    run: async (client, interaction) => {
        let user = interaction.options.getUser("user")
        let message = interaction.options.getString("message")
        if (!interaction.member.roles.cache.has(client.config.comeRole) && !interaction.member.permissions.has(("ADMINISTRATOR"))) return interaction.reply({ content: `You can't use this interaction`, ephemeral: true })
        if (user.bot) return interaction.reply({
            content: `I can't send a messages to bots.`,
            ephemeral: true
        })
        try {
            user.send({
                content: `${message}`,
            })
            return interaction.reply({
                content: `Done send a message to ${user}`
            })
        } catch (q) {
            return interaction.reply({
                content: `${user} مقفل الخاص.`,
                ephemeral: true
            });
        }
    }
}