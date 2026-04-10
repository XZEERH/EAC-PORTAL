function toggleFab() {
    document.getElementById('fabWrapper').classList.toggle('active');
}

function searchMenu() {
    let input = document.getElementById('portalSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        cards[i].style.display = title.includes(input) ? "" : "none";
    }
}

setInterval(() => {
    document.getElementById('eac-time').innerText = new Date().toLocaleTimeString('en-GB') + " // EAC-TIME";
}, 1000);

window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload();
    }
};

window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    const status = document.getElementById('load-status');

    setTimeout(() => {
        status.innerText = "ACCESS GRANTED";
        status.style.color = "#00ffaa";

        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.getElementById('portal-content').style.display = 'block';
                revealCards();
            }, 600);
        }, 1000);
    }, 2000);
});

function goto(url, target) {
    const loader = document.getElementById('loading-screen');
    const status = document.getElementById('load-status');

    loader.style.display = 'flex';
    loader.style.opacity = '1';
    status.innerText = "CONNECTING TO " + target.toUpperCase();
    status.style.color = "#555";

    setTimeout(() => {
        status.innerText = "ACCESS GRANTED TO " + target.toUpperCase();
        status.style.color = "#00ffaa";

        setTimeout(() => {
            window.location.href = url;
        }, 1200);
    }, 2500);
}

fetch(`https://api.nasa.gov/planetary/apod?api_key=JMcJ1UGIgdFUs4qDWRaPEONheF5zazhnIdMhs4eH`)
    .then(res => res.json()).then(data => {
        document.getElementById('nasa-data').innerHTML = `<img src="${data.url}"><div class="nasa-info"><h4>NASA DAILY:</h4><p>${data.title}</p></div>`;
    });

setInterval(() => {
    const p = Math.floor(Math.random() * 100) + 10;
    const el = document.getElementById('ping-val');
    el.innerText = p;
    el.style.color = p < 50 ? "#00ffaa" : "#f59e0b";
}, 3000);

function revealCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 50 && cardTop > 0) {
            card.classList.add('reveal');
            card.classList.remove('exit');
        } else {
            card.classList.remove('reveal');
            card.classList.add('exit');
        }
    });
}
window.addEventListener('scroll', revealCards);