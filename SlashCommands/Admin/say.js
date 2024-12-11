const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "say",
    description: "send a say message with the bot",
    options: [
        {
            name: "message",
            type: "STRING",
            description: "the message to send",
            required: true
        },
        {
            name: "channel",
            type: "CHANNEL",
            description: "mention the channel you want the message to sent to",
            required: true
        }
    ],

    run: async (client, interaction) => {
        let channel = interaction.options.getChannel("channel");
        let message = interaction.options.getString("message");
        try {
            await channel.send(`${message}`)
            return interaction.reply({
                content: `done send the message to ${channel}`
            })
        } catch (e) {
            console.error(e)
            return interaction.reply({
                content: `Error: ${e.message}`,
                ephemeral: true
            })
        }
    }
}