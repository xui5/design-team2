
// شاشة التحميل
window.addEventListener('load', function() {
    setTimeout(() => {
        const loader = document.querySelector('.loader-wrapper');
        loader.classList.add('hidden');
    }, 1500);
});

// بيانات التفاصيل لكل عضو
const memberDetails = {
    'فرح': `فرح: 24 نقطة
    •	الأعمال:
    •	بوست التسجيل (1)
    •	3 بوستات Silent Attacks (3)
    •	عرض النادي (1)
    •	3 بوستات رمضان (3)
    •	3 ستوريات رمضان (3)
    •	إطار الستوري (1)
    •	3 بوستات النشرة (3)
    •	كتيب النشرة ملف (6)
    •	تعديلات Enigma (4 تعديلات × 0.5 = 2)
    •	تعديل إعلان INE (0.5)
    •	اقتراح تحسين بوستات القبول (0.5)`,
    
    'معاذ': `معاذ: 8 نقاط
    •	الأعمال:
    •	بوست Enigma (1)
    •	إعلان INE (1)
    •	6 بوستات القبول (6)`,
    
    'ريم': `ريم: 10 نقاط
    •	الأعمال:
    •	4 بوستات Enigma (4)
    •	كتيب النشرة ملف (6)`,
    
    'البندري': `البندري: 7 نقاط
    •	الأعمال:
    •	1 بوست Silent Attacks (1)
    •	كتيب النشرة ملف (6)`,
    
    'سارة البراك': `سارة البراك: 6 نقاط
    •	الأعمال:
    •	3 بوستات Silent Attacks (3)
    •	3 ستوريات رمضان (3)`,
    
    'أثير': `أثير: 6 نقاط
    •	الأعمال:
    •	3 بوستات Silent Attacks (3)
    •	3 بوستات النشرة (3)`,
    
    'سارة السعود': `سارة السعود: 5 نقاط
    •	الأعمال:
    •	5 بوستات Enigma (5)`,
    
    'شذى': `شذى: 4 نقاط
    •	الأعمال:
    •	3 بوستات Enigma (3)
    •	تعديل بوستين Enigma محاذاة الخط ( 2×0.5 )=1`,
    
    'هبه': `هبه التميمي: 0 نقاط
    •	لا توجد أعمال حالياً`,
    
    'رفيدة': `رفيدة جابر: 0 نقاط
    •	لا توجد أعمال حالياً`,
    
    'خوله': `خوله السديس: 0 نقاط
    •	لا توجد أعمال حالياً`,
    
    'تسنيم': `تسنيم كريم: 0 نقاط
    •	لا توجد أعمال حالياً`,
    
    'سعود': `سعود التميمي: 0 نقاط
    •	لا توجد أعمال حالياً`,
    
};

// فتح النافذة المنبثقة
function openPopup(name) {
    const popup = document.getElementById('popup');
    const title = document.getElementById('popup-title');
    const body = document.getElementById('popup-body');
    
    title.textContent = name;
    body.textContent = memberDetails[name] || 'لا توجد تفاصيل متاحة';
    
    popup.classList.add('show');
}

// إغلاق النافذة المنبثقة
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

// إغلاق النافذة عند الضغط خارجها
window.addEventListener('click', function(e) {
    const popup = document.getElementById('popup');
    if (e.target === popup) {
        closePopup();
    }
});

// تأثيرات عند التمرير
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.member-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
        if (isVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// تأثيرات على المربع الرئيسي
const mainCard = document.getElementById('mainCard');
if (mainCard) {
    mainCard.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-5px) scale(1.01)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.3)';
    });
    
    mainCard.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    mainCard.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
    });
}

// حركة العناصر مع الماوس
document.addEventListener('mousemove', function(e) {
    const elements = document.querySelectorAll('.element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    elements.forEach((element, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX * speed) - (speed / 2);
        const y = (mouseY * speed) - (speed / 2);
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});