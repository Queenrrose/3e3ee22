const Discord = require('discord.js');
module.exports = async (client) => {
    const dev = await client.users.fetch("648607274071490576");
    
    const statuses = [
        'اللَّهُمَّ اغْفِرْ لِفُلاَنٍ بِاسْمِهِ وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ، وَاغْفِرْ لَنَا وَلَهُ يَا رَبَّ الْعَالَمِينَ، وَافْسَحْ لَهُ فِي قَبْرِهِ، وَنَوِّرْ لَهُ فِيهِ.',
        'بِسْمِ اللَّهِ وَعَلَى سُنَّةِ رَسُولِ اللَّهِ.',
        'اللَّهُــمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ، وَمِنْ فِتْنة الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ.',
                'إِنِّي صَائِمٌ، إِنِّي صَائِمٌ',
                'حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.',
                'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم',
                'قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ.'
    ];
    const intervalTime = 50000;
    let currentIndex = 0; 

    console.log(`Logged in as ${client.user.tag}.`);

    // تعيين الحالة الأولى
    client.user.setPresence({
        status: 'dnd',
        activities: [{ name: statuses[currentIndex], type: 'CUSTOM' }],
    });

    // تغيير الحالة كل 5 ثواني
    setInterval(() => {
        currentIndex = (currentIndex + 1) % statuses.length; 
        client.user.setPresence({
            status: 'dnd',
            activities: [{ name: statuses[currentIndex], type: 'CUSTOM' }],
        });
    }, intervalTime);
};
