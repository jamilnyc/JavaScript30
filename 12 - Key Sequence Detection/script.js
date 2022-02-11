console.log('Exercise 12');

const secret = 'wesbos';
const keysPressed = [];
/**
 *
 * @param {KeyboardEvent} event
 */
function keyUpEventHandler(event) {
  keysPressed.push(event.key);
  // Use the array as a queue, pushing out letters to keep it just as long as the secret word
  keysPressed.splice(-secret.length - 1, keysPressed.length - secret.length);
  if (keysPressed.join('').includes(secret)) {
    console.log('Secret discovered');
    alert('You found the secret');
  }
}

window.addEventListener('keyup', keyUpEventHandler);
