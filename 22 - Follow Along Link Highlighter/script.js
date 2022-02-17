const triggers = document.querySelectorAll('a');

const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

/**
 * @param {DOMElement} backgroundElement
 */
function makeHighlighter(backgroundElement) {
  /**
   * @param {MouseEvent} event
   */
  return function (event) {
    /** @type {DOMRect} */
    const linkCoords = event.currentTarget.getBoundingClientRect();

    const coords = {
      width: linkCoords.width,
      height: linkCoords.height,
      top: linkCoords.top + window.scrollY,
      left: linkCoords.left + window.scrollX,
    };
    backgroundElement.style.width = `${coords.width}px`;
    backgroundElement.style.height = `${coords.height}px`;
    backgroundElement.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
  };
}

triggers.forEach((a) => {
  a.addEventListener('mouseenter', makeHighlighter(highlight));
});
