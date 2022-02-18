const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter((voice) => voice.lang.includes('en'))
    .map(
      (voice) => `
    <option value="${voice.name}">
        ${voice.name} (${voice.lang})
    </option>`
    )
    .join('');
}

function setVoice() {
  const newVoice = voices.find((voice) => voice.name === this.value);
  msg.voice = newVoice;
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();

  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);

function setOption() {
  console.log(this.name, this.value);

  // We've named the same as the property on the msg variable for convenience
  msg[this.name] = this.value;
  toggle();
}
options.forEach((option) => option.addEventListener('change', setOption));

speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
