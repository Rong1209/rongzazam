/* LOADER SAFE FIX */
const loader = document.getElementById("loader");

function hideLoader() {
    if (!loader) return;

    loader.classList.add("hide");

    setTimeout(() => {
        loader.style.display = "none";
    }, 400);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(hideLoader, 300);
});

window.addEventListener("load", hideLoader);
setTimeout(hideLoader, 1200);


/* BACKGROUND MUSIC */
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (bgMusic) {
    bgMusic.volume = 0.35;

    bgMusic.play().catch(() => {
        updateMusicIcon();
    });
}

function toggleMusic() {
    if (!bgMusic) return;

    if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
    } else {
        bgMusic.pause();
    }

    updateMusicIcon();
}

function updateMusicIcon() {
    if (!musicBtn || !bgMusic) return;

    musicBtn.innerHTML = bgMusic.paused
        ? '<i class="fa-solid fa-volume-xmark"></i>'
        : '<i class="fa-solid fa-volume-high"></i>';
}


/* TYPING TEXT */
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


/* PLAYLIST PLAYER */
const audioPlayer = document.getElementById("audioPlayer");
const songItems = document.querySelectorAll(".song-item");

let currentSong = null;

songItems.forEach((item) => {
    const playBtn = item.querySelector(".song-play");
    const icon = playBtn ? playBtn.querySelector("i") : null;
    const songSrc = item.getAttribute("data-src");

    if (!playBtn || !icon || !audioPlayer || !songSrc) return;

    playBtn.addEventListener("click", () => {
        if (currentSong === item && !audioPlayer.paused) {
            audioPlayer.pause();
            icon.className = "fa-solid fa-play";
            item.classList.remove("playing");
            return;
        }

        songItems.forEach((song) => {
            song.classList.remove("playing");

            const songIcon = song.querySelector(".song-play i");
            if (songIcon) {
                songIcon.className = "fa-solid fa-play";
            }
        });

        if (currentSong !== item) {
            audioPlayer.src = songSrc;
            currentSong = item;
        }

        audioPlayer.play().then(() => {
            item.classList.add("playing");
            icon.className = "fa-solid fa-pause";
        }).catch(() => {
            icon.className = "fa-solid fa-play";
            item.classList.remove("playing");
        });
    });
});

if (audioPlayer) {
    audioPlayer.addEventListener("ended", () => {
        if (!currentSong) return;

        currentSong.classList.remove("playing");

        const icon = currentSong.querySelector(".song-play i");
        if (icon) icon.className = "fa-solid fa-play";

        currentSong = null;
    });
}


/* BLOCK INSPECT */
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
