console.log('Exercise 06');

const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const MIN_LENGTH = 1;

const cities = [];

fetch(endpoint)
  .then((response) => response.json())
  .then((json) => {
    cities.push(...json);
  });

/**
 * Return the cities that match the given search term in their city or state name, sorted by population.
 *
 * @param {Array} list Array of city objects
 * @param {string} searchWord
 * @returns {Array}
 */
function searchCities(list, searchWord) {
  return list
    .filter((city) => {
      const regex = new RegExp(searchWord, 'gi');
      return city.city.match(regex) || city.state.match(regex);
    })
    .sort((a, b) => b.population - a.population);
}

/**
 * Return the given number formatted with comma separators.
 *
 * @param {number} x
 * @returns {string}
 */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Update the UI with the matching cities.
 *
 * @param {Array} list An array of city objects
 * @param {string} searchWord
 */
function updateListing(list, searchWord) {
  const html = list
    .map((city) => {
      // Highlight the matched words
      const regex = new RegExp(searchWord, 'gi');
      const originalName = `${city.city}, ${city.state}`;
      const formattedName = originalName.replace(
        regex,
        `<span class="hl">${searchWord}</span>`
      );

      return `
      <li>
        <span class="name">${formattedName}</span>
        <span class="population">${numberWithCommas(city.population)}</span>
      </li>`;
    })
    .join('');
  suggestions.innerHTML = html;
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeyUp(event) {
  const searchWord = event.currentTarget.value.trim();
  let results = [];
  if (searchWord.length >= MIN_LENGTH) {
    results = searchCities(cities, searchWord);
  }
  updateListing(results, searchWord);
}

searchInput.addEventListener('keyup', handleKeyUp);
searchInput.addEventListener('change', handleKeyUp);
