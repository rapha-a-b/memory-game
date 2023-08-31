import { flipCard } from "./gameplay.js";
const difficulty = [
  { difficulty: "easy", cards: 3 },
  { difficulty: "med", cards: 6 },
  { difficulty: "hard", cards: 9 },
  { difficulty: "harder", cards: 12 },
];

const $setEasy = document.getElementById("easy");
const $setMed = document.getElementById("med");
const $setHard = document.getElementById("hard");
let $board = document.getElementById("board-container");
const cardsOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let pickedCards = [];
let currentDifficultyInt = 3;
let currentDifficulty = difficulty[currentDifficultyInt];

$setEasy.addEventListener("click", () => {
  currentDifficultyInt = 0;
  resetBoard();
});
$setMed.addEventListener("click", () => {
  currentDifficultyInt = 1;
  resetBoard();
});
$setHard.addEventListener("click", () => {
  currentDifficultyInt = 2;
  resetBoard();
});

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// picking cards for the game
function pickRandomCards() {
  for (let rounds = currentDifficulty.cards; rounds > 0; rounds--) {
    let pickedCard = randomNumber(0, cardsOptions.length);
    while (pickedCards.includes(cardsOptions[pickedCard])) {
      pickedCard = randomNumber(0, cardsOptions.length);
    }
    for (let counter = 0; counter < 2; counter++) {
      pickedCards.push(cardsOptions[pickedCard]);
    }
  }
}

//shuffle the cards in the array
function shuffleCards() {
  pickedCards.sort(() => (Math.random() > 0.5 ? 1 : -1));
}

//printing into the html
function printBoard() {
  for (let cardsIndx = 0; cardsIndx < pickedCards.length; cardsIndx++) {
    $board.innerHTML += `<div class=card><img class="cardImage clickAble" data-turned="false" data-cardid="${pickedCards[cardsIndx]}" src="./img/cardBack.png"></div>`;
  }
}

//listener

export function resetBoard() {
  currentDifficulty = difficulty[currentDifficultyInt];
  if (currentDifficultyInt < difficulty.length) {
    currentDifficultyInt++;
  }

  $board.innerHTML = "";
  pickedCards = [];
  pickRandomCards();
  shuffleCards();
  printBoard();
  $board.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-cardId")) {
      if (e.target.classList.contains("clickAble")) {
        flipCard(e.target);
      }
    }
  });
}

resetBoard();
