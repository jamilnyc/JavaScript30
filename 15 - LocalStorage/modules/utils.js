export function store(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function retrieve(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function populateList(plates = [], platesList) {
  const html = plates
    .map(
      (plate, i) => `
            <li>
                  <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? 'checked' : ''
      }/>
                <label for="item${i}">${plate.text}</label>
            </li>
            `
    )
    .join('');
  platesList.innerHTML = html;
}
