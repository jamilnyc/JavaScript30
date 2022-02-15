console.log('Exercise 20 | Speech  Detection');

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

/** @type {SpeechRecognition} */
const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0]) // Get the single element
    .map((result) => result.transcript)
    .join('');
  console.log(transcript);

  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }
});

// Called after the user is finished speaking a sentence, to start a new cycle
recognition.addEventListener('end', recognition.start);

recognition.start();
