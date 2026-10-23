import * as ui from "./ui.js";
import Library from "./library.js";

const library = new Library();

function handleSubmitBookData(bookData) {
  library.addBookToLibrary(bookData);
  renderApp();
}

function handleDeleteCard(bookId) {
  library.removeBook(bookId);
  renderApp();
}

function handleToggleReadStatus(bookId) {
  library.toggleReadStatus(bookId);
  renderApp();
}

function renderApp() {
  const books = library.getBooks();

  ui.renderBookList(books, {
      onDelete: (id) => handleDeleteCard(id),
      onToggleReadStatus: (id) => handleToggleReadStatus(id),
    });
}


ui.initBookGrid({
  onDelete: (id) => handleDeleteCard(id),
  onToggleReadStatus: (id) => handleToggleReadStatus(id),
});
ui.initAddBookFormView({
  onSubmit: handleSubmitBookData 
});
renderApp();