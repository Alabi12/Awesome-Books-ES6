import Books from './module/Books.js';
import dynamicSection from './module/dynamicSection.js';
import { DateTime } from './module/luxon.js';

const books = new Books();

books.loadItems();
books.addBooks();
books.removeBook();
// Show section dynamically

dynamicSection();

const dt = document.querySelector('.display-date');
const updateTime = () => {
  const now = DateTime.now();
  dt.innerHTML = now.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
};
setInterval(updateTime, 1000);
