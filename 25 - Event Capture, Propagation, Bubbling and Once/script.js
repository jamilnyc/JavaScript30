console.log('Exercise 25 | Event Capture, Propagation');

const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

/**
 *
 * @param {MouseEvent} e
 */
function logText(e) {
  e.stopPropagation();
  console.log(this.classList.value);
}

divs.forEach((div) => div.addEventListener('click', logText), {
  capture: false,
  once: true,
});

button.addEventListener(
  'click',
  () => {
    console.log('Click!!!');
  },
  {
    once: true,
  }
);
