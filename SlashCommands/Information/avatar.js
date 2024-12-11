const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "avatar",
    description: "Displays your avatar or someone's avatar.",
    options: [
        {
            name: "user",
            type: "USER",
            description: "Displays someone's avatar.",
            required: false
        }
    ],

    run: async (client, interaction) => {

        let user = interaction.options.getMember("user") || interaction.member

        if (!user) user = interaction.member

        const avatar = user.user.displayAvatarURL({ format: "png", size: 4096, dynamic: true });
        const userembed = new MessageEmbed().setAuthor({ name: user.user.tag, iconURL: avatar }).setTitle(`Avatar Link`).setURL(avatar).setImage(avatar)
            .setFooter({ text: "Requested by " + interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ format: "png", size: 4096, dynamic: true }) })
        interaction.reply({ embeds: [userembed] })
    }
}