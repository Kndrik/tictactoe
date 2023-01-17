const playerFactory = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { 
        getName,
        getMark
    };
}

const gameState = (() => {
    let playerOne = playerFactory('Player 1', 'X');
    let playerTwo = playerFactory('Player 2', 'O');
    let currentPlayer;
    let roundPlayed = 0;
    let gameEnded = false;
    const resultDiv = document.querySelector('.result');
    const startGame = () => {
        currentPlayer = playerOne;
    }

    const displayWinner = (player) => {
        resultDiv.textContent = gameBoard.checkForWinner() === playerOne.getMark() ? `${playerOne.getName()} won!` : `${playerTwo.getName()} won!`;
    }

    const displayTie = () => resultDiv.textContent = `It's a tie`;

    const hasEnded = () => gameEnded;

    const changeRound = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        roundPlayed += 1;

        if (gameBoard.checkForWinner() !== '') {
            displayWinner();
            gameEnded = true;
            return;
        } else if (roundPlayed >= 9) {
            displayTie();
            gameEnded = true;
        }
    }

    const restartGame = () => {
        resultDiv.textContent = '';
        gameBoard.cleanBoard();
        roundPlayed = 0;
        gameEnded = false;
        startGame();
    }

    document.querySelector('.bottom button').addEventListener('click', restartGame);

    const getCurrentPlayer = () => currentPlayer;

    return {
        startGame,
        changeRound,
        getCurrentPlayer,
        hasEnded
    }
})();

const gameBoard = (() => {
    let boardArray = document.querySelectorAll('.cell');
    
    const markCell = (id, player) => {
        boardArray[id-1].firstChild.textContent = player.getMark();
    };

    const cleanBoard = () => {
        for (let i = 0; i < boardArray.length; i++) {
            boardArray[i].firstChild.textContent = '';
        }
    };

    const getBoard = () => boardArray;

    const getCell = (id) => boardArray[id-1];

    const checkForWinner = () => {
        const possibleWins = [[1,2,3],
                              [4,5,6],
                              [7,8,9],
                              [1,5,9],
                              [7,5,3],
                              [1,4,7],
                              [2,5,8],
                              [3,6,9]];
        for (let i = 0; i < possibleWins.length; i++) {
            let mark = boardArray[possibleWins[i][0]-1].firstChild.textContent;
            if (mark === '') continue;
            let winner = true;
            console.log(possibleWins[i]);
            for (let j = 0; j < possibleWins[i].length; j++) {
                console.log(`initial mark is ${mark}`);
                if (mark !== boardArray[possibleWins[i][j]-1].firstChild.textContent) {
                    winner = false;
                }
            }
            if (winner === true) {
                return mark;
            }
        }
        return '';
    };

    return {
        markCell,
        cleanBoard,
        getBoard,
        getCell,
        checkForWinner
    }
})();

const gameController = (() => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
        board[i].addEventListener('click', function(e) { handlePlay(e.currentTarget.id) });
    }
    const handlePlay = (id) => {
        if (gameState.hasEnded()) return;
        const cell = gameBoard.getCell(id);
        if (cell.textContent !== '') return;
        const player = gameState.getCurrentPlayer();
        gameBoard.markCell(id, player);
        gameState.changeRound();
    }
    
    return {
        handlePlay
    }
})();

gameState.startGame();