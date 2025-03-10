console.log('Exercise 28');
const speed = document.querySelector('.speed');

/** @type {HTMLElement} */
const bar = speed.querySelector('.speed-bar');

/** @type {HTMLVideoElement} */
const video = document.querySelector('.flex');

speed.addEventListener('mousemove', function (event) {
  const y = event.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;
  const min = 0.4;
  const max = 4;

  const height = `${Math.round(percent * 100)}%`;
  const playbackRate = percent * (max - min) + min;
  bar.style.height = height;
  bar.textContent = `${playbackRate.toFixed(1)}x`;

  video.playbackRate = playbackRate;
});
