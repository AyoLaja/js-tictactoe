var originalBoard
const humanPlayer = 'X'
const aiPlayer = 'O'
const winCombos = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cells = document.querySelectorAll('.cell')

startGame()

function startGame() {
    document.querySelector('.end-game').style.display = 'none'

    //Create an array of 9 elements
    //Get the keys of the 9 elements in the array(0-8)
    //Assign the keys to originalArray
    originalBoard = Array.from(Array(9).keys())

    for (let c of cells) {
        c.innerText = ""
        c.style.removeProperty('background-color')
        c.addEventListener('click', turnClick, false)
    }
}

function turnClick(square) {
    if (typeof originalBoard[square.target.id] == 'number') {
        turn(square.target.id, humanPlayer)

        //AI takes turn only if there is no tie
        if (!checkTie()) {
            turn(bestSpot(), aiPlayer)
        }
    }
}

function turn(squareId, player) {
    originalBoard[squareId] = player
    document.getElementById(squareId).innerText = player

    let gameWon = checkWin(originalBoard, player)

    if (gameWon) {
        gameOver(gameWon)
    }
}

function checkWin(board, player) {
    //a is the accumulator (the final value)
    //a, [] initialized the accumulator to an empty array
    //e is the element in the board array
    //i is the index
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, [])
    console.log(plays)
    let gameWon = null
    
    for (let [index, win] of winCombos.entries()) {
        if (win.every(element => plays.indexOf(element) > -1)) {
            gameWon = { index: index, player: player }
            break
        }
    }
    return gameWon
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == humanPlayer ? 'green' : 'red'
    }

    for (c of cells) {
        c.removeEventListener('click', turnClick, false)
    }

    declareWinner(gameWon.player == humanPlayer ? 'You win!!' : 'You lose :(')
}

function declareWinner(winner) {
    document.querySelector('.end-game').style.display = 'block'
    document.querySelector('.text').innerText = winner
}

function emptySquares() {
    return originalBoard.filter(square => typeof square == 'number')
}

function bestSpot() {
    return emptySquares()[0]
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (c in cells) {
            c.style.backgroundColor = 'green'
            c.removeEventListener('click', turnClick, false)
        }
        declareWinner('Tie Game')
        return true
    }
    else {
        return false
    }
} 