import * as ui from "./ui.js";
import * as storage from "./storage.js";
import Library from "./library.js";
import Book from "./book.js";

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
			this.view.renderBookList(libraryState.books);
		});

		this.view.initBookGrid({
			onDelete: this.handleDeleteBook.bind(this),
			onToggleReadStatus: this.handleToggleReadStatus.bind(this),
		});
		this.view.initAddBookFormView({
			onSubmit: this.handleAddBook.bind(this),
		});

		this.view.showLoading();

		try {
			await this.model.fetchBooks();

			this.view.hideStatus();
			this.view.renderBookList(this.model.getBooks());
		} catch (error) {
			this.view.showError(error.message);
		}
	}

	async handleAddBook(bookData) {
		if (this.model.isLoading()) return;

		await this.model.addBookToLibrary(bookData);
	}

	async handleDeleteBook(bookId) {
		if (this.model.isLoading()) return;

		await this.model.deleteBook(bookId);
	}

	async handleToggleReadStatus(bookId) {
		if (this.model.isLoading()) return;

		await this.model.toggleReadStatus(bookId);
	}
}

const app = new LibraryController(new Library(storage), ui);
