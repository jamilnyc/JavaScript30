console.log('Exercise 18 | Adding up times with Reduce');

const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

const totalSeconds = timeNodes.reduce((accumulator, currentNode) => {
  /** @type {string} */
  const ts = currentNode.dataset.time;
  const parts = ts.split(':');
  if (parts.length !== 2) {
    return accumulator;
  }

  const min = parseInt(parts[0]);
  const sec = parseInt(parts[1]);
  accumulator += 60 * min + sec;
  return accumulator;
}, 0);

const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

console.log(hours, minutes, seconds);
