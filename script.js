const cellElements = document.querySelectorAll('[data-cell]');
const gameStatus = document.querySelector('.game-status');
const restartButton = document.querySelector('.restart-button');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let xIsNext = true;
let gameOver = false;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
        cell.textContent = '';
        cell.style.border = '';
    });
    gameStatus.innerHTML = '';
    xIsNext = true;
    gameOver = false;
}

function handleClick(event) {
    const cell = event.target;
    if (gameOver || cell.classList.contains('x') || cell.classList.contains('o')) {
        return;
    }
    const currentClass = xIsNext ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass;
}

function swapTurn() {
    xIsNext = !xIsNext;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    gameOver = true;
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
    if (draw) {
        gameStatus.innerHTML = "It's a draw!";
    } else {
        const currentClass = xIsNext ? 'x' : 'o';
        gameStatus.innerHTML = `${currentClass.toUpperCase()} wins!`;
        winningCombinations.forEach(combination => {
            const cell1 = cellElements[combination[0]];
            const cell2 = cellElements[combination[1]];
            const cell3 = cellElements[combination[2]];
            if (cell1.classList.contains(currentClass) && 
                cell2.classList.contains(currentClass) && 
                cell3.classList.contains(currentClass)) {
                cell1.style.border = "4px solid gray";
                cell2.style.border = "4px solid gray";
                cell3.style.border = "4px solid gray";
            }
        });
    }
}
