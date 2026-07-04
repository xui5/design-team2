const membersData = [
    {
        id: 1,
        name: "فرح الشمري",
        role: "قائد الفريق",
        posts: 20,
        files: 1,
        suggestions: 2,
        edits: 5,
        total: 29.5,
        gender: "female",
        details: `فرح: 29.5 نقطة
• بوست التسجيل (1)
• 3 بوستات Silent Attacks (3)
• 3 بوستات رمضان (3)
• 3 ستوريات رمضان2 (3)
• إطار الستوري (1)
• 3 بوستات النشرة (3)
• كتيب النشرة ملف (6)
• تعديلات Enigma (4 تعديلات × 0.5 = 2)
• تعديل إعلان INE (0.5)
• اقتراح تحسين بوستات القبول (0.5)
• 1 بوست تهنئة عيد الاضحى منصة x
• 3 بوستات إعلان تعاون أكاديمية سيبراني انستا
• 2 بوست إعلان تعاون أكاديمية سيبراني منصة x
• اقتراح تحسين بوستات عيد الاضحى انستا (0.5)`
    },
    {
        id: 2,
        name: "معاذ الحربي",
        role: "نائب قائد الفريق",
        posts: 10,
        files: 0,
        suggestions: 2,
        edits: 0,
        total: 11,
        gender: "male",
        details: `معاذ: 11 نقاط
• بوست Enigma (1)
• إعلان INE (1)
• 6 بوستات القبول (6)
• اقتراح تحسين بوستات النشرة (0.5)
• اقتراح تحسين بوستات كيف تخترق الاجهزة فعلياً (0.5)
• لوحة الاراء(1)
• بطاقة للتوزيعات(1)`
    },
    {
        id: 3,
        name: "هبه التميمي",
        role: "عضو",
        posts: 3,
        files: 0,
        suggestions: 2,
        edits: 2,
        total: 5,
        gender: "female",
        details: `هبه التميمي: 5 نقاط
• اقتراح تحسين بوستات العيد (0.5)
• تعديل بوستات العيد (2×0.5 = 1)
• 3 بوستات انظمة التقنيات التشغيلية (3)
• اقتراح تحسين بوستات عيد الاضحى انستا (0.5)`
    },
    {
        id: 4,
        name: "ريم الحربي",
        role: "عضو",
        posts: 4,
        files: 1,
        suggestions: 0,
        edits: 0,
        total: 10,
        gender: "female",
        details: `ريم: 10 نقاط
• 4 بوستات Enigma (4)
• كتيب النشرة ملف (6)`
    },
    {
        id: 5,
        name: "البندري السرباتي",
        role: "عضو",
        posts: 1,
        files: 1,
        suggestions: 1,
        edits: 0,
        total: 7.5,
        gender: "female",
        details: `البندري: 7.5 نقاط
• 1 بوست Silent Attacks (1)
• كتيب النشرة ملف (6)
• اقتراح تحسين بوستات Enigma (0.5)`
    },
    {
        id: 6,
        name: "سارة البراك",
        role: "عضو",
        posts: 6,
        files: 0,
        suggestions: 0,
        edits: 0,
        total: 6,
        gender: "female",
        details: `سارة البراك: 6 نقاط
• 3 بوستات Silent Attacks (3)
• 3 ستوريات رمضان1 (3)`
    },
    {
        id: 7,
        name: "أثير الفايز",
        role: "عضو",
        posts: 6,
        files: 0,
        suggestions: 0,
        edits: 0,
        total: 6,
        gender: "female",
        details: `أثير: 6 نقاط
• 3 بوستات Silent Attacks (3)
• 3 بوستات النشرة (3)`
    },
    {
        id: 8,
        name: "سارة السعود",
        role: "عضو",
        posts: 5,
        files: 0,
        suggestions: 0,
        edits: 0,
        total: 5,
        gender: "female",
        details: `سارة السعود: 5 نقاط
• 5 بوستات Enigma (5)`
    },
    {
        id: 9,
        name: "شذى الرشيدي",
        role: "عضو",
        posts: 3,
        files: 0,
        suggestions: 0,
        edits: 5,
        total: 5.5,
        gender: "female",
        details: `شذى: 5.5 نقاط
• 3 بوستات Enigma (3)
• تعديل بوستات Enigma (3×0.5 = 1.5)
• تعديل بوست كيف تخترق الاجهزة فعلياً (2×0.5 = 1)`
    },
    {
        id: 10,
        name: "رفيدة جابر",
        role: "عضو",
        posts: 3,
        files: 0,
        suggestions: 0,
        edits: 0,
        total: 3,
        gender: "female",
        details: `رفيدة جابر: 3 نقاط
• 3 بوستات العيد الفطر (3)`
    },
    {
        id: 11,
        name: "خوله السديس",
        role: "عضو",
        posts: 3,
        files: 0,
        suggestions: 0,
        edits: 0,
        total: 3,
        gender: "female",
        details: `خوله السديس: 3 نقاط
• 3 بوستات عيد الاضحى انستا (3)`
    },
    {
        id: 12,
        name: "تسنيم المشيقح",
        role: "عضو",
        posts: 3,
        files: 0,
        suggestions: 2,
        edits: 0,
        total: 4,
        gender: "female",
        details: `تسنيم المشيقح: 4 نقاط
• اقتراح تحسين بوستات العيد (0.5)
• 3 بوستات كيف تخترق الاجهزة فعلياً (3)
• اقتراح تحسين بوستات عيد الاضحى انستا (0.5)`
    },
    {
        id: 13,
        name: "سعود التميمي",
        role: "عضو",
        posts: 0,
        files: 0,
        suggestions: 0,
        edits: 0,
        total: 0,
        gender: "male",
        details: `سعود التميمي: 0 نقاط
• لا توجد أعمال حالياً`
    }
];
