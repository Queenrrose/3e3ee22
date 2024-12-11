const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "unlock",
    description: "unlock channels",
    options: [
        {
            name: "all",
            type: 1,
            description: "unlock channel for all members.",
            options: [
                {
                    name: "user",
                    description: "unlock channel for specified user.",
                    type: "USER",
                    required: false,
                }
            ],
        },
        {
            name: "channel",
            type: 1,
            description: "mention channel to unlock",
            options: [
                {
                    name: "channel",
                    description: "Channel to unlock.",
                    type: "CHANNEL",
                    required: false,
                    channel_types: [0, 5]
                },
                {
                    name: "user",
                    description: "User to unlock specific channel on him.",
                    type: "USER",
                    required: false,
                }
            ],
        },
    ],
    run: async (client, interaction) => {

        let subCommand = interaction.options._subcommand;

        let channel = interaction.options.getChannel("target") || interaction.channel;

        let user = interaction.options.getMember("user");

        if (subCommand === "all") {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: `You should have "Administrator" permission to use this command.`, ephemeral: true });
            interaction.guild.channels.cache.filter(c => c.type !== "GUILD_VOICE" || c.type !== "GUILD_CATEGORY" || c.type !== "GUILD_STAGE_VOICE").forEach(c => {
                c.permissionOverwrites.edit(user ? user.id : interaction.guild.id, {
                    SEND_MESSAGES: true,
                }).catch(err => console.log(err));
            });
            return interaction.reply({ content: `**🔒 All channels have been locked${user ? ` for ${user}` : ""}.**` });
        }
        else
            if (subCommand === "channel") {
                if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply(`You should have "Manage Channels" permission to use this command.`)
                channel.permissionOverwrites.edit(user ? user.id : interaction.guild.id, {
                    SEND_MESSAGES: true
                });
                return interaction.reply({ content: `**🔒 ${channel} has been locked${user ? ` for ${user}` : ""}.**` });
            }

    }
}