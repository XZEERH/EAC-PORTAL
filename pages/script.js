import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3XFfAwJbh0WHd7U_2tEazVgEg2bzbKTQ",
  authDomain: "databaseeac.firebaseapp.com",
  databaseURL: "https://databaseeac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "databaseeac",
  storageBucket: "databaseeac.firebasestorage.app",
  messagingSenderId: "275001784016",
  appId: "1:275001784016:web:5d193acbb56c1ac280d0d5",
  measurementId: "G-QQBN4VFDY2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let cosmicData = []; 

// --- INITIALIZING SYSTEM ---
window.addEventListener('load', () => {
    const overlay = document.getElementById('welcomeOverlay');
    const text = document.getElementById('welcomeText');
    const progress = document.getElementById('progressBar');

    loadContent('cosmic_data');

    setTimeout(() => {
        if(progress) progress.style.width = "100%";
        if(text) {
            text.innerText = "ACCESS GRANTED";
            text.style.color = "#39ff14";
        }
    }, 800);

    setTimeout(() => {
        if(overlay) {
            overlay.style.opacity = "0";
            setTimeout(() => overlay.style.display = "none", 1000);
        }
    }, 2800);

    updateWifi();
    setInterval(updateWifi, 3000);
});

// --- NAVIGATION LOGIC ---
window.switchTab = (tabName, el) => {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});

    const header = document.querySelector('header');
    const container = document.getElementById('cardContainer');

    if(tabName === 'cosmic_data') {
        header.style.display = 'block';
        container.style.marginTop = "0";
    } else {
        header.style.display = 'none';
        container.style.marginTop = "20px";
    }
    loadContent(tabName);
};

function loadContent(tabName) {
    const dataRef = ref(db, tabName);
    onValue(dataRef, (snapshot) => {
        const rawData = snapshot.val();
        const dataArray = rawData ? Object.values(rawData).reverse() : [];
        if(tabName === 'cosmic_data') cosmicData = dataArray;
        renderCards(dataArray, tabName);
    });
}

// --- RENDERING SYSTEM ---
function renderCards(data, tab) {
    const container = document.getElementById('cardContainer');
    if(!container) return;
    container.innerHTML = '';

    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card fade-in';

        if(tab === 'music_data') {
            const audioId = `audio-${index}`;
            card.style.background = "linear-gradient(135deg, #0d0d1a, #020205)";
            card.innerHTML = `
                <audio id="${audioId}" src="${item.link}" ontimeupdate="updateProgress('${audioId}')"></audio>

                <div style="padding: 15px; text-align:center;">
                    <div style="width: 100%; aspect-ratio: 16/9; overflow: hidden; border-radius: 12px; margin-bottom: 15px; box-shadow: 0 8px 15px rgba(0,0,0,0.4);">
                        <img src="${item.img}" onerror="this.src='https://via.placeholder.com/400x225?text=No+Cover'" 
                             style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; padding:0 5px;">
                        <h3 style="color:#eee; font-family:'Rajdhani', sans-serif; font-size:15px; margin:0; text-align:left; font-weight:600;">${item.title}</h3>
                        <a href="${item.link}" download target="_blank" style="color:#888; text-decoration:none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                        </a>
                    </div>

                    <div style="display:flex; justify-content:space-between; color:#666; font-size:10px; font-family:'Orbitron'; margin-bottom: 5px;">
                        <span id="currentTime-${audioId}">00:00</span>
                        <span id="duration-${audioId}">--:--</span>
                    </div>
                    <input type="range" id="seek-${audioId}" min="0" max="100" value="0" step="1" 
                           style="width:100%; height:3px; background:#222; accent-color:#39ff14; cursor:pointer; margin-bottom:20px;" 
                           oninput="setAudioProgress('${audioId}')">
                    
                    <div style="display:flex; align-items:center; justify-content:center; gap:25px;">
                        <button onclick="controlAudio('${audioId}', 'rewind')" style="background:none; border:none; color:#888; cursor:pointer;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
                        </button>

                        <button onclick="controlAudio('${audioId}', 'play')" id="btn-${audioId}" 
                                style="background:#eee; border:none; color:black; width:50px; height:50px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow: 0 0 15px rgba(255,255,255,0.1);">
                            <svg id="icon-${audioId}" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"></path></svg>
                        </button>

                        <button onclick="controlAudio('${audioId}', 'forward')" style="background:none; border:none; color:#888; cursor:pointer;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                        </button>
                    </div>
                </div>
            `;
        } else {
            card.innerHTML = `
                <div style="position:absolute; top:10px; right:10px; background:#ffcc00; color:black; font-size:9px; font-weight:bold; padding:3px 8px; border-radius:3px; z-index:2; font-family:'Orbitron';">${(item.category || tab).toUpperCase()}</div>
                <img src="${item.img}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Image+Not+Found'">
                <div class="card-info">
                    <h3>${item.title}</h3>
                    <p>${item.desc ? item.desc.substring(0, 60) : '...'}...</p>
                </div>`;
            card.onclick = () => openModal(item);
        }
        container.appendChild(card);
    });
}

// --- AUDIO LOGIC ---
window.controlAudio = (id, action) => {
    const audio = document.getElementById(id);
    const btnIcon = document.getElementById(`icon-${id}`);

    if (action === 'play') {
        if (audio.paused) {
            document.querySelectorAll('audio').forEach(a => { if(a.id !== id) a.pause(); });
            document.querySelectorAll('[id^="icon-audio"]').forEach(i => {
                i.innerHTML = '<path d="M5 3l14 9-14 9V3z"></path>';
            });
            audio.play();
            btnIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
        } else {
            audio.pause();
            btnIcon.innerHTML = '<path d="M5 3l14 9-14 9V3z"></path>';
        }
    } else if (action === 'forward') {
        audio.currentTime += 10;
    } else if (action === 'rewind') {
        audio.currentTime -= 10;
    }
};

window.updateProgress = (id) => {
    const audio = document.getElementById(id);
    const currentTimeEl = document.getElementById(`currentTime-${id}`);
    const totalTimeEl = document.getElementById(`duration-${id}`);
    const seekBar = document.getElementById(`seek-${id}`);

    if (currentTimeEl) currentTimeEl.innerText = formatTime(audio.currentTime);
    if (audio.duration && totalTimeEl && (totalTimeEl.innerText === '--:--' || totalTimeEl.innerText === '00:00')) {
        totalTimeEl.innerText = formatTime(audio.duration);
    }
    if (audio.duration && seekBar) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
    }
};

window.setAudioProgress = (id) => {
    const audio = document.getElementById(id);
    const seekBar = document.getElementById(`seek-${id}`);
    if (audio.duration) audio.currentTime = (seekBar.value / 100) * audio.duration;
};

function formatTime(seconds) {
    if (!seconds) return '00:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// --- OLD SYSTEMS ---
window.searchData = () => {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const filtered = cosmicData.filter(i => 
        i.title.toLowerCase().includes(q) || (i.category && i.category.toLowerCase().includes(q))
    );
    renderCards(filtered, 'cosmic_data');
};

window.filterData = (cat) => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if(event) event.target.classList.add('active');
    renderCards(cat === 'all' ? cosmicData : cosmicData.filter(i => i.category === cat), 'cosmic_data');
};

window.openModal = (item) => {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalImg').src = item.img;
    document.getElementById('modalDesc').innerText = item.desc;
    document.getElementById('modalTag').innerText = (item.category || "OBJECT").toUpperCase();
    document.getElementById('modalLink').href = item.link;
    if(modal) modal.style.display = "block";
};

window.closeModal = () => document.getElementById('modal').style.display = "none";

function updateWifi() {
    const start = Date.now();
    fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' })
    .then(() => {
        document.getElementById('ping-ms').innerText = (Date.now() - start) + "ms";
    });
}