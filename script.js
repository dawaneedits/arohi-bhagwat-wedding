// Opens the curtain drop animation timeline
function openCurtain() {
    document.getElementById('curtain-container').classList.add('open');
    setTimeout(() => {
        document.querySelector('.section-hero').classList.add('visible');
    }, 400);
}

// Scratch Card Canvas Engine
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let isScratchedOpen = false; 

function initCanvas() {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#bf953f');
    grad.addColorStop(0.25, '#fcf6ba');
    grad.addColorStop(0.5, '#b38728');
    grad.addColorStop(0.75, '#fbf5b7');
    grad.addColorStop(1, '#aa771c');
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#4a2c2a';
    ctx.font = 'bold 11px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '3px';
    ctx.fillText('✨ SCRATCH HERE ✨', canvas.width / 2, canvas.height / 2 + 4);
}

function checkScratchPercentage() {
    if (isScratchedOpen) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let clearedPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
            clearedPixels++;
        }
    }

    const percentageCleared = (clearedPixels / (canvas.width * canvas.height)) * 100;

    if (percentageCleared >= 40) {
        isScratchedOpen = true;
        triggerCelebrationBlast();
    }
}

function triggerCelebrationBlast() {
    canvas.style.opacity = '0';
    setTimeout(() => canvas.remove(), 500);

    confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } });
    confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } });

    const flowerColors = ['#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#ff9aa2'];
    
    let duration = 1.5 * 1000;
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            startVelocity: 25,
            spread: 360,
            origin: { x: 0.5, y: 0.4 },
            colors: flowerColors,
            ticks: 60
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        } else {
            document.getElementById('countdown-area').classList.add('countdown-revealed');
        }
    }());
}

function scratch(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
    
    checkScratchPercentage();
}

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); });
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); });

initCanvas();

// Live Countdown Engine targeting November 20, 2026
const weddingDate = new Date("2026-11-20T19:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff < 0) {
        document.querySelector(".countdown-container").innerHTML = "<h3 style='color:#721c24;font-family:serif;width:100%;text-align:center;'>THE BIG DAY IS HERE! 🎉</h3>";
        clearInterval(timerInterval);
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(d).padStart(3, '0');
    document.getElementById("hours").innerText = String(h).padStart(2, '0');
    document.getElementById("minutes").innerText = String(m).padStart(2, '0');
    document.getElementById("seconds").innerText = String(s).padStart(2, '0');
}
const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// On-Scroll Dynamic Item Reveal System
const scrollContainer = document.querySelector('.invite-card');
const fadeElements = document.querySelectorAll('.fade-in');

function checkScroll() {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) {
            el.classList.add('visible');
        }
    });
}
scrollContainer.addEventListener('scroll', checkScroll);