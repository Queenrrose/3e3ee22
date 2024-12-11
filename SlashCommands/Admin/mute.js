const { MessageEmbed } = require("discord.js")
const ms = require("ms")
module.exports = {
    name: "mute",
    description: "mute a member",
    options: [
        {
            name: "user",
            description: "user you want to mute him/her",
            type: "USER",
            required: true
        }, {
            name: "time",
            description: "Time duration for the mute.",
            type: "STRING",
            required: false,
        }
    ],
    run: async (client, interaction) => {

        await interaction.deferReply()

        if (!interaction.member.permissions.has("MUTE_MEMBERS")) return interaction.reply({ content: `You should have "Mute Members" permission to use this command.`, ephemeral: true });
        let target = interaction.options.getMember("user");
        let time = interaction.options.getString("time") || "1h";
        if (!ms(time)) time = "1h";

        let role = interaction.guild.roles.cache.find(r => r.name == 'Muted');
        if (!role) {
            interaction.editReply(`wait for create muted role`)
            role = await interaction.guild.roles.create({
                name: 'Muted',
                permissions: [],
            })
        }
        if (target.roles.cache.has(role.id)) {
            return interaction.editReply({ content: `**${target.user.username} is already muted**` });
        }
        if (target.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== target.id
            && interaction.guild.ownerId !== interaction.member.id || interaction.guild.ownerId == target.id) {
            return interaction.editReply({ content: `** You can't mute @${target.user.username}. **` })
        }

        if (interaction.guild.me.roles.highest.position <= role.position) {
            return interaction.editReply({
                content: `I couldn't change the roles for that user. Please check my permissions and role position.`
            })
        }

        target.roles.add(role)
        interaction.editReply(`**✅ ${target.user.username} has been muted!**`)

        setTimeout(() => {
            target.roles.remove(role);
        }, ms(time))

        interaction.guild.channels.cache.filter(c => c.type !== "GUILD_VOICE" || c.type !== "GUILD_CATEGORY" || c.type !== "GUILD_STAGE_VOICE").forEach(c => {
            c.permissionOverwrites.edit(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            }).catch(err => console.log(err))
        });

    }
}