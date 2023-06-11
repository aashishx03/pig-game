"use strict";
// GENERATING ELEMENTS
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, activePlayer, currentScore, playing;

function init() {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
}

const addScores = function () {
  //  ADDING AND DIPLAYING SCORE
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
};

const switchPlayer = function () {
  // SETTING AND DISPLAYING CURRENT SCORE TO ZERO
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // IF DICE = 1 CHANGING ACTIVE PLAYER
  activePlayer = activePlayer === 0 ? 1 : 0;
  // VISUALLY CHANGING ACTIVE PLAYER
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

init();

btnRoll.addEventListener("click", function () {
  if (playing) {
    // GENERATING RANDOM NUMBER
    let diceNumber = Math.floor(Math.random() * 6) + 1;

    // DISPLAY DICE
    diceEl.classList.remove("hidden");
    diceEl.src = `\\images\\dice-${diceNumber}.png`;

    // CHECKING IF DICE = 1
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      addScores();
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    addScores();
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      //  dont changwe
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      console.log(activePlayer);
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
