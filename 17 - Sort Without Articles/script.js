console.log('Exercise 17 | Sort without Articles');

const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog',
];

const list = document.querySelector('#bands');

/**
 * Return the given name with leading articles removed.
 *
 * @param {string} name
 */
function getNormalizedName(name) {
  const regex = /^(the|a|an)\s/i;
  const replaced = name.replace(regex, '');
  return replaced.toLowerCase();
}

list.innerHTML = bands
  .sort((a, b) => (getNormalizedName(a) <= getNormalizedName(b) ? -1 : 1))
  .map((band) => `<li>${band}</li>`)
  .join('');
