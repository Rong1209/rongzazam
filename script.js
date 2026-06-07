const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    setTimeout(() => {
        loader?.classList.add("hide");
    }, 500);
});

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (music) {
    music.volume = 0.35;

    music.play().catch(() => {
        document.addEventListener("click", () => {
            music.play();
            updateMusicIcon();
        }, { once: true });
    });
}

function toggleMusic() {
    if (!music) return;

    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }

    updateMusicIcon();
}

function updateMusicIcon() {
    if (!musicBtn || !music) return;

    musicBtn.innerHTML = music.paused
        ? `<i class="fa-solid fa-volume-xmark"></i>`
        : `<i class="fa-solid fa-volume-high"></i>`;
}

const typingText = document.getElementById("typingText");

const words = [
    "Minecraft Developer",
    "Website Developer",
    "Plugin Creator",
    "Freelancer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 80);
}

typeEffect();

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

document.addEventListener("keydown", function (e) {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.key.toLowerCase() === "u")
    ) {
        e.preventDefault();
    }
});
