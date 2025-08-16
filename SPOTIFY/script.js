console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemContainer = document.querySelector('.songItemContainer');

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

// Generate song items dynamically
songs.forEach((song, i) => {
    let div = document.createElement('div');
    div.classList.add('songItem');
    div.innerHTML = `
        <img src="${song.coverPath}" alt="${i+1}">
        <span class="songName">${song.songName}</span>
        <span class="songlistplay">
            <span class="timestamp">03:50 <i id="${i}" class="fas songItemPlay fa-play-circle"></i></span>
            <a href="${song.filePath}" download class="downloadBtn"><i class="fas fa-download"></i></a>
        </span>
    `;
    songItemContainer.appendChild(div);
});

let songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));

// Helper: Reset all play buttons
const makeAllPlays = () => {
    songItemPlays.forEach(el => el.className = 'fas songItemPlay fa-play-circle');
}

// Master play/pause
masterPlay.addEventListener('click', () => {
    if (!audioElement.src) audioElement.src = songs[songIndex].filePath;

    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play().catch(err => console.log("Play blocked:", err));
        masterPlay.className = 'fas fa-3x fa-pause-circle';
        gif.style.opacity = 1;
        songItemPlays[songIndex].className = 'fas songItemPlay fa-pause-circle';
    } else {
        audioElement.pause();
        masterPlay.className = 'fas fa-3x fa-play-circle';
        gif.style.opacity = 0;
        songItemPlays[songIndex].className = 'fas songItemPlay fa-play-circle';
    }
});

// Progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100) || 0;
    myProgressBar.value = progress;
});
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Play individual song
songItemPlays.forEach(element => {
    element.addEventListener('click', (e) => {
        let target = e.target.closest('.songItemPlay');
        if(!target) return;

        makeAllPlays();
        songIndex = parseInt(target.id);
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play().catch(err => console.log("Play blocked:", err));
        gif.style.opacity = 1;
        masterPlay.className = 'fas fa-3x fa-pause-circle';
        target.className = 'fas songItemPlay fa-pause-circle';
    });
});

// Next / Previous
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(err => console.log("Play blocked:", err));
    masterPlay.className = 'fas fa-3x fa-pause-circle';
    makeAllPlays();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(err => console.log("Play blocked:", err));
    masterPlay.className = 'fas fa-3x fa-pause-circle';
    makeAllPlays();
});
