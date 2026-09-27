// ===============================
// PLAYER DATA
// ===============================
let player1 = {
    name: "",
    symbol: "",
    score: 0
};

let player2 = {
    name: "",
    symbol: "",
    score: 0
};

let currentPlayer = null;

let board = ["", "", "", "", "", "", "", ""];

let gameOver = false;


// ===============================
// GET HTML ELEMENTS
// ===============================

const p1Name = document.getElementById("player1Name");
const p1Symbol = document.getElementById("player1Symbol");
const p1Status = document.getElementById("player1Status");
const activate1 = document.getElementById("activate1");

const p2Name = document.getElementById("player2Name");
const p2Symbol = document.getElementById("player2Symbol");
const p2Status = document.getElementById("player2Status");
const activate2 = document.getElementById("activate2");

const startButton = document.getElementById("startGame");


// ===============================
// PLAYER 1 ACTIVATION
// ===============================

activate1.addEventListener("click", function () {

    const name = p1Name.value.trim();
    const symbol = p1Symbol.value.trim().toUpperCase();

    // Check name
    if (name === "") {
        alert("Please enter Player 1 name.");
        p1Name.focus();
        return;
    }

    // Only X or 0 allowed
    if (symbol !== "X" && symbol !== "0") {
        alert("Please enter only X or 0.");
        p1Symbol.focus();
        return;
    }

    // Save Player 1
    player1.name = name;
    player1.symbol = symbol;

    // Give opposite symbol to Player 2
    if (symbol === "X") {
        player2.symbol = "0";
    } else {
        player2.symbol = "X";
    }

    // Show status
    p1Status.textContent =
        'Player 1 activated with symbol "' +
        player1.symbol +
        '".';

    // Disable Player 1
    p1Name.disabled = true;
    p1Symbol.disabled = true;
    activate1.disabled = true;

    // Enable Player 2
    p2Name.disabled = false;
    p2Symbol.disabled = false;
    activate2.disabled = false;

    // Automatically show Player 2 symbol
    p2Symbol.value = player2.symbol;
});


// ===============================
// PLAYER 2 ACTIVATION
// ===============================

activate2.addEventListener("click", function () {

    const name = p2Name.value.trim();

    // Check name
    if (name === "") {
        alert("Please enter Player 2 name.");
        p2Name.focus();
        return;
    }

    // Save Player 2
    player2.name = name;

    // Show status
    p2Status.textContent =
        'Player 2 activated with symbol "' +
        player2.symbol +
        '".';

    // Disable Player 2
    p2Name.disabled = true;
    p2Symbol.disabled = true;
    activate2.disabled = true;

    // Enable Start Game
    startButton.disabled = false;
});


// ===============================
// START GAME
// ===============================

startButton.addEventListener("click", function () {

    currentPlayer = player1;

    board = ["", "", "", "", "", "", "", ""];

    gameOver = false;

    player1.score = 0;
    player2.score = 0;

    // Hide setup
    document.getElementById("setupSection").style.display = "none";

    // Show game
    document.getElementById("gameSection").style.display = "block";

    updateScore();

    clearBoard();

    updateTurn();
});


// ===============================
// UPDATE CURRENT TURN
// ===============================

function updateTurn() {

    document.getElementById("currentName").textContent =
        currentPlayer.name;

    document.getElementById("currentSymbol").textContent =
        currentPlayer.symbol;

    document.getElementById("reminder").textContent =
        'Reminder: You selected "' +
        currentPlayer.symbol +
        '". Enter only "' +
        currentPlayer.symbol +
        '" for your moves.';
}


// ===============================
// UPDATE SCORE
// ===============================

function updateScore() {

    document.getElementById("scoreName1").textContent =
        player1.name;

    document.getElementById("scoreSymbol1").textContent =
        player1.symbol;

    document.getElementById("score1").textContent =
        player1.score;


    document.getElementById("scoreName2").textContent =
        player2.name;

    document.getElementById("scoreSymbol2").textContent =
        player2.symbol;

    document.getElementById("score2").textContent =
        player2.score;
}


// ===============================
// BOARD CLICK
// ===============================

document.querySelectorAll(".cell").forEach(function (cell) {

    cell.addEventListener("click", function () {

        // Stop if round is finished
        if (gameOver) {
            return;
        }

        const index = Number(this.dataset.index);

        // Stop if cell already contains symbol
        if (board[index] !== "") {
            return;
        }

        // Put current player's symbol
        board[index] = currentPlayer.symbol;

        this.textContent = currentPlayer.symbol;

        // Check result
        checkWinner();
    });
});


// ===============================
// CHECK WINNER
// ===============================

function checkWinner() {

    const patterns = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];


    for (const pattern of patterns) {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            showWinner(pattern);

            return;
        }
    }


    // Check draw
    if (!board.includes("")) {

        showDraw();

        return;
    }


    // Change player
    switchPlayer();
}


// ===============================
// SWITCH PLAYER
// ===============================

function switchPlayer() {

    if (currentPlayer === player1) {

        currentPlayer = player2;

    } else {

        currentPlayer = player1;
    }

    updateTurn();
}


// ===============================
// WINNER
// ===============================

function showWinner(pattern) {

    gameOver = true;

    const cells = document.querySelectorAll(".cell");


    // Highlight winning cells
    pattern.forEach(function (index) {

        cells[index].classList.add("winner");

    });


    // Increase score
    currentPlayer.score++;

    updateScore();


    document.getElementById("currentName").textContent =
        currentPlayer.name + " Wins!";

    document.getElementById("reminder").textContent =
        "Congratulations!";

    document.getElementById("result").textContent =
        "🏆 " + currentPlayer.name + " Wins!";
}


// ===============================
// DRAW
// ===============================

function showDraw() {

    gameOver = true;

    document.getElementById("currentName").textContent =
        "Game Draw!";

    document.getElementById("reminder").textContent =
        "Nobody won this round.";

    document.getElementById("result").textContent =
        "🤝 Draw!";
}


// ===============================
// CLEAR BOARD
// ===============================

function clearBoard() {

    board = ["", "", "", "", "", "", "", ""];


    document.querySelectorAll(".cell").forEach(function (cell) {

        cell.textContent = "";

        cell.classList.remove("winner");

    });


    document.getElementById("result").textContent = "";
}


// ===============================
// NEW ROUND
// ===============================

document.getElementById("newRound")
.addEventListener("click", function () {

    clearBoard();

    gameOver = false;

    currentPlayer = player1;

    updateTurn();
});


// ===============================
// RESET GAME
// ===============================

document.getElementById("resetGame")
.addEventListener("click", function () {

    location.reload();

});
