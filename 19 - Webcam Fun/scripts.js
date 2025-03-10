const video = document.querySelector('.player');

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('.photo');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      console.log(localMediaStream);
      //   video.src = window.URL.createObjectURL(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error('Webcam denied');
      alert('Webcam permission denied.');
    });
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // pixels[i] // red value
    // pixels[i+1] // green value
    // pixels[i+2] // blue value
    // pixels[i+3] // alpha value

    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // Translate the pixel colors to pull them apart.
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // If the RGB values are in the range, set the alpha to 0, to remove them
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  console.log('Video dimensions:', width, height);

  // Draw a frame of the video to the canvas every 16ms
  // Start at the top left corner and draw it to the width and height of the video
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // Take pixels out, transform and put them back in.
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // Play Audio
  snap.currentTime = 0;
  snap.play();

  // Take the data out of the canvas (base64)
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  // Name of the file when you download it
  link.setAttribute('download', 'snapshot');
  link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="A Person" />`;

  strip.insertBefore(link, strip.firstChild);
}

getVideo();

// Once the webcam video starts playing, it will paint to the canvas
video.addEventListener('canplay', paintToCanvas);
