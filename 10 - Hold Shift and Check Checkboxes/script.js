console.log('Exercise 10');
const checkboxes = Array.from(document.querySelectorAll('.item input'));

// Store the index of the checkboxes as a data attribute
checkboxes.forEach((box, index) => {
  box.setAttribute('data-index', index);
});
let lastClicked;

/**
 * @param {MouseEvent} event
 */
function clickHandler(event) {
  // Nothing to do if the shift key is not held
  // Or this is the very first click
  if (!event.shiftKey || !lastClicked) {
    lastClicked = event.currentTarget;
    return;
  }

  const currentIndex = parseInt(event.currentTarget.getAttribute('data-index'));
  const lastIndex = parseInt(lastClicked.getAttribute('data-index'));

  // Like Gmail, the state of the current box will be applied to
  // all the boxes in the range.
  const desiredState = event.currentTarget.checked;

  checkboxes.forEach((box, index) => {
    if (
      index >= Math.min(currentIndex, lastIndex) &&
      index <= Math.max(currentIndex, lastIndex)
    ) {
      box.checked = desiredState;
    }
  });

  lastClicked = event.currentTarget;
}

checkboxes.forEach((box) => {
  box.addEventListener('click', clickHandler);
});
