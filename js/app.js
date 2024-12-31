/* 
The program starts by creating the grid
Create the card & card values
Shuffle the cards
Add event listener to click on the cards and flip them
Make sure that cards clicked are the same and keep them shown if they are
Flip the cards when the values don't match
Keep track of right & wrong choices
The timer has to reset every new game alog with the cards & start functioning
once the game begins
Reset cards once the game begins
At the end display win/lose message
*/

const grid = document.querySelector('.grid');


const cardValues = ['🚀', '🌕', '🌟', '🛸', '👾', '🪐', '☄️', '🛰️'];
let cards = [...cardValues, ...cardValues];


function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
cards = shuffle(cards);


function createCards() {
    console.log("creating cards...");
    cards.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="front">${value}</div>
      <div class="back"></div>
    `;
    grid.appendChild(card);
  });
}

createCards();


let firstCard = null;
let secondCard = null;
let lockBoard = false;

grid.addEventListener('click', event => {
  const clickedCard = event.target.parentElement;

  if (!clickedCard.classList.contains('card') || clickedCard.classList.contains('flipped') || lockBoard) {
    return;
  }
  
  clickedCard.classList.add('flipped');

  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    checkMatch();
  }
});

function checkMatch() {
  lockBoard = true;
  const isMatch = firstCard.querySelector('.front').textContent === secondCard.querySelector('.front').textContent;

  if (isMatch) {
    resetCards();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

const timerElement = document.getElementById('timer');

let timeLeft = 60;

function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame(false);
    }
  }, 1000);
}


startTimer();


function endGame(isWin) {
  
  grid.classList.add('disabled');

  
  const message = isWin ? '🎉 You Win!' : '⏰ Times Up! You Lose!';
  alert(message);

  
  document.getElementById('restart').addEventListener('click', () => {
    location.reload();
  });
}

let matchedPairs = 0;
const totalPairs = cardValues.length;


function checkMatch() {
  lockBoard = true;
  const isMatch = firstCard.querySelector('.front').textContent === secondCard.querySelector('.front').textContent;

  if (isMatch) {
    matchedPairs++;
    if (matchedPairs === totalPairs) {
      endGame(true);
    }
    resetCards();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetCards();
    }, 1000);
  }
}

let wrongGuesses = 0;
const maxWrongGuesses = 5;

function checkMatch() {
    lockBoard = true;
    const isMatch = firstCard.querySelector('.front').textContent === secondCard.querySelector('.front').textContent;
  
    if (isMatch) {
      matchedPairs++;
      if (matchedPairs === totalPairs) {
        endGame(true);
      }
      resetCards();
    } else {
      wrongGuesses++;
      document.getElementById('wrong-guess-counter').textContent = `${wrongGuesses} / ${maxWrongGuesses}`;
  
      if (wrongGuesses >= maxWrongGuesses) {
        endGame(false);
      }
  
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetCards();
      }, 1000);
    }
  }

  function endGame(isWin) {

    grid.classList.add('disabled');
  

    const gameMessage = document.getElementById('game-message');
    const messageText = document.getElementById('message-text');
  

    messageText.textContent = isWin ? '🎉 You Win! Great job!' : '⏰ You Lose! Try again.';
  

    gameMessage.classList.remove('hidden');
  

    document.getElementById('play-again').addEventListener('click', () => {
      location.reload();
    });
  }
  
