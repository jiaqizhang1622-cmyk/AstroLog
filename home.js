function getAllUserObservations() {
    const obsStr = localStorage.getItem('userObservations');
    return obsStr ? JSON.parse(obsStr) : [];
}

// ✅ 把静态观测和用户观测合并，按全局 viewCount 排序
function getTopPopularObservations() {
    // STATIC_OBSERVATIONS 来自 observations.js
    const staticList = (typeof STATIC_OBSERVATIONS !== 'undefined') ? STATIC_OBSERVATIONS : [];
    const userList = getAllUserObservations();

    const all = [...staticList, ...userList];

    // 按全局 view count 降序排序，view count 相等的排在一起就行（后面 slice 会截断）
    const sorted = all.sort((a, b) => {
        const viewsA = getViewCount(a.id); // getViewCount 来自 observations.js
        const viewsB = getViewCount(b.id);
        return viewsB - viewsA;
    });

    // 只取实际被看过的（>0 次的），避免显示一堆 0 次的
    // 如果你希望即使没人看过也显示 5 个，把下面这行 .filter(...) 删掉就好
    return sorted.filter(obs => getViewCount(obs.id) > 0).slice(0, 5);
}

function createGalleryItem(observation) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.style.cursor = 'pointer';

    if (observation.imageUrl) {
        const img = document.createElement('img');
        img.className = 'gallery-img';
        img.src = observation.imageUrl;
        img.alt = observation.objectName;
        galleryItem.appendChild(img);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'gallery-img';
        placeholder.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 18px;
            text-align: center;
            padding: 20px;
            font-weight: bold;
        `;
        placeholder.textContent = observation.objectName;
        galleryItem.appendChild(placeholder);
    }

    // 可选：在卡片上叠加 view count 角标，让"为什么是热门"一目了然
    const badge = document.createElement('div');
    badge.style.cssText = `
        position: absolute; top: 8px; right: 8px;
        background: rgba(0,0,0,0.65); color: white;
        padding: 3px 10px; border-radius: 12px;
        font-size: 12px;
    `;
    badge.textContent = `👁 ${getViewCount(observation.id)}`;
    galleryItem.style.position = 'relative';
    galleryItem.appendChild(badge);

    galleryItem.addEventListener('click', function () {
        window.location.href = `observation-detail.html?id=${observation.id}`;
    });

    return galleryItem;
}

function loadPopularObservations() {
    const popularGallery = document.getElementById('popularGallery');
    if (!popularGallery) {
        console.error('Popular gallery container not found!');
        return;
    }

    const topObservations = getTopPopularObservations();
    console.log(`Found ${topObservations.length} popular observations`);

    popularGallery.innerHTML = '';

    if (topObservations.length === 0) {
        // 还没有人看过任何观测时的空态
        popularGallery.innerHTML = `
            <p style="grid-column: 1 / -1; text-align: center; color: #999; padding: 30px;">
                No observations have been viewed yet. Browse the
                <a href="observations.html">Observations</a> page to start exploring!
            </p>
        `;
        return;
    }

    topObservations.forEach(observation => {
        popularGallery.appendChild(createGalleryItem(observation));
    });

    console.log(`Loaded ${topObservations.length} popular observations`);
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Home page loaded!');
    loadPopularObservations();
});