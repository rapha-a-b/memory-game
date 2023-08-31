export { flipCard };
import { resetBoard } from "./main.js";

let cards = [];
let gameOn = true;

function checkCards(card) {
  cards.push(card);
  card.classList.remove("clickAble");
  if (cards.length === 2) {
    gameOn = false;
    if (cards[0].src === cards[1].src) {
      cards.forEach((e) => (e.parentElement.style.background = "yellow"));
      cards = [];
      gameOn = true;
      console.log(gameOn);
      checkWin();
      return;
    }

    cards.forEach((e) => {
      setTimeout(() => {
        e.classList.add("clickAble");
        flipCard(e);
        cards = [];
        gameOn = true;
      }, 1500);
    });
  }
}

function flipCard(element) {
  if (element.dataset.turned === "false" && gameOn) {
    element.setAttribute("src", `./img/${element.dataset.cardid}.jpg`);
    element.setAttribute("data-turned", "true");
    checkCards(element);
  } else {
    element.setAttribute("src", "./img/cardBack.png");
    element.setAttribute("data-turned", "false");
  }
}

function checkWin() {
  let $cardsOnBoard = document.querySelectorAll(".cardImage");
  console.log($cardsOnBoard);
  if ([...$cardsOnBoard].every((card) => card.dataset.turned === "true")) {
    setTimeout(() => {
      alert("you won!");
      resetBoard();
    }, 800);
  } else {
    console.log("noWin");
  }
}
