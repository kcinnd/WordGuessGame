const words = ["global", "county", "nation", "planet", "flower", "growth"]; // Example six-letter words
let secretWord = words[Math.floor(Math.random() * words.length)];
let currentGuess = [];
let round = 0;

function setupBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) { // Change this line to create 6 columns
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
    if (currentGuess.length < 6) { // Change this line to allow for 6 letters
        const cell = document.getElementById(`cell-${round}-${currentGuess.length}`);
        cell.textContent = letter;
        currentGuess.push(letter);
        
        // Trigger the guess check when the sixth letter is input
        if (currentGuess.length === 6) {
            checkGuess();
        }
    }
}

function checkGuess() {
    let correctCount = 0;

    // Check each letter in the six-letter guess
    for (let i = 0; i < 6; i++) { // Change this line for 6 letters
        const cell = document.getElementById(`cell-${round}-${i}`);
        if (currentGuess[i] === secretWord[i]) {
            cell.classList.add('correctLocation');
            correctCount++;
        } else if (secretWord.includes(currentGuess[i])) {
            cell.classList.add('correctLetter');
        } else {
            cell.classList.add('incorrectLetter');
        }
    }

    // Handle end-of-round logic
    if (correctCount === 6) { // Change this line for 6 letters
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
    const modal = document.getElementById('congratulationsModal');
    modal.classList.remove('hidden');
}

document.querySelector('#congratulationsModal .close').onclick = function() {
    document.getElementById('congratulationsModal').classList.add('hidden');
}

document.getElementById('continueButton').onclick = function() {
    window.location.href = 'nextLevel.html'; // Redirect to the next level page
}

document.getElementById('instructionsButton').onclick = function() {
    document.getElementById('instructionsModal').classList.remove('hidden');
}

document.querySelector('.close').onclick = function() {
    document.getElementById('instructionsModal').classList.add('hidden');
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('instructionsModal');
    if (event.target == modal) {
        modal.classList.add('hidden');
    }
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
