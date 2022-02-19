const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (event) => {
  isDown = true;
  slider.classList.add('active');
  startX = event.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  console.log({
    eventPageX: event.pageX,
    sliderOffsetLeft: slider.offsetLeft,
    scrollLeft,
  });
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) {
    return;
  }
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;

  // Difference between where you initially clicked to where the mouse is now
  const walk = (x - startX) * 3;
  console.log({ x, startX, walk });

  // The scroll bar moves forward, as you move your mouse back.
  // They move in opposite directions
  slider.scrollLeft = scrollLeft - walk;
});
