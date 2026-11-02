import LibraryView from "./ui.js";
import Library from "./library.js";
import * as storage from "./storage.js";

class LibraryController {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		this.init();
	}

	async init() {
		/* wire listeners up */
		// it's best practice to wire listeners first thing before the application finishes loading to prevent race consitions and missed events.

		this.model.subscribe((libraryState) => {
			this.view.render(libraryState);
		});

		this.view.initBookGrid({
			onDelete: this.handleDeleteBook.bind(this),
			onToggleReadStatus: this.handleToggleReadStatus.bind(this),
		});
		this.view.initAddBookFormView({
			onSubmit: this.handleAddBook.bind(this),
		});

		try {
			await this.model.fetchBooks();
		} catch (error) {
			this.view.showMessage(error.message);
		}
	}

	async handleAddBook(bookData) {
		if (this.model.isLoading()) return;

		try {
			await this.model.addBookToLibrary(bookData);
			return true;
		} catch (error) {
			this.view.showMessage(error.message);
		}
	}

	async handleDeleteBook(bookId) {
		if (this.model.isLoading()) return;

		try {
			await this.model.deleteBook(bookId);
		} catch (error) {
			this.view.showMessage(error.message);
		}
	}

	async handleToggleReadStatus(bookId) {
		if (this.model.isLoading()) return;
		try {
			await this.model.toggleReadStatus(bookId);
		} catch (error) {
			this.view.showMessage(error.message);
		}
	}
}

const app = new LibraryController(
	new Library(storage),
	new LibraryView(document.getElementById("app")),
);
