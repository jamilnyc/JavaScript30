console.log('Exercise 08');
const canvas = document.querySelector('#draw');

/** @type CanvasRenderingContext2D */
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#AA00AA';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

let hue = 0;

// Used for calculating mouse speed
/** @type MouseEvent */
let currentEvent;
/** @type MouseEvent */
let previousEvent;
let currentMouseSpeed; // pixels per second
let previousMouseSpeed;
let currentAcceleration;

const POLLING_INTERVAL_MS = 20;
const MAX_LINE_WIDTH = 50;
const MIN_LINE_WIDTH = 2;
const MAX_SPEED = 12000;
const MAX_WIDTH_DIFF = 10;

const currentLineWidth = MIN_LINE_WIDTH;

/**
 * Return the width of the line, based on the current speed of the mouse.
 *
 * @returns {Number}
 */
function getLineWidth(previousLineWidth) {
  if (!currentMouseSpeed) {
    console.warn('Mouse Speed Unknown');
    return MIN_LINE_WIDTH;
  }
  const adjustedSpeed = Math.min(currentMouseSpeed, MAX_SPEED);
  let width = Math.floor(
    MAX_LINE_WIDTH - (MAX_LINE_WIDTH * adjustedSpeed) / MAX_SPEED
  );
  width = Math.max(MIN_LINE_WIDTH, width);
  return width;

  //   if (currentAcceleration > 0) {
  //     return Math.min(MAX_LINE_WIDTH, previousLineWidth + 5);
  //   }
  //   if (currentAcceleration < 0) {
  //     return Math.max(MIN_LINE_WIDTH, previousLineWidth - 5);
  //   }
  //   return previousLineWidth;
}

/**
 * @param {MouseEvent} e
 */
function draw(e) {
  if (!isDrawing) {
    return;
  }
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue += 1;
  if (hue >= 360) {
    hue = 0;
  }

  ctx.lineWidth = getLineWidth(currentLineWidth);
}

/**
 * @param {MouseEvent} e
 */
function handleMouseDown(e) {
  isDrawing = true;
  // Without this, each new click would start a line at the last draw position
  // Meaning you can only create one continuous line
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

/**
 * @param {MouseEvent} e
 */
function handleMouseMove(e) {
  draw(e);
  currentEvent = e;
}

setInterval(() => {
  // Need two data points to estimate speed
  if (previousEvent && currentEvent) {
    const deltaX = currentEvent.screenX - previousEvent.screenX;
    const deltaY = currentEvent.screenY - previousEvent.screenY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    previousMouseSpeed = currentMouseSpeed;
    currentMouseSpeed = distance / (POLLING_INTERVAL_MS / 1000);

    currentAcceleration =
      (currentMouseSpeed - previousMouseSpeed) / (POLLING_INTERVAL_MS / 1000);
    console.log(`Mouse Speed: ${currentMouseSpeed} px/sec`);
  }
  previousEvent = currentEvent;
}, POLLING_INTERVAL_MS);

canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mousedown', handleMouseDown);

canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
