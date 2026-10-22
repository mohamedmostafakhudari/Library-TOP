const initialBooks = [
  {
    id: 1,
    title: "Don’t Make Me Think",
    authors: ["Steve Krug"],
    pages: 216,
    read: true,
    cover: null,
    addedOn: "2026-10-12T09:00:00",
  },
  {
    id: 2,
    title: "The Design of Everyday Things",
    authors: ["Don Norman"],
    pages: 368,
    read: false,
    cover: null,
    addedOn: "2026-10-14T18:30:00",
  },
  {
    id: 3,
    title: "Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days",
    authors: ["Jake Knapp", "John Zeratsky", "Braden Kowitz"],
    pages: 288,
    read: false,
    cover: null,
    addedOn: "2026-10-15T11:15:00",
  },
  {
    id: 4,
    title: "You Don’t Know JS: Scope & Closures",
    authors: ["Kyle Simpson"],
    pages: 98,
    read: true,
    cover: null,
    addedOn: "2026-10-18T20:00:00",
  },
  {
    id: 5,
    title: "Rich Dad Poor Dad",
    authors: ["Robert T. Kiyosaki"],
    pages: 336,
    read: true,
    cover: null,
    addedOn: "2026-10-20T09:00:00",
  },
  {
    id: 6,
    title: "Learn UX: Design Great Products with Lean UX",
    authors: ["Jeff Gothelf"],
    pages: 240,
    read: false,
    cover: null,
    addedOn: "2026-10-21T16:45:00",
  },
];

export default function Library(books = initialBooks) {
  if (!new.target) throw new Error("'new' operator is missing!");
  this.books = books;
}

Library.prototype.getBooks = function() {
  return [...this.books];
}

Library.prototype.addBookToLibrary = function(bookData) {
  const newBook = new Book(bookData.title, bookData.authors, bookData.pages, bookData.read, bookData.cover);
  this.books = this.books.concat(newBook);
}

Library.prototype.removeBook = function(bookId) {
  // code to remove book
}
function Book(title, authors, pages, read = false, cover = null) {
  if (!new.target) throw Error("'new' operator missing!");
  this.id = crypto.randomUUID();
  this.title = title;
  this.authors = authors;
  this.pages = pages;
  this.read = read;
  this.cover = cover;
  this.addedOn = new Date().toISOString();
}

Book.prototype.toggleReadStatus = function() {
  // code to toggle read status of a book
}

// const book = new Book('The Hobbit', 'J.R.R. Tolkien', 295);
