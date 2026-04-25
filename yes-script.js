let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()

    const music = document.getElementById('bg-music')

    const playPromise = music.play()

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            document.body.addEventListener('click', () => {
                music.play()
            }, { once: true })
        })
    }
})

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
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
