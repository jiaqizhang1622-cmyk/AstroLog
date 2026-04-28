console.log('observations.js loaded!');

// =========================================================
// 系统自带的 10 个静态观测
// =========================================================
const STATIC_OBSERVATIONS = [
    {
        id: 'static-1',
        objectName: 'Andromeda Galaxy',
        observer: 'Jenny',
        locationName: 'Oulu, Finland',
        latitude: '65.0121° N',
        longitude: '25.4651° E',
        rightAscension: '00h 42m 44s',
        declination: "+41° 16' 9\"",
        description: 'Observed the Andromeda Galaxy on a clear autumn night. The galaxy appeared as a faint, elongated smudge of light visible to the naked eye. Through binoculars, the bright core and extended halo became more apparent.',
        weather: 'Very clear, no clouds',
        equipment: 'Dobsonian reflector',
        visibility: 'Excellent',
        imageUrl: 'image/Andromeda Galaxy.png',
        date: '2026-01-01T20:00:00',
        isStatic: true
    },
    {
        id: 'static-2',
        objectName: 'Triangulum Galaxy',
        observer: 'Maria',
        locationName: 'Rovaniemi, Finland',
        latitude: '66.5039° N',
        longitude: '25.7294° E',
        rightAscension: '01h 33m 50s',
        declination: "+30° 39' 36\"",
        description: 'A faint spiral galaxy observed under dark Lapland skies. Best seen with averted vision through a wide-field eyepiece.',
        weather: 'Clear, cold',
        equipment: 'Refractor telescope',
        visibility: 'Good',
        imageUrl: 'image/Triangulum Galaxy.png',
        date: '2026-01-02T20:00:00',
        isStatic: true
    },
    {
        id: 'static-3',
        objectName: 'Whirlpool Galaxy',
        observer: 'Liam',
        locationName: 'Tampere, Finland',
        latitude: '61.4978° N',
        longitude: '23.7610° E',
        rightAscension: '13h 29m 52s',
        declination: "+47° 11' 43\"",
        description: 'The interacting Whirlpool Galaxy and its companion NGC 5195 were clearly visible. Spiral structure suggested at higher magnification.',
        weather: 'Clear',
        equipment: 'Dobsonian reflector',
        visibility: 'Very good',
        imageUrl: 'image/Whirlpool Galaxy.png',
        date: '2026-01-03T20:00:00',
        isStatic: true
    },
    {
        id: 'static-4',
        objectName: 'Sombrero Galaxy',
        observer: 'Emma',
        locationName: 'Helsinki, Finland',
        latitude: '60.1699° N',
        longitude: '24.9384° E',
        rightAscension: '12h 39m 59s',
        declination: "-11° 37' 23\"",
        description: 'A distinctive edge-on galaxy with a prominent dust lane crossing its bright core. Resembles a wide-brimmed hat.',
        weather: 'Partly cloudy',
        equipment: 'Refractor telescope',
        visibility: 'Good',
        imageUrl: 'image/Sombrero Galaxy.png',
        date: '2026-01-04T20:00:00',
        isStatic: true
    },
    {
        id: 'static-5',
        objectName: 'Pinwheel Galaxy',
        observer: 'Noah',
        locationName: 'Kuopio, Finland',
        latitude: '62.8924° N',
        longitude: '27.6770° E',
        rightAscension: '14h 03m 12s',
        declination: "+54° 20' 56\"",
        description: 'A face-on spiral galaxy showing well-defined arms under steady seeing conditions.',
        weather: 'Clear',
        equipment: 'Dobsonian reflector',
        visibility: 'Excellent',
        imageUrl: 'image/Pinwheel Galaxy .png',
        date: '2026-01-05T20:00:00',
        isStatic: true
    },
    {
        id: 'static-6',
        objectName: 'Black Eye Galaxy',
        observer: 'Olivia',
        locationName: 'Turku, Finland',
        latitude: '60.4518° N',
        longitude: '22.2666° E',
        rightAscension: '12h 56m 44s',
        declination: "+21° 40' 58\"",
        description: 'The dark dust band giving the galaxy its name was clearly visible at high magnification.',
        weather: 'Clear',
        equipment: 'Refractor telescope',
        visibility: 'Good',
        imageUrl: 'image/Black Eye Galaxy.png',
        date: '2026-01-06T20:00:00',
        isStatic: true
    },
    {
        id: 'static-7',
        objectName: "Bode's Galaxy",
        observer: 'Ava',
        locationName: 'Oulu, Finland',
        latitude: '65.0121° N',
        longitude: '25.4651° E',
        rightAscension: '09h 55m 33s',
        declination: "+69° 03' 55\"",
        description: 'A bright spiral galaxy near the Cigar Galaxy, easy to spot with binoculars.',
        weather: 'Very clear',
        equipment: 'Binoculars',
        visibility: 'Excellent',
        imageUrl: "image/Bode's Galaxy.png",
        date: '2026-01-07T20:00:00',
        isStatic: true
    },
    {
        id: 'static-8',
        objectName: 'Centaurus A',
        observer: 'Ethan',
        locationName: 'Sydney, Australia',
        latitude: '33.8688° S',
        longitude: '151.2093° E',
        rightAscension: '13h 25m 27s',
        declination: "-43° 01' 09\"",
        description: 'A prominent peculiar galaxy with a striking dark dust lane visible from southern latitudes.',
        weather: 'Clear',
        equipment: 'Dobsonian reflector',
        visibility: 'Excellent',
        imageUrl: 'image/Centaurus A.png',
        date: '2026-01-08T20:00:00',
        isStatic: true
    },
    {
        id: 'static-9',
        objectName: 'Cigar Galaxy',
        observer: 'Lucas',
        locationName: 'Jyväskylä, Finland',
        latitude: '62.2426° N',
        longitude: '25.7473° E',
        rightAscension: '09h 55m 52s',
        declination: "+69° 50' 47\"",
        description: 'Observed the Cigar Galaxy near M81. It appeared thin and elongated, resembling a streak of light.',
        weather: 'Clear',
        equipment: 'Dobsonian reflector',
        visibility: 'Very good',
        imageUrl: 'image/Cigar Galaxy.jpg',
        date: '2026-01-09T20:00:00',
        isStatic: true
    },
    {
        id: 'static-10',
        objectName: 'Large Magellanic Cloud',
        observer: 'Sofia',
        locationName: 'Cape Town, South Africa',
        latitude: '33.9249° S',
        longitude: '18.4241° E',
        rightAscension: '05h 23m 34s',
        declination: "-69° 45' 22\"",
        description: 'A satellite galaxy of the Milky Way, visible to the naked eye as a faint cloud.',
        weather: 'Clear',
        equipment: 'Naked eye / Binoculars',
        visibility: 'Excellent',
        imageUrl: 'image/Large Magellanic Cloud.png',
        date: '2026-01-10T20:00:00',
        isStatic: true
    }
];


// =========================================================
// 全局 view count 工具（所有用户共享一张表）
// localStorage["viewCounts"] = { "static-1": 12, "1730000000000": 3 }
// =========================================================
function getAllViewCounts() {
    const str = localStorage.getItem('viewCounts');
    return str ? JSON.parse(str) : {};
}

function getViewCount(id) {
    const counts = getAllViewCounts();
    return counts[id] || 0;
}

function incrementView(id) {
    if (!id) return;
    const counts = getAllViewCounts();
    counts[id] = (counts[id] || 0) + 1;
    localStorage.setItem('viewCounts', JSON.stringify(counts));
}

function removeViewCount(id) {
    const counts = getAllViewCounts();
    delete counts[id];
    localStorage.setItem('viewCounts', JSON.stringify(counts));
}


// =========================================================
// 以下只在 observations 页面运行（首页和 detail 页不会用到）
// =========================================================

function checkLoginStatus() {
    const user = getCurrentUser();
    const userControls = document.getElementById('userControls');
    if (!userControls) return;

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

function protectAddNewButton() {
    const addNewBtn = document.getElementById('addNewBtn');
    if (!addNewBtn) return;

    addNewBtn.addEventListener('click', function () {
        if (!isLoggedIn()) {
            alert('Please login to add new observations!');
            window.location.href = 'login.html';
        } else {
            window.location.href = 'add-observation.html';
        }
    });
}

function getUserObservations() {
    const obsStr = localStorage.getItem('userObservations');
    return obsStr ? JSON.parse(obsStr) : [];
}

function createObservationCard(observation) {
    const card = document.createElement('a');
    card.href = '#';
    card.className = 'observation-card';
    card.setAttribute('data-observation-id', observation.id);

    const imageUrl = observation.imageUrl || '';
    const imageHtml = imageUrl
        ? `<img src="${imageUrl}" alt="${observation.objectName}" style="width: 100%; height: 100%; object-fit: cover;">`
        : `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f0f0f0; color: #999;">No Image</div>`;

    card.innerHTML = `
        <div class="card-image">
            ${imageHtml}
        </div>
        <div class="card-content">
            <h3>${observation.objectName}</h3>
            <p class="observer">Observer: ${observation.observer}</p>
            <p class="location">${observation.locationName}</p>
        </div>
    `;

    card.addEventListener('click', function (e) {
        e.preventDefault();
        if (!isLoggedIn()) {
            alert('Please login to view observation details!');
            window.location.href = 'login.html';
        } else {
            window.location.href = `observation-detail.html?id=${observation.id}`;
        }
    });

    return card;
}

function loadAllObservations() {
    const cardGrid = document.getElementById('cardGrid');
    if (!cardGrid) return;

    cardGrid.innerHTML = '';

    STATIC_OBSERVATIONS.forEach(obs => {
        cardGrid.appendChild(createObservationCard(obs));
    });

    const userObs = getUserObservations();
    userObs.forEach(obs => {
        cardGrid.appendChild(createObservationCard(obs));
    });

    console.log(`Loaded ${STATIC_OBSERVATIONS.length} static + ${userObs.length} user observations`);
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('cardGrid')) {
        checkLoginStatus();
        protectAddNewButton();
        loadAllObservations();
    }
});