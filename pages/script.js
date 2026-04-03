/**
 * EAC COSMIC DATABASE - CORE ENGINE (FIREBASE EDITION)
 * Developer: Razeerh (Owner EAC)
 * Features: Cloud Sync, Access Granted Overlay, Ping Monitor, Filter, Search, & Modal
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// --- KONFIGURASI SATELIT FIREBASE RAZEERH ---
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

// Data Starter Cadangan
const starterData = [{ 
    title: "SAGITTARIUS A*", 
    category: "Objek", 
    img: "https://image2url.com/r2/default/images/1774260028126-6ba61573-0a2b-4096-b7a4-f94a85f08ff9.jpg", 
    desc: "Lubang hitam supermasif pusat Bimasakti.", 
    link: "https://id.wikipedia.org/wiki/Sagittarius_A*" 
}];

// --- SISTEM LOADING, WELCOME OVERLAY & SYNC CLOUD ---
window.addEventListener('load', () => {
    const overlay = document.getElementById('welcomeOverlay');
    const text = document.getElementById('welcomeText');
    const progress = document.getElementById('progressBar');

    // 1. Ambil Data dari Firebase (Real-time)
    const dataRef = ref(db, 'cosmic_data');
    onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if(data) {
            cosmicData = Object.values(data).reverse();
        } else {
            cosmicData = starterData;
        }
        renderCards(cosmicData);
    });

    // 2. Animasi Loading Bar & ACCESS GRANTED
    setTimeout(() => {
        if(progress) progress.style.width = "100%";
        if(text) {
            text.innerText = "ACCESS GRANTED";
            text.style.color = "#39ff14"; // Hijau Neon
            text.style.textShadow = "0 0 20px #39ff14";
        }
    }, 800);

    // 3. Menghilangkan Overlay Greeting
    setTimeout(() => {
        if(overlay) {
            overlay.style.opacity = "0";
            setTimeout(() => overlay.style.display = "none", 1000);
        }
    }, 2800);

    // 4. Monitoring Jaringan
    updateWifi();
    setInterval(updateWifi, 3000);
});

// --- RENDER KARTU (CLOUD COMPATIBLE) ---
function renderCards(data) {
    const container = document.getElementById('cardContainer');
    if(!container) return;
    container.innerHTML = '';

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card fade-in';
        card.innerHTML = `
            <div style="position:absolute; top:10px; right:10px; background:#ffcc00; color:black; font-size:9px; font-weight:bold; padding:3px 8px; border-radius:3px; z-index:2; font-family:'Orbitron';">${item.category.toUpperCase()}</div>
            <img src="${item.img}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Image+Not+Found'">
            <div class="card-info">
                <h3>${item.title}</h3>
                <p>${item.desc.substring(0, 60)}...</p>
            </div>
        `;
        card.onclick = () => openModal(item);
        container.appendChild(card);
    });
}

// --- MONITOR NETWORK (PING WARNA-WARNI) ---
function updateWifi() {
    const start = Date.now();
    const icon = document.getElementById('wifi-icon');
    const ping = document.getElementById('ping-ms');

    fetch('https://www.google.com/favicon.ico', { mode: 'no-cors', cache: 'no-cache' })
    .then(() => {
        const ms = Date.now() - start;
        if(ping) {
            ping.innerText = ms + "ms";
            ping.style.color = ms < 150 ? "#39ff14" : (ms < 450 ? "#ffcc00" : "#ff4444");
        }
        if(icon) icon.style.color = "#ffffff"; 
    })
    .catch(() => {
        if(ping) { ping.innerText = "OFFLINE"; ping.style.color = "#ff4444"; }
        if(icon) icon.style.color = "#444444";
    });
}

// --- SISTEM PENCARIAN & FILTER ---
window.searchData = () => {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const filtered = cosmicData.filter(i => 
        i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );
    renderCards(filtered);
};

window.filterData = (cat) => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if(event) event.target.classList.add('active');

    if(cat === 'all') {
        renderCards(cosmicData);
    } else {
        const filtered = cosmicData.filter(i => i.category === cat);
        renderCards(filtered);
    }
};

// --- MODAL SYSTEM (DETAIL DATA) ---
window.openModal = (item) => {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalImg').src = item.img;
    document.getElementById('modalDesc').innerText = item.desc;
    document.getElementById('modalTag').innerText = item.category.toUpperCase();
    document.getElementById('modalLink').href = item.link;

    if(modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
};

window.closeModal = () => {
    const modal = document.getElementById('modal');
    if(modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};