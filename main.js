import * as ui from "./ui.js";
import Library from "./library.js";

const library = new Library();

function handleSubmitBookData(bookData) {
  library.addBookToLibrary(bookData);
  renderApp();
}

function handleDeleteCard(cardId) {
  // code to instruct state to delete book and update ui
}

function handleToggleReadStatus(cardId) {
  // code to instruct state to toggle read status of the book and update ui
}

function renderApp() {
  const bookGrid = document.querySelector(".book-grid");
  const books = library.getBooks();

  bookGrid.innerHTML = '';
  
  books.forEach(bookData => {
    const cardElement = ui.createBookCard(bookData, {
      onDelete: () => handleDeleteCard(bookData.id),
      onToggleReadStatus: () => handleToggleReadStatus(bookData.id),
    });

    bookGrid.appendChild(cardElement);
  });
}


ui.initAddBookFormView({
  onSubmit: handleSubmitBookData 
});
renderApp();