const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const hitSound = document.getElementById('hitSound');

let score = 0;
let time = 30;
let activeMoles = [];
let moleInterval = null;
let countdownId = null;
let gameSpeed = 1000; // initial mole interval in ms

function randomHoles(count){
  const indexes = new Set();
  while(indexes.size < count){
    indexes.add(Math.floor(Math.random() * holes.length));
  }
  return Array.from(indexes);
}

function showMoles(){
  // clear previous
  holes.forEach(h => h.innerHTML = '');
  activeMoles = randomHoles(Math.floor(Math.random() * 3) + 1); // 1-3 moles
  activeMoles.forEach(i => {
    const mole = document.createElement('div');
    mole.classList.add('mole');
    holes[i].appendChild(mole);
    holes[i].classList.add('active');
  });
}

holes.forEach((hole, index) => {
  hole.addEventListener('click', () => {
    if(activeMoles.includes(index)){
      score++;
      scoreDisplay.textContent = score;
      hitSound.currentTime = 0;
      hitSound.play();
      hole.innerHTML = '';
      hole.classList.remove('active');
      activeMoles = activeMoles.filter(i => i !== index);
    }
  });
});

function startGame(){
  score = 0;
  time = 30;
  gameSpeed = 1000;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;

  showMoles();
  moleInterval = setInterval(() => {
    showMoles();
    if(gameSpeed > 400) gameSpeed -= 20; // speed up
    clearInterval(moleInterval);
    moleInterval = setInterval(showMoles, gameSpeed);
  }, gameSpeed);

  countdownId = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if(time <= 0){
      clearInterval(moleInterval);
      clearInterval(countdownId);
      holes.forEach(h => h.innerHTML = '');
      alert('Game Over! Your score: ' + score);
    }
  }, 1000);
}

startBtn.addEventListener('click', startGame);
