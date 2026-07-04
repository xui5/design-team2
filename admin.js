// ===== بيانات الصلاحية (قابلة للتعديل) =====
let adminCredentials = {
    username: "admin",
    password: "admin123"
};

// ===== تسجيل الدخول =====
function login() {
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value.trim();
    const error = document.getElementById('loginError');
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
        error.style.display = 'none';
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        renderEditForm();
        renderAdminSettings();
    } else {
        error.style.display = 'block';
    }
}

// ===== خروج =====
function logout() {
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('loginPass').value = '';
    document.getElementById('loginUser').value = '';
}

// ===== عرض إعدادات الصلاحية =====
function renderAdminSettings() {
    const container = document.getElementById('adminSettings');
    if (!container) return;
    
    container.innerHTML = `
        <div class="settings-box">
            <h3 style="color: #0039a6; margin-bottom: 15px;">🔑 إعدادات الصلاحية</h3>
            <div class="settings-fields">
                <label>اسم المستخدم
                    <input type="text" id="settingsUsername" value="${adminCredentials.username}">
                </label>
                <label>كلمة المرور
                    <input type="text" id="settingsPassword" value="${adminCredentials.password}">
                </label>
                <button class="save-settings-btn" onclick="saveAdminSettings()">💾 تحديث الصلاحية</button>
            </div>
        </div>
    `;
}

// ===== حفظ إعدادات الصلاحية =====
function saveAdminSettings() {
    const newUsername = document.getElementById('settingsUsername').value.trim();
    const newPassword = document.getElementById('settingsPassword').value.trim();
    
    if (newUsername && newPassword) {
        adminCredentials.username = newUsername;
        adminCredentials.password = newPassword;
        alert('✅ تم تحديث بيانات الدخول بنجاح!');
    } else {
        alert('❌ اسم المستخدم وكلمة المرور مطلوبة');
    }
}

// ===== عرض نموذج التعديل =====
function renderEditForm() {
    const container = document.getElementById('editContainer');
    container.innerHTML = membersData.map((m, i) => `
        <div class="member-card-edit" data-index="${i}">
            <div class="member-header">
                <input type="text" value="${m.name}" data-field="name" data-index="${i}" placeholder="الاسم">
                <select class="role-select" data-field="role" data-index="${i}">
                    ${['قائد الفريق', 'نائب قائد الفريق', 'عضو'].map(r => 
                        `<option value="${r}" ${m.role === r ? 'selected' : ''}>${r}</option>`
                    ).join('')}
                </select>
                <button class="delete-btn" onclick="deleteMember(${i})">🗑️ حذف</button>
            </div>
            <div class="fields">
                <label>بوستات <input type="number" value="${m.posts}" data-field="posts" data-index="${i}"></label>
                <label>ملفات <input type="number" value="${m.files}" data-field="files" data-index="${i}"></label>
                <label>اقتراحات <input type="number" value="${m.suggestions}" data-field="suggestions" data-index="${i}"></label>
                <label>تعديلات <input type="number" value="${m.edits}" data-field="edits" data-index="${i}"></label>
                <label>المجموع <input type="number" step="0.5" value="${m.total}" data-field="total" data-index="${i}"></label>
                <label>النوع
                    <select data-field="gender" data-index="${i}">
                        <option value="female" ${m.gender === 'female' ? 'selected' : ''}>أنثى</option>
                        <option value="male" ${m.gender === 'male' ? 'selected' : ''}>ذكر</option>
                    </select>
                </label>
                <textarea data-field="details" data-index="${i}" placeholder="التفاصيل...">${m.details}</textarea>
            </div>
        </div>
    `).join('');
}

// ===== حذف عضو =====
function deleteMember(index) {
    if (confirm('هل أنت متأكد من حذف هذا العضو؟')) {
        membersData.splice(index, 1);
        renderEditForm();
    }
}

// ===== إضافة عضو =====
function addMember() {
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
    renderEditForm();
}

// ===== حفظ البيانات =====
function saveData() {
    // جمع البيانات من الحقول
    const inputs = document.querySelectorAll('#editContainer input, #editContainer select, #editContainer textarea');
    const tempData = JSON.parse(JSON.stringify(membersData));
    
    inputs.forEach(input => {
        const index = parseInt(input.dataset.index);
        const field = input.dataset.field;
        if (!isNaN(index) && field) {
            let value = input.value;
            if (input.type === 'number') value = parseFloat(value) || 0;
            tempData[index][field] = value;
        }
    });
    
    // تحديث البيانات
    tempData.forEach((m, i) => {
        Object.keys(m).forEach(key => {
            if (key !== 'id' && key !== 'details') {
                membersData[i][key] = tempData[i][key];
            }
        });
        membersData[i].details = tempData[i].details;
    });
    
    // عرض رسالة نجاح
    const success = document.getElementById('saveSuccess');
    success.style.display = 'block';
    setTimeout(() => success.style.display = 'none', 3000);
    
    alert('✅ تم حفظ البيانات! لتظهر التغييرات في الموقع الرئيسي، قم بتحديث الصفحة.');
}
