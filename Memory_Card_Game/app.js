// Shuffle the array using Fisher-Yates algorithm
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex,
    tempValue;
  while (currentIndex-- > 0) {
    randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    tempValue = array[randomIndex];
    array[randomIndex] = array[currentIndex];
    array[currentIndex] = tempValue;
  }
  return array;
}

// Image dataset for the memory game
const imageCards = [
  {
    name: 'Angular',
    url: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/AngularImage.png',
  },
  {
    name: 'HTML',
    url: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102835/html5Image.png',
  },
  {
    name: 'JavaScript',
    url: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102834/JSImage.jpg',
  },
  {
    name: 'React',
    url: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/reactImage.png',
  },
  {
    name: 'Vue',
    url: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/vueImage.png',
  },
  {
    name: 'CSS',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyfXdKH7SrCVpLx-h0j9VSLf7LQxwWgptJNw&s',
  },
  { name: 'Python', url: 'https://freesvg.org/img/387.png' },
  {
    name: 'Java',
    url: 'https://logo-download.com/wp-content/data/images/png/Java-logo.png',
  },
];

const duplicateCards = imageCards.concat(imageCards);
let shuffledCards = shuffleArray(duplicateCards);

// DOM Elements
const gameBoard = document.getElementById('gameContainer');
const moveCounter = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const restartButton = document.getElementById('restart-game');

// Game State Variables
let firstSelectedCard = null;
let secondSelectedCard = null;
let matchedCards = [];
let totalMoves = 0;
let timerInterval;
let isTimerRunning = false;

// Create and return a card element
function createCard({ url, name }) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-name', name);

  const frontFace = document.createElement('div');
  frontFace.classList.add('card-front');
  frontFace.textContent = '?';

  const backFace = document.createElement('div');
  backFace.classList.add('card-back');
  backFace.innerHTML = `<img src="${url}" alt="${name}">`;

  card.appendChild(frontFace);
  card.appendChild(backFace);

  card.addEventListener('click', () => handleCardClick(card));

  return card;
}

// Populate the game board with shuffled cards
function renderGameBoard() {
  gameBoard.innerHTML = '';
  shuffledCards.forEach(card => {
    gameBoard.appendChild(createCard(card));
  });
}

// Start the game timer
function startGameTimer() {
  if (isTimerRunning) return;
  let elapsedTime = 0;
  isTimerRunning = true;
  timerInterval = setInterval(() => {
    elapsedTime++;
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timeDisplay.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

// Stop the game timer
function stopGameTimer() {
  clearInterval(timerInterval);
}

// Handle card click event
function handleCardClick(card) {
  startGameTimer();
  if (matchedCards.includes(card) || card === firstSelectedCard) return;

  card.classList.add('flipped');

  if (!firstSelectedCard) {
    firstSelectedCard = card;
  } else {
    secondSelectedCard = card;
    totalMoves++;
    moveCounter.textContent = `${totalMoves}`;
    checkForMatch();
  }
}

// Check if the two selected cards match
function checkForMatch() {
  if (
    firstSelectedCard.getAttribute('data-name') ===
    secondSelectedCard.getAttribute('data-name')
  ) {
    matchedCards.push(firstSelectedCard, secondSelectedCard);
    resetCardSelection();
    if (matchedCards.length === duplicateCards.length) {
      stopGameTimer();
      setTimeout(() => {
        alert(
          `Well done! You completed the game in ${totalMoves} moves and a time of ${timeDisplay.textContent}.`
        );
        resetGame();
      }, 0);
    }
  } else {
    setTimeout(() => {
      firstSelectedCard.classList.remove('flipped');
      secondSelectedCard.classList.remove('flipped');
      resetCardSelection();
    }, 500);
  }
}

// Reset selected card variables
function resetCardSelection() {
  firstSelectedCard = null;
  secondSelectedCard = null;
}

// Reset and restart the game
function resetGame() {
  matchedCards = [];
  totalMoves = 0;
  firstSelectedCard = null;
  secondSelectedCard = null;
  stopGameTimer();
  isTimerRunning = false;
  timeDisplay.textContent = `0:00`;
  moveCounter.textContent = `${totalMoves}`;
  shuffledCards = shuffleArray(duplicateCards);
  renderGameBoard();
}

// Initialize the game
renderGameBoard();
restartButton.addEventListener('click', resetGame);
