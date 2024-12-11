const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "lock",
    description: "lock channels",
    options: [
        {
            name: "all",
            type: 1,
            description: "lock channel for all members.",
            options: [
                {
                    name: "user",
                    description: "lock channel for specified user.",
                    type: "USER",
                    required: false,
                }
            ],
        },
        {
            name: "channel",
            type: 1,
            description: "mention channel to lock",
            options: [
                {
                    name: "channel",
                    description: "Channel to lock.",
                    type: "CHANNEL",
                    required: false,
                    channel_types: [0, 5]
                },
                {
                    name: "user",
                    description: "User to lock specific channel on him.",
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
                    SEND_MESSAGES: false,
                }).catch(err => console.log(err));
            });
            return interaction.reply({ content: `**🔒 All channels have been locked${user ? ` for ${user}` : ""}.**` });
        }
        else
            if (subCommand === "channel") {
                if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply(`You should have "Manage Channels" permission to use this command.`)
                channel.permissionOverwrites.edit(user ? user.id : interaction.guild.id, {
                    SEND_MESSAGES: false
                });
                return interaction.reply({ content: `**🔒 ${channel} has been locked${user ? ` for ${user}` : ""}.**` });
            }

    }
}