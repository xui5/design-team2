

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
    
    // ===== أفضل 3 (ترتيب حسب النقاط) =====
    if (topContainer) {
        const sorted = [...membersData].sort((a, b) => b.total - a.total);
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
    
    // ===== كل الأعضاء =====
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
            
            <!-- ===== حقول التعديل ===== -->
            <div class="edit-controls">
                <input type="text" class="edit-name-input" value="${m.name}" placeholder="الاسم">
                <input type="number" value="${m.posts}" placeholder="بوستات">
                <input type="number" value="${m.files}" placeholder="ملفات">
                <input type="number" value="${m.suggestions}" placeholder="اقتراحات">
                <input type="number" value="${m.edits}" placeholder="تعديلات">
                
                <select class="edit-role-select" onchange="updateRole(${index}, this.value)">
                    <option value="قائد الفريق" ${m.role === 'قائد الفريق' ? 'selected' : ''}>قائد الفريق</option>
                    <option value="نائب قائد الفريق" ${m.role === 'نائب قائد الفريق' ? 'selected' : ''}>نائب قائد الفريق</option>
                    <option value="عضو" ${m.role === 'عضو' ? 'selected' : ''}>عضو</option>
                </select>
                
                <textarea class="edit-details-input" placeholder="التفاصيل...">${m.details}</textarea>
                
                <div class="edit-btn-group">
                    <button class="save-edit-btn" onclick="saveMemberData(${index})">💾 حفظ</button>
                    <button class="delete-member-btn" onclick="deleteMember(${index})">🗑️ حذف</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // ===== زر إضافة عضو =====
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

window.addEventListener('scroll', function() {
    document.querySelectorAll('.member-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

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
// ===== إدارة الأدمن =====
// =============================================

let isAdminMode = false;

function toggleAdminPopup() {
    document.getElementById('adminPopup').classList.toggle('show');
}

function closeAdminPopup() {
    document.getElementById('adminPopup').classList.remove('show');
}

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

function enableAdminMode() {
    isAdminMode = true;
    document.body.classList.add('edit-mode');
    document.getElementById('adminModeBtn').classList.add('show');
    const addBtn = document.querySelector('.add-member-btn');
    if (addBtn) addBtn.style.display = 'block';
    renderAllMembers();
    showCustomPopup('✅ تم تفعيل وضع التعديل');
}

function disableAdminMode() {
    isAdminMode = false;
    document.body.classList.remove('edit-mode');
    document.getElementById('adminModeBtn').classList.remove('show');
    const addBtn = document.querySelector('.add-member-btn');
    if (addBtn) addBtn.style.display = 'none';
    renderAllMembers();
    showCustomPopup('✅ تم الخروج من وضع التعديل');
}

// =============================================
// ===== دوال التعديل =====
// =============================================

function saveMemberData(index) {
    const card = document.querySelectorAll('.member-card')[index];
    if (!card) return;
    
    const inputs = card.querySelectorAll('.edit-controls input');
    const nameInput = card.querySelector('.edit-name-input');
    const roleSelect = card.querySelector('.edit-role-select');
    const detailsInput = card.querySelector('.edit-details-input');
    
    membersData[index].name = nameInput.value.trim() || membersData[index].name;
    membersData[index].role = roleSelect ? roleSelect.value : membersData[index].role;
    membersData[index].posts = parseFloat(inputs[1]?.value) || 0;
    membersData[index].files = parseFloat(inputs[2]?.value) || 0;
    membersData[index].suggestions = parseFloat(inputs[3]?.value) || 0;
    membersData[index].edits = parseFloat(inputs[4]?.value) || 0;
    membersData[index].details = detailsInput ? detailsInput.value : membersData[index].details;
    
    membersData[index].total = membersData[index].posts + 
                               (membersData[index].files * 6) + 
                               (membersData[index].suggestions * 0.5) + 
                               (membersData[index].edits * 0.5);
    
    renderAllMembers();
    showCustomPopup('✅ تم حفظ التغييرات بنجاح!');
}

function deleteMember(index) {
    if (confirm(`هل أنت متأكد من حذف ${membersData[index].name}؟`)) {
        membersData.splice(index, 1);
        renderAllMembers();
        showCustomPopup('✅ تم حذف العضو!');
    }
}

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
    showCustomPopup('✅ تم إضافة عضو جديد! قم بتعديل بياناته');
}

// ===== تغيير المنصب فوراً =====
function updateRole(index, newRole) {
    membersData[index].role = newRole;
    renderAllMembers();
    showCustomPopup('✅ تم تغيير المنصب إلى ' + newRole);
}

// ===== نافذة التعديل المنبثقة (بدل التنبيهات) =====
function showCustomPopup(message) {
    const oldPopup = document.querySelector('.custom-popup');
    if (oldPopup) oldPopup.remove();
    
    const popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.innerHTML = `
        <div class="custom-popup-content">
            <div class="custom-popup-icon">✅</div>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 500);
    }, 2000);
}
