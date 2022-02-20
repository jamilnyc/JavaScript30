const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let score = 0;

let lastHole;

let timeUp = false;

/**
 *
 * @param {Number} min The lower bound of random time
 * @param {Number} max The upper bound of random time
 * @returns {Number}
 */
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * @param {NodeList} theHoles
 * @returns {HTMLElement}
 */
function randomHole(theHoles) {
  const idx = Math.floor(Math.random() * theHoles.length);
  const hole = theHoles[idx];

  if (lastHole === hole) {
    return randomHole(theHoles);
  }
  lastHole = hole;
  return hole;
}

/**
 * Reveal a mole for a random amount of time, then hide it.
 */
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);

  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) {
      peep();
    }
  }, time);
}

function startGame() {
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  peep();
  setTimeout(() => (timeUp = true), 10000);
}

/**
 * @param {MouseEvent} event
 */
function bonk(event) {
  if (!event.isTrusted) {
    return;
  }
  console.log(this.parentNode.classList);

  // Prevent rapid multi-clicking
  if (!this.parentNode.classList.contains('up')) {
    return;
  }

  score += 1;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}
moles.forEach((mole) => mole.addEventListener('click', bonk));

document.querySelector('.startButton').addEventListener('click', startGame);
