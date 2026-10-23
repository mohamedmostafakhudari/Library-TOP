import * as ui from "./ui.js";
import Library from "./library.js";

const library = new Library();

function handleSubmitBookData(bookData) {
  library.addBookToLibrary(bookData);
  renderApp();
}

function handleDeleteCard(cardId) {
  library.removeBook(cardId);
  renderApp();
}

function handleToggleReadStatus(cardId) {
  // code to instruct state to toggle read status of the book and update ui
}

function renderApp() {
  const books = library.getBooks();

  ui.renderBookList(books, {
      onDelete: (id) => handleDeleteCard(id),
      onToggleReadStatus: (id) => handleToggleReadStatus(id),
    });
}


ui.initAddBookFormView({
  onSubmit: handleSubmitBookData 
});
renderApp();