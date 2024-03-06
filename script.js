const words = ["secret", "words", "list", "game", "play", "guess", "round", "start", "alpha", "grid"];
let secretWord = words[Math.floor(Math.random() * words.length)];
let currentGuess = [];
let round = 0;

function setupBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;
            gameBoard.appendChild(cell);
        }
    }
}

function setupAlphabet() {
    const alphabetContainer = document.getElementById('alphabetContainer');
    alphabetContainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = document.createElement('div');
        letter.className = 'letter';
        letter.textContent = String.fromCharCode(i);
        letter.onclick = () => selectLetter(String.fromCharCode(i));
        alphabetContainer.appendChild(letter);
    }
}

function selectLetter(letter) {
    if (currentGuess.length < 5) {
        const cell = document.getElementById(`cell-${round}-${currentGuess.length}`);
        cell.textContent = letter;
        currentGuess.push(letter);
        if (currentGuess.length === 5) {
            checkGuess();
        }
    }
}

function checkGuess() {
    let correctCount = 0;
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${round}-${i}`);
        if (currentGuess[i] === secretWord[i]) {
            cell.classList.add('correctLocation');
            correctCount++;
        } else if (secretWord.includes(currentGuess[i])) {
            cell.classList.add('correctLetter');
        }
    }

    if (correctCount === 5) {
        showWinMessage();
    } else {
        round++;
        if (round === 7) {
            resetGame();
        } else {
            currentGuess = [];
        }
    }
}

function showWinMessage() {
    alert('Congratulations! You guessed the word!');
    resetGame();
}

function resetGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    currentGuess = [];
    round = 0;
    setupBoard();
    setupAlphabet();
}

function undoLastSelection() {
    if (currentGuess.length > 0) {
        currentGuess.pop();
        const cell = document.getElementById(`cell-${round}-${currentGuess.length}`);
        cell.textContent = '';
    }
}

document.getElementById('resetButton').onclick = resetGame;
document.getElementById('undoButton').onclick = undoLastSelection;

setupBoard();
setupAlphabet();
