////// DOM elements
const boxes = document.getElementsByClassName('col'); // Select all game boxes (cells)
const info = document.getElementById('info'); // Info display element for player turns and results
const winningAnime = document.querySelector('.infoContainer img'); // Winning animation element

////// Musics
const turnMusic = new Audio('./assets/ting.mp3'); // Sound effect for turn change
const GameOverMusic = new Audio('./assets/gameover.mp3'); // Sound effect for game over

////// Local variables
let currentPlayer = 'X'; // Tracks the current player ('X' or 'O')
let arr = new Array(9).fill(null); // Represents the tic-tac-toe board
let isGameOver = false; // Flag to check if the game is over

// Function to check if the game is over
function checkGameOver() {
  // Check all possible winning conditions (rows, columns, diagonals)
  if (
    (arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== null) ||
    (arr[3] === arr[4] && arr[4] === arr[5] && arr[3] !== null) ||
    (arr[6] === arr[7] && arr[7] === arr[8] && arr[6] !== null) ||
    (arr[0] === arr[3] && arr[3] === arr[6] && arr[0] !== null) ||
    (arr[1] === arr[4] && arr[4] === arr[7] && arr[1] !== null) ||
    (arr[2] === arr[5] && arr[5] === arr[8] && arr[2] !== null) ||
    (arr[0] === arr[4] && arr[4] === arr[8] && arr[0] !== null) ||
    (arr[2] === arr[4] && arr[4] === arr[6] && arr[2] !== null)
  ) {
    info.textContent = `${currentPlayer} Wins!`; // Display winner
    GameOverMusic.play(); // Play game over music
    winningAnime.style.width = `100px`; // Show winning animation
    isGameOver = true;
    return true;
  }

  // Check for a draw (no empty spaces left)
  if (!arr.some(e => e === null)) {
    info.textContent = `Draw!`;
    GameOverMusic.play(); // Play game over music
    isGameOver = true;
    return true;
  }

  return false; // Continue game if no win or draw
}

// Function to handle box click event
function handleClick(elem) {
  if (isGameOver) return; // Do nothing if game is over
  turnMusic.play(); // Play turn sound
  const id = parseInt(elem.id); // Get the clicked box ID
  if (arr[id] !== null) return; // Ignore click if box is already filled

  arr[id] = currentPlayer; // Update game board
  elem.textContent = currentPlayer; // Display current player's symbol

  if (!checkGameOver()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    info.textContent = `Player ${currentPlayer} turn`; // Update turn info
  }
}

// Add click listeners to all game boxes
Array.from(boxes).forEach((box, index) => {
  box.id = index; // Assign an ID to each box for easy reference
  box.addEventListener('click', function () {
    handleClick(this);
  });
});

// Function to reset the game
function resetGame() {
  isGameOver = false;
  Array.from(boxes).forEach(box => (box.innerText = '')); // Clear all boxes
  arr = new Array(9).fill(null); // Reset game board
  currentPlayer = 'X'; // Reset starting player
  info.textContent = `Player ${currentPlayer} turn`; // Reset info text
  winningAnime.style.width = `0px`; // Hide winning animation
}
