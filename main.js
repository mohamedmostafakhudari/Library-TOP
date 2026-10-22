function Book(title, author, pages, read = false) {
  if (!new.target) throw Error("'new' operator missing!");
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  const readState = this.read ? 'read' : 'not read yet';
  
  return `${this.title} by ${this.author}, ${this.pages}, ${readState}`;
}

const book = new Book('The Hobbit', 'J.R.R. Tolkien', 295);

console.log(book.info());