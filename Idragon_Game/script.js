/////// Dom Elements
const dino = document.querySelector('.dino');
const gameOver = document.querySelector('.gameOver');
const obstacle = document.querySelector('.obstacle');
let scoreCount = document.getElementById('scoreCount');

/////// Global variables
let cross = true;
let score = 0;
let gameRunning = true;

/////// audio
const backgroundAudio = new Audio('./Assets/music.mp3');
const gameOverAudio = new Audio('./Assets/gameover.mp3');

/////// Functions
function updateScore(score) {
  scoreCount.innerHTML = `Your Score: ${score}`;
}

/////// Event Listeners
document.addEventListener('keydown', e => {
  if (!gameRunning) return; // Prevent movement after game over

  if (e.keyCode === 38) {
    // Jump action
    if (!dino.classList.contains('animateDino')) {
      dino.classList.add('animateDino');
      setTimeout(() => {
        dino.classList.remove('animateDino');
      }, 700);
    }
  } else if (e.keyCode === 39) {
    // Move right
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue('left')
    );
    if (dinoX < window.innerWidth - 100) {
      dino.style.left = `${dinoX + 50}px`;
    }
  } else if (e.keyCode === 37) {
    // Move left
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue('left')
    );
    if (dinoX > 0) {
      dino.style.left = `${dinoX - 50}px`;
    }
  }
});

gameLoop = setInterval(() => {
  if (!gameRunning) return; // Stop game logic if game over

  // Position of dino
  let dx = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue('left')
  );
  let dy = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue('top')
  );

  // Position of obstacle
  let ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue('left')
  );
  let oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue('top')
  );

  // Calculate distance between dino and obstacle
  let offsetX = Math.abs(dx - ox);
  let offsetY = Math.abs(dy - oy);

  if (offsetX < 60 && offsetY < 40) {
    // Game Over condition
    gameOver.style.display = 'block';
    obstacle.classList.remove('animateObstacle');
    gameRunning = false; // Stop the game
    clearInterval(gameLoop); // Stop the game loop
    gameOverAudio.play();
    setTimeout(() => {
      gameOverAudio.pause();
      backgroundAudio.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    // Score increment
    score += 100;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);

    // Increase obstacle speed
    setTimeout(() => {
      let aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue('animation-duration')
      );
      let newDur = aniDur * 0.9; // Increase speed by 10%
      if (newDur < 3) {
        obstacle.style.animationDuration = `${newDur}s`;
      }
    }, 500);
  }
}, 10);

setTimeout(() => {
  backgroundAudio.muted = false;
  backgroundAudio.play();
}, 100);
