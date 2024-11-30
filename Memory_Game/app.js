const gridContainer = document.querySelector('.grid-container');
const timeRemainingEl = document.getElementById('time-remaining');
const flipsEl = document.getElementById('flips');
let isProcessing = false; // Flag to block clicks during match processing

let cards = [];
let flippedCards = [];
let matchedCards = 0;
let flips = 0;
let timeRemaining = 100;
let timer = null;

const icons = [
  '🍎', '🍊', '🍋', '🍌',
  '🍉', '🍇', '🍓', '🍒',
  '🍎', '🍊', '🍋', '🍌',
  '🍉', '🍇', '🍓', '🍒'
];

// Shuffle the icons array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  gridContainer.innerHTML = '';
  shuffle(icons);
  icons.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = icon;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.dataset.icon = icon;
    card.addEventListener('click', handleCardClick);
    gridContainer.appendChild(card);
    cards.push(card);
  });
}

function handleCardClick(e) {
  const card = e.currentTarget;

  // Ignore clicks on already matched or flipped cards
  if (isProcessing || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    flips++;
    flipsEl.textContent = flips;
    // Block further clicks while checking for a match
    isProcessing = true;
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.icon === card2.dataset.icon) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards += 2;
    flippedCards = [];
   // Allow clicks again after processing
   isProcessing = false;

   // Check for win condition
    if (matchedCards === cards.length) {
      clearInterval(timer);
      setTimeout(() => {
        alert('Congrats!! You won the game...');
        restart(); // Automatically restart the game after winning
      }, 2000);
    }
  } else {
        // Cards do not match; flip them back after a delay
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
        // Allow clicks again after processing
        isProcessing = false;
    }, 1000);
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeRemaining--;
    timeRemainingEl.textContent = timeRemaining;

    if (timeRemaining === 0) {
      clearInterval(timer);
      alert('Time\'s up! You lose!');
      restart();
    }
  }, 1000);
}

function restart() {
  clearInterval(timer);
  flips = 0;
  matchedCards = 0;
  timeRemaining = 100;
  flippedCards = [];
  cards = [];
  flipsEl.textContent = flips;
  timeRemainingEl.textContent = timeRemaining;
  createBoard();
  startTimer();
}

// Initialize the game
createBoard();
startTimer();
