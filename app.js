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
    const startGame = () => {
        currentPlayer = playerOne;
    }

    const changeRound = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        roundPlayed += 1;

        if (roundPlayed >= 9) {
            // STOP GAME
        }
    }

    const restartGame = () => {
        gameBoard.cleanBoard();
        roundPlayed = 0;
        startGame();
    }
    
    document.querySelector('.bottom button').addEventListener('click', restartGame);

    const getCurrentPlayer = () => currentPlayer;

    return {
        startGame,
        changeRound,
        getCurrentPlayer
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

    };

    return {
        markCell,
        cleanBoard,
        getBoard,
        getCell
    }
})();

const gameController = (() => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
        board[i].addEventListener('click', function(e) { handlePlay(e.currentTarget.id) });
    }
    const handlePlay = (id) => {
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