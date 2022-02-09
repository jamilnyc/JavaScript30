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
let direction = true;

/**
 * @param {MouseEvent} e
 */
function draw(e) {
  if (!isDrawing) {
    return;
  }
  console.log(e);
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

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth += 1;
  } else {
    ctx.lineWidth -= 1;
  }
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

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', handleMouseDown);

canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
