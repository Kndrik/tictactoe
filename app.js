const playerFactory = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { 
        getName,
        getMark
    };
}

const gameState = (() => {
    let playerOne;
    let playerTwo;
    let currentPlayer;
    let roundPlayed = 0;
    let gameEnded = false;
    const resultDiv = document.querySelector('.result');
    const playerTurn = document.querySelector('.player-turn');

    const startGame = (event) => {
        event.preventDefault();
        const playerOneName = document.querySelector('input[name="playerOne"]').value;
        const playerTwoName = document.querySelector('input[name="playerTwo"]').value;
        playerOne = playerFactory(playerOneName, 'X');
        playerTwo = playerFactory(playerTwoName, 'O');

        gameBoard.showGrid();
        gameBoard.cleanBoard();

        currentPlayer = playerOne;
        playerTurn.textContent = `${currentPlayer.getName()}'s turn`;
        resultDiv.textContent = '';
    }

    let form = document.querySelector('form');
    form.onsubmit = startGame;

    const displayWinner = () => {
        resultDiv.textContent = gameBoard.checkForWinner() === playerOne.getMark() ? `${playerOne.getName()} won!` : `${playerTwo.getName()} won!`;
    }

    const displayTie = () => resultDiv.textContent = `It's a tie.`;

    const hasEnded = () => gameEnded;

    const changeRound = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        playerTurn.textContent = `${currentPlayer.getName()}'s turn`;
        roundPlayed += 1;

        if (gameBoard.checkForWinner() !== '') {
            displayWinner();
            gameEnded = true;
            playerTurn.textContent = '';
            return;
        } else if (roundPlayed >= 9) {
            displayTie();
            gameEnded = true;
            playerTurn.textContent = '';
        }
    }

    const restartGame = () => {
        resultDiv.textContent = '';
        gameBoard.cleanBoard();
        roundPlayed = 0;
        gameEnded = false;
        currentPlayer = playerOne;
        playerTurn.textContent = `${currentPlayer.getName()}'s turn`;
    }
    
    const changePlayers = () => {
        gameBoard.showForm();
    }

    document.querySelector('.bottom button.reset').addEventListener('click', restartGame);
    document.querySelector('.bottom button.change-players').addEventListener('click', changePlayers);

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

    const showForm = () => {
        document.querySelector('.form-container').hidden = false;

        document.querySelector('.player-turn').hidden = true;
        document.querySelector('.grid-parent').hidden = true;
        document.querySelector('.bottom button.reset').hidden = true;
        document.querySelector('.bottom button.change-players').hidden = true;
        document.querySelector('.result').hidden = true;
    }

    const showGrid = () => {
        document.querySelector('.form-container').hidden = true;

        document.querySelector('.player-turn').hidden = false;
        document.querySelector('.grid-parent').hidden = false;
        document.querySelector('.bottom button.reset').hidden = false;
        document.querySelector('.bottom button.change-players').hidden = false;
        document.querySelector('.result').hidden = false;
    }

    return {
        markCell,
        cleanBoard,
        getBoard,
        getCell,
        checkForWinner,
        showForm,
        showGrid
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

//gameState.startGame();