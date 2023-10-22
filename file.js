const player1Html = `<span id="player1Mark">X</span>`
const player2Html = `<span id="player2Mark">O</span>`
let turn = 1
let emptyBoxes = 9
const currentBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
for (let i = 1; i <= 9; i++) {
    const box = document.getElementById(i)
    box.addEventListener('click', onClick)
}
function onClick(event) {
    if (emptyBoxes > 0) {
        const currentDiv = event.target
        const id = Number(currentDiv.getAttribute("id"))
        const i = Math.floor((id - 1) / 3)
        const j = (id - 1) % 3
        if (turn === 1) {
            currentBoard[i][j] = 1
            currentDiv.innerHTML = player1Html
            turn = 2
        } else {
            currentBoard[i][j] = 2
            currentDiv.innerHTML = player2Html
            turn = 1
        }
        emptyBoxes -= 1
        const winner = findWinner() 
        if (winner === 1) {
            alert("Congratulations! Player1 wins")
        } else if (winner === 2) {
            alert("Congratulations! Player2 wins")
        }
        if (emptyBoxes === 0 && findWinner() === 0) {
            alert('Draw!')
        }
    }
}
function findWinner() {
    // row-wise winner
    let currentScore = {
        1: 0,
        2: 0
    }
    for (let i = 0; i < currentBoard.length; i++) {
        for (let j = 0; j < currentBoard[i].length; j++) {
            if (currentBoard[i][j] === 1) {
                currentScore[1] += 1;
            } else if (currentBoard[i][j] === 2) {
                currentScore[2] += 1;
            }
        }
        if (currentScore[1] === 3) {
            return 1
        } else if (currentScore[2] === 3) {
            return 2
        }
        currentScore = {
            1: 0,
            2: 0
        }
    }
    // column wise
    for (let j = 0; j < currentBoard.length; j++) {
        for (let i = 0; i < currentBoard[j].length; i++) {
            if (currentBoard[i][j] === 1) {
                currentScore[1] += 1;
            } else if (currentBoard[i][j] === 2) {
                currentScore[2] += 1;
            }
        }
        if (currentScore[1] === 3) {
            return 1
        } else if (currentScore[2] === 3) {
            return 2
        }
        currentScore = {
            1: 0,
            2: 0
        }
    }
    // diagonal 1
    for (let i = 0; i < currentBoard.length; i++) {
        let j = i
        if (currentBoard[i][j] === 1) {
            currentScore[1] += 1;
        } else if (currentBoard[i][j] === 2) {
            currentScore[2] += 1;
        }
    }
    if (currentScore[1] === 3) {
        return 1
    } else if (currentScore[2] === 3) {
        return 2
    }
    currentScore = {
        1: 0,
        2: 0
    }
    // diagonal 2
    for (let i = 0; i < currentBoard.length; i++) {
        let j = currentBoard.length - 1 - i
        if (currentBoard[i][j] === 1) {
            currentScore[1] += 1;
        } else if (currentBoard[i][j] === 2) {
            currentScore[2] += 1;
        }
    }
    if (currentScore[1] === 3) {
        return 1
    } else if (currentScore[2] === 3) {
        return 2
    }
    return 0
}