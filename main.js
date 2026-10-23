import * as ui from "./ui.js";
import * as storage from "./storage.js";
import Library from "./library.js";
import Book from "./book.js";

// needed these module-level variables (module state) for these reasons :
// - easy access to state parts that need to persist across multiple function calls, instead of the need to thread the library instance in every handler
// - track loading status of the books so app render act accordingly
let library;
let status = "loading"; // 'loading' | 'ready' | 'failed'

function render() {
	// break the app rendering process into 3 states, loading, loadError, ready
	if (status === "loading") return ui.showLoading();
	if (status === "failed") return ui.showLoadError();

	ui.hideLoading();
	ui.renderBookList(library.getBooks());
}

async function persist(action) {
	// the main purpose of this function is to not repeat try / catch blocks for every async operation in the handlers
	try {
		await action();
	} catch (err) {
		console.error(err);
		ui.showMessage("Couldn't save your change. It may be lost on reload.");
	}
}

async function addBook(bookData) {
	const book = library.addBookToLibrary(bookData);
	render(); // optimistic: UI updates instantly
	await persist(() => storage.saveBook(book));
}

async function deleteBook(bookId) {
	library.deleteBook(bookId);
	render();
	await persist(() => storage.deleteBook(bookId));
}

async function toggleReadStatus(bookId) {
	library.toggleReadStatus(bookId);
	render();
	await persist(() => storage.saveBook(library.getBookById(bookId)));
}

async function init() {
	render(); // draw the loading state

	try {
		/* 1. load */
		const stored = await storage.getAllBooks();

		/* 2. rebuild */
		library = new Library(stored.map((b) => new Book(b)));
		status = "ready";
	} catch (err) {
		console.error(err);
		status = "failed";
		render();
		return;
	}

	/* 3. wire up */
	ui.initBookGrid({
		onDelete: deleteBook,
		onToggleReadStatus: toggleReadStatus,
	});
	ui.initAddBookFormView({
		onSubmit: addBook,
	});

	/* 4. render */
	render();
}

init();
