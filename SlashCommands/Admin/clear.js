module.exports = {
    name: "clear",
    description: "Number of messages to clear",
    options: [
        {
            name: "number_of_messages",
            description: "Number of messages to delete.",
            type: "NUMBER",
            required: false
        },
        {
            name: "filter_by_user",
            type: "USER",
            description: "Filter by user messages",
            required: false
        },
        {
            name: "filter_by_role",
            description: "Filter by role messages.",
            type: "ROLE",
            required: false,

        }
    ],


    run: async (client, interaction, args) => {
        let number = interaction.options.getNumber("number_of_messages");
        let role = interaction.options.getRole("filter_by_role");
        let member = interaction.options.getMember("filter_by_user");

        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: `You should have "Manage Messages" permission to use this command.`, ephemeral: true });

        if (!number || number > 100) number = 100
        let message = await interaction.reply({
            content: `Deleting messages..`,
            fetchReply: true
        }).catch(err => console.log(err));
        interaction.channel.messages.fetch({
            limit: 100,
        }).then(async (messages) => {
            if (member && !role) {
                messages = messages.filter(m => m.id !== message.id && (m.author.id === member.id))
            }
            if (role && !member) {
                messages = messages.filter(m => m.id !== message.id && (interaction.guild.members.cache.get(m.author.id)?.roles.cache.some(r => r.id === role.id)))
            }
            if (role && member) {
                messages = messages.filter(m => m.id !== message.id && (interaction.guild.members.cache.get(m.author.id)?.roles.cache.some(r => r.id === role.id) || m.author.id === member.id))
            }
            if (!member && !role) {
                messages = messages.filter(m => m.id !== message.id)
            }
            messages = messages.map(c => c).slice(0, number)
            await interaction.channel.bulkDelete(messages, true).then(async msg => {
                return interaction.editReply({
                    content: `
          \`\`\`js\n${msg.size} message ${msg.size == 1 || msg.size == 0 ? "has" : "have"} been deleted.\`\`\``
                }).then(messages => setTimeout(() => interaction.deleteReply().catch(err => 0), 3000))//.catch(err=> 0)

            }).catch(async (err) => {
                return interaction.editReply({
                    content: `
        \`\`\`js\n0 message has been deleted.\`\`\``
                }).then(messages => setTimeout(() => interaction.deleteReply().catch(err => 0), 3000)).catch(err => console.log(err))
            })
        })
        return;
    },
}
