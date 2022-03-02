//Const
const width = 20;
const height = 20;
const RIGHT = 1;
const LEFT = -1;
const UP = -width;
const DOWN = width;

//GUI
let scoreDisplay = document.getElementById("score");
let scorePanel = document.getElementById("score-panel");
let gameOverPanel = document.getElementById("over");
let gameBoard = document.getElementById("board");
let upBtn = document.getElementById("up");
let downBtn = document.getElementById("down");
let leftBtn = document.getElementById("left");
let rightBtn = document.getElementById("right");
let newGameBtn = document.getElementById("newGame");

//Game variables
let board_size = width*height;

let foodId;
let snake;

let score;
let curr_dir;

let interval = 250;
let clock;

//Game functions
const displayScore = () => {
    scoreDisplay.innerHTML = score;
}

const createBoard = () => {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.lastChild);
    }

    for (let i = 0; i < board_size; i++) {
        let tile = document.createElement("div");
        tile.className = "tile";
        tile.id = i;
        //tile.innerHTML = i;

        gameBoard.appendChild(tile);
    }

    console.log("New game created.");
}

const generateFood = () => {
    document.getElementById(foodId).classList.remove("food");

    do {
        foodId = Math.floor(Math.random() * board_size);
    } while(snake.includes(foodId));
    
    document.getElementById(foodId).classList.add("food");

    console.log("Food at " + foodId);
}

const eat = () => {
    score++;
    displayScore();
    console.log("Food eaten.");
    generateFood();
}

const displaySnake = () => {
    Array.from(document.querySelectorAll('div.snake')).forEach((el) => el.classList.remove('snake'));

    snake.forEach(loc => {
        document.getElementById(loc).classList.add("snake");
    });

    console.log("Snake: " + snake);
}

const run = () => {
    updateSnake();
    displaySnake();
}

const gameOver = () => {
    clearInterval(clock);

    gameOverPanel.style.display = "block";
    newGameBtn.style.display = "block";
    document.getElementById("buttons").style.display = "none";
}

const reset = () => {
    foodId = 0;
    snake = [21, 22, 23];

    score = 0;
    curr_dir = RIGHT;
}

const newGame = () => {
    reset();
    scorePanel.style.display = "block";
    newGameBtn.style.display = "none";
    gameOverPanel.style.display = "none";
    document.getElementById("buttons").style.display = "block";
    
    displayScore();
    createBoard();
    displaySnake();
    generateFood();

    clock = setInterval(run, interval);
}

const updateSnake = () => {
    let head = snake[snake.length - 1];

    if((curr_dir == UP) && (Math.floor(head/height) == 0)) {
        head += (height - 1) * width;
    } else if((curr_dir == DOWN) && (Math.floor(head/height) == height - 1)) {
        head -= (height - 1) * width;
    } else if((curr_dir == LEFT) && ((head % width) == 0)) {
        head += width - 1;
    } else if((curr_dir == RIGHT) && ((head % width) == width - 1)) {
        head -= width - 1;
    } else {
        head += curr_dir;
    }

    if(snake.includes(head)) {
        gameOver();
    }

    snake.push(head);

    if(head != foodId) {
        snake.shift();
    } else {
        eat();
    }
}

//Movement
const up = () => {
    if(curr_dir != DOWN) {
        curr_dir = UP;

        console.log("Move up: " + snake);
    } else {
        console.log("Cannot go up!");
    }
}

const down = () => {
    if(curr_dir != UP) {
        curr_dir = DOWN;

        console.log("Move down: " + snake);
    } else {
        console.log("Cannot go up!");
    }
}

const left = () => {
    if(curr_dir != RIGHT) {
        curr_dir = LEFT;

        console.log("Move up: " + snake);
    } else {
        console.log("Cannot go left!");
    }
}

const right = () => {
    if(curr_dir != LEFT) {
        curr_dir = RIGHT;

        console.log("Move up: " + snake);
    } else {
        console.log("Cannot go right!");
    }
}

//Game
newGameBtn.onclick = () => {
    newGame();
}

upBtn.onclick = () => {
    up();
}

downBtn.onclick = () => {
    down();
}

leftBtn.onclick = () => {
    left();
}

rightBtn.onclick = () => {
    right();
}