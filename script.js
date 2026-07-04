
// شاشة التحميل
window.addEventListener('load', function() {
    setTimeout(() => {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) loader.classList.add('hidden');
    }, 1500);
    renderAllMembers();
});

// عرض الأعضاء
function renderAllMembers() {
    const grid = document.getElementById('teamGrid');
    const topContainer = document.getElementById('topThreeContainer');
    if (!grid) return;
    
    const sorted = [...membersData].sort((a, b) => b.total - a.total);
    
    // أفضل 3
    if (topContainer) {
        const top3 = sorted.slice(0, 3);
        const medals = ['🥇', '🥈', '🥉'];
        topContainer.innerHTML = top3.map((m, i) => `
            <div class="top-item">
                <span class="top-rank">${medals[i]}</span>
                <span class="top-name">${m.name}</span>
                <span class="top-points">${m.total} نقطة</span>
            </div>
        `).join('');
    }
    
    // كل الأعضاء
    grid.innerHTML = membersData.map(m => `
        <div class="member-card glass-card">
            <div class="avatar-container">
                <div class="avatar ${m.gender === 'male' ? 'male' : ''}">
                    <i class="fas fa-user"></i>
                </div>
            </div>
            <h3 class="member-name">${m.name}</h3>
            <div class="member-role">${m.role}</div>
            <div class="points-details">
                <div class="point-item"><span>بوستات</span><span class="point-value white-value">${m.posts || '-'}</span></div>
                <div class="point-item"><span>ملف</span><span class="point-value white-value">${m.files || '-'}</span></div>
                <div class="point-item"><span>اقتراح</span><span class="point-value white-value">${m.suggestions || '-'}</span></div>
                <div class="point-item"><span>تعديل</span><span class="point-value white-value">${m.edits || '-'}</span></div>
                <div class="point-item total"><span>المجموع</span><span class="total-value blue-total">${m.total}</span></div>
            </div>
            <button class="details-btn" onclick="openPopup('${m.name}')">عرض التفاصيل</button>
        </div>
    `).join('');
}

// النافذة المنبثقة
function openPopup(name) {
    const popup = document.getElementById('popup');
    const title = document.getElementById('popup-title');
    const body = document.getElementById('popup-body');
    const member = membersData.find(m => m.name === name);
    title.textContent = name;
    body.textContent = member ? member.details : 'لا توجد تفاصيل';
    popup.classList.add('show');
}

function closePopup() {
    document.getElementById('popup').classList.remove('show');
}

window.addEventListener('click', function(e) {
    const popup = document.getElementById('popup');
    if (e.target === popup) closePopup();
});

// تأثيرات التمرير
window.addEventListener('scroll', function() {
    document.querySelectorAll('.member-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// تأثيرات المربع الرئيسي
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

// حركة العناصر
document.addEventListener('mousemove', function(e) {
    const elements = document.querySelectorAll('.element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    elements.forEach((element, index) => {
        const speed = (index + 1) * 20;
        element.style.transform = `translate(${(mouseX * speed) - speed/2}px, ${(mouseY * speed) - speed/2}px)`;
    });
});
