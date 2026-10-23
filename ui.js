import { formatIsoDate } from "./utils.js";

function createBookCard(book) {
	const wrapper = document.createElement("li");
	wrapper.className = "book-card";
	wrapper.setAttribute("data-read", book.read);
	wrapper.setAttribute("data-id", book.id);
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
	wrapper.querySelector(".author").textContent = book.authors.join(", ");
	wrapper.querySelector(".pages").textContent = book.pages + " pages";

	const time = wrapper.querySelector("time");
	time.setAttribute("datetime", book.addedOn);
	time.textContent = formatIsoDate(book.addedOn);

	wrapper.querySelector(".btn-status").textContent = book.read
		? "Read"
		: "Not Read Yet";

	return wrapper;
}

export function initBookGrid(actions) {
	const bookGrid = document.querySelector(".book-grid");

	bookGrid.addEventListener("click", (e) => {
		// catch the delegated click events on the card elements and any element nested inside them and run the handling callback functions
		const card = e.target.closest(".book-card");
		if (!card) return;
		if (e.target.closest(".btn-delete")) actions.onDelete(card.dataset.id);
		if (e.target.closest(".btn-status"))
			actions.onToggleReadStatus(card.dataset.id);
	});
}

export function initAddBookFormView(actions) {
	const form = document.querySelector(".add-book-form");

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const title = formData.get("title");
		const authors = formData
			.get("authors")
			.split(", ")
			.map((a) => a.trim())
			.filter(Boolean);
		const pages = Number(formData.get("pages"));
		const read = formData.get("read") === "on";
		let cover = formData.get("cover");

		if (!cover || cover.size === 0) {
			cover = null;
		}

		const bookData = { title, authors, pages, read, cover };

		actions.onSubmit?.(bookData);

		form.reset();
	});
}

export function renderBookList(books) {
	const bookGrid = document.querySelector(".book-grid");

	bookGrid.innerHTML = "";

	books.forEach((bookData) => {
		const cardElement = createBookCard(bookData);
		bookGrid.appendChild(cardElement);
	});
}

export function hideLoading() {
	const appStatus = document.querySelector(".loading-state");
	appStatus.style.display = "none";
}

export function showLoading() {
	const appStatus = document.querySelector(".loading-state");
	appStatus.firstElementChild.textContent = "Loading...";
	appStatus.style.display = "block";
}

export function showLoadError() {
	const appStatus = document.querySelector(".loading-state");
	appStatus.firstElementChild.textContent =
		"Something went wrong, couldn't load the books.";
	appStatus.style.display = "block";
}

export function showMessage(msg) {
	const appStatus = document.querySelector(".loading-state");
	appStatus.firstElementChild.textContent = msg;
	appStatus.style.display = "block";
}
