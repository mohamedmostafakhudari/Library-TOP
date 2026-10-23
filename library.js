const initialBooks = [
  {
    title: "Don’t Make Me Think",
    authors: ["Steve Krug"],
    pages: 216,
    read: true,
    cover: null,
  },
  {
    title: "The Design of Everyday Things",
    authors: ["Don Norman"],
    pages: 368,
    read: false,
    cover: null,
  },
  {
    title: "Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days",
    authors: ["Jake Knapp", "John Zeratsky", "Braden Kowitz"],
    pages: 288,
    read: false,
    cover: null,
  },
  {
    title: "You Don’t Know JS: Scope & Closures",
    authors: ["Kyle Simpson"],
    pages: 98,
    read: true,
    cover: null,
  },
  {
    title: "Rich Dad Poor Dad",
    authors: ["Robert T. Kiyosaki"],
    pages: 336,
    read: true,
    cover: null,
  },
  {
    title: "Learn UX: Design Great Products with Lean UX",
    authors: ["Jeff Gothelf"],
    pages: 240,
    read: false,
    cover: null,
  },
].map(bookData => new Book(bookData));

export default function Library(books = initialBooks) {
  if (!new.target) throw new Error("'new' operator is missing!");
  this.books = books;
}

Library.prototype.getBooks = function() {
  return [...this.books];
}

Library.prototype.addBookToLibrary = function(bookData) {
  const newBook = new Book(bookData);
  this.books = this.books.concat(newBook);
}

Library.prototype.removeBook = function(bookId) {
  this.books = this.books.filter(book => book.id !== bookId);
}

Library.prototype.toggleReadStatus = function(bookId) {
  const book = this.books.find(b => b.id === bookId);
  if (book) book.toggleReadStatus();
}

function Book({ title, authors, pages, read = false, cover = null }) {
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
  this.read = !this.read;
}
