import * as ui from "./ui.js";
import Library from "./library.js";

const library = new Library();

function handleSubmitBookData(bookData) {
	library.addBookToLibrary(bookData);
	renderApp();
}

function handleDeleteBook(bookId) {
	library.deleteBook(bookId);
	renderApp();
}

function handleToggleReadStatus(bookId) {
	library.toggleReadStatus(bookId);
	renderApp();
}

function renderApp() {
	const books = library.getBooks();

	ui.renderBookList(books, {
		onDelete: (id) => handleDeleteBook(id),
		onToggleReadStatus: (id) => handleToggleReadStatus(id),
	});
}

ui.initBookGrid({
	onDelete: handleDeleteBook,
	onToggleReadStatus: handleToggleReadStatus,
});
ui.initAddBookFormView({
	onSubmit: handleSubmitBookData,
});
renderApp();
