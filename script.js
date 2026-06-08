

const audioPlayer = document.getElementById("audioPlayer");
const songItems = document.querySelectorAll(".song-item");

let currentSong = null;

songItems.forEach(item => {

    const playBtn = item.querySelector(".song-play");
    const icon = playBtn.querySelector("i");
    const songSrc = item.dataset.src;

    playBtn.addEventListener("click", () => {

        // Pause current song
        if (
            currentSong === item &&
            audioPlayer &&
            !audioPlayer.paused
        ) {
            audioPlayer.pause();

            icon.className = "fa-solid fa-play";
            item.classList.remove("playing");

            return;
        }

        // Reset all buttons
        songItems.forEach(song => {
            song.classList.remove("playing");

            const songIcon =
                song.querySelector(".song-play i");

            if (songIcon) {
                songIcon.className =
                    "fa-solid fa-play";
            }
        });

        // Load new song
        if (currentSong !== item) {
            audioPlayer.src = songSrc;
            currentSong = item;
        }

        audioPlayer.play();

        item.classList.add("playing");
        icon.className = "fa-solid fa-pause";
    });
});

// Song ended
if (audioPlayer) {

    audioPlayer.addEventListener("ended", () => {

        if (!currentSong) return;

        currentSong.classList.remove("playing");

        currentSong
            .querySelector(".song-play i")
            .className = "fa-solid fa-play";

        currentSong = null;
    });
}
