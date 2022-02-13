import { retrieve, store, populateList } from './modules/utils';

console.log('Exercise 15 | Local Storage');
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = retrieve('items') || [];

/**
 * @param {SubmitEvent} e
 */
function addItem(e) {
  console.log(e);
  e.preventDefault();
  const text = this.querySelector('[name="item"]').value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  store('items', items);

  this.reset();
}

/**
 * @param {MouseEvent} e
 */
function toggleDone(e) {
  if (!e.target.matches('input')) {
    return;
  }

  const el = e.target;
  const { index } = el.dataset;
  items[index].done = !items[index].done;
  store('items', items);
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);
