// Gameboard

const gameBoard = (function () {
    let gameTiles = [null, null, null, null, null, null, null, null, null];

    const getGameBoard = () => [...gameTiles];

    const updateGameBoard = (x, y, tilePiece) =>
        (gameTiles[(x - 1) * 3 + y - 1] = tilePiece);

    return { updateGameBoard, getGameBoard };
})();

// Players

function createPlayer(name, tilePiece) {
    let score = 0;
    const winAGame = () => score++;
    const seeScore = () => console.log(score);

    return { name, tilePiece, winAGame, seeScore };
}

// Game Controller

const game = (function () {
    const playerOne = createPlayer("Sidney", "X"); // testing functionality - to be deleted (still need prompt for user to input info)
    const playerTwo = createPlayer("Lamb", "🐑"); // testing functionality - to be deleted

    // function that checks for a winner
    const winnerCheck = function (player, ...currentBoard) {
        if (
            // Top row
            (currentBoard[0] === player.tilePiece &&
                currentBoard[1] === player.tilePiece &&
                currentBoard[2] === player.tilePiece) ||
            // 2nd row
            (currentBoard[3] === player.tilePiece &&
                currentBoard[4] === player.tilePiece &&
                currentBoard[5] === player.tilePiece) ||
            // 3rd row
            (currentBoard[6] === player.tilePiece &&
                currentBoard[7] === player.tilePiece &&
                currentBoard[8] === player.tilePiece) ||
            // 1st col
            (currentBoard[0] === player.tilePiece &&
                currentBoard[3] === player.tilePiece &&
                currentBoard[6] === player.tilePiece) ||
            // 2nd col
            (currentBoard[1] === player.tilePiece &&
                currentBoard[4] === player.tilePiece &&
                currentBoard[7] === player.tilePiece) ||
            // 3rd col
            (currentBoard[2] === player.tilePiece &&
                currentBoard[5] === player.tilePiece &&
                currentBoard[8] === player.tilePiece) ||
            // Crosses
            (currentBoard[0] === player.tilePiece &&
                currentBoard[4] === player.tilePiece &&
                currentBoard[8] === player.tilePiece) ||
            (currentBoard[2] === player.tilePiece &&
                currentBoard[4] === player.tilePiece &&
                currentBoard[6] === player.tilePiece)
        ) {
            // return winning player??
        }
    };

    for (let i = 1; i < 3; i++) {
        //update to make i go until < 10
        let x = i - 1 + 1;
        let y = i - 1 + 1;
        gameBoard.updateGameBoard(1, 2, playerOne.tilePiece);
        gameBoard.updateGameBoard(1, 3, playerOne.tilePiece);
        if (i % 2 !== 0) {
            gameBoard.updateGameBoard(x, y, playerOne.tilePiece);
        } else {
            gameBoard.updateGameBoard(x, y, playerTwo.tilePiece);
        }

        // check to see if there was a winner after each move
        winnerCheck(playerOne, gameBoard.getGameBoard());
        winnerCheck(playerTwo, gameBoard.getGameBoard());
    }
})();
