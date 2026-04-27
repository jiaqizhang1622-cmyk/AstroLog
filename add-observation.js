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

function getAllObservations() {
    const obsStr = localStorage.getItem('userObservations');
    console.log('Getting observations from localStorage:', obsStr);
    return obsStr ? JSON.parse(obsStr) : [];
}

function saveObservation(data) {
    console.log('Saving observation:', data);
    const observations = getAllObservations();
    observations.push(data);
    localStorage.setItem('userObservations', JSON.stringify(observations));
    console.log('Observation saved! Total observations:', observations.length);
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('add-observation.js loaded!');
    
    if (!isLoggedIn()) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return;
    }
    
    checkLoginStatus();
    
  
const imageUpload = document.getElementById('imageUpload');
let uploadedImageUrl = '';

if (imageUpload) {
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // 检查文件大小（限制为 2MB）
            if (file.size > 2 * 1024 * 1024) {
                alert('Image is too large! Please select an image smaller than 2MB.');
                imageUpload.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
     
                    const maxSize = 800;
                    if (width > height) {
                        if (width > maxSize) {
                            height = height * (maxSize / width);
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width = width * (maxSize / height);
                            height = maxSize;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    uploadedImageUrl = canvas.toDataURL('image/jpeg', 0.7);
                    
                    console.log('Image compressed. Original size:', file.size, 'New size:', uploadedImageUrl.length);
                    alert('Image uploaded and compressed successfully!');
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}
    

    const form = document.getElementById('addObservationForm');
    if (!form) {
        console.error('Form not found!');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted!');
        
         
        const observationId = 'obs_' + Date.now();
        

        const currentUser = getCurrentUser();
        if (!currentUser) {
            alert('User not found! Please login again.');
            window.location.href = 'login.html';
            return;
        }
        
      
        const observationData = {
            id: observationId,
            objectName: document.getElementById('objectName').value,
            observer: currentUser.username,
            description: document.getElementById('description').value,
            rightAscension: document.getElementById('rightAscension').value || '',
            declination: document.getElementById('declination').value || '',
            locationName: document.getElementById('locationName').value,
            latitude: document.getElementById('latitude').value || '',
            longitude: document.getElementById('longitude').value || '',
            weather: document.getElementById('weather').value || '',
            equipment: document.getElementById('equipment').value || '',
            visibility: document.getElementById('visibility').value || '',
            imageUrl: uploadedImageUrl || '',
            date: new Date().toISOString(),
            viewCount: 0 
        };
        
        console.log('Observation data to save:', observationData);
        
        
        saveObservation(observationData);
        
        alert('Observation added successfully!');
        window.location.href = 'observations.html';
    });
});