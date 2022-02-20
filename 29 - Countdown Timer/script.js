let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]');

/**
 * Return the given minutes or seconds padded with a zero if needed.
 *
 * @param {Number} num
 * @returns {string}
 */
function getTwoDigit(num) {
  return `${num}`.padStart(2, '0');
}

function displayTimeLeft(seconds) {
  const minutes = getTwoDigit(Math.floor(seconds / 60));
  const remainderSeconds = getTwoDigit(seconds % 60);

  const display = `${minutes}:${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = getTwoDigit(end.getMinutes());

  endTime.textContent = `Be Back at ${hour > 12 ? hour - 12 : hour}:${minutes}`;
}

function timer(seconds) {
  // Clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      // Remove timer after its finished
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const mins = parseInt(this.minutes.value);
  if (Number.isNaN(mins) || mins <= 0) {
    return;
  }
  timer(mins * 60);
  // Clear out the form
  this.reset();
});
