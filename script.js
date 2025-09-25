document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================
    // FUNGSI INTI (THEME TOGGLE, HEADER)
    // =================================================================

    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDarkMode = body.classList.contains('dark-theme');
        // Ganti ikon berdasarkan tema
        if (isDarkMode) {
            themeToggle.classList.replace('bx-sun', 'bx-moon');
        } else {
            themeToggle.classList.replace('bx-moon', 'bx-sun');
        }
        localStorage.setItem('theme', isDarkMode ? 'dark-theme' : 'light-theme');
    });

    // Memuat tema tersimpan
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme === 'dark-theme') {
        body.classList.add('dark-theme');
        themeToggle.classList.replace('bx-sun', 'bx-moon');
    } else {
        // Pastikan ikonnya benar saat pertama kali load di light mode
        themeToggle.classList.replace('bx-moon', 'bx-sun');
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top -50px',
            onEnter: () => header.classList.add('scrolled'),
            onLeaveBack: () => header.classList.remove('scrolled'),
        });
    }

  // =================================================================
// KURSOR ELEGAN (PERBAIKAN TOTAL)
// =================================================================
    
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Variabel untuk posisi mouse dan posisi kursor yang dianimasikan
const mouse = { x: -100, y: -100 }; // Posisi mouse sesungguhnya
const pos = { x: 0, y: 0 };       // Posisi kursor yang 'mengejar' mouse
const speed = 0.1;                // Kecepatan 'mengejar'

// Update posisi mouse sesungguhnya
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // Tampilkan kursor saat mouse pertama kali bergerak di dalam window
    if (cursorDot.style.opacity == 0) {
        gsap.to([cursorDot, cursorOutline], { duration: 0.3, opacity: 1 });
    }
});

// Loop animasi untuk membuat efek 'smoothing'
const updateCursor = () => {
    const dx = mouse.x - pos.x;
    const dy = mouse.y - pos.y;

    pos.x += dx * speed;
    pos.y += dy * speed;
    
    // PERBAIKAN: Ganti 'x' dan 'y' menjadi 'left' dan 'top'
    // Ini membuat JS mengatur posisi, dan CSS menangani centering.
    gsap.set(cursorDot, { left: mouse.x, top: mouse.y });
    gsap.set(cursorOutline, { left: pos.x, top: pos.y });

    requestAnimationFrame(updateCursor);
};
    
updateCursor(); // Mulai loop animasi

// Sembunyikan kursor saat mouse meninggalkan window
document.addEventListener('mouseleave', () => {
    gsap.to([cursorDot, cursorOutline], { duration: 0.3, opacity: 0 });
});

// Efek hover
const hoverables = document.querySelectorAll('a, button, .codex-card-container, #theme-toggle');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
});

    // =================================================================
    // INTERAKTIVITAS KARTU & LAINNYA
    // =================================================================

    // Logika Flip Card
    const cardContainers = document.querySelectorAll('.codex-card-container');
    cardContainers.forEach(container => {
        container.addEventListener('click', () => {
            container.classList.toggle('flipped');
        });
    });

    // Animasi Latar Belakang Candlestick
    const bgContainer = document.querySelector('.candlestick-background');
    if (bgContainer) {
        const candleCount = 30;
        for (let i = 0; i < candleCount; i++) {
            const candle = document.createElement('div');
            // ... (kode candlestick tetap sama) ...
            candle.style.position = 'absolute';
            candle.style.width = '8px';
            const isGreen = Math.random() > 0.5;
            const color = isGreen ? '#26a69a' : '#ef5350';
            candle.style.backgroundColor = color;
            const height = Math.random() * 80 + 20;
            candle.style.height = `${height}px`;
            candle.style.left = `${Math.random() * 100}%`;
            candle.style.top = `${Math.random() * 100}%`;
            bgContainer.appendChild(candle);
            gsap.to(candle, {
                y: (isGreen ? -1 : 1) * (Math.random() * 100 + 50),
                opacity: 0,
                duration: Math.random() * 10 + 5,
                delay: Math.random() * 5,
                repeat: -1,
                ease: 'linear'
            });
        }
    }
    
    // Animasi Scroll untuk Kartu
    gsap.from(".codex-card-container", {
        scrollTrigger: {
            trigger: ".codex-gallery",
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });
});