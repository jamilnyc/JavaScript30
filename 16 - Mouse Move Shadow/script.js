console.log('Exercise 16 | Mouse Move Shadow');

const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

// Most distance that the shadow should stretch in px.
const walk = 100;

function shadow(e) {
  const width = hero.offsetWidth;
  const height = hero.offsetHeight;

  let { offsetX: x, offsetY: y } = e;

  // "this" is what we are listening on (hero)
  // "target" is whatever triggered it, sometimes the h1 tag
  if (this !== e.target) {
    // When triggered by the h1 tag, add offset so it is relative to the hero
    x += e.target.offsetLeft;
    y += e.target.offsetTop;
  }

  //   console.log('Hero Offset', width, height);
  //   console.log('Event Offset', x, y);

  // Split the walk into equal halves (-50 to +50)
  // xWalk is proportional to the distance covered
  const xWalk = Math.round((x / width) * walk - walk / 2);
  const yWalk = Math.round((y / height) * walk - walk / 2);

  text.style.textShadow = `${xWalk}px ${yWalk}px 0 red,
    ${-xWalk}px ${-yWalk}px 0 blue 
    `;
}

hero.addEventListener('mousemove', shadow);
