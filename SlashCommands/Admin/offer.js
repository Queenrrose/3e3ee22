const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'offer',
  description: 'Sends an offer with a title, description, and image.',
  options: [
    {
      name: 'title',
      type: 3,  // نوع النص
      description: 'The title of the offer',
      required: true,
    },
    {
      name: 'description',
      type: 3,  // نوع النص
      description: 'The description of the offer',
      required: true, 
    },
    {
      name: 'image',
      type: 11,  // نوع المرفق (صورة)
      description: 'Attach an image for the offer',
      required: true, 
    },
  ],
  async execute(interaction) {
    // التحقق من صلاحية المدير
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply({
        content: 'You do not have the required permissions to use this command.',
        ephemeral: true
      });
    }

    const title = interaction.options.getString('title'); // الحصول على العنوان
    const description = interaction.options.getString('description'); // الحصول على الوصف
    const image = interaction.options.getAttachment('image'); // الحصول على الصورة

    // التحقق من أن الصورة هي صورة فعلًا
    if (!image.contentType.startsWith('image/')) {
      return interaction.reply({ content: 'Please upload a valid image file.', ephemeral: true });
    }

    const formattedDescription = description.replace(/\\n/g, '\n'); // تنسيق الوصف

    // إعداد الأزرار التي سيتم إضافتها
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("FaceBook")
          .setEmoji("1311704103876956270")
          .setStyle('LINK')
          .setURL('https://github.com/DevXor-Team/DevXorHandler/blob/main/src/events/client/ready.js'),
        new MessageButton()
          .setLabel("Discord")
          .setStyle('LINK')
          .setEmoji("1311704100886413372")
          .setURL('https://discord.gg/warrior-team'),
      );

    // إرسال العرض إلى القناة مع الصورة والأزرار
    await interaction.channel.send({
      content: `**${title}**\n${formattedDescription}`,
      files: [image.url],
      components: [row]
    });

    // الرد على المستخدم بأنه تم إرسال العرض بنجاح
    await interaction.reply({ content: "Offer Sent Successfully", ephemeral: true });
  },
};
