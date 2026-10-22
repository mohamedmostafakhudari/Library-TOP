import { formatIsoDate } from "./utils.js";

export function createBookCard(book, actions) {
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
      actions.onToggleReadStatus();
    }
  });
  wrapper.querySelector(".btn-delete").addEventListener('click', () => {
    if (actions && actions.onDelete) {
      actions.onDelete();
    }
  });

  return wrapper;
}