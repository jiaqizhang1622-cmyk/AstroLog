// ===== Login Status =====
function checkLoginStatus() {
    const user = getCurrentUser();
    const userControls = document.getElementById('userControls');

    if (user) {
        userControls.innerHTML = `
            <span class="welcome-text">Welcome, ${user.username}!</span>
            <button onclick="logoutUser()" class="logout-btn">Logout</button>
        `;
    } else {
        userControls.innerHTML = `
            <button onclick="window.location.href='login.html'" class="login-btn-header">Login</button>
        `;
    }
}

function getObservationIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function getAllObservations() {
    const obsStr = localStorage.getItem('userObservations');
    return obsStr ? JSON.parse(obsStr) : [];
}

// ✅ 改动 1：先查静态观测，再查用户观测
function getObservationById(id) {
    if (typeof STATIC_OBSERVATIONS !== 'undefined') {
        const staticObs = STATIC_OBSERVATIONS.find(obs => obs.id === id);
        if (staticObs) return staticObs;
    }

    const observations = getAllObservations();
    return observations.find(obs => obs.id === id);
}

// ✅ 改动 2：直接调用全局 incrementView（observations.js 提供）
//          静态和用户观测都走同一张 viewCounts 表
function incrementViewCount(id) {
    incrementView(id);
}

function deleteObservation(id) {
    if (!confirm('Are you sure you want to delete this observation?')) return;

    const observations = getAllObservations();
    const filtered = observations.filter(obs => obs.id !== id);
    localStorage.setItem('userObservations', JSON.stringify(filtered));

    // 删除观测的同时清掉它的 view count，避免 viewCounts 越攒越大
    removeViewCount(id);
    removeFromCollectionSilent(id);

    alert('Observation deleted successfully!');
    window.location.href = 'observations.html';
}

// ===== Collection Helpers =====
function getCollection() {
    const user = getCurrentUser();
    if (!user) return [];
    const key = `collection_${user.username}`;
    const str = localStorage.getItem(key);
    return str ? JSON.parse(str) : [];
}

function saveCollection(collection) {
    const user = getCurrentUser();
    if (!user) return;
    const key = `collection_${user.username}`;
    localStorage.setItem(key, JSON.stringify(collection));
}

function isInCollection(observationId) {
    const collection = getCollection();
    return collection.some(obs => obs.id === observationId);
}

function toggleCollection(observation) {
    let collection = getCollection();
    const exists = collection.some(obs => obs.id === observation.id);

    if (exists) {
        collection = collection.filter(obs => obs.id !== observation.id);
        saveCollection(collection);
        updateCollectionBtn(false);
        showToast('Removed from collection');
    } else {
        collection.push(observation);
        saveCollection(collection);
        updateCollectionBtn(true);
        showToast('Added to collection! ⭐');
    }
}

function removeFromCollectionSilent(id) {
    let collection = getCollection();
    collection = collection.filter(obs => obs.id !== id);
    saveCollection(collection);
}

function updateCollectionBtn(inCollection) {
    const btn = document.getElementById('collectionBtn');
    if (!btn) return;
    if (inCollection) {
        btn.textContent = '★ In Collection';
        btn.style.background = '#f39c12';
        btn.style.color = 'white';
    } else {
        btn.textContent = '☆ Add to Collection';
        btn.style.background = '#ecf0f1';
        btn.style.color = '#2c3e50';
    }
}

// ===== Toast =====
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
            background: #2c3e50; color: white; padding: 12px 28px;
            border-radius: 30px; font-size: 15px; z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: opacity 0.4s;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2000);
}

// ===== Display Detail =====
function displayObservationDetail() {
    const observationId = getObservationIdFromUrl();

    if (!observationId) {
        alert('No observation ID provided!');
        window.location.href = 'observations.html';
        return;
    }

    const observation = getObservationById(observationId);

    if (!observation) {
        alert('Observation not found!');
        window.location.href = 'observations.html';
        return;
    }

    // 先 +1 再读，让显示的次数包含本次访问
    incrementViewCount(observationId);
    const viewCount = getViewCount(observationId);

    const detailContainer = document.getElementById('observationDetail');
    const currentUser = getCurrentUser();
    const isMyObservation = currentUser && observation.observer === currentUser.username;
    const inCollection = isInCollection(observationId);

    let imageHtml;
    if (observation.imageUrl) {
        imageHtml = `<img src="${observation.imageUrl}" alt="${observation.objectName}" style="width:100%;height:100%;object-fit:cover;">`;
    } else {
        imageHtml = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0f0f0;color:#999;font-size:18px;">No Image Available</div>`;
    }

    let modificationHistory = '';
    if (observation.modifiedDate) {
        modificationHistory = `
            <div style="margin-top:20px;padding:15px;background:#fff3cd;border-left:4px solid #ffc107;border-radius:4px;">
                <h4 style="margin:0 0 10px 0;color:#856404;">Modification History</h4>
                <p style="margin:5px 0;color:#856404;"><strong>Modified:</strong> ${new Date(observation.modifiedDate).toLocaleString()}</p>
                ${observation.modificationReason ? `<p style="margin:5px 0;color:#856404;"><strong>Reason:</strong> ${observation.modificationReason}</p>` : ''}
            </div>
        `;
    }

    // ✅ 改动 3：view count 从全局表读，静态观测也能显示了
    const viewCountDisplay = `
        <p style="margin-top:10px;color:#999;font-size:14px;">
            Viewed ${viewCount} time${viewCount === 1 ? '' : 's'}
        </p>
    `;

    const collectionBtnStyle = inCollection
        ? 'background:#f39c12;color:white;'
        : 'background:#ecf0f1;color:#2c3e50;';
    const collectionBtnText = inCollection ? '★ In Collection' : '☆ Add to Collection';

    const actionButtons = isMyObservation ? `
        <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;">
            <button onclick="window.location.href='observations.html'" style="padding:10px 20px;background:#6c757d;color:white;border:none;border-radius:4px;cursor:pointer;">
                ← Back
            </button>
            <button id="collectionBtn" onclick="toggleCollection(${JSON.stringify(observation).replace(/"/g, '&quot;')})"
                style="padding:10px 20px;border:2px solid #f39c12;border-radius:4px;cursor:pointer;font-size:14px;${collectionBtnStyle}">
                ${collectionBtnText}
            </button>
            <button onclick="window.location.href='edit-observation.html?id=${observation.id}'" style="padding:10px 20px;background:#ffc107;color:#000;border:none;border-radius:4px;cursor:pointer;">
                Edit
            </button>
            <button onclick="deleteObservation('${observation.id}')" style="padding:10px 20px;background:#dc3545;color:white;border:none;border-radius:4px;cursor:pointer;">
                Delete
            </button>
        </div>
    ` : `
        <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;">
            <button onclick="window.location.href='observations.html'" style="padding:10px 20px;background:#3498db;color:white;border:none;border-radius:4px;cursor:pointer;">
                ← Back
            </button>
            <button id="collectionBtn" onclick="toggleCollection(${JSON.stringify(observation).replace(/"/g, '&quot;')})"
                style="padding:10px 20px;border:2px solid #f39c12;border-radius:4px;cursor:pointer;font-size:14px;${collectionBtnStyle}">
                ${collectionBtnText}
            </button>
        </div>
    `;

    const dateDisplay = observation.isStatic
        ? `<p style="margin-top:30px;padding-top:20px;border-top:1px solid #eee;color:#999;font-size:14px;">Sample observation</p>`
        : `<p style="margin-top:30px;padding-top:20px;border-top:1px solid #eee;color:#999;font-size:14px;">Created on: ${new Date(observation.date).toLocaleString()}</p>`;

    detailContainer.innerHTML = `
        <div class="image-box">${imageHtml}</div>
        <section class="text-content">
            <h1>${observation.objectName} Observation</h1>
            ${viewCountDisplay}
            <h3>Observer: ${observation.observer}</h3>
            <p>${observation.description}</p>

            ${observation.rightAscension || observation.declination ? `
            <h3>Astronomical Coordinates</h3>
            <ul>
                ${observation.rightAscension ? `<li>Right Ascension: ${observation.rightAscension}</li>` : ''}
                ${observation.declination ? `<li>Declination: ${observation.declination}</li>` : ''}
            </ul>` : ''}

            <h3>Observation Location</h3>
            <p>Location Name: ${observation.locationName}</p>
            ${observation.latitude || observation.longitude ? `
            <ul>
                ${observation.latitude ? `<li>Latitude: ${observation.latitude}</li>` : ''}
                ${observation.longitude ? `<li>Longitude: ${observation.longitude}</li>` : ''}
            </ul>` : ''}

            ${observation.weather || observation.equipment || observation.visibility ? `
            <h3>Other Information</h3>
            <ul>
                ${observation.weather ? `<li>Weather: ${observation.weather}</li>` : ''}
                ${observation.equipment ? `<li>Equipment Used: ${observation.equipment}</li>` : ''}
                ${observation.visibility ? `<li>Visibility: ${observation.visibility}</li>` : ''}
            </ul>` : ''}

            ${dateDisplay}
            ${modificationHistory}
            ${actionButtons}
        </section>
    `;
}

document.addEventListener('DOMContentLoaded', function () {
    if (!isLoggedIn()) {
        alert('Please login to view observation details!');
        window.location.href = 'login.html';
        return;
    }

    checkLoginStatus();
    displayObservationDetail();
});