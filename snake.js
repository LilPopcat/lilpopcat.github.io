
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var intervalId;

//food
var foodX;
var foodY;

var gameOver = false;
var questionNumber = 1;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    runGame();
}

function runGame() {
  intervalId = setInterval(update, 1000/10); //100 milliseconds
}

function pauseGame() {
  clearInterval(intervalId);
}

function update () {
    if (gameOver) {
      return;
    }

    context.clearRect(snakeX, snakeY, blockSize, blockSize);
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillStyle="lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
      pauseGame();
      showQuestion(`q${questionNumber}`);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
  //0-1) "cols -> (0-19.9999) -> (0-19) * 25
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
  drawFood();
}

function drawFood() {
  context.fillStyle="white";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  var img = new Image();
  img.onload = function() {
    context.drawImage(img, foodX, foodY, blockSize, blockSize);
    console.log('OK');
  }
  img.src = "bison.png";
}

function hideQuestions() {
  document.querySelectorAll('.question').forEach ((e) => e.style.display = 'none');
}

function showQuestion(id) {
  hideQuestions();
  document.getElementById(id).style.display = 'block';
}

function answerCorrect(e) {
  questionNumber += 1;
  hideQuestions();
  alert("Good job! You got the answer correct! Click ok to continue.");
  placeFood();
  runGame();
}

function answerIncorrect(e) {
  gameOver = true;
  alert("Game Over. Nice Try. Refresh to try again.")
}

function winGame() {
  alert("Congratulations! You beat the game!");
}
