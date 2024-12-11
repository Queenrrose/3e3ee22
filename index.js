require("dotenv").config(); // لتحميل المتغيرات من ملف .env
const { Intents, Client, MessageEmbed, MessageActionRow, MessageButton, AttachmentBuilder, ActivityType, Partials,GatewayIntentBits } = require("discord.js");
const express = require('express');
const ClientStructure = require("./Structures/Client.js");

const app = express();

// تشغيل السيرفر على المنفذ 20669
app.listen(20669, () => console.log("Express server is running on port 20669"));

// صفحة البداية عند زيارة الموقع
app.get('/', (req, res) => {
  res.send(`
    <body>
      <center><h1>Made by: Hadaf</h1></center>
    </body>
  `);
});

// قائمة توكنات البوتات التي سيتم تسجيل الدخول بها
const BOT_TOKENS = [
  process.env.TOKEN1,
  process.env.TOKEN2,
  process.env.TOKEN3,
  process.env.TOKEN4,
  process.env.TOKEN5,
      process.env.TOKEN6,
     process.env.TOKEN7,
     process.env.TOKEN8,
  // أضف المزيد من التوكنات كما تحتاج
];

// قائمة معرفات المستخدمين التي سيتم مراقبتها
const USER_IDS_TO_MONITOR = [
  "282859044593598464",  // استبدل بمعرفات المستخدمين الفعليين
  "1006332825571692544",
  "652505019920285707",
  "493716749342998541",
  "678344927997853742",
  "499595256270946326",
  "704810036547026954",
  "1006332825571692544",
    "499595256270946326",
  // أضف المزيد من معرفات المستخدمين كما تحتاج
];

// قائمة السيرفرات والقنوات لمتابعة البث المباشر
const MONITORING_SERVERS = [
  {
    guildId: 'YOUR_SERVER_ID_1',  // معرف السيرفر الأول
    channels: ['YOUR_CHANNEL_ID_1', 'YOUR_CHANNEL_ID_2'], // القنوات التي سترسل فيها الرسائل
  },
  {
    guildId: '1222014396189114478',  // معرف السيرفر الثاني
    channels: ['1311675181307007026'], // القناة الوحيدة في السيرفر الثاني
  },
  // أضف المزيد من السيرفرات والقنوات كما تحتاج
];

// دالة لإنشاء وتسجيل دخول عدة بوتات
const clients = BOT_TOKENS.map((token, index) => {
  const client = new ClientStructure({
    partials: ['MESSAGE', 'CHANNEL'],
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MESSAGE_TYPING,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, // تمت إضافتها
      Intents.FLAGS.GUILD_INTEGRATIONS, // تمت إضافتها
      Intents.FLAGS.GUILD_WEBHOOKS, // تمت إضافتها
      Intents.FLAGS.GUILD_INVITES, // تمت إضافتها
      Intents.FLAGS.GUILD_VOICE_STATES, // تمت إضافتها
      Intents.FLAGS.GUILD_PRESENCES, // تمت إضافتها
      Intents.FLAGS.GUILD_MESSAGES, // تمت إضافتها
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS, // تمت إضافتها
      Intents.FLAGS.GUILD_MESSAGE_TYPING, // تمت إضافتها
      Intents.FLAGS.DIRECT_MESSAGES, // تمت إضافتها
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, // تمت إضافتها
      Intents.FLAGS.DIRECT_MESSAGE_TYPING, // تمت إضافتها
      Intents.FLAGS.MESSAGE_CONTENT, // تمت إضافتها
    ],
  });

  // عندما يكون البوت جاهزًا
  client.once('ready', () => {
    console.log(`Bot ${index + 1} logged in as ${client.user.tag}`);
    console.log(`Bot ${index + 1} is in ${client.guilds.cache.size} servers`);
  });

  // التعامل مع الرسائل
  client.on('messageCreate', async (message) => {
    // التحقق إذا كان كاتب الرسالة ضمن قائمة المراقبين
    if (USER_IDS_TO_MONITOR.includes(message.author.id)) {
      const newMessage = {
        content: message.content || '\u200B',
        embeds: message.embeds.map((embed) => new MessageEmbed(embed)),
        files: message.attachments.map((attachment) => attachment),
      };

      try {
        // حذف الرسالة الأصلية وإرسال الرسالة الجديدة
        await Promise.all([message.delete(), message.channel.send(newMessage)]);
      } catch (err) {
        console.error(`Error while deleting or resending message for bot ${index + 1}:`, err);
      }
    }

    // التحقق من رسائل البوت نفسه
    if (message.author.id === client.user.id) {
      if (message.content.includes("type these numbers to confirm")) {
        setTimeout(() => {
          message.delete().catch((err) => console.error('Error while deleting message:', err));
        }, 10000); // حذف الرسالة بعد 10 ثواني
      } else if (message.content.includes("Cool down")) {
        setTimeout(() => {
          message.delete().catch((err) => console.error('Error while deleting message:', err));
        }, 2000); // حذف الرسالة بعد 2 ثانية
      }
    }
  });

  // متابعة تغيرات حالة الأعضاء في القنوات الصوتية (للتعرف على البث المباشر)
  client.on('voiceStateUpdate', (oldState, newState) => {
    // التحقق من أن العضو قد بدأ أو أنهى البث المباشر
    if (newState.streaming || oldState.streaming) {
      MONITORING_SERVERS.forEach(server => {
        const guild = client.guilds.cache.get(server.guildId);
        if (!guild) return;

        // إذا كان المستخدم قد بدأ بث مباشر
        if (!oldState.streaming && newState.streaming) {
          const startTime = new Date();
          const user = newState.member.user.username;
          const mention = newState.member.toString();  // الحصول على منشن للعضو
          const message = `**${mention}** started a live stream in **${newState.channel.name}** at ${startTime.toLocaleTimeString()}`;
          server.channels.forEach(channelId => {
            const channel = guild.channels.cache.get(channelId);
            if (channel) {
              channel.send(message);
            }
          });
          console.log(message); // لتسجيل الوقت في الكونسول

          // تخزين وقت بداية البث
          newState.member._startTime = startTime;
        }

        // إذا كان المستخدم قد أنهى بث مباشر
        if (oldState.streaming && !newState.streaming) {
          const endTime = new Date();
          const user = oldState.member.user.username;
          const mention = oldState.member.toString();  // الحصول على منشن للعضو
          const startTime = oldState.member._startTime;
          const durationInSeconds = (endTime - startTime) / 1000; // الوقت بالثواني
          const durationInMinutes = (durationInSeconds / 60).toFixed(2); // التحويل إلى دقائق

          const message = `**${mention}** ended their live stream in **${oldState.channel.name}** at ${endTime.toLocaleTimeString()} (Duration: ${durationInMinutes} minutes)`;
          server.channels.forEach(channelId => {
            const channel = guild.channels.cache.get(channelId);
            if (channel) {
              channel.send(message);
            }
          });
          console.log(message); // لتسجيل الوقت في الكونسول
        }
      });
    }
  });

  // استيراد معالجات الأحداث والأوامر الموجهة
  require("./Structures/Event")(client);
  require("./Structures/slashCommand")(client);

  // إضافة أمر "offer"
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'offer') {
      if (!interaction.member.permissions.has('ADMINISTRATOR')) {
        return interaction.reply({
          content: 'You do not have the required permissions to use this command.',
          ephemeral: true
        });
      }

      const title = interaction.options.getString('title'); // الحصول على العنوان
      const description = interaction.options.getString('description'); // الحصول على الوصف
      const image = interaction.options.getAttachment('image'); // الحصول على الصورة

      if (!image.contentType.startsWith('image/')) {
        return interaction.reply({ content: 'Please upload a valid image file.', ephemeral: true });
      }

      const formattedDescription = description.replace(/\\n/g, '\n');

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel("Telegram")
            .setEmoji("1311713856137068584")
            .setStyle('LINK')
            .setURL('https://t.me/warriornoob'),
          new MessageButton()
            .setLabel("Discord")
            .setStyle('LINK')
            .setEmoji("1311704100886413372")
            .setURL('https://discord.gg/warrior-team'),
        )

      await interaction.channel.send({
        content: `**${title}**\n${formattedDescription}`,
        files: [image.url],
        components: [row]
      });
      await interaction.reply({ content: "Offer Sent Successfully", ephemeral: true });
    }
  });

  // تسجيل الدخول للبوت
  client.login(token).catch(err => console.error(`Error logging in with token for bot ${index + 1}:`, err));

  return client;
});

// معالجات الأخطاء غير المتوقعة
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});
