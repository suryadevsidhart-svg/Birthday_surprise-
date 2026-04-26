let musicPlaying = false; 
                        
window.addEventListener('load', () => {
    const music = document.getElementById('bg-music');

    // play music safely
    const playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            document.body.addEventListener('click', () => {
                music.play();
            }, { once: true });
        });
    }

    // staged reveal
    setTimeout(() => {
        document.querySelector('.yes-title').classList.add('show');
    }, 200);

    setTimeout(() => {
        document.querySelector('#cat-gif').classList.add('show');
    }, 900);

    setTimeout(() => {
        document.querySelector('.yes-message').classList.add('show');
    }, 1500);

    setTimeout(() => {
        launchConfetti();
    }, 1800);
});

function launchConfetti() {
    const isLowPower = window.innerWidth < 768;

    // 🎬 1. MAIN CINEMATIC BURST (center explosion)
    setTimeout(() => {
        confetti({
            particleCount: isLowPower ? 80 : 140,
            spread: 100,
            startVelocity: 45,
            origin: { x: 0.5, y: 0.5 },
            gravity: 0.9,
            scalar: 1.2
        });
    }, 0);


    // 🎬 2. SIDE CANNONS (left + right)
    setTimeout(() => {
        const interval = setInterval(() => {
            confetti({
                particleCount: isLowPower ? 15 : 25,
                angle: 60,
                spread: 60,
                origin: { x: 0, y: 0.7 }
            });

            confetti({
                particleCount: isLowPower ? 15 : 25,
                angle: 120,
                spread: 60,
                origin: { x: 1, y: 0.7 }
            });
        }, 400);

        // stop cannons
        setTimeout(() => clearInterval(interval), 2000);

    }, 300);


    // 🎬 3. TOP FALL (emotional rain)
    setTimeout(() => {
        const rain = setInterval(() => {
            confetti({
                particleCount: isLowPower ? 10 : 18,
                spread: 70,
                startVelocity: 10,
                origin: { x: Math.random(), y: 0 },
                gravity: 0.4,
                scalar: 0.9
            });
        }, 300);

        setTimeout(() => clearInterval(rain), 2500);

    }, 1200);
}
    function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}
const card = document.querySelector('.container');

const isDesktop = window.innerWidth >= 768;

if (isDesktop && card) {

    // Tilt effect
    document.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 20;
        const rotateY = (x - centerX) / 20;

        card.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Cursor light
    document.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty('--x', x + '%');
        card.style.setProperty('--y', y + '%');
    });

}
