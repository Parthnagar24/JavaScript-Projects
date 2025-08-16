const songs = [
    {name: "Warriyo - Mortals [NCS Release]", file: "songs/1.mp3", cover: "covers/1.jpg"},
    {name: "Cielo - Huma-Huma", file: "songs/2.mp3", cover: "covers/2.jpg"},
    {name: "DEAF KEV - Invincible [NCS Release]", file: "songs/3.mp3", cover: "covers/3.jpg"},
    {name: "Different Heaven & EH!DE - My Heart", file: "songs/4.mp3", cover: "covers/4.jpg"},
    {name: "Janji - Heroes Tonight", file: "songs/5.mp3", cover: "covers/5.jpg"},
    {name: "Rabba - Salam-e-Ishq", file: "songs/6.mp3", cover: "covers/6.jpg"},
    {name: "Sakhiyaan - Salam-e-Ishq", file: "songs/7.mp3", cover: "covers/7.jpg"},
    {name: "Bhula Dena - Salam-e-Ishq", file: "songs/8.mp3", cover: "covers/8.jpg"},
    {name: "Tumhari Kasam - Salam-e-Ishq", file: "songs/9.mp3", cover: "covers/9.jpg"},
    {name: "Dafli Wale - Old Bollywood", file: "songs/10.mp3", cover: "covers/11.jpeg"},
    {name: "Lag Ja Gale Se Phir - Woh Kaun Thi", file: "songs/11.mp3", cover: "covers/11.jpeg"}
];

let songIndex = 0;
let audio = new Audio();
const songListContainer = document.getElementById("songList");
const masterPlay = document.getElementById("masterPlay");
const myProgressBar = document.getElementById("myProgressBar");
const gif = document.getElementById("gif");
const masterSongName = document.getElementById("masterSongName");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

// Helper: format seconds to mm:ss
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0'+sec : sec}`;
}

// Render songs dynamically
songs.forEach((song, i) => {
    const songItem = document.createElement("div");
    songItem.className = "songItem";
    songItem.innerHTML = `
        <img src="${song.cover}" alt="${i+1}">
        <span class="songName">${song.name}</span>
        <div class="songControls">
            <span class="timeDisplay">0:00</span>
            <button class="playBtn" data-index="${i}"><i class="fas fa-play-circle"></i></button>
            <a href="${song.file}" download class="downloadBtn"><i class="fas fa-download"></i></a>
        </div>
    `;
    songListContainer.appendChild(songItem);
});

// Helper to pause all song buttons
function resetAllPlays() {
    document.querySelectorAll(".playBtn i").forEach(icon => {
        icon.className = "fas fa-play-circle";
    });
}

// Play selected song
document.querySelectorAll(".playBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        if(songIndex === index && !audio.paused) {
            audio.pause();
            e.currentTarget.querySelector("i").className = "fas fa-play-circle";
            masterPlay.querySelector("i").className = "fas fa-play-circle fa-3x";
            gif.style.opacity = 0;
        } else {
            resetAllPlays();
            songIndex = index;
            playSong(songIndex);
        }
    });
});

// Master play/pause
masterPlay.addEventListener("click", () => {
    if(audio.src) {
        if(audio.paused) {
            audio.play();
            document.querySelector(`.playBtn[data-index="${songIndex}"] i`).className = "fas fa-pause-circle";
            masterPlay.querySelector("i").className = "fas fa-pause-circle fa-3x";
            gif.style.opacity = 1;
        } else {
            audio.pause();
            document.querySelector(`.playBtn[data-index="${songIndex}"] i`).className = "fas fa-play-circle";
            masterPlay.querySelector("i").className = "fas fa-play-circle fa-3x";
            gif.style.opacity = 0;
        }
    }
});

// Progress bar
audio.addEventListener("timeupdate", () => {
    if(audio.duration) {
        myProgressBar.value = (audio.currentTime / audio.duration) * 100;
        // Update time display for current song
        const timeDisplay = document.querySelector(`.playBtn[data-index="${songIndex}"]`).previousElementSibling;
        timeDisplay.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
    }
});
myProgressBar.addEventListener("input", () => {
    audio.currentTime = (myProgressBar.value / 100) * audio.duration;
});

// Next / Previous
next.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});
previous.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Play song helper
function playSong(index) {
    resetAllPlays();
    audio.src = songs[index].file;
    audio.play();
    document.querySelector(`.playBtn[data-index="${index}"] i`).className = "fas fa-pause-circle";
    masterSongName.textContent = songs[index].name;
    masterPlay.querySelector("i").className = "fas fa-pause-circle fa-3x";
    gif.style.opacity = 1;
}
