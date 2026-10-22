import { formatIsoDate } from "./utils.js";

export function initAddBookFormView(actions) {
  const form = document.querySelector(".add-book-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const authors = formData.get('authors').split(",");
    const pages = formData.get('pages');
    const read = formData.get('read');
    let cover = formData.get('cover');
    
    if (!cover || cover.size === 0) {
      cover = null;
    }

    const bookData = { title, authors, pages, read, cover };

    if (actions && actions.onSubmit) {
      actions.onSubmit(bookData);
    }

    form.reset();
});
}
export function renderBookList(books, actions) {
    const bookGrid = document.querySelector(".book-grid");

    bookGrid.innerHTML = '';
    
    books.forEach(bookData => {
        const cardElement = createBookCard(bookData, actions);
        bookGrid.appendChild(cardElement);
    });
}

function createBookCard(book, actions) {
  const wrapper = document.createElement("li");
  wrapper.className = "book-card";
  wrapper.setAttribute("data-read", book.read);

  wrapper.innerHTML = `
              <div class="cover"><svg class="icon"><use href="#i-book"/></svg></div>
              <div class="meta">
                <h3 class="title"></h3>
                <p class="author"></p>
                <p class="pages"></p>
              </div>
              <div class="details">
                <div class="added">
                  <p class="label">Added on</p>
                  <time class="value" datetime=""></time>
                </div>
                <div class="actions">
                  <button class="btn btn-status" type="button"></button>
                  <button class="btn btn-outline btn-delete" type="button">Remove</button>
                </div>
              </div>
  `;
  wrapper.querySelector(".title").textContent = book.title;
  wrapper.querySelector(".author").textContent = book.authors.join(",");
  wrapper.querySelector(".pages").textContent = book.pages + ' pages';
  const time = wrapper.querySelector("time");
  time.setAttribute("datetime", book.addedOn);
  time.textContent = formatIsoDate(book.addedOn);
  const btnStatus = wrapper.querySelector(".btn-status");
  btnStatus.textContent = book.read ? "Read" : "Not Read Yet";
  
  btnStatus.addEventListener("click", () => {
    if (actions && actions.onToggleReadStatus) {
      actions.onToggleReadStatus(book.id);
    }
  });
  wrapper.querySelector(".btn-delete").addEventListener('click', () => {
    if (actions && actions.onDelete) {
      actions.onDelete(book.id);
    }
  });

  return wrapper;
}