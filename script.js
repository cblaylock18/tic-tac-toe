// Gameboard

const gameBoard = (function () {
    let gameTiles = [null, null, null, null, null, null, null, null, null];

    const getGameBoard = () => [...gameTiles];

    const resetGameBoard = () =>
        (gameTiles = [null, null, null, null, null, null, null, null, null]);

    const updateGameBoard = (z, tilePiece) => (gameTiles[z] = tilePiece);

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

    const winnerCheck = (tilePiece1, tilePiece2) => {
        let winner;
        winningCombos.forEach((element) => {
            if (
                gameTiles[element[0]] === gameTiles[element[1]] &&
                gameTiles[element[0]] === gameTiles[element[2]] &&
                gameTiles[element[0]] !== null
            ) {
                if (gameTiles[element[0]] === tilePiece1) {
                    winner = 1;
                } else if (gameTiles[element[0]] === tilePiece2) {
                    winner = 2;
                }
            }
        });
        return winner;
    };

    return { updateGameBoard, getGameBoard, winnerCheck, resetGameBoard };
})();

// Players

function createPlayer(name, tilePiece) {
    let score = 0;
    const winAGame = () => {
        score++;
    };
    const seeScore = () => console.log(score);

    return { name, tilePiece, winAGame, seeScore };
}

// Game Controller

const game = (function () {
    const initializeGame = () => {
        // will prompt for player info here in modal
        // should update document to list player names
        const playerOne = createPlayer("Sidney", "X"); // testing functionality - to be deleted (still need prompt for user to input info)
        const playerTwo = createPlayer("Lamb", "🐑"); // testing functionality - to be deleted
        return [playerOne, playerTwo];
    };

    const playRound = () => {
        // play a round
        for (let i = 0; i < 1; i++) {
            //update i to be < 9 when done
            // updating gameboard for code building - to be deleted
            gameBoard.updateGameBoard(0, playerOne.tilePiece);
            gameBoard.updateGameBoard(3, playerTwo.tilePiece);
            gameBoard.updateGameBoard(1, playerOne.tilePiece);
            gameBoard.updateGameBoard(4, playerTwo.tilePiece);
            gameBoard.updateGameBoard(2, playerOne.tilePiece);
            gameBoard.updateGameBoard(6, playerTwo.tilePiece);

            // click event to get div index, then update gameboard based on index and turn #

            if (i % 2 === 0) {
                let z = 0; //to be deleted
                // highlight player 1
                gameBoard.updateGameBoard(z, playerOne.tilePiece);
            } else {
                let z = 3; //to be deleted
                // highlight player 2
                gameBoard.updateGameBoard(z, playerTwo.tilePiece);
            }

            // check to see if there was a winner after each move
            let winningPlayer = gameBoard.winnerCheck(
                playerOne.tilePiece,
                playerTwo.tilePiece
            );
            if (winningPlayer || (winningPlayer === undefined && i === 8)) {
                if (winningPlayer === 1) {
                    playerOne.winAGame();
                    console.log(`${playerOne.name} wins! Play again?`);
                } else if (winningPlayer === 2) {
                    playerTwo.winAGame();
                    console.log(`${playerTwo.name} wins! Play again?`);
                } else {
                    console.log(`It's a tie! Play again?`);
                }
                // code here to ask if you want to start from scratch or go again
                // if reset, initializeGame, then reset gameboard, then playround
                gameBoard.resetGameBoard();
            }
        }
    };

    // actually playing a game, calling the following functions defined above
    let playerOne, playerTwo;
    [playerOne, playerTwo] = initializeGame();
    playRound();
})();
