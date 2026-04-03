/* LOGIKA SISTEM LENGKAP */

// A. LOADING
window.addEventListener('DOMContentLoaded', () => {
    let p = 0; const f = document.querySelector('.progress-fill');
    const l = setInterval(() => {
        p += Math.random() * 25; f.style.width = p + '%';
        if (p >= 100) {
            clearInterval(l);
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
                document.getElementById('app').classList.remove('hidden');
                switchTab('calc', document.querySelector('.nav-item'));
            }, 500);
        }
    }, 150);
});

// B. TAB NAVIGATION
function switchTab(type, el) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    const content = document.getElementById('content');
    const disp = document.getElementById('display-section');
    disp.style.display = (type === 'calc') ? 'block' : 'none';

    if (type === 'calc') renderCalc();
    else if (type === 'astro') renderAstro();
    else if (type === 'unit') renderUnit();
    else if (type === 'notes') renderNotes();
}

// C. SCIENTIFIC CALCULATOR (5 COLUMNS)
let formula = ""; let ans = 0;
function renderCalc() {
    const keys = [
        {t:'2nd', v:''}, {t:'deg', v:''}, {t:'sin', v:'sin('}, {t:'cos', v:'cos('}, {t:'tan', v:'tan('},
        {t:'xʸ', v:'^'}, {t:'lg', v:'log('}, {t:'ln', v:'ln('}, {t:'(', v:'('}, {t:')', v:')'},
        {t:'√', v:'sqrt('}, {t:'AC', v:'AC', c:'btn-act'}, {t:'DEL', v:'DEL', c:'btn-act'}, {t:'%', v:'%', c:'btn-op'}, {t:'÷', v:'/', c:'btn-op'},
        {t:'x!', v:'!'}, {t:'7', v:'7'}, {t:'8', v:'8'}, {t:'9', v:'9'}, {t:'×', v:'*', c:'btn-op'},
        {t:'1/x', v:'1/'}, {t:'4', v:'4'}, {t:'5', v:'5'}, {t:'6', v:'6'}, {t:'-', v:'-', c:'btn-op'},
        {t:'π', v:'pi'}, {t:'1', v:'1'}, {t:'2', v:'2'}, {t:'3', v:'3'}, {t:'+', v:'+', c:'btn-op'},
        {t:'Inv', v:''}, {t:'e', v:'e'}, {t:'0', v:'0'}, {t:'.', v:'.'}, {t:'=', v:'=', c:'btn-eq'}
    ];
    let h = '<div class="calc-grid">';
    keys.forEach(k => h += `<button class="${k.c||''}" onclick="action('${k.v||k.t}')">${k.t}</button>`);
    document.getElementById('content').innerHTML = h + '</div>';
}

function action(v) {
    const d = document.getElementById('current-op'), p = document.getElementById('prev-op');
    if(v==='AC'){ formula=""; d.innerText="0"; p.innerText=""; }
    else if(v==='DEL'){ formula=formula.slice(0,-1); d.innerText=formula||"0"; }
    else if(v==='='){
        try {
            let s = formula.replace(/pi/g, Math.PI).replace(/e/g, Math.E).replace(/sin/g,'Math.sin').replace(/cos/g,'Math.cos').replace(/tan/g,'Math.tan').replace(/log/g,'Math.log10').replace(/ln/g,'Math.log').replace(/sqrt/g,'Math.sqrt').replace(/\^/g,'**');
            ans = eval(s); p.innerText = formula + " ="; d.innerText = ans; formula = ans.toString();
        } catch { d.innerText = "Error"; }
    } else { formula += v; d.innerText = formula; }
}

// D. ASTROFISIKA & UNIT & NOTES (SISTEM LAMA)
function renderAstro() {
    document.getElementById('content').innerHTML = `<div class="astro-panel">
        <h4 style="color:var(--neon)">Gaya Gravitasi (N)</h4>
        <input type="number" id="m1" placeholder="Massa 1 (kg)"><input type="number" id="m2" placeholder="Massa 2 (kg)"><input type="number" id="r" placeholder="Jarak (m)">
        <button onclick="goA('g')" style="width:100%; padding:10px; background:var(--purple); color:white; border:none; border-radius:8px">Hitung</button>
        <div id="ra" class="res-box"></div>
        <h4 style="color:var(--neon); margin-top:20px">Radius Schwarzschild</h4>
        <input type="number" id="ms" placeholder="Massa (kg)">
        <button onclick="goA('s')" style="width:100%; padding:10px; background:var(--purple); color:white; border:none; border-radius:8px">Hitung</button>
    </div>`;
}

function goA(m) {
    const G=6.674e-11, c=299792458; let r="";
    if(m==='g'){ const m1=document.getElementById('m1').value, m2=document.getElementById('m2').value, d=document.getElementById('r').value; r="F: "+((G*m1*m2)/(d*d)).toExponential(3)+" N"; }
    else { const ms=document.getElementById('ms').value; r="Radius: "+((2*G*ms)/(c*c)).toFixed(2)+" m"; }
    document.getElementById('ra').innerText = r;
}

function renderUnit() {
    document.getElementById('content').innerHTML = `<div class="unit-panel">
        <h4 style="color:var(--neon)">Unit Converter</h4>
        <input type="number" id="ui" placeholder="Nilai">
        <select id="ut"><option value="1">Kg ke Massa Matahari</option><option value="2">Bumi ke Matahari</option></select>
        <button onclick="goU()" style="width:100%; padding:10px; background:var(--purple); color:white; border:none; border-radius:8px">Convert</button>
        <div id="ru" class="res-box"></div>
    </div>`;
}

function goU() {
    const v=document.getElementById('ui').value, t=document.getElementById('ut').value;
    let r = (t==="1") ? v/1.989e30 : (v*5.972e24)/1.989e30;
    document.getElementById('ru').innerText = "Hasil: " + r.toExponential(4) + " M☉";
}

function renderNotes() {
    const s = localStorage.getItem('a_n') || "";
    document.getElementById('content').innerHTML = `<div class="notes-container">
        <h4 style="color:var(--purple)">Catatan Privat</h4>
        <textarea oninput="localStorage.setItem('a_n', this.value)" placeholder="Tulis rumus...">${s}</textarea>
    </div>`;
}

setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
