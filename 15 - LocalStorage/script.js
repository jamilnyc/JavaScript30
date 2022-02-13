import { retrieve, store, populateList } from './modules/utils';

console.log('Exercise 15 | Local Storage');
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = retrieve('items') || [];

// Controls
const checkAll = document.querySelector('.check-all');
const uncheckAll = document.querySelector('.uncheck-all');
const clear = document.querySelector('.clear');

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

/**
 *
 * @param {Element} listContainer
 * @param {boolean} checked
 */
function setEntireList(listContainer, checked) {
  listContainer.querySelectorAll('input[type="checkbox"]').forEach((box) => {
    box.checked = checked;
    const { index } = box.dataset;
    items[index].done = checked;
    store('items', items);
    populateList(items, listContainer);
  });
}

/**
 *
 * @param {Element} listContainer
 */
function emptyList(listContainer) {
  items.length = 0;
  store('items', items);
  populateList(items, listContainer);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

checkAll.addEventListener('click', () => setEntireList(itemsList, true));
uncheckAll.addEventListener('click', () => setEntireList(itemsList, false));
clear.addEventListener('click', () => emptyList(itemsList));

populateList(items, itemsList);
