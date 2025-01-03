// Select DOM elements
const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

// Load the sound effects
const startSound = new Audio('./sounds/start.mp3');
const endSound = new Audio('./sounds/stop.mp3');
const restartSound = new Audio('./sounds/restart.mp3');

// Define key controls
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

// Player properties
let player = {
    speed: 4,
    score: 0,
    highScore: 0,
    x: 0,
    y: 0,
    inPlay: false,
};

// Adjust speed based on device type
const adjustSpeed = () => {
    if (window.innerWidth < 768) {
        player.speed = 2; // Slower speed for mobile
    } else {
        player.speed = 4; // Default speed for larger screens
    }
};
adjustSpeed();
window.addEventListener('resize', adjustSpeed);
// Mobile touch controls
let touchStartX = 0;

// Listen for keyboard controls
window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
});

// Listen for touch controls
window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});
window.addEventListener('touchmove', (e) => {
    if (!player.inPlay) return;

    const touchEndX = e.touches[0].clientX;
    const diffX = touchEndX - touchStartX;

    if (diffX > 0 && player.x < gameArea.offsetWidth - 50) {
        player.x += player.speed; // Move right
    } else if (diffX < 0 && player.x > 0) {
        player.x -= player.speed; // Move left
    }
    touchStartX = touchEndX;
});

// Start or Restart Game
startScreen.addEventListener('click', startGame);

function startGame() {
    startSound.play(); // Play the start sound

    startScreen.classList.add('hide'); // Hide the start/restart screen
    score.classList.remove('hide'); // Show the score display
    player.inPlay = true; // Set the game state
    player.score = 0; // Reset the score
    gameArea.innerHTML = ''; // Clear previous game elements

    // Create player's car
    const car = document.createElement('div');
    car.classList.add('car');
    gameArea.appendChild(car);

    // Position player's car
    player.x = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    player.y = gameArea.offsetHeight - 100; // Fixed position near the bottom
    car.style.left = `${player.x}px`;
    car.style.top = `${player.y}px`;

    // Create road lines
    for (let i = 0; i < 5; i++) {
        let line = document.createElement('div');
        line.classList.add('line');
        line.y = i * 150; // Space lines evenly
        line.style.top = `${line.y}px`;
        gameArea.appendChild(line);
    }

    // Enemy car images
    const enemyCarImages = [
        './images/car2.png',
        './images/car3.png',
        './images/car4.png',
        './images/car5.png',
        './images/car6.png',
        './images/car7.png',
    ];

    // Create enemy cars
    for (let i = 0; i < 3; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.classList.add('enemyCar');
        enemyCar.y = i * -300;
        enemyCar.style.top = `${enemyCar.y}px`;
        enemyCar.style.left = `${Math.floor(Math.random() * 250)}px`; // Adjust to fit the narrower road

        // Assign a random car image
        const randomImage = enemyCarImages[Math.floor(Math.random() * enemyCarImages.length)];
        enemyCar.style.backgroundImage = `url(${randomImage})`;

        gameArea.appendChild(enemyCar);
    }

    window.requestAnimationFrame(playGame); // Start the game loop
}

function playGame() {
    if (!player.inPlay) return; // Exit if the game is not in play

    moveLines(); // Animate road lines
    moveEnemyCars(); // Animate enemy cars

    const car = document.querySelector('.car');

    // Horizontal movement (steering)
    if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (keys.ArrowRight && player.x < gameArea.offsetWidth - car.offsetWidth) player.x += player.speed;
    car.style.left = `${player.x}px`;

        // Vertical (forward) movement
        if (player.y > 0) {
            player.y -= player.forwardSpeed; // Move the car upwards (forward)
        }
        car.style.top = `${player.y}px`;
    
    // Update the score (simulates forward motion)
    player.score++;
    score.innerText = `Score: ${player.score}`;

    window.requestAnimationFrame(playGame); // Loop the game
}

function moveLines() {
    const lines = document.querySelectorAll('.line');
    lines.forEach((line) => {
        line.y += player.speed * 1.5; // Speed up lines (multiply by a factor)
        if (line.y > gameArea.offsetHeight) line.y -= 750; // Reset line to top when off-screen
        line.style.top = `${line.y}px`;
    });
}

function moveEnemyCars() {
    const enemyCars = document.querySelectorAll('.enemyCar');
    const car = document.querySelector('.car');

    enemyCars.forEach((enemy) => {
        enemy.y += player.speed * 2; // Move enemy cars downward
        if (enemy.y > gameArea.offsetHeight) {
            enemy.y = -300; // Reset enemy car to top when off-screen
            enemy.style.left = `${Math.floor(Math.random() * 250)}px`;
        }
        enemy.style.top = `${enemy.y}px`;

        // Collision detection
        if (isCollide(car, enemy)) {
            endGame();
        }
    });
}

function isCollide(car, enemy) {
    const carRect = car.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    return !(
        carRect.bottom < enemyRect.top ||
        carRect.top > enemyRect.bottom ||
        carRect.right < enemyRect.left ||
        carRect.left > enemyRect.right
    );
}

function endGame() {
    endSound.play(); // Play the end sound
    player.inPlay = false; // Stop the game
    startScreen.classList.remove('hide'); // Show restart screen
    startScreen.innerHTML = `<p>Game Over!</p><p>Click to Restart</p>`; // Update message

    // Update high score
    if (player.score > player.highScore) {
        player.highScore = player.score;
        highScore.innerText = `High Score: ${player.highScore}`;
    }

    // Ensure restart works after a game over
    startScreen.addEventListener('click', startGame, { once: true });
}

