const playerFactory = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { 
        getName,
        getMark
    };
}

const playerOne = playerFactory('Jim', 'X');
const playerTwo = playerFactory('Dwight', 'O');

const gameState = (() => {
    let currentPlayer;
    const startGame = () => {
        currentPlayer = playerOne;
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    const getCurrentPlayer = () => currentPlayer;

    return {
        startGame,
        changePlayer,
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
        gameState.changePlayer();
    }
    
    return {
        handlePlay
    }
})();

gameState.startGame();
