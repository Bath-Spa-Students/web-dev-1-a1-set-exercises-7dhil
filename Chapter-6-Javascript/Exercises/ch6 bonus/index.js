// Define RGB color values
const colors = [
    { red: 255, green: 0, blue: 0 },
    { red: 0, green: 255, blue: 0 },
    { red: 0, green: 0, blue: 255 },
    { red: 255, green: 255, blue: 0 },
    { red: 255, green: 0, blue: 255 },
    { red: 0, green: 255, blue: 255 },
    { red: 128, green: 0, blue: 128 },
    { red: 128, green: 128, blue: 0 }
];

let lives = 3;
let score = 0;

// Generate random RGB color
function generateColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Update color display
function updateColorDisplay(color) {
    const colorDisplay = document.getElementById('color-display');
    colorDisplay.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
}

// Generate options
function generateOptions(correctColor) {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Shuffle colors array
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);

    // Add correct color and two random colors to options
    const options = [correctColor, shuffledColors[0], shuffledColors[1]];
    options.sort(() => Math.random() - 0.5);

    options.forEach(color => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        optionDiv.addEventListener('click', () => checkAnswer(color, correctColor));
        optionsContainer.appendChild(optionDiv);
    });
}

// Check user's answer
function checkAnswer(selectedColor, correctColor) {
    const message = document.getElementById('message');
    if (selectedColor === correctColor) {
        message.textContent = 'Correct!';
        score++;
    } else {
        message.textContent = 'Incorrect!';
        lives--;
    }

    // Update lives and score display
    updateScoreAndLives();

    // Generate new color and options
    const newColor = generateColor();
    updateColorDisplay(newColor);
    generateOptions(newColor);

    // Check if game over
    if (lives === 0) {
        endGame();
    }
}

// Update score and lives display
function updateScoreAndLives() {
    const message = document.getElementById('message');
    message.innerHTML = `Lives: ${lives} | Score: ${score}`;
}

// End game
function endGame() {
    const message = document.getElementById('message');
    message.innerHTML = `Game Over! Final Score: ${score}`;

    // Disable options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    // Hide restart button initially
    const restartButton = document.getElementById('restart-btn');
    restartButton.style.display = 'block';
}

// Restart game
function restartGame() {
    lives = 3;
    score = 0;
    updateScoreAndLives();
    const newColor = generateColor();
    updateColorDisplay(newColor);
    generateOptions(newColor);
    document.getElementById('message').textContent = '';
    document.getElementById('restart-btn').style.display = 'none';
}

// Initial setup
window.onload = function () {
    const initialColor = generateColor();
    updateColorDisplay(initialColor);
    generateOptions(initialColor);
    updateScoreAndLives();

    // Restart button click event
    const restartButton = document.getElementById('restart-btn');
    restartButton.addEventListener('click', restartGame);
};
