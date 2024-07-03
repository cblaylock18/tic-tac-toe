// Gameboard

const gameBoard = (function () {
    let gameTiles = [null, null, null, null, null, null, null, null, null];

    const resetGameBoard = () =>
        (gameTiles = [null, null, null, null, null, null, null, null, null]);

    const updateGameBoard = (z, tilePiece) => {
        gameTiles[z] = tilePiece;
    };

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const winnerCheck = (currentPlayer) => {
        let i = 0;
        let winner = null;
        while (i < 8 && winner === null) {
            if (
                gameTiles[winningCombos[i][0]] ===
                    gameTiles[winningCombos[i][1]] &&
                gameTiles[winningCombos[i][0]] ===
                    gameTiles[winningCombos[i][2]] &&
                gameTiles[winningCombos[i][0]] !== null
            ) {
                winner = currentPlayer;
            }
            i++;
        }
        if (gameTiles.includes(null) !== true && winner === null) {
            game.tie();
        } else if (typeof winner === "number") {
            game.winner(currentPlayer);
        } else {
            displayController.updateTurn();
        }
    };

    return { updateGameBoard, winnerCheck, resetGameBoard };
})();

// Players

function createPlayer(name, tilePiece) {
    let score = 0;
    const winAGame = () => {
        score++;
    };
    const getScore = () => {
        let seeScore = score;
        return seeScore;
    };

    return { name, tilePiece, winAGame, getScore };
}

// Display Updater

const displayController = (function () {
    // document queries
    const playerOneInfo = document.querySelector(".player-1");
    const playerOneName = document.querySelector(".player-1-name");
    const playerOneScore = document.querySelector(".player-1-score");
    const playerOneSymbol = document.querySelector(".player-1-symbol");
    const playerTwoInfo = document.querySelector(".player-2");
    const playerTwoName = document.querySelector(".player-2-name");
    const playerTwoScore = document.querySelector(".player-2-score");
    const playerTwoSymbol = document.querySelector(".player-2-symbol");

    const displayGrid = document.querySelector(".tile-grid");
    let currentPlayer = 1;
    let currentRound = 1;

    // functions

    const initializeEventListeners = () => {
        for (let i = 0; i < 9; i++) {
            displayGrid
                .querySelector(`.cell-${i}`)
                .addEventListener("click", game.playTurn);
            displayGrid
                .querySelector(`.cell-${i}`)
                .addEventListener("mouseover", mouseoverEvent);
            displayGrid
                .querySelector(`.cell-${i}`)
                .addEventListener("mouseout", mouseoutEvent);
        }
    };

    const updatePlayerInfo = (playerOne, playerTwo) => {
        playerOneName.textContent = playerOne.name;
        playerOneSymbol.textContent = playerOne.tilePiece;
        playerOneScore.textContent = 0;
        playerTwoName.textContent = playerTwo.name;
        playerTwoSymbol.textContent = playerTwo.tilePiece;
        playerTwoScore.textContent = 0;
    };
    const updatePlayerScore = (playerOneWins, playerTwoWins) => {
        playerOneScore.textContent = playerOneWins;
        playerTwoScore.textContent = playerTwoWins;
    };
    const updateGameBoard = (z, tilePiece) => {
        displayGrid.querySelector(`.cell-${z}`).textContent = tilePiece;
    };

    const updateTurn = () => {
        playerOneInfo.classList.toggle("your-turn");
        playerTwoInfo.classList.toggle("your-turn");
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    };

    const getCurrentTile = () => {
        return currentPlayer === 1
            ? playerOneSymbol.textContent
            : playerTwoSymbol.textContent;
    };

    const getCurrentPlayer = () => {
        return currentPlayer === 1 ? 1 : 2;
    };

    const resetUI = (fullReset) => {
        if (fullReset) {
            currentPlayer = 1;
            currentRound = 1;
            playerOneInfo.classList.add("your-turn");
            playerTwoInfo.classList.remove("your-turn");
            document.querySelector("#player-ones-name").value = "";
            document.querySelector("#player-twos-name").value = "";
            document.querySelector("#O").checked = true;
            document.querySelector("#X").checked = true;
        } else {
            currentRound++;
            if (currentRound % 2 === 0) {
                currentPlayer = 2;
                playerOneInfo.classList.remove("your-turn");
                playerTwoInfo.classList.add("your-turn");
            } else {
                currentPlayer = 1;
                playerOneInfo.classList.add("your-turn");
                playerTwoInfo.classList.remove("your-turn");
            }
        }
        for (let i = 0; i < 9; i++) {
            displayGrid
                .querySelector(`.cell-${i}`)
                .removeEventListener("click", game.playTurn);
            displayGrid
                .querySelector(`.cell-${i}`)
                .removeEventListener("mouseover", mouseoverEvent);
            displayGrid
                .querySelector(`.cell-${i}`)
                .removeEventListener("mouseout", mouseoutEvent);
            displayGrid.querySelector(`.cell-${i}`).textContent = "";
        }
        document.getElementById("dialog-play-again").classList.remove("winner");
    };

    const mouseoverEvent = (event) => {
        event.target.textContent = getCurrentTile();
        event.target.classList.add("hovering");
    };

    const mouseoutEvent = (event) => {
        event.target.textContent = "";
        event.target.classList.remove("hovering");
    };

    return {
        initializeEventListeners,
        updatePlayerInfo,
        updatePlayerScore,
        updateGameBoard,
        updateTurn,
        getCurrentTile,
        getCurrentPlayer,
        resetUI,
        mouseoverEvent,
        mouseoutEvent,
    };
})();

// Game Controller

const game = (function () {
    let playerOne;
    let playerTwo;

    const dialog = document.getElementById("dialog");
    const playerForm = document.querySelector(".input-form");

    const dialogPlayAgain = document.getElementById("dialog-play-again");
    const playAgainBtn = dialogPlayAgain.querySelector("#play-again");
    const resetBtn = dialogPlayAgain.querySelector("#reset");
    const result = dialogPlayAgain.querySelector(".result");

    const initializeGame = () => {
        dialog.showModal();

        playerForm.addEventListener("submit", playGameBtnFunction);
    };

    const playTurn = (event) => {
        let z = event.target.dataset.index;
        let currentTilePiece = displayController.getCurrentTile();
        let currentPlayer = displayController.getCurrentPlayer();
        displayController.updateGameBoard(z, currentTilePiece);
        gameBoard.updateGameBoard(z, currentTilePiece);
        event.target.removeEventListener("click", playTurn);
        event.target.removeEventListener(
            "mouseover",
            displayController.mouseoverEvent
        );
        event.target.removeEventListener(
            "mouseout",
            displayController.mouseoutEvent
        );
        event.target.classList.remove("hovering");
        gameBoard.winnerCheck(currentPlayer);
    };

    const winner = (player) => {
        if (player === 1) {
            playerOne.winAGame();
        } else if (player === 2) {
            playerTwo.winAGame();
        }
        displayController.updatePlayerScore(
            playerOne.getScore(),
            playerTwo.getScore()
        );
        playAgain(player);
    };

    const tie = () => {
        playAgain("tie");
    };

    const playAgain = (gameResult) => {
        if (gameResult === 1) {
            result.textContent = `You win, ${playerOne.name}! 🎉`;
            dialogPlayAgain.classList.add("winner");
        } else if (gameResult === 2) {
            result.textContent = `You win, ${playerTwo.name}! 🎉`;
            dialogPlayAgain.classList.add("winner");
        } else {
            result.textContent = "It's a tie! Good game!";
        }

        dialogPlayAgain.showModal();

        playAgainBtn.addEventListener("click", playAgainBtnFunction);

        resetBtn.addEventListener("click", resetBtnFunction);
    };

    const playGameBtnFunction = (event) => {
        event.preventDefault();
        const playerOneNameInput = document.querySelector("#player-ones-name");
        const playerOneSymbolInput = document.querySelector(
            'input[name="player-ones-symbol"]:checked'
        );
        const playerTwoNameInput = document.querySelector("#player-twos-name");
        const playerTwoSymbolInput = document.querySelector(
            'input[name="player-twos-symbol"]:checked'
        );
        if (playerForm.checkValidity()) {
            playerOne = createPlayer(
                playerOneNameInput.value,
                playerOneSymbolInput.value
            );
            playerTwo = createPlayer(
                playerTwoNameInput.value,
                playerTwoSymbolInput.value
            );
            dialog.close();
            displayController.updatePlayerInfo(playerOne, playerTwo);
            displayController.initializeEventListeners();
        } else {
            playerForm.reportValidity();
        }
    };

    const playAgainBtnFunction = (event) => {
        event.preventDefault();
        dialogPlayAgain.close();
        displayController.resetUI(false);
        gameBoard.resetGameBoard();
        displayController.initializeEventListeners();
    };

    const resetBtnFunction = (event) => {
        event.preventDefault();
        dialogPlayAgain.close();
        displayController.resetUI(true);
        gameBoard.resetGameBoard();
        initializeGame();
    };

    return {
        initializeGame,
        playTurn,
        winner,
        tie,
        playGameBtnFunction,
        playAgainBtnFunction,
        resetBtnFunction,
    };
})();

game.initializeGame();
