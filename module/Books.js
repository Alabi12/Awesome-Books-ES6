class Books {
  constructor() {
    this.booksListContainer = document.querySelector('.books-list');
    this.form = document.querySelector('.form');
    this.books = [];

    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
    }
  }

  loadItems() {
    const booksList = this.books
      .map(
        (bk) => `<li class="book">
    <p>${bk.title}</p>
     <p> - By ${bk.author}</p>
     <button class="btn btn-remove" data-id="${bk.id}">Remove</button></li>`,
      )
      .join('');

    this.booksListContainer.innerHTML = booksList;
  }

  // eslint-disable-next-line class-methods-use-this
  getId() {
    return `${new Date().getTime().toString()}${Math.trunc(
      Math.random() * 100,
    )}`;
  }

  #appendBook(bookObj) {
    const listItem = `<li class="book">
    <p>${bookObj.title}</p>
     <p> - By ${bookObj.author}</p>
     <button class="btn btn-remove" data-id="${bookObj.id}">Remove</button>
    </li>`;

    this.booksListContainer.insertAdjacentHTML('beforeend', listItem);
  }

  addBooks() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {};
      const title = e.target.title.value;
      const author = e.target.author.value;

      formData.title = title.trim();
      formData.author = author.trim();
      formData.id = this.getId();

      if (!title || !author) return;

      //   Clear inputs
      e.target.title.value = '';
      e.target.author.value = '';

      //   Add book
      this.books.push(formData);

      //   Save to local storage
      localStorage.setItem('books', JSON.stringify(this.books));

      //   Append book UI
      this.#appendBook(formData);
    });
  }

  removeBook() {
    this.booksListContainer.addEventListener('click', (e) => {
      const clickedButton = e.target.closest('.btn-remove');

      if (!clickedButton) return;

      const { id } = clickedButton.dataset;

      this.books = this.books.filter((book) => book.id !== id);

      //   Save to local
      localStorage.setItem('books', JSON.stringify(this.books));

      //   Load Items UI
      this.loadItems(this.books);
    });
  }
}

export default Books;
