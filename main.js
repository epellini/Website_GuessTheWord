const inputs = document.querySelector(".word"),
    hintTag = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess span"),
    mistakes = document.querySelector(".wrong span"),
    resetBtn = document.querySelector(".reset"),
    hintBtn = document.querySelector(".showhint"),
    hintText = document.querySelector(".hint"),
    typeInput = document.querySelector(".type-input");

// Intializing game variables
let word,
    incorrectLetters = [],
    correctLetters = [],
    maxGuesses;

function newGame() {
    // Hide the word hint at the beginning of the game.
    hintText.style.display = "none";

    // Choose random word from db and setup game
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomWord.word;

    // If word chars >= 5 then max guess = 8 else max guess = 6
    maxGuesses = word.length >= 5 ? 8 : 6;
    incorrectLetters = [];
    correctLetters = [];
    hintTag.innerText = randomWord.hint;
    guessLeft.innerText = maxGuesses;
    mistakes.innerText = incorrectLetters;

    // Create input for each letter of word
    inputs.innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        inputs.appendChild(input);
    }
}

// Handle user input and update game stats
function handleInput(e) {
    // Ignore non-letters input and letters that have already guessed
    const key = e.target.value.toLowerCase();
    if (key.match(/^[a-z]+$/i) && !incorrectLetters.includes(`${key}`) && !correctLetters.includes(`${key}`)) {
        // Check if the letter is in word
        if (word.includes(key)) {
            // Update correct guess
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    inputs.querySelectorAll("input")[i].value += key;
                }
            }
            correctLetters.push(key); 
        } else {
            // Update incorrect guess
            maxGuesses--;
            incorrectLetters.push(`${key}`);
            mistakes.innerText = incorrectLetters;
        }
    }

    // Update remain guess and check for win lose conditions
    guessLeft.innerText = maxGuesses;

    if (correctLetters.length === word.length) {
        // Delay showing the congratulations alert by 500 milliseconds (0.5 seconds)
        setTimeout(() => {
            inputs.innerHTML = word.split('').map(letter => `<input type="text" value="${letter}" disabled>`).join('');
            alert(`Good job!`);
            newGame();
        }, 500);
    } else if (maxGuesses < 1) {
        for (let i = 0; i < word.length; i++) {
            // Fill inputs with correct words
            inputs.querySelectorAll("input")[i].value = word[i];
        }
        setTimeout(() => {
            alert("Game Over: No more guesses!");
            newGame();
        }, 500);
    }

    // Clear input field
    typeInput.value = "";
}

// Show hint element
function showhintText() {
    hintText.style.display = "block";
    hintText.style.opacity = "1";
}

// Setup event listeners
resetBtn.addEventListener("click", newGame);
hintBtn.addEventListener("click", showhintText);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

newGame();