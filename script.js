
// شاشة التحميل
window.addEventListener('load', function() {
    setTimeout(() => {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) loader.classList.add('hidden');
    }, 1500);
    renderAllMembers();
});

// ===== عرض الأعضاء =====
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
    grid.innerHTML = membersData.map((m, index) => `
        <div class="member-card glass-card" data-index="${index}">
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
            <div class="edit-controls">
                <input type="text" class="edit-name-input" value="${m.name}" placeholder="الاسم">
                <input type="number" value="${m.posts}" placeholder="بوستات">
                <input type="number" value="${m.files}" placeholder="ملفات">
                <input type="number" value="${m.suggestions}" placeholder="اقتراحات">
                <input type="number" value="${m.edits}" placeholder="تعديلات">
                <div class="edit-btn-group">
                    <button class="save-edit-btn" onclick="saveMemberEdit(${index})">💾 حفظ</button>
                    <button class="delete-member-btn" onclick="deleteMember(${index})">🗑️ حذف</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // زر إضافة عضو جديد
    const existingBtn = document.querySelector('.add-member-btn');
    if (!existingBtn) {
        const addBtn = document.createElement('button');
        addBtn.className = 'add-member-btn';
        addBtn.textContent = '➕ إضافة عضو جديد';
        addBtn.onclick = addNewMember;
        grid.after(addBtn);
    }
}

// ===== النافذة المنبثقة للتفاصيل =====
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

// ===== تأثيرات التمرير =====
window.addEventListener('scroll', function() {
    document.querySelectorAll('.member-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// ===== تأثيرات المربع الرئيسي =====
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

// ===== حركة العناصر المضيئة =====
document.addEventListener('mousemove', function(e) {
    const elements = document.querySelectorAll('.element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    elements.forEach((element, index) => {
        const speed = (index + 1) * 20;
        element.style.transform = `translate(${(mouseX * speed) - speed/2}px, ${(mouseY * speed) - speed/2}px)`;
    });
});

// =============================================
// ===== إدارة الأدمن (تسجيل الدخول والتعديل) =====
// =============================================

let isAdminMode = false;

// فتح نافذة تسجيل الدخول
function toggleAdminPopup() {
    const popup = document.getElementById('adminPopup');
    popup.classList.toggle('show');
}

// إغلاق نافذة تسجيل الدخول
function closeAdminPopup() {
    document.getElementById('adminPopup').classList.remove('show');
}

// تسجيل الدخول
function adminLogin() {
    const user = document.getElementById('popupUser').value.trim();
    const pass = document.getElementById('popupPass').value.trim();
    const error = document.getElementById('popupError');
    
    if (user === "admin" && pass === "admin123") {
        error.style.display = 'none';
        closeAdminPopup();
        enableAdminMode();
    } else {
        error.textContent = '❌ اسم المستخدم أو كلمة المرور غير صحيحة';
        error.style.display = 'block';
    }
}

// تفعيل وضع التعديل
function enableAdminMode() {
    isAdminMode = true;
    document.body.classList.add('edit-mode');
    document.getElementById('adminModeBtn').classList.add('show');
    const addBtn = document.querySelector('.add-member-btn');
    if (addBtn) addBtn.style.display = 'block';
    renderAllMembers();
    alert('✅ تم تفعيل وضع التعديل!');
}

// الخروج من وضع التعديل
function disableAdminMode() {
    isAdminMode = false;
    document.body.classList.remove('edit-mode');
    document.getElementById('adminModeBtn').classList.remove('show');
    const addBtn = document.querySelector('.add-member-btn');
    if (addBtn) addBtn.style.display = 'none';
    renderAllMembers();
    alert('✅ تم الخروج من وضع التعديل');
}

// حفظ تعديلات العضو
function saveMemberEdit(index) {
    const card = document.querySelectorAll('.member-card')[index];
    if (!card) return;
    
    const inputs = card.querySelectorAll('.edit-controls input');
    const nameInput = card.querySelector('.edit-name-input');
    
    membersData[index].name = nameInput.value.trim() || membersData[index].name;
    membersData[index].posts = parseFloat(inputs[1]?.value) || 0;
    membersData[index].files = parseFloat(inputs[2]?.value) || 0;
    membersData[index].suggestions = parseFloat(inputs[3]?.value) || 0;
    membersData[index].edits = parseFloat(inputs[4]?.value) || 0;
    
    // إعادة حساب المجموع
    membersData[index].total = membersData[index].posts + 
                               (membersData[index].files * 6) + 
                               (membersData[index].suggestions * 0.5) + 
                               (membersData[index].edits * 0.5);
    
    renderAllMembers();
    alert('✅ تم حفظ التغييرات!');
}

// حذف عضو
function deleteMember(index) {
    if (confirm(`هل أنت متأكد من حذف ${membersData[index].name}؟`)) {
        membersData.splice(index, 1);
        renderAllMembers();
        alert('✅ تم حذف العضو!');
    }
}

// إضافة عضو جديد
function addNewMember() {
    membersData.push({
        id: Date.now(),
        name: "عضو جديد",
        role: "عضو",
        posts: 0,
        files: 0,
        suggestions: 0,
        edits: 0,
        total: 0,
        gender: "female",
        details: "أضف التفاصيل هنا..."
    });
    renderAllMembers();
    alert('✅ تم إضافة عضو جديد! قم بتعديل بياناته');
}
