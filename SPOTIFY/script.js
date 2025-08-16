console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio(); // leave empty, set src on first play
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji - Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Dafli Wale - Old Bollywood", filePath: "songs/10.mp3", coverPath: "covers/11.jpeg"},
    {songName: "Lag Ja Gale Se Phir - Woh Kaun Thi", filePath: "songs/11.mp3", coverPath: "covers/11.jpeg"}
];

// Set song covers and names
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play/pause toggle
masterPlay.addEventListener('click', () => {
    if (!audioElement.src) audioElement.src = songs[songIndex].filePath;

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play().catch(err => console.log("Play blocked:", err));
        masterPlay.className = 'far fa-3x fa-pause-circle';
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.className = 'far fa-3x fa-play-circle';
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100) || 0;
    myProgressBar.value = progress;
});

// Seek in song
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Helper to reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.className = 'far songItemPlay fa-play-circle';
    });
};

// Play specific song
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let target = e.target.closest('.songItemPlay');
        if (!target) return;

        makeAllPlays();
        songIndex = parseInt(target.id);
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play().catch(err => console.log("Play blocked:", err));
        gif.style.opacity = 1;
        masterPlay.className = 'far fa-3x fa-pause-circle';
        target.className = 'far songItemPlay fa-pause-circle';
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(err => console.log("Play blocked:", err));
    masterPlay.className = 'far fa-3x fa-pause-circle';
    makeAllPlays();
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(err => console.log("Play blocked:", err));
    masterPlay.className = 'far fa-3x fa-pause-circle';
    makeAllPlays();
});
