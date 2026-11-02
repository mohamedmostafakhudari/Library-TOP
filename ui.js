import { formatIsoDate } from "./utils.js";

class LibraryView {
	#toastTimer = null;

	constructor(container) {
		this.container = container;
	}

	#createBookCard(book) {
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
                  <button class="btn btn-status" type="button" data-action="toggleRead"></button>
                  <button class="btn btn-outline btn-delete" type="button"
										data-action="delete">Remove</button>
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

	#bindSubmitListener(callback) {
		const form = this.container.querySelector(".add-book-form");

		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const formData = new FormData(form);
			const title = formData.get("title");
			const authors = formData
				.get("authors")
				.split(",")
				.map((a) => a.trim())
				.filter(Boolean);
			const pages = Number(formData.get("pages"));
			const read = formData.get("read") === "on";
			let cover = formData.get("cover");

			if (!cover || cover.size === 0) {
				cover = null;
			}

			const bookData = { title, authors, pages, read, cover };

			callback(bookData).then(() => {
				form.reset();
			});
		});
	}

	#renderBookList(books) {
		const bookGrid = this.container.querySelector(".book-grid");

		bookGrid.innerHTML = "";

		books.forEach((bookData) => {
			const cardElement = this.#createBookCard(bookData);
			bookGrid.appendChild(cardElement);
		});
	}

	#showLoading() {
		const bookGrid = this.container.querySelector(".book-grid");
		bookGrid.textContent = "Loading ...";
	}

	#showError(errorMsg) {
		const appStatus = this.container.querySelector(".app-status");
		appStatus.textContent = errorMsg;
		appStatus.hidden = false;
	}

	#hideStatus() {
		const appStatus = this.container.querySelector(".app-status");
		appStatus.hidden = true;
	}

	initBookGrid(actions) {
		// map each data-action value to its handler
		const handlers = {
			toggleRead: actions.onToggleReadStatus,
			delete: actions.onDelete,
		};

		const bookGrid = this.container.querySelector(".book-grid");

		bookGrid.addEventListener("click", (e) => {
			const button = e.target.closest("[data-action]");
			if (!button) return;

			const card = button.closest(".book-card");
			if (!card) return;

			const handler = handlers[button.dataset.action];
			if (handler) handler(card.dataset.id);
		});
	}

	initAddBookFormView(actions) {
		this.#bindSubmitListener(actions.onSubmit);
	}

	render(state) {
		if (state.isLoading) return this.#showLoading();
		if (state.error) return this.#showError(state.error);

		this.#hideStatus();
		this.#renderBookList(state.books);
	}

	showMessage(msg) {
		const toast = this.container.querySelector(".toast");
		toast.textContent = msg;
		toast.hidden = false;
		clearTimeout(this.#toastTimer);
		this.#toastTimer = setTimeout(() => (toast.hidden = true), 5000);
	}
}

export default LibraryView;
