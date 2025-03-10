console.log('Exercise 2');
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

/**
 * Return the number of degrees to rotate the clock hand proportional to the current value.
 *
 * @param {number} currentValue
 * @param {number} maxValue
 * @param {number} offset
 * @returns {number}
 */
function getDegreesForHand(currentValue, maxValue, offset = 90) {
  return (currentValue / maxValue) * 360 + offset;
}

/**
 * Rotate the given hand to the given degrees, by updating the style.
 *
 * @param {Element} hand
 * @param {number} degrees
 * @param {number} offset
 */
function transformToDegrees(hand, degrees, offset = 90) {
  if (degrees === offset) {
    hand.classList.add('no-transition');
    // eslint-disable-next-line no-unused-expressions
    hand.offsetHeight; // trigger reflow
  } else {
    hand.classList.remove('no-transition');
  }
  hand.style.transform = `rotate(${degrees}deg)`;
}

function setDate() {
  const now = new Date();
  const secondsDegrees = getDegreesForHand(now.getSeconds(), 60);
  console.log(`Seconds Degrees: ${secondsDegrees}`);
  transformToDegrees(secondHand, secondsDegrees);

  const minutesDegrees = getDegreesForHand(now.getMinutes(), 60);
  transformToDegrees(minuteHand, minutesDegrees);

  const hoursDegrees = getDegreesForHand(now.getHours(), 12);
  transformToDegrees(hourHand, hoursDegrees);

  // console.log(`Hours: ${now.getHours()}, Degrees: ${hoursDegrees}`);
}

setDate();
setInterval(setDate, 1000);
