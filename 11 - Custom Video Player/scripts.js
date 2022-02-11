console.log('Exercise 11');

// Player container
const player = document.querySelector('.player');

// Actual video element
const video = player.querySelector('.viewer');

// Viewing progress
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

// Play/pause
const toggle = player.querySelector('.toggle');

// Skip back and forward buttons
const skipButtons = player.querySelectorAll('[data-skip]');

// Volume and speed sliders
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

/**
 * @param {MouseEvent} event
 */
function skip(event) {
  const skipAmount = parseFloat(this.dataset.skip);
  video.currentTime += skipAmount;
}

function updateButton() {
  const text = this.paused ? '►' : '||';
  toggle.textContent = text;
}

function handleRangeUpdate() {
  console.log('Range Update', this.value);
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

/**
 * @param {MouseEvent} event
 */
function scrub(event) {
  const scrubTime =
    video.duration * (event.offsetX / event.currentTarget.offsetWidth);
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach((button) => {
  button.addEventListener('click', skip);
});

ranges.forEach((range) => {
  range.addEventListener('click', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mouseDown && scrub(event));
progress.addEventListener('mousedown', () => (mouseDown = true));
progress.addEventListener('mouseup', () => (mouseDown = false));
