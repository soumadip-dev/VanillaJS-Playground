document.addEventListener("DOMContentLoaded", function () {
  const gameArena = document.getElementById("game-arena");
  const arenaSize = 600;
  const cellSize = 20;
  let score = 0; // score of the game
  let gameStarted = false; // Game Status
  let food = { x: 300, y: 300 }; // Starting point of food
  let snake = [
    { x: 160, y: 300 },
    { x: 140, y: 300 },
    { x: 120, y: 300 },
  ]; // Starting point of snake

  let dx = cellSize;
  let dy = 0;
  let intervalId;
  let gameSpeed = 200;

  function drawDiv(x, y, className) {
    const divElement = document.createElement("div");
    divElement.classList.add(className);
    divElement.style.top = `${y}px`;
    divElement.style.left = `${x}px`;
    return divElement;
  }

  function drawFoodAndSnake() {
    gameArena.innerHTML = ""; // Clear the game arena

    // Draw snake
    snake.forEach((snakeCell) => {
      const snakeElement = drawDiv(snakeCell.x, snakeCell.y, "snake");
      gameArena.appendChild(snakeElement);
    });

    // Draw food
    const foodElement = drawDiv(food.x, food.y, "food");
    gameArena.appendChild(foodElement);
  }

  function drawScoreBoard() {
    const scoreBoard = document.getElementById("score-board");
    scoreBoard.textContent = `Score: ${score}`;
  }

  function moveFood() {
    let newX, newY;
    do {
      newX = Math.floor(Math.random() * 30) * cellSize;
      newY = Math.floor(Math.random() * 30) * cellSize;
    } while (snake.some((snakeCell) => snakeCell.x === newX && snakeCell.y === newY));
    food.x = newX;
    food.y = newY;
  }

  function updateSnake() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead); // Add new head to the snake

    // Check collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
      score += 10;
      moveFood();

      // Increase speed when food is eaten
      if (gameSpeed > 50) {
        clearInterval(intervalId);
        gameSpeed -= 10;
        gameLoop();
      }
    } else {
      snake.pop(); // Remove tail
    }
  }

  function changeDirection(e) {
    const isGoingDown = dy === cellSize;
    const isGoingUp = dy === -cellSize;
    const isGoingRight = dx === cellSize;
    const isGoingLeft = dx === -cellSize;
    if (e.key === "ArrowUp" && !isGoingDown) {
      dx = 0;
      dy = -cellSize;
    } else if (e.key === "ArrowDown" && !isGoingUp) {
      dx = 0;
      dy = cellSize;
    } else if (e.key === "ArrowLeft" && !isGoingRight) {
      dx = -cellSize;
      dy = 0;
    } else if (e.key === "ArrowRight" && !isGoingLeft) {
      dx = cellSize;
      dy = 0;
    }
  }

  function isGameOver() {
    // Check if snake is eating itself
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        return true;
      }
    }
    // Check if snake collided with the wall of game arena
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > arenaSize - cellSize;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > arenaSize - cellSize;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  }

  function gameLoop() {
    intervalId = setInterval(() => {
      if (isGameOver()) {
        clearInterval(intervalId);
        gameStarted = false;
        alert("Game Over!" + "\n" + "Your Score: " + score);
        location.reload();
        return;
      }
      updateSnake();
      drawFoodAndSnake();
      drawScoreBoard();
    }, gameSpeed);
  }

  function runGame() {
    if (!gameStarted) {
      gameStarted = true;
      document.addEventListener("keydown", changeDirection);
      gameLoop();
    }
  }

  function initiateGame() {
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    document.body.insertBefore(scoreBoard, gameArena); // Insert the scoreboard before the game arena
    const startButton = document.createElement("button");
    startButton.classList.add("start-button");
    startButton.textContent = "Start Game";
    document.body.appendChild(startButton); // Append start button to the body
    startButton.addEventListener("click", function startGame() {
      startButton.style.display = "none";
      runGame();
    });
  }

  initiateGame();
});
